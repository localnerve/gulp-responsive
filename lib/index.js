import { Transform } from 'node:stream'
import { styleText } from 'node:util'
import { minimatch } from 'minimatch'
import PluginError from 'plugin-error'
import pkg from '#root/package.json' with { type: 'json' };
import sharpVinyl from './sharp.js'
import prepareConfig from './config.js'
import flog from './log.js'

export default function gulpResponsive (config, options) {
  const statistics = {
    total: 0,
    matched: 0,
    created: 0,
    unmatched: 0,
    unmatchedBlocked: 0,
    unmatchedPassed: 0
  }

  options = {
    errorOnUnusedConfig: true,
    errorOnUnusedImage: true,
    errorOnEnlargement: true,
    passThroughUnused: false,
    silent: false,
    stats: true,
    ...options
  }

  config = prepareConfig(config || [], options)

  async function getPluginName () {
    return pkg.name
  }

  async function transform (file, enc, done) {
    const PLUGIN_NAME = await getPluginName()
    const that = this

    if (file.isNull()) {
      this.push(file)
      return done()
    }

    if (file.isStream()) {
      return done(new PluginError(PLUGIN_NAME, 'Streaming not supported'))
    }

    statistics.total++
    const matched = config.filter(conf => minimatch(file.relative, conf.name))

    if (matched.length === 0) {
      statistics.unmatched++
      const message =
        `File \`${file.relative}\`: Image does not match any config`
      if (options.errorOnUnusedImage) {
        return done(new PluginError(PLUGIN_NAME, message))
      } else if (options.passThroughUnused) {
        this.push(file)
        statistics.unmatchedPassed++
        if (!options.silent) {
          flog(
            PLUGIN_NAME + ': (pass through without changes)',
            'magenta', message
          )
        }
        return done()
      }
      statistics.unmatchedBlocked++
      if (!options.silent) {
        flog(PLUGIN_NAME + ': (skip for processing)', 'magenta', message)
      }
      return done()
    }

    statistics.matched++

    const allPromises = []

    for (const conf of matched) {
      // config item matched (can be matched multiple times)
      conf.matched = true
      allPromises.push(sharpVinyl(file, conf, options))
    }

    try {
      const result = await Promise.all(allPromises)

      result.forEach(newFiles => {
        if (newFiles) {
          newFiles.forEach(f => that.push(f))
          statistics.created += newFiles.length
        }
      })
      done()
    } catch (error) {
      done(new PluginError(PLUGIN_NAME, error, { showStack: true }))
    }
  }

  async function flush (cb) {
    const PLUGIN_NAME = await getPluginName()
    const notMatched = config.filter((conf) => !conf.matched)

    if (options.stats && !(options.silent && statistics.created === 0)) {
      const msg =
        'Created ' +
        statistics.created +
        ' ' +
        statistics.created === 1 ? 'image' : 'images' +
        styleText(['dim', 'white'],
          ' (matched ' +
            statistics.matched +
            ' of ' +
            statistics.total +
            ' ' +
            statistics.total === 1 ? 'image' : 'images' +
            ')'
        )

      flog(PLUGIN_NAME + ':', 'green', msg)
    }

    if (
      notMatched.length > 0 &&
      (!options.silent || options.errorOnUnusedConfig)
    ) {
      let message = 'Available images do not match the following config:'
      notMatched.forEach(function (conf) {
        message += '\n  - `' + conf.name + '`'
      })
      if (options.errorOnUnusedConfig) {
        return cb(new PluginError(PLUGIN_NAME, message))
      } else {
        flog(PLUGIN_NAME + ':', 'magenta', message)
      }
    }
    cb()
  }

  return new Transform({
    objectMode: true,
    transform,
    flush
  })
}
