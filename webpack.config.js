const HtmlWebpackPlugin = require('html-webpack-plugin');
const path              = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack           = require('webpack');

const isProd  = process.env.NODE_ENV === 'production';         //Check if it's production mode
const cssDev  = ['style-loader', 'css-loader', 'sass-loader'];
const cssProd = ExtractTextPlugin.extract({
                  fallback: 'style-loader',
                  use     : ['css-loader', 'postcss-loader', 'sass-loader']
                });
const cssConfig = isProd ? cssProd : cssDev;

module.exports = {
  entry : './src/index.js',
  output: {
    path    : path.resolve(__dirname, './dist'),
    filename: 'index.bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(css|scss|sass)$/,
        use : cssConfig
      },
      {
        test: /\.pug$/,
        use : {
          loader : 'pug-loader',
          options: {
            pretty: true
          }
        }
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        use : [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'assets/',
            publicPath: '../'
          }
        }, 'image-webpack-loader']
      },
      {
        test: /\.svg$/,
        use : {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'assets/',
            publicPath: '../'
          }
        }
      }
    ]
  },
  devServer: {
    contentBase     : path.join(__dirname, "dist"),
    compress        : true,
    port            : 9000,
    stats           : 'errors-only',
    hot             : true,
    open            : true,
    inline          : true,
    watchContentBase: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      title   : 'Webpack Config',
      hash    : true,
      template: './src/pugs/index.pug'
    }),
    new ExtractTextPlugin({
      filename : './css/main.css',
      allChunks: true,
      disable  : !isProd
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
}