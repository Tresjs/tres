import { type ShallowRef, computed, shallowRef } from 'vue'
import type { PriorityEventHook } from '../../utils/createPriorityEventHook'
import { createPriorityEventHook } from '../../utils/createPriorityEventHook'
import type { Loop } from './createLoop'

/**
 * Not intended for end users. Use `useLoop` instead.
 *
 * `createRedoLoop` creates a loop interface that records what
 * happens to it, then it can play that back onto another loop.
 *
 * We will use this to pretend that we have a loop, when we don't:
 *
 * <script setup>
 * useLoop() // <-- no loop yet
 * </script>
 * <template>
 * <TresCanvas /> // <-- now there's a loop
 * </template>
 * @returns a `Loop` that records and repeats operations onto another `Loop`
 */
export function createRedoLoop<CallbackArg>() {
  const redos: (() => void)[] = []
  // NOTE:
  // The `loop` is whatever Loop (pretend or real) is
  // driving our returned interface.
  //
  // To support the API, we must export an `isActive` ref.
  // It needs to watch for changes to the current `loop`'s
  // pause/resume status.
  //
  // This means our `loop` must be reactive, in order for
  // Vue to watch for changes to both it and the value.
  //
  const loopIsActive = shallowRef(false)
  const loop: ShallowRef<Loop<CallbackArg>> = shallowRef({
    _compat_v3_afterLoopEventHook: createPriorityEventHook<CallbackArg>(),
    updateHook: createPriorityEventHook<CallbackArg>(),
    renderTakeoverHook: createPriorityEventHook<CallbackArg>(),
    pausable: {
      resume: () => { loopIsActive.value = true },
      pause: () => { loopIsActive.value = false },
      isActive: loopIsActive,
    },
    trigger: () => {},
    dispose: () => false,
  })

  const isActive = computed(() => loop.value.pausable.isActive.value)

  let isCapturingRedos = true

  function doAndRedo(fn: () => void) {
    fn()
    if (isCapturingRedos) {
      redos.push(fn)
    }
  }

  type _Compat_v3_afterLoopEventHookKey = '_compat_v3_afterLoopEventHook'
  type UpdateHookPriorityEventKey = 'updateHook'
  type RenderTakeoverPriorityEventKey = 'renderTakeoverHook'
  type PriorityEventKey = _Compat_v3_afterLoopEventHookKey | UpdateHookPriorityEventKey | RenderTakeoverPriorityEventKey

  function createDoAndRedoableHook(name: PriorityEventKey): PriorityEventHook<CallbackArg> {
    return {
      on: (fn, priority = 0) => {
        doAndRedo(() => loop.value[name].on(fn, priority))
        return { off: () => doAndRedo(() => { loop.value[name].off(fn) }) }
      },
      off: (fn) => {
        doAndRedo(() => loop.value[name].off(fn))
      },
      get count() { return loop.value[name].count },
      trigger: () => loop.value[name].trigger(),
      dispose: () => doAndRedo(() => { loop.value[name].dispose() }),
    }
  }

  return {
    _compat_v3_afterLoopEventHook: createDoAndRedoableHook('_compat_v3_afterLoopEventHook'),
    renderTakeoverHook: createDoAndRedoableHook('renderTakeoverHook'),
    updateHook: createDoAndRedoableHook('updateHook'),
    pausable: {
      resume: () => doAndRedo(() => { loop.value.pausable.resume() }),
      pause: () => doAndRedo(() => { loop.value.pausable.pause() }),
      isActive,
    },
    trigger: () => {},
    dispose: () => false,
    redoOnto: (targetLoop: Loop<CallbackArg>) => {
      isCapturingRedos = false
      const formerBackingLoop = loop.value
      loop.value = targetLoop
      for (const redo of redos) { redo() }
      redos.length = 0
      formerBackingLoop.dispose()
    },
  }
}
