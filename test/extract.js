import { describe, it } from 'node:test'
import responsive from '../lib/index.js'
import { makeFile, assertFile } from './helpers.js'

describe('gulp-responsive', () => {
  function runTest (config, cb) {
    const stream = responsive(config)
    stream.on('end', function () {
      cb()
    })
    stream.on('data', function (file) {
      assertFile(file)
    })
    stream.on('error', function (e) {
      cb(e)
    })
    stream.write(makeFile('gulp.png'))
    stream.end()
  }

  it('should let you extract before resize', () => {
    const config = [
      {
        name: 'gulp.png',
        extractBeforeResize: { top: 0, left: 0, width: 10, height: 10 }
      }
    ]

    return new Promise((resolve, reject) => {
      runTest(config, err => {
        if (err) return reject(err)
        resolve()
      })
    })
  })

  it('should let you extract after resize', () => {
    const config = [
      {
        name: 'gulp.png',
        extractAfterResize: { top: 0, left: 0, width: 10, height: 10 }
      }
    ]

    return new Promise ((resolve, reject) => {
      runTest(config, err => {
        if (err) return reject(err)
        resolve()
      })
    })
  })
})
