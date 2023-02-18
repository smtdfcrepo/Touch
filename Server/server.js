const http = require('http');
const fastify = require('fastify')({
	logger: true
})


fastify.get('/', function(request, reply) {
	reply.send({ hello: 'world' })
})


fastify.listen({ port: 3000 ,host: '0.0.0.0' }, function(err, address) {
	if (err) {
		fastify.log.error(err)
		process.exit(1)
	} else {
		console.log("Server is running ...")
	}
})