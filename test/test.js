import { describe, it } from 'node:test'
import assert from 'node:assert'
import path from 'node:path'
import responsive from '../lib/index.js'
import { makeFile, assertFile } from './helpers.js'

const thisDirname = import.meta.dirname;

describe('gulp-responsive', () => {
  it('should not do anything without images and configs', () => {
    let cb
    const result = new Promise(resolve => {
      cb = resolve
    })
    const stream = responsive()

    stream.on('end', cb)
    stream.on('data', () => {
      throw new Error('data should not be provided')
    })

    stream.end()
    return result
  })

  it('should provide one image when exactly one image and one config are provided', () => {
    let cb
    const result = new Promise(resolve => {
      cb = resolve
    })
    const config = [
      {
        name: 'gulp.png'
      }
    ]
    const stream = responsive(config)

    let counter = 0

    stream.on('data', file => {
      counter++
      assertFile(file)
      if (counter > 1) {
        throw new Error('more than one file is provided')
      }
    })

    stream.on('end', () => {
      assert.strictEqual(counter, 1)
      cb()
    })

    stream.write(makeFile('gulp.png'))
    stream.end()
    return result
  })

  it('should support source file in SVG format', () => {
    let cb
    const result = new Promise(resolve => {
      cb = resolve
    })
    const config = [
      {
        name: 'gulp.svg',
        format: 'png'
      }
    ]
    const stream = responsive(config)

    let counter = 0

    stream.on('data', file => {
      counter++
      assertFile(file)
      if (counter > 1) {
        throw new Error('more than one file is provided')
      }
    })

    stream.on('end', () => {
      assert.strictEqual(counter, 1)
      cb()
    })

    stream.write(makeFile('gulp.svg'))
    stream.end()
    return result
  })

  it('should provide two image when one image and exactly two configs are provided', () => {
    let cb
    const result = new Promise(resolve => {
      cb = resolve
    })
    const config = [
      {
        name: 'gulp.png'
      },
      {
        name: 'gulp.png'
      }
    ]
    const stream = responsive(config)

    let counter = 0

    stream.on('data', file => {
      counter++
      assertFile(file)
      if (counter > 2) {
        throw new Error('more than two files are provided')
      }
    })

    stream.on('end', () => {
      assert.strictEqual(counter, 2)
      cb()
    })

    stream.write(makeFile('gulp.png'))
    stream.end()
    return result
  })

  it('should provide two image when one image match two configs', () => {
    let cb
    const result = new Promise(resolve => {
      cb = resolve
    })
    const config = [
      {
        name: 'gulp.png'
      },
      {
        name: '*.png'
      }
    ]
    const stream = responsive(config)

    let counter = 0

    stream.on('data', file => {
      counter++
      assertFile(file)
      if (counter > 2) {
        throw new Error('more than two files are provided')
      }
    })

    stream.on('end', () => {
      assert.strictEqual(counter, 2)
      cb()
    })

    stream.write(makeFile('gulp.png'))
    stream.end()
    return result
  })

  describe('rename image', () => {
    it('should provide renamed image when rename is string', () => {
      let cb
      const result = new Promise(resolve => {
        cb = resolve
      })
      const config = [
        {
          name: 'gulp.png',
          rename: 'test.png'
        }
      ]
      const stream = responsive(config)

      stream.on('data', file => {
        assertFile(file)
        assert.strictEqual(
          file.path,
          path.join(thisDirname, '/fixtures/', 'test.png')
        )
      })

      stream.on('end', () => {
        cb()
      })

      stream.write(makeFile('gulp.png'))
      stream.end()
      return result
    })

    it('should provide renamed image when rename is object', () => {
      let cb
      const result = new Promise(resolve => {
        cb = resolve
      })
      const config = [
        {
          name: 'gulp.png',
          rename: {
            suffix: '-renamed'
          }
        }
      ]
      const stream = responsive(config)

      stream.on('data', file => {
        assertFile(file)
        assert.strictEqual(
          file.path,
          path.join(thisDirname, '/fixtures/', 'gulp-renamed.png')
        )
      })

      stream.on('end', () => {
        cb()
      })

      stream.write(makeFile('gulp.png'))
      stream.end()
      return result
    })

    it('should provide renamed image when rename is function', () => {
      let cb
      const result = new Promise(resolve => {
        cb = resolve
      })
      const config = [
        {
          name: 'gulp.png',
          rename: path =>  {
            path.basename += '-renamed-by-function'
            return path
          }
        }
      ]
      const stream = responsive(config)

      stream.on('data', file => {
        assertFile(file)
        assert.strictEqual(
          file.path,
          path.join(thisDirname, '/fixtures/', 'gulp-renamed-by-function.png')
        )
      })

      stream.on('end', () => {
        cb()
      })

      stream.write(makeFile('gulp.png'))
      stream.end()
      return result
    })
  })

  describe('unmatched/unused images', () => {
    it('should not pass through unmatched file by default when `errorOnUnusedImage` is false', () => {
      let cb
      const result = new Promise(resolve => {
        cb = resolve
      })
      const stream = responsive(
        {},
        {
          errorOnUnusedImage: false
        }
      )

      let counter = 0

      stream.on('data', () => {
        counter++
      })

      stream.on('end', () => {
        assert.strictEqual(counter, 0)
        cb()
      })

      stream.write(makeFile('gulp.png'))
      stream.end()
      return result
    })

    it('should pass through unmatched file when `passThroughUnused` is true and `errorOnUnusedImage` is false', () => {
      let cb
      const result = new Promise(resolve => {
        cb = resolve
      })
      const expectedFile = makeFile('gulp.png')

      const stream = responsive(
        {},
        {
          errorOnUnusedImage: false,
          passThroughUnused: true
        }
      )

      let counter = 0

      stream.on('data', file => {
        counter++
        if (counter > 1) {
          throw new Error('more than two files are provided')
        }
        assertFile(file)
        assert.deepStrictEqual(file, expectedFile)
      })

      stream.on('end', () => {
        assert.strictEqual(counter, 1)
        cb()
      })

      stream.write(expectedFile)
      stream.end()
      return result
    })

    it('should skip enlarged image when `skipOnEnlargement` is true', () => {
      let cb
      const result = new Promise(resolve => {
        cb = resolve
      })
      const config = [
        {
          name: 'gulp.png',
          width: 10000
        }
      ]

      const stream = responsive(config, {
        errorOnEnlargement: false,
        skipOnEnlargement: true
      })

      stream.on('data', () => {
        throw new Error('enlarged image not been skipped')
      })

      stream.on('end', () => {
        cb()
      })

      stream.write(makeFile('gulp.png'))
      stream.end()
      return result
    })
  })

  it('should clip image when height is supplied withoutEnlargement', () => {
    let cb, originalSize
    const result = new Promise(resolve => {
      cb = resolve
    })
    const config = [
      {
        name: 'gulp.png',
        height: 1000
      }
    ]

    const stream = responsive(config, {
      errorOnEnlargement: false
    })

    stream.on('data', file => {
      assertFile(file)
      assert.ok(file.contents.length < originalSize) // clipped
    })

    stream.on('end', () => {
      cb()
    })

    const file = makeFile('gulp.png')
    originalSize = file.contents.length
  
    stream.write(file)
    stream.end()
    return result
  })

  it('should call postprocess when specified', () => {
    let cb, counter = 0
    const result = new Promise(resolve => {
      cb = resolve
    })
    const config = [
      {
        name: 'gulp.png'
      }
    ]

    const stream = responsive(config, {
      postprocess: () => counter++
    })

    stream.on('data', file => {
      assertFile(file)
    })

    stream.on('end', () => {
      assert.strictEqual(counter, 1)
      cb()
    })

    const file = makeFile('gulp.png')
    stream.write(file)
    stream.end()
    return result
  })
})
