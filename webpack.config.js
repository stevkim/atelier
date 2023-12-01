const path = require('path');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: path.join(__dirname, 'src/index.jsx'),
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: [/node_modules/, /\.test.js/, /\.spec.js/],
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      }
    ],
  },
  plugins: [
    new NodePolyfillPlugin(),
    new ESLintPlugin()
  ]
}