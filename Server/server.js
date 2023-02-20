const http = require('http');
const Koa = require('koa')
const bodyParser = require('koa-bodyparser');
const router = require('./Routers/main.js')

const app = new Koa()
const httpServer = http.createServer(app.callback())

app.use(async (ctx, next) => {
	ctx.set('Access-Control-Allow-Origin', '*');
	ctx.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	ctx.set('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
	await next();
});

app.use(bodyParser());
app.use(router(app))

httpServer.listen(3000)