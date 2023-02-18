module.exports = function(req, reply, done) {
	let authorization = req.headers.authorization
	if (!authorization) {
		done()
	} else {

		let token = authorization.split(" ")[1]
		if (!token) {
			done()
		} else {
			done()
		}
	}

}