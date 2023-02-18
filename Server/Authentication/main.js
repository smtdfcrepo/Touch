const AccountModel = require("../Models/account.model.js")

async function login(username, password) {
	let result = AccountModel.findOnce({
		where: {
			username: username,
			password: password
		}
	})
	if (result == null) {
		throw {
			name:"AuthenticationError",
			message:"Incorrect username or password !"
		}
	}else{
		result.password = "****"
		return result
	}
}

module.exports ={
	login
}