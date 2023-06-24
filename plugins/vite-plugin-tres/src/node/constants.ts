import pkg from '../../package.json' assert { type: 'json' }

export const VERSION = pkg.version as string
