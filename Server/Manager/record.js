const db = require("./db.js")

module.exports.all = function(owner) {
  return new Promise((resolve, reject) => {
    let ListRecordDB = db.loadDatabase(`Records/list.db`)
    ListRecordDB.all(`SELECT * FROM list_record WHERE owner ='${owner}'`, function(err, row) {
      if (err) {
        reject({
          status: "error",
          message:"Cannot get all records !"
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
    let ListRecordDB = db.loadDatabase(`Records/records_${owner}_${name}.db`)
    ListRecordDB.all(`SELECT * FROM  record_${name}_${owner}`, function(err, row) {
      if (err) {
        reject({
          status: "error",
          message:"Cannot get data into records !"
        })
      } else {
        resolve({
          payload: row
        })
      }
    })
  })
}

module.exports.getField = function(owner, name, field) {
  return new Promise((resolve, reject) => {
    let ListRecordDB = db.loadDatabase(`Records/records_${owner}_${name}.db`)
    ListRecordDB.all(`SELECT * FROM  record_${name}_${owner} WHERE fields ='${field}' `, function(err, row) {
      if (err) {
        reject({
          status: "error",
          message:"Cannot get field of records !"
        })
      } else {
        resolve({
          payload: row
        })
      }
    })
  })
}

module.exports.setField = function(owner, name, field, val, time,method = "overwrite") {
  return new Promise((resolve, reject) => {
    let ListRecordDB = db.loadDatabase(`Records/records_${owner}_${name}.db`)
    if (method == "overwrite") {
      ListRecordDB.run(`DELETE FROM record_${name}_${owner} WHERE fields='${field}' `, function(err) {
        if (err) {

        } else {
          ListRecordDB.run(`INSERT INTO record_${name}_${owner} ('fields','value','time_update') VALUES ('${field}' ,'${val}' ,'${time}') `, function(err) {
            if (err) {
              ListRecordDB.close()
              reject({
                status: "error",
                message:"Cannot set field of records !"
              })
            } else {
              ListRecordDB.close()
              resolve({})
            }
          })
        }
      })
    } else {
      ListRecordDB.run(`INSERT INTO record_${name}_${owner} ('fields','value','time_update') VALUES ('${field}' ,'${val}' ,'${Date.now()}') `, function(err) {
        if (err) {
          ListRecordDB.close()
          reject({
            status: "error",
            message:"Cannot set field of records !"
          })
        } else {
          ListRecordDB.close()
          resolve({})
        }
      })
    }
  })
}

module.exports.delField = function(owner, name, field) {
  return new Promise((resolve, reject) => {
    let ListRecordDB = db.loadDatabase(`Records/records_${owner}_${name}.db`)
    ListRecordDB.run(`DELETE FROM record_${name}_${owner} WHERE fields ='${field}'  `, function(err) {
      if (err) {
        ListRecordDB.close()
        reject({
          status: "error",
          message:"Cannot delete  field of records !"
        })
      } else {
        ListRecordDB.close()
        resolve({})
      }
    })
  })
}

module.exports.create = function(owner, name) {
  return new Promise((resolve, reject) => {
    let ListRecordDB = db.loadDatabase("Records/list.db")
    let RecordDB = db.loadDatabase(`Records/records_${owner}_${name}.db`)
    RecordDB.run(`CREATE TABLE record_${name}_${owner}('fields' TEXT,'value' TEXT,'time_update' TEXT)`, function(err) {
      if (err) {
        ListRecordDB.close()
        RecordDB.close()
        reject({
          status: "error",
          message:"Cannot create records !"
        })
      } else {
        ListRecordDB.run(`INSERT INTO list_record('name','owner') VALUES ('${name}','${owner}')`, function(err) {
          if (err) {
            ListRecordDB.close()
            RecordDB.close()
            reject({
              status: "error",
              message:"Cannot create records !"
            })
          } else {
            RecordDB.close()
            ListRecordDB.close()
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

module.exports.delete = function(owner, name) {
  return new Promise((resolve, reject) => {
    let ListRecordDB = db.loadDatabase("Records/list.db")
    let RecordDB = db.loadDatabase(`Records/records_${owner}_${name}.db`)
    ListRecordDB.run(`DELETE FROM list_record WHERE owner='${owner}' AND name='${name}'`, function(err) {
      if (err) {
        ListRecordDB.close()
        RecordDB.close()
        reject({
          status: "error",
          message:"Cannot find records !"
        })
      } else {
        ListRecordDB.close()
        RecordDB.run(`DROP TABLE record_${name}_${owner} `, function(err) {
          if (err) {
            RecordDB.close()
            reject({
              status: "error",
              message:"Cannot delete records !"
            })
          }else{
            RecordDB.close()
            resolve({
              status:"success"
            })
          }
        })
      }
    })
  })
}
