const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")

dotenv.config()

module.exports = async function(ctx, next) {
	ctx.request.user = null
	let authorization = ctx.request.headers.authorization
	if (!authorization) {
		next()
	} else {
		let token = authorization.split()[1]
		if (!token) {
			next()
		}
		try {
			let payload = await jwt.verify(token,proccess.env.ACCESS_TOKEN_SECRET)
			ctx.request.user = payload
			next()
		} catch (err) {
			ctx.body ={
				status:"error",
				error:{
					name:"AuthenticationError",
					message:"Invalid Token !"
				}
			}
		}
	}
}