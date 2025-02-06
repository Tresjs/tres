import type { EventHook, EventHookOn, IsAny } from '@vueuse/core'
import { createEventHook } from '@vueuse/core'

type Callback<T> =
  IsAny<T> extends true
    ? (param: any) => void
    : [T] extends [void]
        ? () => void
        : (param: T) => void

export function createReadyEventHook<T>(
  getIsReady: () => boolean,
  triggerParams: T,
  pollIntervalMs = 100,
): EventHook<T> & { cancel: () => void } {
  pollIntervalMs = pollIntervalMs <= 0 ? 100 : pollIntervalMs
  const hook = createEventHook()
  // NOTE: This hook will likely be long-lived and
  // we don't want to interfere with garbage collection
  // in the meantime.
  // Keep a set of `offFns` and call them after `getIsReady`
  // in order to remove them from the `hook`.
  const offFns = new Set<() => void>()
  let ready = false
  let cancelled = false
  let timeoutId: ReturnType<typeof setTimeout> | null = null

  function doReadyTest() {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    if (!cancelled && !ready && getIsReady()) {
      hook.trigger(triggerParams)
      offFns.forEach(offFn => offFn())
      offFns.clear()
      ready = true
    }
    else if (!cancelled && !ready) {
      timeoutId = setTimeout(doReadyTest, pollIntervalMs)
    }
  }

  function cancel() {
    cancelled = true
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
  }

  if (import.meta.hot) {
    import.meta.hot.on('vite:afterUpdate', () => {
      ready = false
      doReadyTest()
    })
  }

  doReadyTest()

  const triggerSingleCallback = (callback: Callback<T>, ...args: [T]) => {
    callback(...args)
  }

  const onOrCall: EventHookOn<T> = (callback) => {
    if (!ready) {
      const onFn = hook.on(callback)

      if (!import.meta.hot) {
        // NOTE: We must keep callbacks around for HMR.
        // But if it doesn't exist, remove callbacks.
        offFns.add(onFn.off)
      }
      return hook.on(callback)
    }
    else {
      triggerSingleCallback(callback, triggerParams)
      return { off: () => {} }
    }
  }

  return {
    on: onOrCall,
    off: hook.off,
    trigger: hook.trigger,
    clear: hook.clear,
    cancel,
  }
}
