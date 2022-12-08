import { App, ref, Component, Ref } from 'vue'
import * as THREE from 'three'
import { useInstanceCreator } from '/@/core'
import { useLogger } from '/@/composables'
import { TresCatalogue } from '/@/types'

const catalogue: Ref<TresCatalogue> = ref({ ...THREE, uuid: THREE.MathUtils.generateUUID() })

delete catalogue.value.Scene

let localApp: App
export function useCatalogue(app?: App, prefix = 'Tres') {
  const { logMessage, logError } = useLogger()
  if (!localApp && app) {
    localApp = app
  }
  const { createComponentInstances } = useInstanceCreator(prefix)

  const extend = (objects: any) => {
    if (!objects) {
      logError('No objects provided to extend catalogue')
      return
    }
    catalogue.value = Object.assign(catalogue.value, objects)
    const components = createComponentInstances(ref(objects))
    logMessage('Adding objects to catalogue', { objects, catalogue: catalogue.value.uuid })

    if (localApp) {
      components.forEach(([key, cmp]) => {
        // If the component is not already registered, register it
        if (!localApp._context.components[key as string]) {
          localApp.component(key as string, cmp as Component)
        }
      })
    }
  }

  return {
    extend,
    catalogue,
  }
}
