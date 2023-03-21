import * as THREE from 'three'

import { createRenderer, Slots } from 'vue'
import { extend } from './catalogue'
import { nodeOps } from './nodeOps'

export const { createApp } = createRenderer(nodeOps)

export const createTres = (slots: Slots) => {
  const app = createApp(internalFnComponent)
  function internalFnComponent() {
    return slots && slots.default ? slots.default() : []
  }
  return app
}

extend(THREE)

export default { createTres, extend }
