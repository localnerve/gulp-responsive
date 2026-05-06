import { describe, it } from 'node:test'
import assert from 'node:assert'
import { fileTypeFromBuffer as fileType } from 'file-type';
import responsive from '../lib/index.js'
import { makeFile, assertFile } from './helpers.js'

describe('gulp-responsive', async () => {

  describe('image format', () => {
    it('should convert image type to specified by `format` option', () => {
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

      stream.on('data', async file => {
        assertFile(file)

        const result = await fileType(file.contents)
        assert.strictEqual(result.mime, 'image/jpeg')
      })

      stream.on('end', () => {
        done()
      })

      stream.write(makeFile('gulp.png'))
      stream.end()
      return result
    })

    it('should convert image type to format parsed from output image name', () => {
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

      stream.on('data', async file => {
        assertFile(file)

        const result = await fileType(file.contents)
        assert.strictEqual(result.mime, 'image/jpeg')
      })

      stream.on('end', () => {
        done()
      })

      stream.write(makeFile('gulp.png'))
      stream.end()
      return result
    })

    it('should convert image type to specified by `format` option with custom extension', () => {
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

      stream.on('data', async file => {
        assertFile(file)

        const result = await fileType(file.contents)
        assert.strictEqual(result.mime, 'image/webp')
      })

      stream.on('end', () => {
        done()
      })

      stream.write(makeFile('gulp.png'))
      stream.end()
      return result
    })

    it('should convert image type to multiple specified by `format` option', () => {
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

      stream.on('data', file => {
        counter++

        assertFile(file)
        if (counter > 2) {
          throw new Error('more than one file is provided')
        }
      })

      stream.on('end', () => {
        done()
      })

      stream.write(makeFile('gulp.png'))
      stream.end()
      return result
    })
  })
})
