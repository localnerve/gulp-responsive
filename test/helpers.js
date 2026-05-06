import assert from 'node:assert'
import path from 'node:path'
import fs from 'node:fs'
import Vinyl from 'vinyl'

const thisDirname = import.meta.dirname

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
