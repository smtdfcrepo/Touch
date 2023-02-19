const jwt = require("jsonwebtoken")
const TokenModel = require("../Models/token.model.js")


async function generateToken(payload ={} , secret ){
	return jwt.sign(payload,secret)
}

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

async function saveTokenIntoDB(token) {
	await TokenModel.create({
		tok:token
	})
	
}

async function findTokenInDB(token){
	let result = await TokenModel.findOne({
		attributes: ["tok"],
		where: {
			tok:token
		}
	})
	if (result == null) {
		throw {
			name: "FindTokenError",
			message: "Incorrect token password !"
		}
	} else {
		return result
	}
}

async function generateAndSaveToken(payload,secret){
	let token = await generateToken(payload,secret)
	await saveTokenIntoDB(token)
	return token
}


module.exports ={
	generateToken,
	verifyToken,
	findTokenInDB,
	saveTokenIntoDB,
	generateAndSaveToken
}