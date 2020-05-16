/* For build */
import license from 'rollup-plugin-license'
import { uglify } from 'rollup-plugin-uglify'
import packageConf from './package.json'

const baseConf = require('./rollup.config.base')

const isWatch = process.env.BUILD_ENV === 'watch'

const conf = entry => ({
  input: entry.filename,
  output: entry.formats.map(format => ({
    file: `./lib/${format}/${entry.name}.js`,
    format,
    name: entry.name === 'index' ? 'VueScrollbar' : `${entry.name}VueScrollbar`,
  })),
  external: entry.external ? Object.keys(packageConf.dependencies || {}) : [],
  plugins: [
    ...baseConf.plugins,
    entry.needUglify !== false && uglify(),
    license({
      banner: `Bundle of <%= pkg.name %>
               Generated: <%= moment().format('YYYY-MM-DD') %>
               Version: <%= pkg.version %>
               License: <%= pkg.license %>
               Author: <%= pkg.author %>`,
    }),
  ],
})

export default (isWatch
  ? [
      {
        name: 'index',
        filename: './src/index.ts',
        formats: ['umd'],
        needUglify: false,
      },
    ]
  : [
      {
        name: 'index',
        filename: './src/index.ts',
        formats: ['es'],
        needUglify: false,
        external: true,
      },
      { name: 'index', filename: './src/index.ts', formats: ['umd'] },
    ]
).map(conf)
