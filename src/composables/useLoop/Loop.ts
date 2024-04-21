import { type Pausable, useRafFn } from '@vueuse/core'
import { readonly, ref } from 'vue'
import { createPriorityEventHook } from '../../utils/createPriorityEventHook'

/**
 * Loop
 * Internal type for creating and updating `useLoop`.
 *
 * Not intended to be provided as-is to the end user.
 * Use `useLoop` instead.
 */
export type Loop<CallbackArg> = ReturnType<typeof create<CallbackArg>>
export interface LoopBindArg<CallbackArg> {
  callbackArg: CallbackArg
  defaultRender?: (callbackArg: CallbackArg) => void
  onBeforeLoop?: (callbackArg: CallbackArg) => void
  onAfterLoop?: (callbackArg: CallbackArg) => void
  pausable?: Pausable
}

export function create<CallbackArg>() {
  const hook = createPriorityEventHook<CallbackArg>()
  const isActive = ref(false)
  const pausable: { value: Pausable } = {
    value: { isActive, resume: () => {}, pause: () => {} },
  }

  const result = {
    _compat_v3_afterLoopEventHook: createPriorityEventHook<CallbackArg>(),
    hook,
    isActive: readonly(isActive),
    pausable,
    on: hook.on,
    resume: () => { isActive.value = true; pausable.value.resume() },
    pause: () => { isActive.value = false; pausable.value.pause() },
    trigger: () => {},
    bind: (() => false) as (arg: LoopBindArg<CallbackArg>) => boolean,
    dispose: () => false,
  }

  result.bind = (arg: LoopBindArg<CallbackArg>) => doBind(result, arg)
  result.dispose = () => doDispose(result)

  return result
}

function doBind<CallbackArg>(d: Loop<CallbackArg>, loopBindArg: LoopBindArg<CallbackArg>): boolean {
  const defaultRender = loopBindArg.defaultRender ?? (() => {})
  const onBeforeLoop = loopBindArg.onBeforeLoop ?? (() => {})
  const onAfterLoop = loopBindArg.onAfterLoop ?? (() => {})
  const callbackArg = loopBindArg.callbackArg
  const hook = d.hook
  const __compat_v3_afterLoopEventHook = d._compat_v3_afterLoopEventHook

  d.trigger = () => {
    onBeforeLoop(callbackArg)
    hook.trigger(callbackArg)
    if (hook.countPositive <= 0) {
      // NOTE: Assume that if the user wants to take over rendering,
      // they will have inserted a positive priority fn in hook.
      // If that's the case, don't call the default render.
      defaultRender(callbackArg)
    }
    __compat_v3_afterLoopEventHook.trigger(callbackArg)
    onAfterLoop(callbackArg)
  }

  d.pausable.value = loopBindArg.pausable ?? useRafFn(d.trigger)
  // NOTE: Make the pausable state match what users have set.
  // Issue: https://github.com/Tresjs/tres/issues/251
  if (d.isActive) {
    d.pausable.value.resume()
  }
  else {
    d.pausable.value.pause()
  }

  return true
}

function doDispose<T>(d: Loop<T>): boolean {
  d.pause()
  d.hook.dispose()
  d._compat_v3_afterLoopEventHook.dispose()
  d.trigger = () => {}
  d.resume = () => {}
  return true
}
