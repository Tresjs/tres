import { isString } from '@vueuse/core'
import * as THREE from 'three'

import { createRenderer } from 'vue'
import { extend } from './catalogue'
import { nodeOps } from './nodeOps'

function normalizeContainer(container: Element | ShadowRoot | string): Element | null {
  if (isString(container)) {
    const res = document.querySelector(container)
    /*  if (__DEV__ && !res) {
      console.warn(`Failed to mount app: mount target selector "${container}" returned null.`)
    } */
    return res
  }
  /* if (__DEV__ && window.ShadowRoot && container instanceof window.ShadowRoot && container.mode === 'closed') {
    console.warn(`mounting on a ShadowRoot with \`{mode: "closed"}\` may lead to unpredictable bugs`)
  } */
  return container as any
}

export const { createApp } = createRenderer(nodeOps)

export const createTres = slots => {
  const app = createApp(internalFnComponent)
  function internalFnComponent() {
    return slots.default()
  }

  const { mount } = app
  app.mount = containerOrSelector => {
    const container = normalizeContainer(containerOrSelector)
    if (!container) return
    if (container instanceof Element) {
      container.removeAttribute('v-cloak')
      container.setAttribute('data-v-app', '')
    }
    mount(container, false, false)
  }

  return app
}

extend(THREE)

export default { createTres, extend }
