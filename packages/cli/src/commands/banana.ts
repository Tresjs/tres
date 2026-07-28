import type { CommandHandler } from '../registry'

const banana: CommandHandler = function (options: { count: number }) {
  // eslint-disable-next-line no-console
  console.log('🍌'.repeat(options.count))
}

export default banana
