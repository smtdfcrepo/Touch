const dotenv = require('dotenv')
const auth = require("../Authentication/main.js")
const token = require("../Authentication/token.js")

dotenv.config()
class AuthController {
	static async login(req, res) {
		let username = req.body.username
		let password = req.body.password
		if (!password || !username) {
			res.send({
				name: "FieldError",
				message: "Missing Field !"
			})
		} else {
			try {
				let info = await auth.login(username, password)
				let at = await token.generateToken(info, process.env.ACCESS_TOKEN_SECRET)
				let rt = await token.generateAndSaveToken(info, process.env.REFRESH_TOKEN_SECRET)
				res.send({
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
				res.send({
					status: "error",
					error: err
				})
			}
		}
	}

	static info(req, res) {
		res.send({
			status: "success",
			results: {
				info: req.user
			}
		})
	}

	static async token(req, res) {
		
		let at = req.body.accessToken
		let rt = req.body.refreshToken

		let payload = await token.checkIntoDBandVerifyToken(rt)
		try {
			res.send({
				status: "success",
				results: {
					tokens: {
						accessToken: at,
						refreshToken: rt
					}
				}
			})
		} catch (err) {
			res.send({
				status: "error",
				error: err
			});
		}
	}
	
	static async logout(req, res){
		
		let rt = req.body.refreshToken
		let payload = await token.deleteToken(rt)
		try {
			res.send({
				status: "success",
				results: {
					logged_out:true,
					time:new Date().toISOString()
				}
			})
		} catch (err) {
			res.send({
				status: "error",
				error: err
			});
		}
	}
}

module.exports = AuthController