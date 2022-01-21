import webpack from 'webpack';
import webpackProdConfig from './webpack.prod.config';

console.log('building for production...\n');

webpack(webpackProdConfig, (err, stats) => {
  if (err || stats?.hasErrors()) {
    process.stdout.write(
      stats?.toString({
        errors: true,
        errorDetails: true,
        errorStack: true,
        warnings: true,
        colors: true,
        assets: false,
        chunks: false,
        modules: false,
      }) ?? ''
    );
    console.log('Build failed');
    throw err;
  }

  process.stdout.write(
    stats?.toString({
      builtAt: false,
      timings: false,
      colors: true,
      assetsSort: 'size',
      chunksSort: 'size',
      version: true,
      excludeAssets: /media/,
    }) + '\n\n'
  );

  console.log('Build successfully \n');
});
