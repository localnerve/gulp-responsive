/* global describe, it */

import assert from 'assert'
import responsive from '../lib/index.js'
import { makeFile, assertFile } from './helpers.js'

describe('gulp-responsive', async function () {
  const { fileTypeFromBuffer: fileType } = await import('file-type')

  describe('image format', function () {
    it('should convert image type to specified by `format` option', function () {
      let done
      const result = new Promise(resolve => {
        done = resolve
      })

      const config = [
        {
          name: 'gulp.png',
          format: 'jpeg'
        }
      ]
      const stream = responsive(config)

      stream.on('data', async function (file) {
        assertFile(file)

        const result = await fileType(file.contents)
        assert.strictEqual(result.mime, 'image/jpeg')
      })

      stream.on('end', function () {
        done()
      })

      stream.write(makeFile('gulp.png'))
      stream.end()
      return result
    })

    it('should convert image type to format parsed from output image name', function () {
      let done
      const result = new Promise(resolve => {
        done = resolve
      })

      const config = [
        {
          name: 'gulp.png',
          rename: 'gulp.jpg'
        }
      ]
      const stream = responsive(config)

      stream.on('data', async function (file) {
        assertFile(file)

        const result = await fileType(file.contents)
        assert.strictEqual(result.mime, 'image/jpeg')
      })

      stream.on('end', function () {
        done()
      })

      stream.write(makeFile('gulp.png'))
      stream.end()
      return result
    })

    it('should convert image type to specified by `format` option with custom extension', function () {
      let done
      const result = new Promise(resolve => {
        done = resolve
      })

      const config = [
        {
          name: 'gulp.png',
          format: 'webp',
          rename: 'gulp.custom-jpg'
        }
      ]
      const stream = responsive(config)

      stream.on('data', async function (file) {
        assertFile(file)

        const result = await fileType(file.contents)
        assert.strictEqual(result.mime, 'image/webp')
      })

      stream.on('end', function () {
        done()
      })

      stream.write(makeFile('gulp.png'))
      stream.end()
      return result
    })

    it('should convert image type to multiple specified by `format` option', function () {
      let done
      const result = new Promise(resolve => {
        done = resolve
      })

      const config = [
        {
          name: 'gulp.png',
          format: ['jpg', 'webp']
        }
      ]
      const stream = responsive(config)
      let counter = 0

      stream.on('data', function (file) {
        counter++

        assertFile(file)
        if (counter > 2) {
          throw new Error('more than one file is provided')
        }
      })

      stream.on('end', function () {
        done()
      })

      stream.write(makeFile('gulp.png'))
      stream.end()
      return result
    })
  })
})
