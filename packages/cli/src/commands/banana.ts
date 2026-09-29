import type { CommandHandler } from '../registry'
import * as ui from '../ui'

const banana: CommandHandler = function (options: { count: number }) {
  ui.header('banana')
  ui.payload('🍌'.repeat(options.count))
}

export default banana
