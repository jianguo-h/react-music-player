const webpack = require('webpack');
const config = require('../config');
const webpackMerge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.base.config');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
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
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'postcss-loader', 'less-loader']
        })
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'postcss-loader']
        })
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(config.prod.env)
    }),
    // 提取less和css
    new ExtractTextPlugin({
      filename: 'css/app.bundle.[hash].css',
      allChunks: true
    }),
    // 压缩css
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorOptions: {
        discardComments: {
          removeAll: true
        }
      },
      canPrint: true
    }),
    // 压缩混淆js(https://webpack.js.org/plugins/uglifyjs-webpack-plugin/#src/components/Sidebar/Sidebar.jsx)
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_console: true,   // 去除日志
        drop_debugger: true   // 去除debugger
      },
      output: {
        comments: false
      },
      except: ['$super', '$', 'exports', 'require'],
      sourceMap: true
    })
    // 拷贝静态文件
    /*new CopyWebpackPlugin([
      {
        from: path.join(__dirname, '../static'),
        to: 'static'
      }
    ])*/
  ]
});

module.exports = webpackProdConfig;