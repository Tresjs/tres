export const isProd = import.meta.env.MODE === 'production'

const logPrefix = '[TresJS - Cientos ▲ ■ ♥] '

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
      // eslint-disable-next-line no-console
      console.log(`${logPrefix} - ${name}:`, value)
      // eslint-enabled
    }
  }

  return {
    logError,
    logWarning,
    logMessage,
  }
}
