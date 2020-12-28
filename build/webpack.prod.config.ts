import webpack, { Configuration } from 'webpack';
import webpackMerge from 'webpack-merge';
import webpackBaseConfig from './webpack.base.config';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';

const webpackProdConfig: Configuration = webpackMerge(webpackBaseConfig, {
  devtool: false,
  mode: 'production',
  output: {
    filename: 'static/js/[name].[contenthash:8].js',
  },
  plugins: [
    new webpack.ProgressPlugin({}),
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].[contenthash: 8].css',
      chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin({
        cache: true,
        parallel: true,
        sourceMap: false,
        minimizerOptions: {
          preset: [
            'default',
            {
              discardComments: { removeAll: true },
              minifyFontValues: { removeQuotes: false },
            },
          ],
        },
      }),
      new TerserPlugin({
        parallel: true,
        sourceMap: false,
        extractComments: false,
        terserOptions: {
          keep_fnames: false,
          keep_classnames: false,
          compress: {
            warnings: false,
            drop_console: true,
            drop_debugger: true,
            comparisons: false,
          },
          output: {
            ascii_only: true,
            comments: false,
          },
        },
      }),
    ],
  },
});

export default webpackProdConfig;
