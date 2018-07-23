const VueLoaderPlugin = require('vue-loader/lib/plugin');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const config = {
  mode: 'production',
  entry: { index: './src/Index.vue' },
  output: {
    path: path.resolve(__dirname, './lib'),
    filename: './[name].js',
    library: 'VueScrollBar',
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
          presets: ['env', 'stage-2'],
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
};

module.exports = config;
