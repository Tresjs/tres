/**
 * Logger utility for TresJS
 * @module logger
 */

/* eslint-disable no-console */
export const isProd = import.meta.env.MODE === 'production'

const logPrefix = '[TresJS ▲ ■ ●] '

type OneOrMore<T> = { 0: T } & Array<T>

/**
 * Logs an error message with the TresJS prefix
 * @param args - Arguments to log
 */
export function logError(...args: OneOrMore<any>): void {
  if (typeof args[0] === 'string') {
    // NOTE: Don't break console string substitution
    args[0] = logPrefix + args[0]
  }
  else {
    args.unshift(logPrefix)
  }
  console.error(...args)
}

/**
 * Logs a warning message with the TresJS prefix
 * @param args - Arguments to log
 */
export function logWarning(...args: OneOrMore<any>): void {
  if (typeof args[0] === 'string') {
    // NOTE: Don't break console string substitution
    args[0] = logPrefix + args[0]
  }
  else {
    args.unshift(logPrefix)
  }
  console.warn(...args)
}

/**
 * Logs a message with the TresJS prefix (only in development mode)
 * @param name - Name of the message
 * @param value - Value to log
 */
export function logMessage(name: string, value: any): void {
  if (!isProd) {
    console.log(`${logPrefix} - ${name}:`, value)
  }
}
/* eslint-enable no-console */
