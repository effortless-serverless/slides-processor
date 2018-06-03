'use strict'

const parseSnsEvent = require('./parse-sns-event')
const downloadFromS3 = require('./download-from-s3')
const saveToS3 = require('./save-to-s3')
const convertToImage = require('./main')

exports.handler = async (event) => {
    const messages = parseSnsEvent(event)
    console.log(messages) // eslint-disable-line no-console
    return Promise.all(messages.map(message => convertToImage(message, downloadFromS3, saveToS3)))
}
