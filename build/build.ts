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
    if (err || stats?.hasErrors()) {
      process.stdout.write(
        stats?.toString({
          errors: true,
          errorDetails: true,
          warnings: true,
          colors: true,
          all: false,
        }) ?? ''
      );
      console.log('Build failed');
      throw err;
    }

    process.stdout.write(
      stats?.toString({
        all: false,
        colors: true,
        assets: true,
        version: true,
        excludeAssets: /media/,
      }) + '\n\n'
    );

    console.log('Build successfully \n');
  });
});
