'use strict'

const underTest = require('../parse-s3-event')

describe('Count slides', () => {
  test('should export a function', () => {
    expect(typeof underTest).toBe('function')
  })
})

