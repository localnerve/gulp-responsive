import { promises as fs } from 'node:fs'
import path from 'node:path'
import * as url from 'node:url'

const thisDirname = url.fileURLToPath(new URL('.', import.meta.url))

export async function parsePackageJson () {
  const dir = path.resolve(thisDirname, '..')
  const jsonText = await fs.readFile(
    path.join(dir, 'package.json'),
    { encoding: 'utf8' }
  )
  return JSON.parse(jsonText)
}

export default parsePackageJson
