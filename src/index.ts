import type { App } from 'vue'
import TresCanvas from './components/TresCanvas.vue'
import { disposeObject3D as dispose } from './utils/index.js'
import { normalizeColor, normalizeVectorFlexibleParam } from './utils/normalize.js'
import templateCompilerOptions from './utils/template-compiler-options.js'

export * from './components/index.js'
export * from './composables/index.js'
export * from './core/catalogue.js'
export * from './core/loop.js'
export * from './directives/index.js'
export * from './types/index.js'

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

export type { VectorFlexibleParams } from './utils/normalize.js'
