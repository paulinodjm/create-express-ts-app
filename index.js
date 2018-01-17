#!/usr/bin/env node

const path = require("path")
const fs = require("fs")
const copy = require("recursive-copy")
const { spawn } = require("child_process")

//
// Error codes
//
const ERROR_ARGS = 1
const ERROR_APP_EXISTS = 2
const ERROR_ERROR = 100

//
// Params
//
const APP_TEMPLATE_DIR = path.join(__dirname, "app-template")
const PKG_MGR = "yarn.cmd"

//
// Process
//

// Requires the first command line argument
if (process.argv.length < 3) {
  console.error("ERROR: Missing required <my-app>")
  process.exit(ERROR_ARGS)
}

// Ensures that the directory doesn't exists
const appName = process.argv[2]
const appDir = path.join(process.cwd(), appName)

if (fs.existsSync(appDir)) {
  console.error(`ERROR: ${appDir} already exists`)
  process.exit(ERROR_APP_EXISTS)
}

// Creates the target directory
fs.mkdirSync(appDir)

console.log(`INFO: Copying project files to ${appDir}`)
copy(APP_TEMPLATE_DIR, appDir, {
  dot: true
})
  .then(results => {
    console.log(`INFO: ${results.length} files copied`)

    // Install the packages
    const install = spawn(PKG_MGR, [], {
      cwd: appDir
    })

    install.stdout.on("data", data => {
      process.stdout.write(data)
    })

    install.stderr.on("data", data => {
      process.stderr.write(data)
    })

    install.on("error", error => {
      console.error(error)
      process.exit(ERROR_ERROR)
    })

    install.on("close", code => {
      console.log(`INFO: ${PKG_MGR} exit with code ${code}`)
    })
  })
  .catch(error => {
    console.error(error)
    process.exit(ERROR_ERROR)
  })
