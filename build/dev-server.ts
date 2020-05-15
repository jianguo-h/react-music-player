/// <reference types='../@types/koa-webpack-middleware' />

import Koa from 'koa';
import open from 'open';
import webpack from 'webpack';
import config from '../config';
import proxy from '../koa/proxy';
import configStatic from '../koa/static';
import detectionPort from '../koa/detection-port';
import webpackDevConfig from './webpack.dev.config';
import { devMiddleware, hotMiddleware } from 'koa-webpack-middleware';

const app = new Koa();
const devPort = process.env.PORT ?? 8080;
const url = 'http://localhost:' + devPort;
const compiler = webpack(webpackDevConfig);

const devMiddlewareInstance = devMiddleware(compiler, {
  publicPath: webpackDevConfig.output?.publicPath ?? '/',
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
