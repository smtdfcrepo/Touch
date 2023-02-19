const AccountModel = require("../Models/account.model.js")

async function login(username, password) {
	let result = await AccountModel.findOne({
		attributes:["username","rule"],
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
		return result.dataValues
	}
}

module.exports ={
	login
}