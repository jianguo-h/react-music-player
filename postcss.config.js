/* eslint-disable @typescript-eslint/no-var-requires */
module.exports = {
  plugins: [
    require('autoprefixer')({
      overrideBrowserslist: ['> 5%', 'not ie <= 8', 'last 2 versions'],
    }),
  ],
};
