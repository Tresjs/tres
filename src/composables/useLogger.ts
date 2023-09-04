/* eslint-disable no-console */
export const isProd = import.meta.env.MODE === 'production'

const logPrefix = '[TresJS ▲ ■ ●] '

interface LoggerComposition {
  logError: (message: string, error?: Error | ErrorEvent) => void
  logWarning: (message: string) => void
  logMessage: (name: string, value: any) => void
}

export function useLogger(): LoggerComposition {
  function logError(message: string, error?: Error | ErrorEvent) {
    console.error(`${logPrefix} ${message}`, error || '')
  }

  function logWarning(message: string) {
    console.warn(`${logPrefix} ${message}`)
  }

  function logMessage(name: string, value: any) {
    if (!isProd) {
      console.log(`${logPrefix} - ${name}:`, value)
    }
  }
  /*eslint-enable no-console */

  return {
    logError,
    logWarning,
    logMessage,
  }
}
