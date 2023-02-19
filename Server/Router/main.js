const LIST_ROUTE = {
	"/auth":require("./auth.route.js")
}

module.exports = function (app){
	Object.keys(LIST_ROUTE).forEach(route=>{
		app.use(route,LIST_ROUTE[route])
	})
}