'use strict'

module.exports = function parseS3Event(event) {
  const eventRecord = event.Records && event.Records[0]

  if (!eventRecord && eventRecord.eventSource !== 'aws:s3' && !eventRecord.s3)
    throw new Error('Event is not a valid S3 event')

  return eventRecord.s3
}

