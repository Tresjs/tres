import { useEventBus } from '@vueuse/core'
import { getCurrentInstance, inject, nextTick, provide } from 'vue'
import type { Clock } from 'three'
import type { TresContext } from '../useTresContextProvider'
import type { Loop } from './createLoop'
import { createLoop } from './createLoop'

interface TresLoopCallbackArg {
  context: TresContext
  delta: number
  elapsed: number
  clock: Clock
}

type TresLoop = Loop<TresLoopCallbackArg>
type TresLoopCallback = (arg: TresLoopCallbackArg) => void

export function useLoop(fn?: TresLoopCallback, priority = 0) {
  const loop = getLoop()
  const off = fn ? loop.updateHook.on(fn, priority).off : () => {}
  return {
    off,
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

const USE_LOOP_INJECTION_SYMBOL = Symbol('useLoop')

export function getLoop() {
  const loop: TresLoop | undefined = inject(USE_LOOP_INJECTION_SYMBOL)
  if (loop) {
    return loop
  }
  else {
    throw new Error('Loop can only be used inside a TresCanvas')
  }
}
