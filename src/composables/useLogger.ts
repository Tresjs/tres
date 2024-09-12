/* eslint-disable no-console */
export const isProd = import.meta.env.MODE === 'production'

const logPrefix = '[TresJS ▲ ■ ●] '

type OneOrMore<T> = { 0: T } & Array<T>

interface LoggerComposition {
  logError: (...args: OneOrMore<any>) => void
  logWarning: (...args: OneOrMore<any>) => void
  logMessage: (name: string, value: any) => void
}

function logError(...args: OneOrMore<any>) {
  if (typeof args[0] === 'string') {
    // NOTE: Don't break console string substitution
    args[0] = logPrefix + args[0]
  }
  else {
    args.unshift(logPrefix)
  }
  console.error(...args)
}

function logWarning(...args: OneOrMore<any>) {
  if (typeof args[0] === 'string') {
    // NOTE: Don't break console string substitution
    args[0] = logPrefix + args[0]
  }
  else {
    args.unshift(logPrefix)
  }
  console.warn(...args)
}

function logMessage(name: string, value: any) {
  if (!isProd) {
    console.log(`${logPrefix} - ${name}:`, value)
  }
}
/* eslint-enable no-console */
export function useLogger(): LoggerComposition {
  return {
    logError,
    logWarning,
    logMessage,
  }
}
