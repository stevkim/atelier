const path = require('path');
const webpack = require('webpack');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
require('dotenv').config({ path: './.env'});

module.exports = {
  mode: 'development',
  entry: path.join(__dirname, 'src/index.jsx'),
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /nodeModules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ]
  },
  plugins: [
    new NodePolyfillPlugin(),
    new webpack.DefinePlugin({
      "process.env": {
        GIT_TOKEN: JSON.stringify(process.env.GIT_TOKEN),
        API_URL: JSON.stringify(process.env.API_URL)
      }
    })
  ]
}