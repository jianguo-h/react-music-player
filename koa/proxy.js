const config = require('../config');
const connect = require('koa-connect');
const httpProxyMiddleware = require('http-proxy-middleware');
let proxyTable = config.proxyTable;
const isDev = process.env.NODE_ENV === config.dev.env;

// config koa proxy
module.exports = function(app, extraProxys = null) {
  if(extraProxys && extraProxys.constructor === Object) {
    proxyTable = {
      ...proxyTable,
      ...extraProxys
    }
  }

  Object.keys(proxyTable).forEach(ctx => {
    let options = proxyTable[ctx];
    if(typeof options === 'string') {
      options = { target: options }
    }

    app.use(connect(httpProxyMiddleware(ctx, {
      changeOrigin: true,
      target: isDev ? 'http://localhost:' + config.prod.port : options.target,
      pathRewrite: isDev ? null : options.pathRewrite
    })));
  });
}