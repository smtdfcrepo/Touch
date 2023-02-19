const jwt = require("jsonwebtoken")
const dotenv = require('dotenv')

dotenv.config()


module.exports = async function(req, res,next) {
	req.user = null
	let authorization = req.headers.authorization
	if (!authorization) {
		next()
	} else {
		
		let token = authorization.split(" ")[1]
		if (!token) {
			next()
		} else {
			try {
				let payload = await jwt.verify(token, secret)
				req.user = payload
				next()
			} catch (err) {
				reply.send({
					name: "TokenError",
					message: "Incorrect token !"
				})
			}
		}
	}
}