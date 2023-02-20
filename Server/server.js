const http = require('http');
const Koa = require('koa')


const app = new Koa()
const httpServer = http.createServer(app.callback())

app.use(async ctx => {
  ctx.body = 'Hello World';
});



httpServer.listen(3000)