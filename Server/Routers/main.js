const Router = require("koa-router")
const router = new Router()

router.get("/info",async ctx=>{
		ctx.body ={
			version:"0.0.1",
			time:new Date().toUTCString()
		}
	})

module.exports = router.routes() 