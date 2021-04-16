import webpack, { Configuration, Entry } from 'webpack';
import webpackMerge from 'webpack-merge';
import webpackBaseConfig from './webpack.base.config';

// config hot module
const hots = ['react-hot-loader/patch'];
const baseConfigEntry = webpackBaseConfig.entry;
const devConfigEntry: Entry = {};
if (typeof baseConfigEntry === 'object' && !Array.isArray(baseConfigEntry)) {
  Object.keys(baseConfigEntry).forEach(entryName => {
    devConfigEntry[entryName] = hots.concat(
      baseConfigEntry[entryName] as string
    );
  });
}

const webpackDevConfig: Configuration = webpackMerge(webpackBaseConfig, {
  devtool: 'eval-cheap-module-source-map',
  mode: 'development',
  output: {
    filename: 'static/js/[name].[fullhash:8].js',
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
});

export default webpackDevConfig;
