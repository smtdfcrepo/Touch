const jwt = require("jsonwebtoken")
const dotenv = require('dotenv')

dotenv.config()

async function verifyToken(token, secret){
	try {
		let payload = jwt.verify(token,secret)
		return payload
	} catch (err) {
		throw{
			name:"VerifyTokenError",
			message:"Cannot verify token !"
		}
	}
}


module.exports = async function(req, reply) {
	req.user = null
	let authorization = req.headers.authorization
	if (!authorization) {
		return 
	} else {
		
		let token = authorization.split(" ")[1]
		if (!token) {
		return
		} else {
			try {
				let payload = jwt.verify(token, secret)
				return payload
			} catch (err) {
				reply.send({
					name: "TokenError",
					message: "Incorrect token !"
				})
			}
		}
	}
}