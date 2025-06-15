import { useRafFn } from '@vueuse/core'
import { createPriorityEventHook } from '../utils/createPriorityEventHook'
import { Clock } from 'three'

export const useCreateRenderLoop = (
  render: () => void, // TODO think about allowing nextFrame() style
) => { // TODO think about name
  interface HookContext { delta: number, elapsed: number }

  const clock = new Clock()

  let renderFn = render

  const eventHooks = {
    beforeRender: createPriorityEventHook<HookContext>(),
    afterRender: createPriorityEventHook<HookContext>(),
  }

  const { pause, resume, isActive } = useRafFn(() => {
    const getContextWithClock = (): HookContext => ({
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

  const replaceRenderFn = (render: () => void) => {
    renderFn = render
  }

  return {
    start,
    stop, // TODO does it even make sense to stop?
    isActive,
    onBeforeRender: eventHooks.beforeRender.on,
    onAfterRender: eventHooks.afterRender.on,
    replaceRenderFn,
  }
}
