import { inject, provide } from 'vue'
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

const USE_LOOP_INJECTION_SYMBOL = Symbol('useLoop')

export function provideLoop<CallbackArg>(arg: LoopBindArg<CallbackArg>) {
  const loop: TresLoop = createLoop<CallbackArg>(arg)
  provide(USE_LOOP_INJECTION_SYMBOL, loop)
  return loop
}

export function getLoop() {
  const loop: TresLoop | undefined = inject(USE_LOOP_INJECTION_SYMBOL)
  if (loop) {
    return loop
  }
  else {
    throw new Error('Loop can only be used inside a TresCanvas')
  }
}
