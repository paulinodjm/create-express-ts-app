#!/usr/bin/env node

const path = require("path")
const fs = require("fs")

const ERROR_ARGS = 1
const ERROR_APP_EXISTS = 2

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

console.log(appDir)
