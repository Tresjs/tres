import type { EventDispatcher, Raycaster, WebGLRenderer } from 'three'
import { unref } from 'vue'
import type { TresCamera, TresScene } from '../../types'
import { useTresContext } from '../useTresContextProvider'
import type { LoopCallback, LoopCallbackParams } from '../../core/loop'
import type { SizesType } from '../useSizes'

export interface LoopParams extends LoopCallbackParams {
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

  function onBeforeRender(cb: Fn, index = 0) {
    const wrappedCallback = (params: LoopCallbackParams) => {
      cb({ ...params, camera: unref(camera) as TresCamera, scene: unref(scene), renderer: unref(renderer), raycaster: unref(raycaster), controls: unref(controls), invalidate, advance })
    }
    loop.register(wrappedCallback as LoopCallback, 'before', index)
  }

  function render(cb: Fn) {
    const wrappedCallback = (params: LoopCallbackParams) => {
      cb({ ...params, camera: unref(camera) as TresCamera, scene: unref(scene), renderer: unref(renderer), raycaster: unref(raycaster), controls: unref(controls), invalidate, advance })
    }
    loop.register(wrappedCallback as LoopCallback, 'render')
  }

  function onAfterRender(cb: Fn, index = 0) {
    const wrappedCallback = (params: LoopCallbackParams) => {
      cb({ ...params, camera: unref(camera) as TresCamera, scene: unref(scene), renderer: unref(renderer), raycaster: unref(raycaster), controls: unref(controls), invalidate, advance })
    }
    loop.register(wrappedCallback as LoopCallback, 'after', index)
  }

  return {
    pause: loop.pause,
    resume: loop.resume,
    isActive: loop.isActive,
    onBeforeRender,
    render,
    onAfterRender,
  }
}
