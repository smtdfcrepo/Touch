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


module.exports = function(req, reply, done) {
	req.user = null
	let authorization = req.headers.authorization
	if (!authorization) {
		done()
	} else {
		
		let token = authorization.split(" ")[1]
		if (!token) {
			done()
		} else {
			verifyToken(token,process.env.ACCESS_TOKEN_SECRET)
				.then((payload)=>{
					req.user = payload
					done()
				})
				
				.catch((err)=>{
					reply.send({
						status:"error",
						error:{
							name:"TokenError",
							message:"Invalid Token !"
						}
					})
				})
		}
	}
}