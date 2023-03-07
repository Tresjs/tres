import { App, Component } from 'vue'
import { TresCanvas } from '/@/core/useRenderer/component'
import { Scene } from '/@/core/useScene/component'
import { useCatalogue, useInstanceCreator, useTres } from '/@/core'
export * from '/@/core'
export * from './keys'
export * from './types'
export { TresCanvas, Scene }

export interface TresOptions {
  prefix?: string
  extends?: Record<string, unknown>
}
export interface TresPlugin {
  [key: string]: any
  install: (app: App, options?: TresOptions) => void
}

const plugin: TresPlugin = {
  install(app: App, options) {
    const prefix = options?.prefix || 'Tres'

    // Register core components
    app.component(`${prefix}Canvas`, TresCanvas)
    app.component(`${prefix}Scene`, Scene)

    // Initialize catalogue
    const { catalogue, extend } = useCatalogue(app, prefix)
    app.provide('catalogue', catalogue)
    app.provide('extend', extend)
    app.provide('useTres', useTres())

    // Create components from catalogue
    const { createComponentInstances } = useInstanceCreator(prefix)
    const components = createComponentInstances(catalogue)

    components.forEach(([key, cmp]) => {
      app.component(key as string, cmp as Component)
    })
  },
}

export default plugin
