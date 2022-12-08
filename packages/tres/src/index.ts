import { App, Component } from 'vue'
import { TresCanvas } from '/@/core/useRenderer/component'
import { Scene } from '/@/core/useScene/component'
import { useCatalogue, useInstanceCreator } from '/@/core'
export * from '/@/core'
export * from './keys'
import { version } from '../package.json'
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
    app.component(`${prefix}Canvas`, TresCanvas)
    app.component(`${prefix}Scene`, Scene)
    const { catalogue, extend } = useCatalogue(app, prefix)
    app.provide('catalogue', catalogue)
    app.provide('extend', extend)
    const { createComponentInstances } = useInstanceCreator(prefix)
    const components = createComponentInstances(catalogue)
    /*  const components = createComponentInstances(
      options?.extends ? { ...catalogue, ...options.extends } : catalogue,
    ) */
    components.forEach(([key, cmp]) => {
      app.component(key as string, cmp as Component)
    })

    window.__TRES__ = {
      app,
      version,
    }
  },
}

export default plugin
