const jwt = require("jsonwebtoken")
const jwtConfig = require("../Configs/token_generation.js")
const db = require("../Manager/db.js")


module.exports.generateAccessToken = function(payload) {
  return new Promise((resolve, reject) => {
    let token = jwt.sign(payload, jwtConfig.ACCESS_TOKEN_SECRET, {
      expiresIn: "1days"
    })
    resolve(token)
  })
}
module.exports.generateRefreshToken = function(payload) {
  return new Promise((resolve, reject) => {
    let token = jwt.sign(payload, jwtConfig.REFRESH_TOKEN_SECRET, {
      expiresIn: "10days"
    })
    let refreshTokenDB = db.loadDatabase("RefreshToken.db")
    refreshTokenDB.run(`INSERT INTO token('tok') VALUES ('${token}')`, function(err) {
      refreshTokenDB.close()
      if (err) {
        reject(err)
      } else {
        resolve(token)
      }
    })
    //resolve(token)
  })
}
module.exports.verifyAccessToken = function(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, jwtConfig.ACCESS_TOKEN_SECRET, function(err, decoded) {
      if (err) {
        reject(err)
      } else {
        resolve(decoded)
      }
    })
  })
}

module.exports.verifyRefreshToken = function(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, jwtConfig.REFRESH_TOKEN_SECRET, function(err, decoded) {
      if (err) {
        reject(err)
      } else {
        let refreshTokenDB = db.loadDatabase("RefreshToken.db")
        refreshTokenDB.all(`SELECT * FROM token WHERE tok ='${token}'`, function(err, row) {
          refreshTokenDB.close()
          if (err || row.length == 0 ) {
            reject(err)
          } else {
            resolve(decoded)
          }
        })
        //resolve(decoded)
      }
    })
  })
}

module.exports.destroyRefreshToken = function(token) {
  return new Promise((resolve, reject) => {
    let refreshTokenDB = db.loadDatabase("RefreshToken.db")
    refreshTokenDB.all(`DELETE FROM token WHERE tok ='${token}'`, function(err, row) {
      refreshTokenDB.close()
      if (err) {
        reject(err)
      } else {
        resolve({})
      }
    })
  })
}
