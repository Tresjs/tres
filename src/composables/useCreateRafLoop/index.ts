import { createEventHook, useRafFn } from '@vueuse/core'
import { Clock } from 'three'

export interface RafLoopContext { delta: number, elapsed: number }

/**
 * @param cycleFn the function that is called before the after event hook is triggered and after the before event hook is triggered.
 */
export const useCreateRafLoop = (cycleFn: () => void) => {
  const clock = new Clock()

  const eventHooks = {
    before: createEventHook<RafLoopContext>(),
    after: createEventHook<RafLoopContext>(),
  }

  const { pause, resume, isActive } = useRafFn(() => {
    const getContextWithClock = (): RafLoopContext => ({
      delta: clock.getDelta(),
      elapsed: clock.elapsedTime,
    })

    eventHooks.before.trigger(getContextWithClock())
    cycleFn()
    eventHooks.after.trigger(getContextWithClock())
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

  return {
    start,
    stop,
    isActive,
    onBeforeLoop: eventHooks.before.on,
    onLoop: eventHooks.after.on,
  }
}
