import webpack, { Configuration, Entry } from 'webpack';
import webpackMerge from 'webpack-merge';
import webpackBaseConfig from './webpack.base.config';

// config hot module
const hots = [
  'react-hot-loader/patch',
  /* 'eventsource-polyfill',  */ 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
];
Object.keys(webpackBaseConfig.entry as Entry).forEach(entryName => {
  (webpackBaseConfig.entry as Entry)[entryName] = hots.concat(
    (webpackBaseConfig.entry as Entry)[entryName]
  );
});

const webpackDevConfig: Configuration = webpackMerge(webpackBaseConfig, {
  devtool: 'cheap-module-eval-source-map',
  mode: 'development',
  output: {
    filename: 'static/js/[name].[hash:8].js',
  },
  stats: {
    errors: true,
    errorDetails: true,
    warnings: true,
    colors: true,
    timings: true,
    all: false,
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
});

export default webpackDevConfig;
