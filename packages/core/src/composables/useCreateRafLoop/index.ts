import { createEventHook, useRafFn } from '@vueuse/core'
import { Timer } from 'three'

export interface RafLoopContext { delta: number, elapsed: number }

/**
 * @param cycleFn the function that is called before the after event hook is triggered and after the before event hook is triggered.
 */
export const useCreateRafLoop = (cycleFn: () => void) => {
  const timer = new Timer()

  const eventHooks = {
    before: createEventHook<RafLoopContext>(),
    after: createEventHook<RafLoopContext>(),
  }

  const { pause, resume, isActive } = useRafFn(() => {
    timer.update() // must be called once per frame before getDelta/getElapsed
    const context: RafLoopContext = {
      delta: timer.getDelta(), // do not call getDelta individually for before and after event hooks as it resets the delta and leads to incorrect delta values (see issue #1323)
      elapsed: timer.getElapsed(),
    }

    eventHooks.before.trigger(context)
    cycleFn()
    eventHooks.after.trigger(context)
  }, {
    immediate: false,
  })

  const start = () => {
    // connect() enables Page Visibility API to prevent large delta spikes when the
    // tab is hidden; it requires a document reference. Guard for SSR/test environments.
    if (typeof document !== 'undefined') {
      timer.connect(document)
    }
    resume()
  }

  const stop = () => {
    timer.disconnect()
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
