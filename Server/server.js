const http = require('http');
const Koa = require('koa')
const router = require('./Routers/main.js')

const app = new Koa()
const httpServer = http.createServer(app.callback())

app.use(async (ctx, next) => {
	ctx.set('Access-Control-Allow-Origin', '*');
	ctx.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	ctx.set('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
	await next();
});

app.use(async ctx => {
  ctx.body = 'Hello World';
});

app.use(router.routes())



httpServer.listen(3000)