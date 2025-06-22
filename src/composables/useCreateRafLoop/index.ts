import { createEventHook, useRafFn } from '@vueuse/core'
import { Clock } from 'three'

export interface RafLoopContext { delta: number, elapsed: number }

type LoopFunction = (notifySuccess: () => void) => void

/**
 * @param defaultFunction the default function that is called before after the after event hook is triggered and after the before is triggered.
 * @param notifySuccess a callback that should be called to indicate a successfull cycle.
 */
export const useCreateRafLoop = (
  defaultFunction: LoopFunction,
  notifySuccess: () => void,
) => {
  const clock = new Clock()

  let cycleFn: LoopFunction = defaultFunction

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
    cycleFn(notifySuccess)
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

  const replaceLoopFunction = (fn: LoopFunction) => {
    cycleFn = fn
  }

  return {
    start,
    stop,
    isActive,
    onBeforeLoop: eventHooks.before.on,
    onLoop: eventHooks.after.on,
    replaceLoopFunction,
  }
}
