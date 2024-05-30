import { useTresContext } from '../useTresContextProvider'
import type { LoopCallbackFn } from './../../core/loop'

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
    camera,
    scene,
    renderer,
    raycaster,
    controls,
    invalidate,
    advance,
  })

  function onBeforeRender(cb: LoopCallbackFn, index = 0) {
    return loop.register(cb, 'before', index)
  }

  function render(cb: LoopCallbackFn) {
    return loop.register(cb, 'render')
  }

  function onAfterRender(cb: LoopCallbackFn, index = 0) {
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
