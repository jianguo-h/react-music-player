const path = require('path');

module.exports = {
  entry: {
    app: './src/main.js'
  },
  output: {
    filename: 'js/[name].bundle.js',
    path: path.resolve(__dirname, '../dist')
  }
}