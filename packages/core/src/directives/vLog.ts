import type { TresObject } from '../types'

export const vLog = {
  mounted: (el: TresObject, binding: { arg: string }) => {
    if (binding.arg) {
    // eslint-disable-next-line no-console
      console.log(`v-log:${binding.arg}`, el[binding.arg])
      return
    }
    // eslint-disable-next-line no-console
    console.log('v-log', el)
  },
}
