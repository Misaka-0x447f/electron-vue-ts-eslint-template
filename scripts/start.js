const os = require('os')
const path = require('path')
const fsj = require('fs-jetpack')
const exec = require('./util/exec')
const rollup = require('rollup')
const loadConfigFile = require('rollup/dist/loadConfigFile')
const tmpDirPrefix = './electron-vue-ts-build'
const tmpDir = path.join(os.tmpdir(), `${tmpDirPrefix}-${new Date().getTime()}`)
const cwd = process.cwd()
const packageJson = fsj.read('./package.json', 'json')
const artifact = path.join(tmpDir, './bundle.js')

const buildAndWatch = () => new Promise(resolve => {
  loadConfigFile(path.resolve(cwd, 'rollup.config.js'), {
    input: packageJson.main,
    output: {
      file: artifact
    }
  }).then(
    async ({ options, warnings }) => {
      // "warnings" wraps the default `onwarn` handler passed by the CLI.
      // This prints all warnings up to this point:
      console.log(`We currently have ${warnings.count} warnings`)

      // This prints all deferred warnings
      warnings.flush()

      // options is an array of "inputOptions" objects with an additional "output"
      // property that contains an array of "outputOptions".
      // The following will generate all outputs for all inputs, and write them to disk the same
      // way the CLI does it:
      for (const optionsObj of options) {
        const bundle = await rollup.rollup(optionsObj)
        await Promise.all(optionsObj.output.map(bundle.write))
      }

      resolve()

      // You can also pass this directly to "rollup.watch"
      rollup.watch(options)
    }
  )
});

(async () => {
  fsj.list(os.tmpdir()).filter(el => el.startsWith(tmpDirPrefix) && fsj.exists(el) === 'dir').map(fsj.remove)
  fsj.dir(tmpDir)
  await buildAndWatch()
  await exec(`concurrently -k "vite" "wait-on tcp:3000 && cross-env NODE_ENV=development electronmon ${artifact}"`)
})()
