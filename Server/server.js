const http = require('http');
const fastify = require('fastify')({
	logger: true
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