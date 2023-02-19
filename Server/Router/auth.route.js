const AuthController = require("../Controllers/auth.controller.js")
async function routes (fastify, options) {
  fastify.post('/auth/login',AuthController.login)
}

module.exports = routes