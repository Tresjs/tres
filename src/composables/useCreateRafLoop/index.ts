import { createEventHook, useRafFn } from '@vueuse/core'
import { Clock } from 'three'

export interface RafLoopContext { delta: number, elapsed: number }

type CycleFunction = (notifySuccess: () => void) => void

/**
 * @param defaultFunction the default function that is called before after the after event hook is triggered and after the before is triggered.
 * @param notifySuccess a callback that should be called to indicate a successfull cycle.
 */
export const useCreateRafLoop = (
  defaultFunction: CycleFunction,
  notifySuccess: () => void,
) => {
  const clock = new Clock()

  let cycleFn: CycleFunction = defaultFunction

  const eventHooks = {
    before: createEventHook<RafLoopContext>(),
    after: createEventHook<RafLoopContext>(),
  }

  const { pause, resume, isActive } = useRafFn(() => {
    const getContextWithClock = (): RafLoopContext => ({
      delta: clock.getDelta(),
      elapsed: clock.getElapsedTime(),
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

  const replaceCycleFunction = (fn: CycleFunction) => {
    cycleFn = fn
  }

  return {
    start,
    stop,
    isActive,
    onBeforeCycle: eventHooks.before.on,
    onCycle: eventHooks.after.on,
    replaceCycleFunction,
  }
}
