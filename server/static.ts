import Application from 'koa';
import path from 'path';
import koaStatic from 'koa-static';

export default function (app: Application, filePath: string) {
  const staticPath = path.resolve(__dirname, filePath);
  app.use(koaStatic(staticPath));
}
