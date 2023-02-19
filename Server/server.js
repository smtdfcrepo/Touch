const http = require('http');
const express = require ("express")
const bodyParser = require ("body-parser")
const router = require("./Router/main.js")


const app = express()
const httpServer = http.createServer(app)
app.use(express.json())
app.use(bodyParser.json())
router(app)
httpServer.listen(3000,function(){
	console.log("Server is running .....")
})

