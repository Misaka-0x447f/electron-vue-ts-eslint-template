const { nodeResolve } = require('@rollup/plugin-node-resolve')
const typescript = require('@rollup/plugin-typescript')
const json = require('@rollup/plugin-json')
const commonjs = require('@rollup/plugin-commonjs')
const replace = require('@rollup/plugin-replace')

module.exports = {
  external: ['electron'],
  output: {
    format: 'cjs',
    exports: 'named'
  },
  plugins: [
    replace({
      'process.versions': process.versions
    }),
    commonjs(),
    nodeResolve(),
    json(),
    typescript()
  ]
}
