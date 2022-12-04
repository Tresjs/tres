import { useInstanceCreator } from '/@/core'
import { App, ref, Component, Ref } from 'vue'
import * as THREE from 'three'
import { TresCatalogue } from '/@/types'

const catalogue: Ref<TresCatalogue> = ref({ ...THREE })

delete catalogue.value.Scene

let localApp: App

export function useCatalogue(app?: App, prefix = 'Tres') {
  if (!localApp && app) {
    localApp = app
  }
  const { createComponentInstances } = useInstanceCreator(prefix)

  const extend = (objects: any) => {
    catalogue.value = Object.assign(catalogue.value, objects)
    const components = createComponentInstances(ref(objects))

    components.forEach(([key, cmp]) => {
      localApp.component(key as string, cmp as Component)
    })
  }

  return {
    extend,
    catalogue,
  }
}
