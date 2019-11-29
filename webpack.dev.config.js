const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const merge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.base.config.js');
const fs = require('fs');

fs.open('./src/config/env.js', 'w', function(err, fd) {
  //const buf = 'export default "development";';
  const buf = Buffer.from('export default "development";');
  //fs.write(fd, buf, 0, buf.length, 0, function(err, written, buffer) {});
  fs.write(fd, buf, 0, 'utf-8', function(err, written, buffer) {});
});

module.exports = merge(webpackBaseConfig, {
  devtool: '#source-map',
  output: {
    publicPath: '/dist/',
    filename: '[name].js',
    chunkFilename: '[name].chunk.js'
  },
  plugins: [
    new ExtractTextPlugin({
      filename: '[name].css',
      allChunks: true,
      disable: true //开发环境下禁止抽离css文件，否则无法使用热更新
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendors',
      filename: 'vendors.js'
    }),
    new HtmlWebpackPlugin({
      filename: '../index.html',
      template: './src/template/index.ejs',
      inject: false
    })
  ],
  devServer: {
    compress: true, // enable gzip compression
    historyApiFallback: true, // true for index.html upon 404, object for multiple paths
    hot: true, // hot module replacement. Depends on HotModuleReplacementPlugin
    https: false, // true for self-signed, object for cert authority
    noInfo: false, // only errors & warns on hot reload
    proxy: {
      '/api': {
        //axios中给请求添加 /api,用于代理标识
        target: 'http://114.116.107.169:8000', //目标地址
        secure: false, // 接受 运行在 https 上的服务
        changeOrigin: true,
        pathRewrite: { '^/api': '/' } //重写请求路径，把/api用空替换掉
      }
    }
  }
});
