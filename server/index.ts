import Koa from 'koa';
import path from 'path';
import send from 'koa-send';
import proxy from './proxy';
import configStatic from './static';
import router from './router';
import detectionPort from './detection-port';

const app = new Koa();
const serverPort = process.env.SERVER_PORT ?? 8088;

// config koa router
router(app);

// config koa proxy
proxy(app);

// config static file
configStatic(app, '../dist');

// config dist directory start
app.use(async ctx => {
  if (ctx.path === '/') {
    await send(ctx, ctx.path, {
      root: path.resolve(__dirname, '../dist'),
    });
  }
});

// 端口检测
detectionPort(app, serverPort);
