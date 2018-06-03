'use strict'

const aws = require('aws-sdk')
const s3Lib = new aws.S3()

module.exports = function saveToS3(bucket, object, fileContent, s3 = s3Lib) {
  return s3.putObject({
    Bucket: bucket,
    Key: object,
    ContentType: 'image/png',
    Body: fileContent
  }).promise()
}
