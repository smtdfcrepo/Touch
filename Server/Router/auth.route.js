const AuthController = require("../Controllers/auth.controller.js")
async function routes (fastify, options) {
  fastify.get('/api', async (request, reply) => {
    return request.body
  })
}

module.exports = routes