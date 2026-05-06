import { describe, it } from 'node:test'
import assert from 'node:assert'
import responsive from '../lib/index.js'
import { makeFile } from './helpers.js'

describe('gulp-responsive', () => {
  describe('errorOnEnlargement', () => {
    it('should emit error when image is enlarged', () => {
      let cb
      const result = new Promise(resolve => {
        cb = resolve
      })
      const config = [
        {
          name: 'gulp.png',
          width: 300,
          withoutEnlargement: true
        }
      ]
      const stream = responsive(config)

      stream.on('error', err => {
        assert(/Image enlargement is detected/.test(err.message))
        cb()
      })

      stream.on('data', () => {})

      stream.write(makeFile('gulp.png'))
      stream.end()
      return result
    })

    it('should emit error when image is enlarged by size in percentage', () => {
      let cb
      const result = new Promise(resolve => {
        cb = resolve
      })

      const config = [
        {
          name: 'gulp.png',
          width: '300%',
          withoutEnlargement: true
        }
      ]
      const stream = responsive(config)

      stream.on('error', err => {
        assert(/Image enlargement is detected/.test(err.message))
        cb()
      })

      stream.on('data', () => {})

      stream.write(makeFile('gulp.png'))
      stream.end()
      return result
    })

    it('should not emit error when image is enlarged and errorOnEnlargement is false', () => {
      let cb
      const result = new Promise(resolve => {
        cb = resolve
      })

      const config = [
        {
          name: 'gulp.png',
          width: 300,
          withoutEnlargement: true
        }
      ]
      const stream = responsive(config, {
        errorOnEnlargement: false
      })

      stream.on('error', err => {
        throw err
      })

      stream.on('end', cb)

      stream.on('data', () => {})

      stream.write(makeFile('gulp.png'))
      stream.end()
      return result
    })
  })

  describe('errorOnUnusedConfig', () => {
    it('should emit error when config not used', () => {
      let cb
      const result = new Promise(resolve => {
        cb = resolve
      })

      const config = [
        {
          name: 'gulp.png'
        },
        {
          name: 'notused.png'
        }
      ]
      const stream = responsive(config)

      stream.on('error', err => {
        assert(
          /Available images do not match the following config/.test(err.message)
        )
        cb()
      })

      stream.on('data', () => {})

      stream.write(makeFile('gulp.png'))
      stream.end()
      return result
    })

    it('should not emit error when config not used and `errorOnUnusedConfig` is false', () => {
      let cb
      const result = new Promise(resolve => {
        cb = resolve
      })

      const config = [
        {
          name: 'gulp.png'
        },
        {
          name: 'notused.png'
        }
      ]
      const stream = responsive(config, {
        errorOnUnusedConfig: false
      })

      stream.on('error', err => {
        throw err
      })

      stream.on('end', cb)

      stream.on('data', () => {})

      stream.write(makeFile('gulp.png'))
      stream.end()
      return result
    })
  })

  describe('errorOnUnusedImage', () => {
    it('should emit error when image not used', () => {
      let cb
      const result = new Promise(resolve => {
        cb = resolve
      })

      const config = [
        {
          name: 'gulp.png'
        },
        {
          name: 'notused.png'
        }
      ]
      const stream = responsive(config)

      stream.on('error', err => {
        assert(
          /Available images do not match the following config/.test(err.message)
        )
        cb()
      })

      stream.on('data', () => {})

      stream.write(makeFile('gulp.png'))
      stream.end()
      return result
    })

    it('should not emit error when image not used and `errorOnUnusedImage` is false', () => {
      let cb
      const result = new Promise(resolve => {
        cb = resolve
      })

      const config = [
        {
          name: 'gulp.png'
        }
      ]
      const stream = responsive(config, {
        errorOnUnusedImage: false
      })

      stream.on('error', err => {
        throw err
      })

      stream.on('end', cb)

      stream.on('data', () => {})

      stream.write(makeFile('gulp.png'))
      stream.write(makeFile('unused.png', 'gulp.png'))
      stream.end()
      return result
    })
  })

  describe('unsupported image format', () => {
    it('should emit error if image format is unsupported', () => {
      let cb
      const result = new Promise(resolve => {
        cb = resolve
      })

      const config = [
        {
          name: 'unsupported.png'
        }
      ]
      const stream = responsive(config)

      stream.on('error', err => {
        assert(/File `unsupported.png`/.test(err.message))
        cb()
      })

      stream.on('data', () => {})

      stream.write(makeFile('unsupported.png', '../../README.md'))
      stream.end()
      return result
    })
  })
})
