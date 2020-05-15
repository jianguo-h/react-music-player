declare module 'koa-webpack-middleware' {
  import { Next } from 'koa';
  import WebpackDevMiddleware from 'webpack-dev-middleware';
  import WebpackHotMiddleware from 'webpack-hot-middleware';
  import webpack from 'webpack';

  export function devMiddleware(
    compiler: webpack.ICompiler,
    options?: WebpackDevMiddleware.Options
  ): WebpackDevMiddleware.WebpackDevMiddleware & Next;

  export function hotMiddleware(
    compiler: webpack.ICompiler,
    options?: WebpackHotMiddleware.MiddlewareOptions
  ): WebpackHotMiddleware.EventStream & Next;
}
