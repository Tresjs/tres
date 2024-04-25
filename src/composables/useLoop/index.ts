import { useEventBus } from '@vueuse/core'
import { getCurrentInstance, inject, nextTick, provide } from 'vue'
import type { Clock } from 'three'
import type { TresContext } from '../useTresContextProvider'
import type { Loop, LoopBindArg } from './createLoop'
import { createLoop } from './createLoop'
import { createRedoLoop } from './createRedoLoop'

interface TresLoopCallbackArg {
  context: TresContext
  delta: number
  elapsed: number
  clock: Clock
}
type TresLoop = Loop<TresLoopCallbackArg>
type TresLoopCallback = (arg: TresLoopCallbackArg) => void

const USE_LOOP_INJECTION_SYMBOL = Symbol('useLoop')

const isParentOf = (parent: any, child: any) => {
  if (!parent || !child) { return false }
  if (parent === child) { return false }
  while (child.parent && child !== parent) {
    child = child.parent
  }
  return child === parent
}

export function useLoop(fn?: TresLoopCallback, priority = 0) {
  const loop = getLoop()
  const off = fn ? loop.updateHook.on(fn, priority).off : () => {}
  return {
    off,
    ...loop.pausable,
  }
}

export function useRenderLoop() {
  const loop = getLoop()
  return {
    on: (fn: TresLoopCallback, priority = 0) => loop.updateHook.on(fn, priority).off,
    onBeforeLoop: (fn: TresLoopCallback) => loop.updateHook.on(fn, Number.NEGATIVE_INFINITY).off,
    onLoop: (fn: TresLoopCallback) => loop.updateHook.on(fn, 0).off,
    onAfterLoop: (fn: TresLoopCallback) => loop._compat_v3_afterLoopEventHook.on(fn, 0).off,
    ...loop.pausable,
  }
}

export function provideLoop<CallbackArg>(arg: LoopBindArg<CallbackArg>) {
  const loop: TresLoop = createLoop<CallbackArg>(arg)
  provide(USE_LOOP_INJECTION_SYMBOL, loop)
  // NOTE: Wait for next tick before `useEventBus`
  // so that components have a chance to mount
  // and register listeners.
  const bus = useEventBus<{ loop: TresLoop, instance: ReturnType<typeof getCurrentInstance> }>(USE_LOOP_INJECTION_SYMBOL)
  const emitArg = { loop, instance: getCurrentInstance() }
  nextTick(() => bus.emit(emitArg))
  return loop
}

export function getLoop() {
  const loop: TresLoop | undefined = inject(USE_LOOP_INJECTION_SYMBOL)
  if (loop) {
    // NOTE: We land here if we're inside a TresCanvas and the
    // loop is already provided. Just return the loop API.
    return loop
  }
  else {
    const tempLoop = createRedoLoop<TresLoopCallbackArg>()
    let hasLoop = false
    const bus = useEventBus<{ loop: TresLoop, instance: any }>(USE_LOOP_INJECTION_SYMBOL)
    const instance = getCurrentInstance()
    bus.on((arg) => {
      if (!hasLoop && isParentOf(instance, arg.instance)) {
        hasLoop = true
        tempLoop.redoOnto(arg.loop)
      }
    })
    return tempLoop
  }
}
