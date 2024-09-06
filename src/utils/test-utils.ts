import { createApp } from 'vue'
import type { Fn } from '@vueuse/core'

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
