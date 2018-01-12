const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'index.bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(css|scss|sass)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader','postcss-loader', 'sass-loader']
        })
      },
      {
        test: /\.pug$/,
        use: 'pug-loader'
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: false,
    port: 9000,
    stats: 'errors-only',
    open: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'IS TDS',
      hash: true,
      template: './src/pugs/index.pug'
    }),
    new HtmlWebpackPlugin({
      title: 'IS TDS second',
      hash: true,
      filename: 'contact.html',
      template: './src/pugs/contact.pug'
    }),
    new ExtractTextPlugin({
      filename: 'scss/main.css',
      allChunks: true,
      disable: false
    })
  ]
}