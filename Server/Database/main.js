const path = require("path")
const sqlite3 = require("sqlite3")

let AccountDB  = sqlite3.Database(path.join(__dirname,"../../User/account.db"))

module.exports ={
  AccountDB
}