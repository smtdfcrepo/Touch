const express = require("express")
const AuthController = require("../Controllers/auth.controller.js")
const router = express.Router()

router.post("/login",AuthController.login)
router.post("/logout",AuthController.logout)
router.post("/token",AuthController.token)
router.post("/info",AuthController.info)

module.exports = router