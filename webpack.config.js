const path = require('path');

const config = {
  target: 'web',
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'js'),
    filename: 'main.js'
  },
  mode: 'development',
  devtool: 'source-map'
};

module.exports = config;