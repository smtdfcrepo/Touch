const model = require("../Manager/db.js")
module.exports.login = function(id, password) {
  return new Promise((resolve, reject) => {
    let account_db = model.loadDatabase("Account.db")
    account_db.all(`SELECT * FROM account WHERE id='${id}' AND password ='${password}' `, function(err, row) {
      if (err) {
        account_db.close()
        reject({
          status: "error",
          message:"Cannot login to system !"
        })
      } else {
        account_db.close()
        if (row.length == 0) {
          reject({
            status: "error",
            message:"Cannot find account !"
          })
        } else {
          resolve({
            id: id,
            info: row[0]
          })
        }
      }
    })
  })
}

module.exports.info  = function(id) {
  return new Promise((resolve, reject) => {
    let account_db = model.loadDatabase("Account.db")
    account_db.all(`SELECT * FROM account WHERE id='${id}' `, function(err, row) {
      if (err) {
        account_db.close()
        reject({
          status: "error",
          message:"Cannot load information of account !"
        })
      } else {
        account_db.close()
        if (row.length == 0) {
          reject({
            status: "error",
            message:"Cannot find account !"
          })
        } else {
          resolve({
            id: id,
            role: row[0].role
          })
        }
      }
    })
  })
}
