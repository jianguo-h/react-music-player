/// <reference types='../@types/koa-connect' />

import config from '../config';
import connect from 'koa-connect';
import { createProxyMiddleware, Options } from 'http-proxy-middleware';
import Application from 'koa';

let proxyTable: {
  [path: string]: Options;
} = config.proxyTable;
const isDev = process.env.NODE_ENV === 'development';

// config koa proxy
export default function (
  app: Application,
  extraProxys: object | null = null,
  url: string = ''
) {
  if (extraProxys && extraProxys.constructor === Object) {
    proxyTable = {
      ...proxyTable,
      ...extraProxys,
    };
  }

  Object.keys(proxyTable).forEach(ctx => {
    let options = proxyTable[ctx];
    if (typeof options === 'string') {
      options = { target: options };
    }

    app.use(
      connect(
        createProxyMiddleware(ctx, {
          changeOrigin: true,
          target: isDev ? url : options.target,
          pathRewrite: isDev ? undefined : options.pathRewrite,
        })
      )
    );
  });
}