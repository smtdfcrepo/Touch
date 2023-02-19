const dotenv = require('dotenv')
const auth = require("../Authentication/main.js")
const token = require("../Authentication/token.js")

dotenv.config()
class AuthController {
	static async login(request, reply) {
		let body = JSON.parse(request.body)
		let username = body.username
		let password = body.password
		if (!password || !username) {
			reply.send({
				name: "FieldError",
				message: "Missing Field !"
			})
		} else {
			try {
				let info = await auth.login(username, password)
				let at = await token.generateToken(info, process.env.ACCESS_TOKEN_SECRET)
				let rt = await token.generateAndSaveToken(info, process.env.REFRESH_TOKEN_SECRET)
				reply.send({
					status: "success",
					results: {
						info: info,
						tokens: {
							accessToken: at,
							refreshToken: rt
						}
					}
				})
			} catch (err) {
				reply.send({
					status: "error",
					error: err
				})
			}
		}
	}

	static info(request, reply) {
		reply.send({
			status: "success",
			results: {
				info: request.user
			}
		})
	}

	static async token(request, reply) {
		let body = JSON.parse(request.body)
		let at = body.accessToken
		let rt = body.refreshToken

		let payload = await token.checkIntoDBandVerifyToken(rt)
		try {
			reply.send({
				status: "success",
				results: {
					tokens: {
						accessToken: at,
						refreshToken: rt
					}
				}
			})
		} catch (err) {
			reply.send({
				status: "error",
				error: err
			});
		}
	}
	
	static async logout(request, reply){
		let body = JSON.parse(request.body)
		let rt = body.refreshToken
		let payload = await token.deleteToken(rt)
		try {
			reply.send({
				status: "success",
				results: {
					logged_out:true,
					time:new Date().toISOString()
				}
			})
		} catch (err) {
			reply.send({
				status: "error",
				error: err
			});
		}
	}
}

module.exports = AuthController