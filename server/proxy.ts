/// <reference types='../@types/koa-connect' />

import { serverPort, proxyTable as configProxyTable } from '../config';
import connect from 'koa-connect';
import { createProxyMiddleware, Options } from 'http-proxy-middleware';
import Application from 'koa';

let proxyTable: {
  [path: string]: Options;
} = configProxyTable;
const isDev = process.env.NODE_ENV === 'development';
const defaultUrl = 'http://localhost:' + serverPort;

// config koa proxy
export default function (app: Application, extraProxys: object | null = null) {
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
          target: isDev ? defaultUrl : options.target,
          pathRewrite: isDev ? undefined : options.pathRewrite,
        })
      )
    );
  });
}
