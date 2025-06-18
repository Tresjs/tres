import { createEventHook, useRafFn } from '@vueuse/core'
import { Clock } from 'three'

export interface RenderLoopContext { delta: number, elapsed: number }

type RenderFunction = (notifyFrameRendered: () => void) => void

// TODO explain
export const useRenderLoop = (
  defaultRenderFunction: RenderFunction,
  notifyFrameRendered: () => void,
) => {
  const clock = new Clock()

  let renderFn: (notifyFrameRendered: () => void) => void = defaultRenderFunction

  const eventHooks = {
    beforeRender: createEventHook<RenderLoopContext>(),
    afterRender: createEventHook<RenderLoopContext>(),
  }

  const { pause, resume, isActive } = useRafFn(() => {
    const getContextWithClock = (): RenderLoopContext => ({
      delta: clock.getDelta(),
      elapsed: clock.getElapsedTime(),
    })

    eventHooks.beforeRender.trigger(getContextWithClock())
    renderFn(notifyFrameRendered)
    eventHooks.afterRender.trigger(getContextWithClock())
  }, {
    immediate: false,
  })

  const start = () => {
    clock.start()
    resume()
  }

  const stop = () => {
    clock.stop()
    pause()
  }

  const replaceRenderFunction = (render: RenderFunction) => {
    renderFn = render
  }

  return {
    start,
    stop,
    isActive,
    onBeforeRender: eventHooks.beforeRender.on,
    onAfterRender: eventHooks.afterRender.on,
    replaceRenderFunction,
  }
}
