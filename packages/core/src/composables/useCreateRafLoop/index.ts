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
    const context: RafLoopContext = {
      delta: clock.getDelta(), // do not call getDelta individually for before and after event hooks as it resets the delta and leads to incorrect delta values (see issue #1323)
      elapsed: clock.elapsedTime,
    }

    eventHooks.before.trigger(context)
    cycleFn()
    eventHooks.after.trigger(context)
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
