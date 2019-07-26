const path = require('path');

const config = {
  target: 'web',
  entry: {
    main: './src/main.js',
    'AI.worker': './src/AI/AI.worker.js',
  },
  output: {
    path: path.resolve(__dirname, 'js'),
    filename: '[name].js',
  },
  mode: 'production',
  /* devtool: 'source-map', */
};

module.exports = config;
