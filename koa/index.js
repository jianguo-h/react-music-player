const Koa = require('koa');
const path = require('path');
const send = require('koa-send');
const proxy = require('./proxy');
const configStatic = require('./static');
const router = require('./router');
const config = require('../config');
const detectionPort = require('./detection-port');

const app = new Koa();
const serverPort = config.prod.port;

// config koa router
router(app);

// config koa proxy
proxy(app);

// config static file
configStatic(app, '../dist');

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

// 端口检测
detectionPort(app, serverPort);