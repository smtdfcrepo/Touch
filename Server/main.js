const http = require("http")
const express = require("express")
const db = require("./Database/main.js")
const auth = require("./Authentication/auth.js")

const app = express()
const httpServer = new http.createServer(app)



// set database 
auth.Database(db.AccountDB)

httpServer.listen(2000,()=>{
  console.log("Server is running !");
})