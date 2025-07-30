import type { App } from 'vue'
import TresCanvas from './components/TresCanvas.vue'
import { disposeObject3D as dispose } from './utils'
import { normalizeColor, normalizeVectorFlexibleParam } from './utils/normalize'
import templateCompilerOptions from './utils/template-compiler-options'

export * from './components'
export * from './composables'
export * from './core/catalogue'
export * from './devtools'
export * from './directives'
export * from './types'
export * from './utils/graph'
export * from './utils/logger'

export interface TresOptions {
  extends?: Record<string, unknown>
}
export interface TresPlugin {
  [key: string]: any
  install: (app: App, options?: TresOptions) => void
}

const plugin: TresPlugin = {
  install(app: App) {
    // Register core components
    app.component('TresCanvas', TresCanvas)
  },
}

export default plugin

export {
  dispose,
  normalizeColor,
  normalizeVectorFlexibleParam,
  templateCompilerOptions,
}

export type { VectorFlexibleParams } from './utils/normalize'
