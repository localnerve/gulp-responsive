# 6.2.0

 - Update chalk to 5.4.1

# 6.1.6

- Update sharp to 0.33.5

# 6.1.4

- Update sharp to 0.33.4

# 6.1.2

- Update sharp to 0.33.3

# 6.1.1

- Update sharp to 0.33.2

# 6.1.0

- Update sharp to 0.33.1

# 6.0.1

- Update sharp to 0.32.6

# 6.0.0

- Switch to eslint
- Node 18+
- Update sharp to 0.32.5

# 5.0.0

- Update sharp to 0.32.1
- Update all dependencies
- Remove through2 dependency
- Switch to esm
- Node 16+

# 4.0.0 / 2023-02-10

- Update sharp to 0.31.3
- Update all dependencies, remove unused or replacable deps
- Node 14+

# 3.0.0 / 2019-10-12

- Suport for sharp `0.23.1` [#129](https://github.com/mahnunchik/gulp-responsive/pull/129)
- Remove support for Node.js 6 [#129](https://github.com/mahnunchik/gulp-responsive/pull/129)
- Support for Node.js 8,10,12 [#129](https://github.com/mahnunchik/gulp-responsive/pull/129)
- Refactor codebase [#129](https://github.com/mahnunchik/gulp-responsive/pull/129)
- Avoid renaming extname [#116](https://github.com/mahnunchik/gulp-responsive/pull/116)
- Fix value for chroma subsampling setting [#116](https://github.com/mahnunchik/gulp-responsive/pull/116)

# 2.6.0 / 2016-09-15

- add: `kernel` option
- rename: `interpolation` to `interpolator` option
- deprecate: `interpolation` option

  # 2.5.0 / 2016-06-01

- deps: sharp@0.16.0 http://sharp.dimens.io/en/stable/changelog/#v016-pencil
- deps: async@2.0.1
- deps: mocha@3.0.2

  # 2.4.0 / 2016-06-01

- deps: sharp@0.15.0 http://sharp.dimens.io/en/stable/changelog/#v015-outfit
- breaking: Existing sharpen API to accept sigma

  # 2.3.0 / 2016-04-15

- deps: sharp@0.14.0 http://sharp.dimens.io/en/stable/changelog/#v014-needle

  # 2.2.0 / 2016-03-18

- add: silent option
- add: stats option

  # 2.1.0 / 2016-02-18

- deps: sharp@0.13.0
- deps: lodash@4.5

  # 2.0.0 / 2016-01-09

- Version 2.0 https://github.com/mahnunchik/gulp-responsive/issues/23
- add: all sharp options
- add: better usage examples
- add: ability to transform format of output image (`format` option)
- remove: depricated options `strictMatchConfig` and `strictMatchImages`
- add: visibility to image manipulation process

  # 1.2.1 / 2015-08-18

- add: `skipOnEnlargement` option

  # 1.2.0 / 2015-08-15

- deps: sharp@0.11 through2@2

  # 1.1.0 / 2015-05-24

- add: `passThroughUnused` option to pass through unmatched files
- rename: options `strictMatchConfig` to `errorOnUnusedConfig` and `strictMatchImages` to `errorOnUnusedImage`
- deps: sharp@^0.10.0, rename@^1.0.3, async@^1.0.0

  # 1.0.7 / 2015-02-16

- add: `max` option, see [sharp#max](https://github.com/lovell/sharp#max)

  # 1.0.6 / 2015-02-08

- add: node 0.12 and latest iojs to travis

  # 1.0.5 / 2015-01-28

- update: sharp 0.9.0
- update: minimatch and lodash

  # 1.0.4 / 2014-11-23

- add: ability to use size as a percentage

  # 1.0.3 / 2014-11-19

- add: global config feature

  # 1.0.2 / 2014-11-11

- add: renaming feature by `rename` module https://www.npmjs.org/package/rename

# 1.0.1 / 2014-11-03

- add: config options: quality, progressiv, withMetadata, compressionLevel
- fix: merge config behavior

# 1.0.0 / 2014-10-29

- basic implementation
