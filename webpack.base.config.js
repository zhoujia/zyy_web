const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    main: './src/main',
    vendors: './src/vendors'
  },
  output: {
    path: path.join(__dirname, './dist')
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: [
          {
            loader: 'vue-loader',
            options: {
              loaders: {
                less: ExtractTextPlugin.extract({
                  use: [
                    'css-loader?minimize',
                    'autoprefixer-loader',
                    'less-loader'
                  ],
                  fallback: 'vue-style-loader'
                }),
                css: ExtractTextPlugin.extract({
                  use: ['css-loader', 'autoprefixer-loader', 'less-loader'],
                  fallback: 'vue-style-loader'
                })
              },
              postLoaders: {
                html: 'babel-loader'
              }
            }
          },
          {
            loader: 'iview-loader',
            options: {
              prefix: false
            }
          }
        ]
      },
      {
        test: /iview\/.*?js$/,
        loader: 'babel-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['latest'] //按照最新的ES6语法规则去转换
        },
        include: [
          path.resolve('src'),
          path.resolve('test'),
          path.resolve('/node_modules/iview'),
          path.resolve('node_modules/element-ui/packages')
        ],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: ['css-loader?minimize', 'autoprefixer-loader'],
          fallback: 'style-loader'
        })
      },
      {
        test: /\.less/,
        use: ExtractTextPlugin.extract({
          use: ['css-loader?minimize', 'autoprefixer-loader', 'less-loader'],
          fallback: 'style-loader'
        })
      },
      {
        test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
        loader: 'url-loader?limit=1024',
        options: {
          outputPath: process.env.NODE_ENV === 'production' ? '../' : ''
        }
      },
      {
        test: /\.(html|tpl)$/,
        loader: 'html-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      vue: 'vue/dist/vue.esm.js',
      '@': path.resolve('src')
    }
  }
};
