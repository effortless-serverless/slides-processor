'use strict'

const exec = require('child_process').exec

function saveToTmpFunction(fileName, pdfBuffer, fs = fsLib) {
  return fs.writeFileSync(fileName, pdfBuffer)
}

function runCommand(command) {
  return new Promise((resolve, reject) => {
    exec(command, { maxBuffer: 1024 * 1024 * 10 }, (err, stdout, stderr) => {
      if (err)
        return reject(err)

      resolve(stdout)
    })
  })
} 

module.exports = async function countSlides(s3Object, downloadFromS3, s3, saveToTmp = saveToTmpFunction, run = runCommand) {
  const pdfBuffer = await downloadFromS3(s3Object.bucket.name, s3Object.object.key)
  const fileName = s3Object.object.key.split('/').pop()
  const pdfPath = await saveToTmp(fileName, pdfBuffer.Body)

  const output = await run(`gs -dNODISPLAY -dBATCH -dNOPAUSE -o /dev/null ${pdfPath} | grep 'Page' | wc -l 2>/dev/null`)
  const pageCount = parseInt(output, 10)

  console.log('Page count:', pageCount)

  // Create an array of N items, where N is the number of pages and loop through it
  return Promise.all(Array.apply(null, { lenght: pageCount }).map((item, index) => {
    const currentPageNumber = Number.call(Number, ++index)
    return sns.publish({
      Message: JSON.stringify({
        page: currentPageNumber,
        totalPageCount: pageCount,
        bucket: s3Object.bucket.name,
        object: s3Object.object.key
      }),
      TopicArn: process.env.TOPIC_ARN
    }).promise()
  }))
}

