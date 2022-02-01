const { nodeResolve } = require('@rollup/plugin-node-resolve')
const typescript = require('@rollup/plugin-typescript')
const json = require('@rollup/plugin-json')
const commonjs = require('@rollup/plugin-commonjs')

module.exports = {
  external: ['electron'],
  output: {
    format: 'cjs',
    exports: 'named'
  },
  plugins: [
    commonjs(),
    nodeResolve(),
    json(),
    typescript()
  ]
}
