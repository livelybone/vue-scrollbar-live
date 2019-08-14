/* For build */
// import fs from 'fs'
// import path from 'path'
import license from 'rollup-plugin-license'
import { uglify } from 'rollup-plugin-uglify'
import packageConf from './package.json'

const baseConf = require('./rollup.config.base')

const isWatch = process.env.BUILD_ENV === 'watch'

// const formats = ['es', 'umd']
//
// function getEntries() {
//   const reg = /\.vue$/
//   return fs
//     .readdirSync(path.resolve(__dirname, './src/components'))
//     .filter(
//       filename =>
//         reg.test(filename) &&
//         !fs
//           .statSync(path.resolve(__dirname, './src/components', filename))
//           .isDirectory(),
//     )
//     .map(filename => ({
//       name: filename.replace(reg, ''),
//       filename: path.resolve(__dirname, './src/components', filename),
//       formats: formats.filter(f => f !== 'es'),
//     }))
// }

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
  ? [{ name: 'index', filename: './src/index.js', formats: ['umd'] }]
  : [
      {
        name: 'index',
        filename: './src/index.js',
        formats: ['es'],
        needUglify: false,
        external: true,
      },
      { name: 'index', filename: './src/index.js', formats: ['umd'] },
      // ...getEntries(),
    ]
).map(conf)
