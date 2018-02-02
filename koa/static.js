const path = require('path');
const static = require('koa-static');

module.exports = (app, imgPath) => {
  const staticPath = path.resolve(__dirname, imgPath);
  app.use(static(staticPath));
}