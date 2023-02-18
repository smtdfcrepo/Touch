async function routes (fastify, options) {
  fastify.get('/api', async (request, reply) => {
    return { hello: 'world' }
  })
}

module.exports = routes