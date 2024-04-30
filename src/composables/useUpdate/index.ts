import type { Fn } from '@vueuse/core'
import { useTresContext } from '../useTresContextProvider'

export function useUpdate(cb: (arg0: any) => void, index = 0) {
  // We force users to use `useRender` to take over the main loop, so if anyone uses
  // `useUpdate` with index 1, we will automatically change it to index 2 so
  // it doesn't interfere with the main loop

  const priority = index === 1 ? 2 : index
  const {
    camera,
    scene,
    renderer,
    loop,
  } = useTresContext()
  const wrappedCallback = (params: any) => {
    cb({ ...params, camera, scene, renderer })
  }
  loop.onLoop(wrappedCallback as Fn, priority)
  return {
    pause: loop.pause,
    resume: loop.resume,
    isActive: loop.isActive,
  }
}
