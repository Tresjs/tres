import { App } from 'vue'
import TresCanvas from './components/TresCanvas.vue'
export * from './composables'
export * from './core/catalogue'
export * from './components'
export * from './types'
import { useTresContext, type TresState } from './provider'

import { normalizeColor, normalizeVectorFlexibleParam } from './utils/normalize'
import templateCompilerOptions from './utils/template-compiler-options'

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
    app.component(`TresCanvas`, TresCanvas)
  },
}

export default plugin

export { TresState, useTresContext, normalizeColor, normalizeVectorFlexibleParam, templateCompilerOptions }
