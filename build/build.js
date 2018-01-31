const fs = require("fs");
const ora = require('ora');
const path = require("path");
const rimraf = require("rimraf");
const webpack = require("webpack");
const webpackProdConfig = require("./webpack.prod.config");

const spinner = ora('building for production...')
spinner.start();

const distPath = path.resolve(__dirname, "../dist");
rimraf(distPath, err => {
  if(err) throw err;

  webpack(webpackProdConfig, (err, stats) => {
    spinner.stop()
    if(err) throw err;
    
    process.stdout.write(stats.toString({
    	colors: true,
    	modules: false,
    	children: false,
    	chunks: false,
    	chunkModules: false
    }) + "\n\n");

    console.log("Build complete \n");
    console.log(
      "Tip: built files are meant to be served over an HTTP server.\n" +
      "Opening index.html over file:// won\'t work.\n'"
    );
  });
});
