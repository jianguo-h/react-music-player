const webpack = require('webpack');
const config = require('../config');
const webpackMerge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.base.config');

// config hot module
const hots = ['react-hot-loader/patch', 'eventsource-polyfill', 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000'];
Object.keys(webpackBaseConfig.entry).forEach(entryName => {
  webpackBaseConfig.entry[entryName] = hots.concat(webpackBaseConfig.entry[entryName]);
});

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
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(config.dev.env)
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
});

module.exports = webpackDevConfig;