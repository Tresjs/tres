/* eslint-disable no-console */
export const isProd = import.meta.env.MODE === 'production'

const logPrefix = '[TresJS ▲ ■ ●] '

interface LoggerComposition {
  err: (message: string, error?: Error | ErrorEvent) => void
  warn: (message: string) => void
  msg: (name: string, value: any) => void
}

export function useLogger(): LoggerComposition {
  function err(message: string, error?: Error | ErrorEvent) {
    console.error(`${logPrefix} ${message}`, error || '')
  }

  function warn(message: string) {
    console.warn(`${logPrefix} ${message}`)
  }

  function msg(name: string, value: any) {
    if (!isProd) {
      console.log(`${logPrefix} - ${name}:`, value)
    }
  }
  /*eslint-enable no-console */

  return {
    err,
    warn,
    msg,
  }
}
