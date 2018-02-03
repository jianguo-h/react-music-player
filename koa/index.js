const opn = require('opn');
const Koa = require('koa');
const path = require('path');
const send = require('koa-send');
const proxy = require('./proxy');
const static = require('./static');
const router = require('./router');
const config = require('../config');

const app = new Koa();
const serverPort = 8088;
const proxyTable = config.dev.proxyTable;
const url = 'http://localhost:' + serverPort;

// config koa router
router(app);

// config koa proxy
proxy(app);

// config static file
static(app, '../dist');

// config dist directory start
app.use(async ctx => {
  // 这样写也可以
  /*if(ctx.path === '/') {
    const fs = require('fs');
    ctx.response.type = 'html';
    ctx.response.body = fs.createReadStream(path.resolve(__dirname, '../dist/index.html'));
  }*/
  if(ctx.path === '/') {
    await send(ctx, ctx.path, {
      root: path.resolve(__dirname, '../dist')
    });
  }
});

// listen koa server port
const startServer = port => {
  app.listen(serverPort, () => {
    console.log('server start at ' + url);
    opn(url, {
      app: 'chrome'
    });
  });
}
startServer();