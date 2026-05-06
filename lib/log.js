import { styleText } from 'node:util'

/**
 * Colorized console logger.
 *
 * @param {String} prefix - prefix message
 * @param {String|Array} color - The node util inspect color string(s)
 * @param {String} message - The log message
 */
export default function log(prefix, color, message) {
  const colors = {
    blue: '\x1b[34m',
    reset: '\x1b[0m'
  }

  const now = new Date()
  const TN = i => i < 10 ? `0${i}` : i
  const timestring = `${TN(now.getHours())}:${TN(now.getMinutes())}:${TN(now.getSeconds())}`

  console.log(
    `[${colors.blue}${timestring}${colors.reset}] ${prefix} ${styleText(color, message)}${colors.reset}`
  )
}