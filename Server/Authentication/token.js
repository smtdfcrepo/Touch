const jwt = require("jsonwebtoken")
const TokenModel = require("../Models/token.model.js")


async function generateToken(payload = {}, secret) {
	return jwt.sign(payload, secret)
}

async function verifyToken(token, secret) {
	try {
		let payload = jwt.verify(token, secret)
		return payload
	} catch (err) {
		throw {
			name: "VerifyTokenError",
			message: "Cannot verify token !"
		}
	}
}

async function saveTokenIntoDB(token) {
	await TokenModel.create({
		tok: token
	})

}

async function findTokenInDB(token) {
	let result = await TokenModel.findOne({
		attributes: ["tok"],
		where: {
			tok: token
		}
	})
	if (result == null) {
		throw {
			name: "FindTokenError",
			message: "Incorrect token !"
		}
	} else {
		return true
	}
}

async function checkIntoDBandVerifyToken(token, secret) {
	let res = await findTokenInDB(token)
	if (res) {
		return await verifyToken(token, secret)
	} else {
		throw {
			name: "FindTokenError",
			message: "Incorrect token !"
		}
	}
}

async function generateAndSaveToken(payload, secret) {
	let token = await generateToken(payload, secret)
	await saveTokenIntoDB(token)
	return token
}

async function deleteToken(token) {
	let result = await TokenModel.findOne({
		attributes: ["tok"],
		where: {
			tok: token
		}
	})
	if (result == null) {
		throw {
			name: "FindTokenError",
			message: "Incorrect token !"
		}
	} else {
		await result.destroy()
		return true
	}
}

module.exports = {
	generateToken,
	verifyToken,
	findTokenInDB,
	saveTokenIntoDB,
	generateAndSaveToken,
	checkIntoDBandVerifyToken,
	deleteToken
}