/* eslint-disable @typescript-eslint/naming-convention */
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { Configuration } from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';

const isProduction = process.env.NODE_ENV === 'production';

const webpackBaseConfig: Configuration = {
  entry: {
    app: './src/main.tsx',
  },
  output: {
    chunkFilename: 'static/js/[name].[contenthash:8].chunk.js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              cacheCompression: false,
              sourceMaps: !isProduction,
            },
          },
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
            },
          },
        ],
      },
      {
        test: /.less$/,
        use: [
          isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader',
          'postcss-loader',
          'less-loader',
        ],
      },
      {
        test: /\.css$/,
        use: [
          isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader',
          'postcss-loader',
        ],
      },
      {
        exclude: [
          /\.(js|mjs|jsx|ts|tsx)$/,
          /\.html$/,
          /\.json$/,
          /\.(css|sass|scss|less)$/,
        ],
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024 * 8,
              name: 'static/media/[name].[hash:8].[ext]',
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    alias: {
      'react-dom': '@hot-loader/react-dom',
      '@src': path.resolve(__dirname, '../src'),
    },
  },
  plugins: [
    // 向模板 index.html 中自动注入css和js
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(__dirname, '../src/index.html'),
      filename: 'index.html',
      minify: isProduction
        ? {
            removeComments: true,
            collapseWhitespace: true,
            removeRedundantAttributes: true,
            useShortDoctype: true,
            removeEmptyAttributes: true,
            removeStyleLinkTypeAttributes: true,
            keepClosingSlash: true,
            minifyJS: true,
            minifyCSS: true,
            minifyURLs: true,
          }
        : undefined,
    }),
    new ForkTsCheckerWebpackPlugin({
      async: true,
      typescript: {
        configFile: path.resolve(__dirname, '../tsconfig.json'),
      },
    }),
  ],
  optimization: {
    runtimeChunk: {
      name: (entrypoint: { name: string }) => `runtime.${entrypoint.name}`,
    },
    splitChunks: {
      chunks: 'all',
      name: false,
    },
  },
};

export default webpackBaseConfig;
