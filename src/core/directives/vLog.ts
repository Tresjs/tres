export const vLog = {
  updated: (el: any, binding: any) => {
    if (binding.arg) {
    // eslint-disable-next-line no-console
      console.log(`v-log:${binding.arg}`, el[binding.arg])
      return
    }
    // eslint-disable-next-line no-console
    console.log('v-log', el)
  },
}