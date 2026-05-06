import { describe, it } from 'node:test'
import assert from 'node:assert'
import size from '../lib/size.js'

describe('gulp-responsive', () => {
  describe('size parser', () => {
    it('should leave number unchanged', () => {
      const test = size(100)
      assert.strictEqual(test, 100)
    })

    it('should leave null', () => {
      const test = size()
      assert(test === null)
    })

    it('should parse string as a number', () => {
      const test = size('100')
      assert.strictEqual(test, 100)
      assert(typeof test === 'number')
    })

    it('should parse string in pixels as a number', () => {
      const test = size('100px')
      assert.strictEqual(test, 100)
      assert(typeof test === 'number')
    })

    it('should recognize percentages and calculate size', () => {
      const test = size('10%', 900)
      assert.strictEqual(test, 90)
      assert(typeof test === 'number')
    })

    it('should recognize percentages and calculate size (more then 100%)', () => {
      const test = size('200%', 900)
      assert.strictEqual(test, 1800)
      assert(typeof test === 'number')
    })

    it('should throw an error on wrong input', () => {
      assert.throws(() => {
        size('wrong')
      }, /Wrong size/)
    })

    it('should throw an error on wrong percentage input', () => {
      assert.throws(() => {
        size('wrong%')
      }, /Wrong percentage size/)
    })
  })
})
