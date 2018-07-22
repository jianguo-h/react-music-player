const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    app: './src/main.js',
    vendors: ['react', 'react-dom', 'react-router-dom', 'redux', 'react-redux', 'axios', 'antd-mobile', 'lodash']
  },
  output: {
    filename: 'js/[name].[hash].js',
    chunkFilename: 'js/[name].[chunkhash].js',
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
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024 * 3,
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
    /*new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest'],
      allChunks: true,
      minChunks: Infinity
    })*/
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        },
        commons: {
          name: "commons",
          chunks: "initial",
          minChunks: 2
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          chunks: 'initial',
          name: 'vendors',
          priority: -10
        }
      }
    },
    runtimeChunk: 'single'
  }
}