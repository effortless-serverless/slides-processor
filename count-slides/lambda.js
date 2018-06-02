'use strict';

const parseS3Event = require('./parse-s3-event')
const downloadFromS3 = require('./download-from-s3')
const aws = require('aws-sdk')
const sns = new aws.SNS()
const countSlides = require('./main')

exports.handler = async function lambdaHandler(event) {
  try {
    const s3Object = parseS3Event(event)
    return await countSlides(s3Object, downloadFromS3, sns)
  } catch(e) {
    return Promise.reject(e)
  }
}

