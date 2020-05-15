import songData from '../src/static/data/song.json';
import Router from 'koa-router';
import Application from 'koa';

const router = new Router();

const data = JSON.parse(JSON.stringify(songData));

// config koa router
export default function (app: Application) {
  const paths = ['new', 'recommend', 'local'];
  for (const path of paths) {
    router.post('/api/' + path, async ctx => {
      ctx.response.status = 200;
      ctx.response.body = {
        // path: route,
        data: data[path],
      };
    });
  }
  app.use(router.routes()).use(router.allowedMethods());
}
