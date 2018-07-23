const VueLoaderPlugin = require('vue-loader/lib/plugin');
const path = require('path');

function getEntries() {
  const reg = /\.vue$/;
  return require('fs').readdirSync(path.resolve(__dirname, './src/component'))
    .filter(filename => reg.test(filename) && !fs.statSync(path.resolve(__dirname, './src/component', filename)).isDirectory())
    .map(filename => ({ [filename.replace(reg, '')]: path.resolve(__dirname, './src/component', filename) }));
}

const config = {
  mode: 'production',
  entry: { index: ['babel-polyfill', './src/index.vue'] },
  output: {
    path: path.resolve(__dirname, './lib'),
    filename: './[name].js',
    library: 'VueSnackbar',
    libraryTarget: 'umd',
    globalObject: 'this',
  },
  module: {
    rules: [
      { test: /\.vue$/, exclude: /node_modules/, loader: 'vue-loader' },
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
  ],
};

module.exports = config;
