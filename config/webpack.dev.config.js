'use strict';

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptmizeCss = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  mode: "development",
  entry: {
    index: "./src/js/index.js",
    news: "./src/js/news.js",
    common: "./src/common/common.js"
  },
  devServer: {
    port: 3001,
    contentBase: [path.join(__dirname, 'dist'), path.join(__dirname, '/')],
    progress: true,
    open: true,
  },
  optimization: {
    minimizer: [
      new OptmizeCss(),
      new UglifyJsPlugin()
    ]
  },
  devtool: "source-map",
  context: path.resolve(__dirname),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'static/js/[name].[hash:8].js',
    publicPath: ''
  },
  module: {
    rules: [
      {
        test: /\.styl$/,
        use: [
          'style-loader',
          'css-loader',
          'stylus-loader'
        ]
      },
      {
        test: /\.(less|css)$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              failback: 'file-loader',
              name: 'img/[hash].[ext]',
              limit: 8192
            }
          }
        ]
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)\w*/,
        loader: 'file-loader',
        options: {
          name: 'font/[hash].[ext]'
        }
    },
    ]
  },
  resolve: {
    alias: {
      CSS: path.resolve(__dirname, 'src/css')
    }
  },
  devtool: 'source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/html/index.html",
      filename: "index.html",
      chunks: ["common","index"],
      chunksSortMode: "manual"
    }),
    new HtmlWebpackPlugin({
      template: "./src/html/news.html",
      filename: "news.html",
      chunks: ["common","news"],
      chunksSortMode: "manual"
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: 'css/[name].[hash:8].css'
    }),
  ]
};
