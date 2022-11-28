import { App, Component } from 'vue'
import { TresCanvas } from '/@/core/useRenderer/component'
import { Scene } from '/@/core/useScene/component'
import { useCatalogue, useInstanceCreator } from '/@/core'
export * from '/@/core'
export * from './keys'

export interface TresOptions {
  prefix?: string
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
    const { catalogue } = useCatalogue()
    const { createComponentInstances } = useInstanceCreator(prefix)
    const components = createComponentInstances(catalogue)
    components.forEach(([key, cmp]) => {
      app.component(key as string, cmp as Component)
    })
  },
}

export default plugin
