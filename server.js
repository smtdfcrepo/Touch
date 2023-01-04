const http = require("http")
const path = require("path")
const event = require("events")
const express = require("express")
const router = require("./Server/Routers/main.js")
const socket = require("./Server/Socket/socket.js")
const app = express()
const httpServer = http.createServer(app)
const sys_event = new event.EventEmitter()
console.log("Touch : initialize server !")
app.use(express.json())
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Credentials', true)
  res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS')
  res.header('Access-Control-Allow-Headers', '*')
  next()
})

app.use("/static", express.static(path.join(__dirname, "Server/Public")))
app.post("/test",(req,res)=>{
  res.send(req.body)
})
router.initRouters(app,{ 
  "/rest":{
    sys_event:sys_event
  }
})
socket.initSocket(httpServer,sys_event)
httpServer.listen(3000, () => {
  console.log("Touch : Server started !")
})
