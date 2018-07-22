const path = require('path');
const koaStatic = require('koa-static');

module.exports = (app, filePath) => {
  const staticPath = path.resolve(__dirname, filePath);
  app.use(koaStatic(staticPath));
}