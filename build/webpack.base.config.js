const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    app: './src/main.js',
    vendor: ['react', 'react-dom', 'react-router-dom', 'redux', 'react-redux', 'axios', 'antd-mobile', 'lodash']
  },
  output: {
    filename: 'js/[name].bundle.[hash].js',
    path: path.resolve(__dirname, '../dist')
  },
  module: {
    rules: [
      /* {
        enforce: "pre",
        test: /\.(js|jsx)$/,
        exclude: [
          path.resolve(__dirname, "../node_modules"),
          path.resolve(__dirname, "../dist")
        ],
        use: ["eslint-loader"]
      }, */
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024 * 8,
              name: 'images/[name].[hash].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024 * 8,
              name: 'images/[name].[hash].[ext]'
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: [".js", ".jsx", ".json"]
  },
  plugins: [
    // 向模板 index.html 中自动注入css和js
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './index.html',
      // chunksSortMode: 'dependency',
      inject: true
    }),
    // 提取公共的js
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest'],
      allChunks: true,
      minChunks: Infinity
    })
  ]
}