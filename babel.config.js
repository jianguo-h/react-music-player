module.exports = {
  assumptions: {
    setPublicClassFields: true,
  },
  presets: [
    [
      '@babel/env',
      {
        modules: false,
        useBuiltIns: 'usage',
        corejs: 3,
      },
    ],
    '@babel/preset-react',
  ],
  plugins: [
    'react-hot-loader/babel',
    [
      '@babel/plugin-proposal-decorators',
      {
        legacy: true,
      },
    ],
    '@babel/plugin-proposal-class-properties',
    [
      'import',
      {
        libraryName: 'antd-mobile',
        style: true,
      },
    ],
  ],
};
