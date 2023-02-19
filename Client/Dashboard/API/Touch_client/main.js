let server = null
const TOKEN_ERR =[
	"VerifyTokenError",
	"FindTokenError",
	"TokenError",
	
]

function isTokenError(err){
	if (TOKEN_ERR.includes(err.name)) {
		return true
	}
	return false
}

class Cookie {
	static setCookie(name, value, days) {
		var expires = "";
		if (days) {
			var date = new Date();
			date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
			expires = "; expires=" + date.toUTCString();
		}
		document.cookie = name + "=" + (value || "") + expires + "; path=/";
	}
	static getCookie(name) {
		var nameEQ = name + "=";
		var ca = document.cookie.split(';');
		for (var i = 0; i < ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0) == ' ') c = c.substring(1, c.length);
			if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
		}
		return null;
	}
	static eraseCookie(name) {
		document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
	}
}


class TouchAuthentication{
	static async login(username, password){
		let response = await fetch(`${server}/auth/login`,{
			method:"post",
			body:JSON.stringify({
				username:username,
				password:password
			})
		})
		let json = await response.json()
		if (json.status == "success") {
			let at = json.results.tokens.accessToken
			let rt = json.results.tokens.refreshToken
			Cookie.setCookie("at",btoa(at))
			Cookie.setCookie("rt",btoa(rt))
			return json.results
		}else{
			if (isTokenError(json)){
				await this.login(username,password)
			}else{
				throw json
			}
		}
	}
}