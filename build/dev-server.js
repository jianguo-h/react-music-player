const Koa = require('koa');
const opn = require('opn');
const webpack = require('webpack');
const config = require('../config');
const proxy = require('../koa/proxy');
const configStatic = require('../koa/static');
const detectionPort = require('../koa/detection-port');
const webpackDevConfig = require('./webpack.dev.config');
const { devMiddleware, hotMiddleware } = require('koa-webpack-middleware');

const app = new Koa();
const devPort = config.dev.port;
const url = 'http://localhost:' + devPort;
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

// config koa proxy
const extraProxys = {
  '/api': {
    target: 'http://localhost:' + config.prod.port,
    changeOrigin: true
  }
};
proxy(app, extraProxys);

// config static file
configStatic(app, '../src/static');

// use middleware
app.use(devMiddlewareInstance);
app.use(hotMiddlewareInstance);

let _resolve;
new Promise((resolve, reject) => {
  _resolve = resolve;
});

devMiddlewareInstance.waitUntilValid(() => {
  console.log('dev server start at ' + url);
  if(process.env.NODE_ENV === config.dev.env) {
    opn(url);
  }
  _resolve();
});

// 端口检测
detectionPort(app, devPort);