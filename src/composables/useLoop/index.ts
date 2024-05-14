import { unref } from 'vue'
import type { Fn } from '@vueuse/core'
import type { TresCamera } from '../../types'
import { useTresContext } from '../useTresContextProvider'

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

  // Pass context to loop
  loop.setContext({
    camera: unref(camera) as TresCamera,
    scene: unref(scene),
    renderer: unref(renderer),
    raycaster: unref(raycaster),
    controls: unref(controls),
    invalidate,
    advance,
  })

  function onBeforeRender(cb: Fn, index = 0) {
    return loop.register(cb, 'before', index)
  }

  function render(cb: Fn) {
    return loop.register(cb, 'render')
  }

  function onAfterRender(cb: Fn, index = 0) {
    return loop.register(cb, 'after', index)
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
