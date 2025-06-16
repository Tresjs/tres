import { createEventHook, useRafFn } from '@vueuse/core'
import { Clock } from 'three'

export interface RenderLoopContext { delta: number, elapsed: number }

export const useRenderLoop = (
  defaultRenderFunction: () => void, // TODO think about allowing nextFrame() style
) => { // TODO think about name
  const clock = new Clock()

  let renderFn = defaultRenderFunction

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
    renderFn()
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

  const replaceRenderFunction = (render: () => void) => {
    renderFn = render
  }

  return {
    start,
    stop, // TODO does it even make sense to stop?
    isActive,
    onBeforeRender: eventHooks.beforeRender.on,
    onAfterRender: eventHooks.afterRender.on,
    replaceRenderFunction,
  }
}
