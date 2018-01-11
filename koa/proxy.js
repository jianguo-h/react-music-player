const config = require('../config');
const connect = require('koa-connect');
const httpProxyMiddleware = require('http-proxy-middleware');
const proxyTable = config.dev.proxyTable;

// config koa proxy
module.exports = app => {
  Object.keys(proxyTable).forEach(ctx => {
    let options = proxyTable[ctx];
    if(typeof options === 'string') {
      options = { target: options }
    }
    app.use(connect(httpProxyMiddleware(options.filter || ctx, options)));
  });
}