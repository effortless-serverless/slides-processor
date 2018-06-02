'use strict'

const fs = require('fs')
const { join } = require('path')
const cp = require('child_process')
const os = require('os')

const dir = process.cwd()

fs.readdirSync(dir)
  .forEach(mod => {
    const modPath = join(dir, mod)
    // Ensure path has package.json
    if (!fs.existsSync(join(modPath, 'package.json')))
      return false

    // NPM binary based on OS
    const npmCmd = os.platform().startsWith('win') ? 'npm.cmd' : 'npm'

    // Install folder
    cp.spawn(npmCmd, ['i'], {
      env: process.env,
      cwd: modPath,
      stdio: 'inherit'
    })
  })