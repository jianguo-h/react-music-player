const Koa = require('koa');
const opn = require('opn');
const webpack = require('webpack');
const config = require('../config');
const proxy = require('../koa/proxy');
const static = require('../koa/static');
const router = require('../koa/router');
const webpackDevConfig = require('./webpack.dev.config');
const { devMiddleware, hotMiddleware } = require('koa-webpack-middleware');

const app = new Koa();
const port = config.dev.port;
const url = 'http://localhost:' + port;
const compiler = webpack(webpackDevConfig);

// 当环境变量不存在时设置为开发环境
if(!process.env.NODE_ENV) {
  process.env.NODE_ENV = config.dev.env;
}

const devMiddlewareInstance = devMiddleware(compiler, {
  stats: {
    colors: true
  }
});

const hotMiddlewareInstance = hotMiddleware(compiler);

// config koa router
router(app);

// config koa proxy
proxy(app);

// config static file
static(app, '../src/static');

// use middleware
app.use(devMiddlewareInstance);
app.use(hotMiddlewareInstance);

let _resolve;
const readyPromise = new Promise((resolve, reject) => {
  _resolve = resolve;
});

devMiddlewareInstance.waitUntilValid(() => {
  console.log('dev server start at ' + url);
  if(process.env.NODE_ENV === config.dev.env) {
    opn(url);
  }
  _resolve();
});

app.listen(port);