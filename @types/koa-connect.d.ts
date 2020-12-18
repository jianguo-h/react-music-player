import { RequestHandler } from 'http-proxy-middleware';
import { Next, Middleware, Context } from 'koa';

type KoaConnect = (
  ctx: Context,
  next: Next
) => (ctx: Context, middleware: Middleware, next: Next) => Promise<any>;

export default function (middleware: RequestHandler | Middleware): KoaConnect;
