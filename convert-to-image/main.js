'use strict'

const { exec } = require('child_process')
const { dirname, join } = require('path')
const { readFileSync, writeFileSync } = require('fs')

function saveToTmpFunction(fileName, pdfBuffer) {
  const localPath = join('/tmp', fileName)
  writeFileSync(fileName, pdfBuffer)
  return localPath
}

function runCommand(command) {
  return new Promise((resolve, reject) => {
    exec(command, { maxBuffer: 1024 * 1024 * 10 }, (err, stdout) => {
      if (err)
        return reject(err)

      resolve(stdout)
    })
  })
}

module.exports = async function convertToImage(message, downloadFromS3, saveToS3, saveToTmp = saveToTmpFunction, run = runCommand) {
  const pdfBuffer = await downloadFromS3(message.bucket, message.object)
  const fileName = message.object.split('/').pop()
  const pdfPath = await saveToTmp(fileName, pdfBuffer.Body)
  const basePath = dirname(message.object)
  const localImagePath = `/tmp/page-${message.page}.png`
  const imageS3Path = `${basePath}/original/page-${message.page}.png`

  await run(`convert ${pdfPath}[${message.page}] ${imageS3Path}`)
  return await saveToS3(process.env.BUCKET_NAME, imageS3Path, readFileSync(localImagePath))
}