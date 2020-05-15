import ora from 'ora';
import path from 'path';
import rimraf from 'rimraf';
import webpack from 'webpack';
import webpackProdConfig from './webpack.prod.config';

const spinner = ora('building for production...');
spinner.start();

const distPath = path.resolve(__dirname, '../dist');
rimraf(distPath, err => {
  if (err) throw err;

  webpack(webpackProdConfig, (error, stats) => {
    spinner.stop();
    if (error) throw error;

    process.stdout.write(
      stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false,
      }) + '\n\n'
    );

    console.log('Build complete \n');
    console.log(
      'Tip: built files are meant to be served over an HTTP server.\n' +
        "Opening index.html over file:// won \\'t work.\n'"
    );
  });
});
