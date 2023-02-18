const http = require('http');
const fastify = require('fastify')({
	logger: true
})

fastify.addHook('onRequest', require("./Middlewares/auth.middleware.js"))

fastify.addHook('preHandler', (req, reply, done) => {
  reply.header("Access-Control-Allow-Origin", "*")
  reply.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept" );
  done()
})


fastify.register(require("./Router/auth.route.js"))
fastify.get('/info', function(request, reply) {
	reply.send({
		version: '0.0.1'
	})
})

fastify.listen({ port: 3000, host: '0.0.0.0' }, function(err, address) {
	if (err) {
		fastify.log.error(err)
		process.exit(1)
	} else {
		console.log("Server is running ...")
	}
})