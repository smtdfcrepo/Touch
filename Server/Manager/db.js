const path = require("path")
const sqlite3 = require("sqlite3")

module.exports.loadDatabase = function(name){
  return new sqlite3.Database(path.join(__dirname,`../Data/Databases/${name}`))
}
