import { App, ref, Component, Ref } from 'vue'
import * as THREE from 'three'
import { useInstanceCreator } from '/@/core'
import { useLogger } from '../../iternal'
import { TresCatalogue } from '/@/types'

const catalogue: Ref<TresCatalogue> = ref({ ...THREE, uuid: THREE.MathUtils.generateUUID() })

delete catalogue.value.Scene

let localApp: App

/**
 * State for the catalogue of THREE objects
 *
 * ```ts
 * const { catalogue } = useCatalogue()
 *
 * console.log(catalogue.value.Mesh) // Mesh
 * ```
 *
 * @export
 * @param {App} [app]
 * @param {string} [prefix='Tres']
 * @return {*}
 */
export function useCatalogue(app?: App, prefix = 'Tres') {
  const { logError } = useLogger()
  if (!localApp && app) {
    localApp = app
  }
  const { createComponentInstances } = useInstanceCreator(prefix)

  /**
   * Extend the catalogue with new THREE objects
   *
   * ```ts
   * const { catalog, extend } = useCatalogue()
   *
   * extend({ MyObject: { foo: 'bar' } })
   *
   * console.log(catalog.value.MyObject.foo) // bar
   * ```
   *
   * @param {*} objects
   */
  const extend = (objects: any) => {
    if (!objects) {
      logError('No objects provided to extend catalogue')
      return
    }
    catalogue.value = Object.assign(catalogue.value, objects)
    const components = createComponentInstances(ref(objects))

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
