const path = require("path")
const express = require("express")
const bodyParser = require("body-parser")
const auth = require("../Authentication/auth.js")
const token = require("../Authentication/token.js")
const record = require("../Manager/record.js")
const ui = require("../Manager/ui.js")
const router = express.Router()
router.data_ = {}


router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(express.json())
router.use(function(req, res, next) {
  if (!req.headers.authorization) {
    req.user = null
    next()
  } else {
    let ACCESS_TOKEN = req.headers.authorization.split(' ')[1];
    token.verifyAccessToken(ACCESS_TOKEN)
      .then((result) => {
        return auth.info(result.id)
      }).then(result => {
        req.user = result
        next()
      })
      .catch(err => {
        req.user = null
        next()
      })
  }
})

router.post("/auth/login", function(req, res) {
  let id = req.body.id
  let password = req.body.password
  let response = {}
  auth.login(id, password)
    .then(result => {
      try{
        delete result.password
      }catch{}
      response.account = result
      return token.generateAccessToken(response.account)
    }).then(result => {
      response.ACCESS_TOKEN = result
      return token.generateRefreshToken(response.account)
    }).then(result => {
      response.REFRESH_TOKEN = result
      res.json({
        status: "success",
        ...response
      })
    })
    .catch((err) => {
      res.json(err)
    })
})
router.post("/auth/logout",function(req,res){
  let REFRESH_TOKEN = req.body.REFRESH_TOKEN
  token.destroyRefreshToken(REFRESH_TOKEN)
    .then(result=>{
      res.json({
        status:"success"
      })
    })
    .catch((err)=>{
      res.json({
        status:"error",
        message:"Cannot logout !"
      })
    })
})
router.post("/auth/token", function(req, res) {
  let REFRESH_TOKEN = req.body.REFRESH_TOKEN
  token.verifyRefreshToken(REFRESH_TOKEN)
    .then(result => {
      try {
        delete result.exp
      } catch (e) {}
      return token.generateAccessToken(result)
    }).then(result => {
      res.json({
        status: "success",
        ACCESS_TOKEN: result,
        REFRESH_TOKEN: REFRESH_TOKEN
      })
    })
    .catch(err => {
      res.json({
        status:"error",
        message:"Cannot generate new token !"
        
      })
    })
})
router.post("/auth/info", function(req, res) {
  res.json({
    status: "success",
    info: req.user
  })
})
router.post("/record/all", function(req, res) {
  if (req.user == null) {
    res.json({
      status: "error",
      message:"Permission is blocked !"
    })
  } else {
    let owner = req.user.id
    record.all(owner)
      .then((result) => {
        res.json({
          status: "success",
          result: result
        })
      })
      .catch(err => { res.json(err) })
  }
})
router.post("/record/getAllField", function(req, res) {
  if (req.user == null) {
    res.json({
      status: "error",
      message:"Permission is blocked !"
    })
  } else {
    let owner = req.user.id
    let name = req.body.name
    record.getData(owner, name)
      .then((result) => {
        res.json({
          status: "success",
          result: result
        })
      })
      .catch(err => { res.json(err) })
  }

})
router.post("/record/delete", function (req,res){
 if (req.user == null) {
    res.json({
      status: "error",
      message:"Permission is blocked !"
    })
  } else {
    let owner = req.user.id
    let name = req.body.name
    record.delete(owner, name)
      .then((result) => {
        res.json({
          status: "success",
          result: result
        })
      })
      .catch(err => { res.json(err) })
  }
})
router.post("/record/getField", function(req, res) {
  if (req.user == null) {
    res.json({
      status: "error",
      message:"Permission is blocked !"
    })
  } else {
    let owner = req.user.id
    let name = req.body.name
    let field = req.body.field
    record.getField(owner, name, field)
      .then((result) => {
        res.json({
          status: "success",
          result: result
        })
      })
      .catch(err => { res.json(err) })
  }
})

router.post("/record/setField", function(req, res) {
  if (req.user == null) {
    res.json({
      status: "error",
      message:"Permission is blocked !"
    })
  } else {
    let owner = req.user.id
    let name = req.body.name
    let field = req.body.field
    let value = req.body.value
    let method = req.body.method || "overwrite"
    let time = Date.now()
    record.setField(owner, name, field, value, method,time)
      .then((result) => {
        router.data_.sys_event.emit("set_record", owner,name,field,value,time)
        res.json({
          status: "success",
          result: result
        })
      })
      .catch(err => { res.json(err) })
  }
})

router.post("/record/create", function(req, res) {
  if (req.user == null) {
    res.json({
      status: "error",
      message:"Permission is blocked !"
    })
  } else {
    let owner = req.user.id
    let name = req.body.name
    record.create(owner, name)
      .then((result) => {
        res.json({
          status: "success",
          result: result
        })
      })
      .catch(err => { res.json(err) })
  }
})

router.post("/ui/all", function(req, res) {
  if (req.user == null) {
    res.json({
      status: "error",
      message:"Permission is blocked !"
    })
  } else {
    let owner = req.user.id
    ui.all(owner)
      .then((result) => {
        res.json({
          status: "success",
          result: result
        })
      })
      .catch(err => { res.json(err) })
  }
})
router.post("/ui/getLayout", function(req, res) {
  if (req.user == null) {
    res.json({
      status: "error",
      message:"Permission is blocked !"
    })
  } else {
    let owner = req.user.id
    let name = req.body.name
    ui.getData(owner, name)
      .then((result) => {
        res.json({
          status: "success",
          result: result
        })
      })
      .catch(err => { res.json(err) })
  }

})
router.post("/ui/create", function(req, res) {
  if (req.user == null) {
    res.json({
      status: "error",
      message:"Permission is blocked !"
    })
  } else {
    let owner = req.user.id
    let name = req.body.name
    ui.create(owner, name, "anonymous")
      .then((result) => {
        res.json({
          status: "success",
          result: result
        })
      })
      .catch(err => { res.json(err) })
  }
})


module.exports.getRouter = function(data){
  router.data_.sys_event = data.sys_event
  return router
}
