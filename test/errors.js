/* global describe, it */

import assert from 'assert'
import responsive from '../lib/index.js'
import { makeFile } from './helpers.js'

describe('gulp-responsive', function () {
  describe('errorOnEnlargement', function () {
    it('should emit error when image is enlarged', async function () {
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
      const stream = await responsive(config)

      stream.on('error', function (err) {
        assert(/Image enlargement is detected/.test(err.message))
        cb()
      })

      stream.on('data', function () {})

      stream.write(makeFile('gulp.png'))
      stream.end()
      return result
    })

    it('should emit error when image is enlarged by size in percentage', async function () {
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
      const stream = await responsive(config)

      stream.on('error', function (err) {
        assert(/Image enlargement is detected/.test(err.message))
        cb()
      })

      stream.on('data', function () {})

      stream.write(makeFile('gulp.png'))
      stream.end()
      return result
    })

    it('should not emit error when image is enlarged and errorOnEnlargement is false', async function () {
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
      const stream = await responsive(config, {
        errorOnEnlargement: false
      })

      stream.on('error', function (err) {
        throw err
      })

      stream.on('end', cb)

      stream.on('data', function () {})

      stream.write(makeFile('gulp.png'))
      stream.end()
      return result
    })
  })

  describe('errorOnUnusedConfig', function () {
    it('should emit error when config not used', async function () {
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
      const stream = await responsive(config)

      stream.on('error', function (err) {
        assert(
          /Available images do not match the following config/.test(err.message)
        )
        cb()
      })

      stream.on('data', function () {})

      stream.write(makeFile('gulp.png'))
      stream.end()
      return result
    })

    it('should not emit error when config not used and `errorOnUnusedConfig` is false', async function () {
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
      const stream = await responsive(config, {
        errorOnUnusedConfig: false
      })

      stream.on('error', function (err) {
        throw err
      })

      stream.on('end', cb)

      stream.on('data', function () {})

      stream.write(makeFile('gulp.png'))
      stream.end()
      return result
    })
  })

  describe('errorOnUnusedImage', function () {
    it('should emit error when image not used', async function () {
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
      const stream = await responsive(config)

      stream.on('error', function (err) {
        assert(
          /Available images do not match the following config/.test(err.message)
        )
        cb()
      })

      stream.on('data', function () {})

      stream.write(makeFile('gulp.png'))
      stream.end()
      return result
    })

    it('should not emit error when image not used and `errorOnUnusedImage` is false', async function () {
      let cb
      const result = new Promise(resolve => {
        cb = resolve
      })

      const config = [
        {
          name: 'gulp.png'
        }
      ]
      const stream = await responsive(config, {
        errorOnUnusedImage: false
      })

      stream.on('error', function (err) {
        throw err
      })

      stream.on('end', cb)

      stream.on('data', function () {})

      stream.write(makeFile('gulp.png'))
      stream.write(makeFile('unused.png', 'gulp.png'))
      stream.end()
      return result
    })
  })

  describe('unsupported image format', function () {
    it('should emit error if image format is unsupported', async function () {
      let cb
      const result = new Promise(resolve => {
        cb = resolve
      })

      const config = [
        {
          name: 'unsupported.png'
        }
      ]
      const stream = await responsive(config)

      stream.on('error', function (err) {
        assert(/File `unsupported.png`/.test(err.message))
        cb()
      })

      stream.on('data', function () {})

      stream.write(makeFile('unsupported.png', '../../README.md'))
      stream.end()
      return result
    })
  })
})
