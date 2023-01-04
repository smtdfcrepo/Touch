const { Server } = require("socket.io")
const token = require("../Authentication/token.js")
const recordManager = require("../Manager/record.js")
module.exports.initSocket = function(httpServer, sys_event) {
  console.log("Touch : initialize socket protocol... ")
  const socketServer = new Server(httpServer, {
    cors: {
      origin: "*"
    }
  })

  socketServer.on("connection", function(socket) {
    socket.auth = null
    socket.emit("require_auth")
    socket.record_ = {}
    socket.on("auth", function(data) {
      let ACCESS_TOKEN = data.ACCESS_TOKEN
      token.verifyAccessToken(ACCESS_TOKEN)
        .then((result) => {
          socket.auth = result
          socket.emit("auth_success", { result })
        })
        .catch((err) => {
          socket.emit("auth_err", {
            status: "error",
            code: "auth_err",
            message: "Cannot authentication ",
            err: err
          })
        })
    })

    socket.on("listener", function(data) {
      if (socket.auth != null) {
        let name = data.name || "default"
        socket.record_[name] = 1
        socket.emit("listening", {
          record: name
        })
      } else {
        socket.emit("auth_err", {
          status: "error",
          code: "permission_err",
          message: "Access has been blocked! ",
        })
      }
    })
    socket.on("set_field",function(data){
      if (socket.auth != null) {
        let name = data.name
        let field = data.field
        let value = data.value
        let method = data.method
        let time = Date.now()
        recordManager.setField(socket.auth.id,name,field,value,time)
          .then((result)=>{
            sys_event.emit("set_record",socket.auth.id,name,field,value,time)
          })
          .catch(err=>{
            socket.emit("set_field_err",{
              status:"error",
              err:err
            })
          })
      } else {
        
      }
    })
    sys_event.on("set_record", function(owner ,name, field, val,time_update) {
      if (socket.auth == null) {
        return
      }

      if (!socket.record_[name] || owner != socket.auth.id) {
        return
      } else {
        socket.emit("new_val", {
          record: name,
          field: field,
          val: val,
          time_update:time_update
        })
      }
    })
  })

}
