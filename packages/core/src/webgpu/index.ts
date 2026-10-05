import type { App } from 'vue'
import type { TresPlugin } from '../index'
import TresCanvas from './TresCanvas.vue'

// Explicit exports below take precedence over the names re-exported here.
export * from '../index'
export { TresCanvas }
export type { TresWebGPUComponents } from './types'
export { useTres } from './useTres'
export type { TresWebGPUPartialContext } from './useTres'

const plugin: TresPlugin = {
  install(app: App) {
    app.component('TresCanvas', TresCanvas)
  },
}

export default plugin
