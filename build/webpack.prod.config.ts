import path from 'path';
import webpack, { Configuration } from 'webpack';
import webpackMerge from 'webpack-merge';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import webpackBaseConfig from './webpack.base.config';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import AddAssetHtmlPlugin from 'add-asset-html-webpack-plugin';
import OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import { libsPath } from '../config';

const webpackProdConfig: Configuration = webpackMerge(webpackBaseConfig, {
  devtool: false,
  mode: 'production',
  output: {
    filename: 'static/js/[name].[contenthash:8].js',
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'less-loader',
        ],
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
      },
    ],
  },
  plugins: [
    // dllPlugin
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require(libsPath + '/libs-manifest.json'),
    }),
    // 将dllplugin生成的js自动注入到html中
    new AddAssetHtmlPlugin({
      publicPath: '/static/js/',
      filepath: path.resolve(libsPath, '*.js'),
      outputPath: 'static/js',
    }),
    // 提取less和css
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].[contenthash: 8].css',
      chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
    }),
    // 压缩css
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessorOptions: {
        discardComments: {
          removeAll: true,
        },
      },
      canPrint: true,
    }),
    // 压缩混淆js
    new UglifyJsPlugin({
      uglifyOptions: {
        warnings: false, // 删除警告
        compress: {
          drop_console: true, // 去除日志
          drop_debugger: true, // 去除debugger
        },
        output: {
          comments: false, // 去除注释
        },
      },
      cache: true, // 使用缓存
      parallel: true, // 开启多线程压缩
    }),
  ],
});

export default webpackProdConfig;
