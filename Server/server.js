const http = require('http');
const Koa = require('koa')
const bodyParser = require('koa-bodyparser');
const router = require('./Routers/main.js')
const authMiddleware = require("./Middlewares/auth.js")
const app = new Koa()
const httpServer = http.createServer(app.callback())

app.use(async (ctx, next) => {
	ctx.set('Access-Control-Allow-Origin', '*');
	ctx.set('Access-Control-Allow-Headers', 'Origin , Accept, Content-Type, Authorization, X-Requested-With') 
  ctx.set('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
	await next();
});

app.use(bodyParser());
app.use(authMiddleware)
app.use(router)


httpServer.listen(3000)