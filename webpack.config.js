const CopyWebpackPlugin = require('copy-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const path = require('path')

const config = {
  mode: 'production',
  entry: { index: './src/Scrollbar.vue' },
  output: {
    path: path.resolve(__dirname, './lib'),
    filename: './index.js',
    library: 'VueScrollbar',
    libraryTarget: 'umd',
    globalObject: 'this',
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        exclude: /node_modules/,
        loader: 'vue-loader',
        options: {
          loaders: {
            css: ['css-loader'],
          },
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            ['env', {
              modules: false,
              targets: {
                browsers: ['> 1%', 'last 2 versions', 'not ie <= 8'],
              },
            }],
            'stage-2',
          ],
          env: {
            test: {
              plugins: ['istanbul'],
            },
          },
        },
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, 'src/css'),
        to: 'css',
        ignore: ['.*'],
      },
    ]),
  ],
}

module.exports = config
