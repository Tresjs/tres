import type { Fn } from '@vueuse/core'

import { useTresContext } from '../useTresContextProvider'

export function useRender(cb: (arg0: any) => void) {
  const {
    camera,
    scene,
    renderer,
    loop,
    invalidate,
  } = useTresContext()
  const wrappedCallback = (params: any) => {
    cb({ ...params, camera, scene, renderer, invalidate })
  }
  loop.onLoop(wrappedCallback as Fn, 2)
  return {
    pause: loop.pauseRender,
    resume: loop.resumeRender,
    isActive: loop.isActive,
  }
}
