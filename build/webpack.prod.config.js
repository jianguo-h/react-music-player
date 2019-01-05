const path = require('path');
const webpack = require('webpack');
const config = require('../config');
const webpackMerge = require('webpack-merge');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const webpackBaseConfig = require('./webpack.base.config');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const webpackProdConfig = webpackMerge(webpackBaseConfig, {
  devtool: false,
  mode: config.prod.env,
  output: {
    publicPath: config.prod.publicPath
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'less-loader']
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
      },
    ]
  },
  plugins: [
    // dllPlugin
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require('../dll/libs-manifest.json')
    }),
    // 将dllplugin生成的js自动注入到html中
    new AddAssetHtmlPlugin({
      publicPath: '/static/js/',
      filepath: path.resolve(__dirname, '../dll/*.js'),
      outputPath: 'static/js'
    }),
    // 提取less和css
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].[hash].css',
      chunkFilename: 'static/css/[name].[chunkhash:8].css'
    }),
    // 压缩css
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessorOptions: {
        discardComments: {
          removeAll: true
        }
      },
      canPrint: true
    }),
    // 压缩混淆js
    new UglifyJsPlugin({
      uglifyOptions: {
        warnings: false,          // 删除警告
        compress: {
          drop_console: true,     // 去除日志
          drop_debugger: true     // 去除debugger
        },
        output: {
          comments: false         // 去除注释
        }
      },
      cache: true,                // 使用缓存
      parallel: true              // 开启多线程压缩
    })
  ]
});

module.exports = webpackProdConfig;