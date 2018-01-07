const path = require('path');

module.exports = {
  dev: {
    port: 8080,
    env: "development",
    publicPath: "/",
  },
  prod: {
    env: "production",
    publicPath: "./"
  }
}