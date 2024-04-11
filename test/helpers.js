import assert from 'assert'
import path from 'path'
import fs from 'fs'
import Vinyl from 'vinyl'
import * as url from 'url'

const thisDirname = url.fileURLToPath(new URL('.', import.meta.url))

export function makeFile (name, file) {
  if (!file) {
    file = name
  }
  return new Vinyl({
    base: path.join(thisDirname, '/fixtures'),
    path: path.join(thisDirname, '/fixtures/', name),
    contents: fs.readFileSync(path.join(thisDirname, '/fixtures/', file))
  })
}

export function assertFile (file) {
  assert(file)
  assert(file.base)
  assert(file.path)
  assert(file.contents)
}
