const auth = require("../Authentication/main.js")

class AuthController {
	static async login(request,reply){
		let body = JSON.parse(request.body)
		let username = body.username
		let password = body.password
		if (!password || !username) {
			reply.send({
				name:"FieldError",
				message:"Missing Field !"
			})
		}else{
			try {
				let info = await auth.login(username,password)
				reply.send({
					info:info
				})
			} catch (err) {
				reply.send({...err})
			}
		}
	}
}

module.exports = AuthController