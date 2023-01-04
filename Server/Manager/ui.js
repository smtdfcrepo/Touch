const db = require("./db.js")

module.exports.all = function(owner) {
  return new Promise((resolve, reject) => {
    let ListUIDB = db.loadDatabase("ui/list.db")
    ListUIDB.all(`SELECT * FROM list_ui WHERE owner ='${owner}'`, function(err, row) {
      if (err) {
        reject({
          status: "error",
          message:"Cannot get UI !"
        })
      } else {
        resolve({
          payload: row
        })
      }
    })
  })
}

module.exports.getData = function(owner, name) {
  return new Promise((resolve, reject) => {
    let UIDB = db.loadDatabase(`ui/ui_${name}_${owner}.db`)
    UIDB.all(`SELECT * FROM  ui_${name}_${owner}`, function(err, row) {
      if (err) {
        reject({
          status: "error",
          message:"Cannot load UI !"
        })
      } else {
        resolve({
          payload: row
        })
      }
    })
  })
}

module.exports.getSource = function(owner, name) {
  return new Promise((resolve, reject) => {
    let ListUIDB = db.loadDatabase("ui/list.db")
    ListUIDB.all(`SELECT * FROM list_ui WHERE owner ='${owner}' AND name ='${name}'` , function(err, row) {
      if (err) {
        reject({
          status: "error",
          code: "get_ui_err"
        })
      } else {
        
        resolve({
          payload: row[0].source
        })
      }
    })
  })
}

module.exports.create = function(owner, name, source) {
  return new Promise((resolve, reject) => {
    let ListUIDB = db.loadDatabase("ui/list.db")
    let UIDB = db.loadDatabase(`ui/ui_${name}_${owner}.db`)
    UIDB.run(`CREATE TABLE ui_${name}_${owner}('widget' TEXT,'name' TEXT,'value' TEXT, 'attr' TEXT)`, function(err) {
      if (err) {
        reject({
          status: "error",
          message:"Cannot create UI !"
        })
      } else {
        ListUIDB.run(`INSERT INTO list_ui('name','owner','source') VALUES ('${name}','${owner}','${source}')`, function(err) {
          if (err) {
            reject({
              status: "error",
              message:"Cannot create UI !"
            })
          } else {
            resolve({
              name: name,
              owner: owner
            })
          }
        })
      }
    })
  })
}
