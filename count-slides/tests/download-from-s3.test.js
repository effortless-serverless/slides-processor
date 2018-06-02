'use strict'

const underTest = require('../download-from-s3')

describe('Count slides', () => {
  test('should export a function', () => {
    expect(typeof underTest).toBe('function')
  })
})

