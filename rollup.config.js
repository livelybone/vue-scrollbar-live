/* For build */
import { uglify } from 'rollup-plugin-uglify'

const baseConf = require('./rollup.config.base')

const conf = entry => Object.assign({}, baseConf, {
  input: entry.filename,
  output: entry.formats.map(format => ({
    file: `./lib/${format}/${entry.name}.js`,
    format,
    name: 'VueScrollBar',
  })),
  external: ['@livelybone/mouse-wheel', '@livelybone/touch'],
  plugins: Object.assign(
    [],
    baseConf.plugins,
    [(entry.needUglify !== false && uglify())],
  ),
})

export default [
  { name: 'index', filename: './src/Scrollbar.vue', formats: ['es'], needUglify: false },
  { name: 'index', filename: './src/Scrollbar.vue', formats: ['umd'] },
].map(conf)
