// webpack.config.js

const path = require('path');

module.exports = {
  mode: 'production',
  entry: ['babel-polyfill', './lib/index.js'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: `breakout.js`
  }
};