const config = require('../config');
const webpackMerge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.base.config');

const webpackDevConfig = webpackMerge(webpackBaseConfig, {
  devtool: 'cheap-module-eval-source-map',
  output: {
    publicPath: config.dev.publicPath
  },
  module: {
    rules: [
      {
        test: /.less$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader']
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader']
      },
    ]
  }
});

module.exports = webpackDevConfig;