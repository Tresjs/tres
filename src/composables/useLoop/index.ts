import type { EventDispatcher, Raycaster, WebGLRenderer } from 'three'
import { unref } from 'vue'
import type { TresCamera, TresScene } from '../../types'
import { useTresContext } from '../useTresContextProvider'
import type { LoopCallback } from '../../core/loop'
import type { SizesType } from '../useSizes'

export interface LoopParams extends LoopCallback {
  camera: TresCamera
  scene: TresScene
  renderer: WebGLRenderer
  invalidate: () => void
  advance: () => void
  raycaster: Raycaster
  controls: (EventDispatcher & { enabled: boolean })
  sizes: SizesType
}

export type Fn = (params: LoopParams) => void

export function useLoop() {
  const {
    camera,
    scene,
    renderer,
    loop,
    raycaster,
    controls,
    invalidate,
    advance,
  } = useTresContext()

  function wrapCallback(cb: Fn) {
    return (params: LoopCallback) => {
      cb({ ...params, camera: unref(camera) as TresCamera, scene: unref(scene), renderer: unref(renderer), raycaster: unref(raycaster), controls: unref(controls), invalidate, advance })
    }
  }

  function onBeforeRender(cb: Fn, index = 0) {
    const wrappedCallback = wrapCallback(cb)
    const { off } = loop.register(wrappedCallback, 'before', index)
    const wrappedOff = (cb: Fn) => off(wrapCallback(cb))
    return { off: wrappedOff }
  }

  function render(cb: Fn) {
    const wrappedCallback = wrapCallback(cb)
    const { off } = loop.register(wrappedCallback, 'render')
    const wrappedOff = (cb: Fn) => off(wrapCallback(cb))
    return { off: wrappedOff }
  }

  function onAfterRender(cb: Fn, index = 0) {
    const wrappedCallback = wrapCallback(cb)
    const { off } = loop.register(wrappedCallback, 'after', index)
    const wrappedOff = (cb: Fn) => off(wrapCallback(cb))
    return { off: wrappedOff }
  }

  return {
    pause: loop.pause,
    resume: loop.resume,
    pauseRender: loop.pauseRender,
    resumeRender: loop.resumeRender,
    isActive: loop.isActive,
    onBeforeRender,
    render,
    onAfterRender,
  }
}
