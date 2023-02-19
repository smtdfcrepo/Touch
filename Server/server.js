const http = require('http');
const express = require ("express")
const bodyParser = require ("body-parser")
const router = require("./Router/main.js")


const app = express()
const httpServer = http.createServer(app)

app.use(function(req,res,next){
	res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Credentials', true)
  res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS')
  res.header('Access-Control-Allow-Headers', '*')
  next()
})

app.use(express.json())
app.use(bodyParser.json())
router(app)

httpServer.listen(3000,function(){
	console.log("Server is running .....")
})

