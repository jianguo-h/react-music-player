const Koa = require('koa');
const open = require('open');
const webpack = require('webpack');
const config = require('../config');
const proxy = require('../koa/proxy');
const configStatic = require('../koa/static');
const detectionPort = require('../koa/detection-port');
const webpackDevConfig = require('./webpack.dev.config');
const { devMiddleware, hotMiddleware } = require('koa-webpack-middleware');

const app = new Koa();
const devPort = process.env.PORT || 8080;
const url = 'http://localhost:' + devPort;
const compiler = webpack(webpackDevConfig);

const devMiddlewareInstance = devMiddleware(compiler, {
  stats: {
    colors: true,
  },
});

const hotMiddlewareInstance = hotMiddleware(compiler);

// config koa proxy
const extraProxys = {
  '/api': {
    target: 'http://localhost:' + config.prod.port,
    changeOrigin: true,
  },
};
proxy(app, extraProxys);

// config static file
configStatic(app, '../src/static');

// use middleware
app.use(devMiddlewareInstance);
app.use(hotMiddlewareInstance);

devMiddlewareInstance.waitUntilValid(async () => {
  console.log('dev server start at ' + url);
  await open(url);
});

// 端口检测
detectionPort(app, devPort);
