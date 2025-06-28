import type { Fn } from '@vueuse/core'
import { createApp } from 'vue'

export function withSetup(composable: Fn) {
  let result
  const app = createApp({
    setup() {
      result = composable()
      // suppress missing template warning
      return () => null
    },
  })
  app.mount(document.createElement('div'))
  // return the result and the app instance
  // for testing provide / unmount
  return [result, app]
}
