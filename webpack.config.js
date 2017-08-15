const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

const config = {
  name: 'battleship',

  resolve: {
    extensions: ['.json', '.js', 'min.js', '.jsx'],
    enforceExtension: false,
  },

  entry: [
    'react-hot-loader/patch',
    './src/js/index',
  ],

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.[hash].js',
    publicPath: '/',
  },

  devtool: 'inline-source-map',

  module: {
    rules: [
      // javascript
      {
        test: /\.jsx?$/,
        use: ['babel-loader'],
        exclude: /node_modules/,
      },
      // css
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader?sourceMap'],
      },
    ],
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.ejs',
    }),
    new ProgressBarPlugin(),
  ],

  devServer: {
    host: 'localhost',
    port: 3000,
    historyApiFallback: true,
    hot: true,
  },
};

module.exports = config;
