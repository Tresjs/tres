import { type Pausable, useRafFn } from '@vueuse/core'
import { createPriorityEventHook } from '../../utils/createPriorityEventHook'

/**
 * Loop
 * Internal type for creating and updating `useLoop`.
 *
 * Not intended to be provided as-is to the end user.
 * Use `useLoop` instead.
 */
export type Loop<CallbackArg> = ReturnType<typeof createLoop<CallbackArg>>
export interface LoopBindArg<CallbackArg> {
  callbackArg: CallbackArg
  defaultRender?: (callbackArg: CallbackArg) => void
  onBeforeLoop?: (callbackArg: CallbackArg) => void
  onAfterLoop?: (callbackArg: CallbackArg) => void
  pausable?: Pausable
}

export function createLoop<CallbackArg>(loopBindArg: LoopBindArg<CallbackArg>) {
  const defaultRender = loopBindArg.defaultRender ?? (() => {})
  const onBeforeLoop = loopBindArg.onBeforeLoop ?? (() => {})
  const onAfterLoop = loopBindArg.onAfterLoop ?? (() => {})
  const callbackArg = loopBindArg.callbackArg
  const updateHook = createPriorityEventHook<CallbackArg>()
  const renderTakeoverHook = createPriorityEventHook<CallbackArg>()
  const __compat_v3_afterLoopEventHook = createPriorityEventHook<CallbackArg>()

  const trigger = () => {
    onBeforeLoop(callbackArg)
    updateHook.trigger(callbackArg)
    if (renderTakeoverHook.count > 0) {
      // NOTE: Assume that if the user wants to take over rendering,
      // they will have inserted a function in renderHook.
      // If that's the case, don't call the default render.
      renderTakeoverHook.trigger(callbackArg)
    }
    else {
      defaultRender(callbackArg)
    }
    __compat_v3_afterLoopEventHook.trigger(callbackArg)
    onAfterLoop(callbackArg)
  }

  const pausable: Pausable = loopBindArg.pausable ?? useRafFn(trigger)

  const loop = {
    _compat_v3_afterLoopEventHook: createPriorityEventHook<CallbackArg>(),
    updateHook,
    renderTakeoverHook,
    pausable,
    trigger,
    dispose: () => false,
  }

  loop.dispose = () => {
    loop.pausable.pause()
    loop.pausable.pause = () => {}
    loop.pausable.resume = () => {}
    loop.updateHook.dispose()
    loop.renderTakeoverHook.dispose()
    loop._compat_v3_afterLoopEventHook.dispose()
    loop.trigger = () => {}
    return true
  }

  return loop
}
