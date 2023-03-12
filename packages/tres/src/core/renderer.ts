import * as THREE from 'three'

import { createRenderer } from 'vue'
import { extend } from './catalogue'
import { nodeOps } from './nodeOps'

export const { createApp } = createRenderer(nodeOps)

export const createTres = (...args) => {
  const app = createApp(...args)
  /*  const { mount } = app
  app.mount = (container: Element | string) => {} */

  return app
}

extend(THREE)

export default { createTres, extend }
