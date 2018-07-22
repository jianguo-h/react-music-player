const ora = require('ora');
const path = require("path");
const rimraf = require("rimraf");
const webpack = require("webpack");
const config = require('../config');
const webpackProdConfig = require("./webpack.prod.config");

// 当环境变量不存在时设置为打包环境
if(!process.env.NODE_ENV) {
  process.env.NODE_ENV = config.prod.env;
}

const spinner = ora('building for production...')
spinner.start();

const distPath = path.resolve(__dirname, "../dist");
rimraf(distPath, err => {
  if(err) throw err;

  webpack(webpackProdConfig, (error, stats) => {
    spinner.stop()
    if(error) throw error;

    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + "\n\n");

    console.log("Build complete \n");
    console.log(
      "Tip: built files are meant to be served over an HTTP server.\n"
      + "Opening index.html over file:// won \\'t work.\n'"
    );
  });
});
