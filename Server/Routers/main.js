const Router = require("koa-router")



module.export = function(app){
	let router = Router(app)
	app.get("/info",async ctx=>{
		ctx.body ={
			version:"0.0.1",
			time:new Date().toUTCString()
		}
	})
	return router
}