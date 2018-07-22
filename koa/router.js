const songData = require('../src/static/data/song.json');
const Router = require('koa-router');
const router = new Router();

// config koa router
module.exports = app => {
  const paths = ['new', 'recommend', 'local'];
  for(const path of paths) {
    router.post('/api/' + path, async (ctx, next) => {
      ctx.response.status = 200;
      ctx.response.body = {
        // path: route,
        data: songData[path]
      };
    });
  }
  app.use(router.routes()).use(router.allowedMethods());
}