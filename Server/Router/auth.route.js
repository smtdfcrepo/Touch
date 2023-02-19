const AuthController = require("../Controllers/auth.controller.js")
async function routes (fastify, options) {
  fastify.post('/auth/login',AuthController.login)
  fastify.post('/auth/info',AuthController.info)
  fastify.post('/auth/token',AuthController.token)
  fastify.post('/auth/logout',AuthController.logout)
}

module.exports = routes