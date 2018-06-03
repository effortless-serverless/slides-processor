'use strict'

const aws = require('aws-sdk')
const s3Lib = new aws.S3()

module.exports = function downloadFromS3(bucket, object, s3 = s3Lib) {
  return s3.getObject({
    Bucket: bucket,
    Key: object.replace('+', '')
  }).promise()
}
