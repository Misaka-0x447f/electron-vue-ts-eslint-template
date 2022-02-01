const execa = require('execa')
const chalk = require('chalk')

module.exports = (cmd, args, opts) => {
  const worker = execa(cmd, args, { shell: true, ...opts })
  worker.stdout.pipe(process.stdout)
  worker.stderr.pipe(process.stderr)
  worker.catch(e => {
    console.error(`Command ${chalk.blueBright.inverse(` ${cmd} `)} exited with code ${e.code}`)
    throw e
  })
  return worker
}
