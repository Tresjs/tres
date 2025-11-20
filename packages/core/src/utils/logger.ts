/**
 * Logger utility for TresJS
 * @module logger
 */

/* eslint-disable no-console */
// Resolve runtime mode in both browser (Vite) and Node (when Vite bundles config)
function resolveRuntimeMode(): string {
  // import.meta may be undefined when this file is executed in Node during Vite config bundling
  try {
    // Using optional chaining to avoid ReferenceErrors when import.meta is not defined
    const modeFromImportMeta = (import.meta as any)?.env?.MODE as string | undefined
    if (modeFromImportMeta) { return modeFromImportMeta }
  }
  catch {
    // ignore – fall back to process.env
  }
  // Fallback for Node contexts
  return typeof process !== 'undefined' && process.env && process.env.NODE_ENV
    ? process.env.NODE_ENV
    : 'production'
}

export const isProd = resolveRuntimeMode() === 'production'

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
