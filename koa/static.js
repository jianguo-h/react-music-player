const path = require('path');
const static = require('koa-static');

module.exports = app => {
  const staticPath = path.resolve(__dirname, '../src/static/img');
  app.use(static(staticPath));
}