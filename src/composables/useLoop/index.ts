import type { Clock } from 'three'
import type { EventHookCallback as Callback } from '../../utils/createPriorityEventHook'
import type { TresContext } from '../useTresContextProvider'
import { createBindableProvider } from './createBindableProvider'
import type { Loop, LoopBindArg } from './Loop'
import { create as createLoop } from './Loop'

export interface TresLoopCallbackArg { tresContext: TresContext, delta: number, elapsed: number, clock: Clock }
export type TresLoopCallback = Callback<TresLoopCallbackArg>
export type TresLoopBindArg = LoopBindArg<TresLoopCallbackArg>

const tresLoopProvider = createBindableProvider<TresLoopBindArg>(
  createLoop<TresLoopCallbackArg>,
  Symbol('useLoop'),
)

export function useLoop(fn?: TresLoopCallback, priority = 0) {
  const d = tresLoopProvider.get() as Loop<TresLoopCallbackArg>
  const off: () => void = fn ? d.hook.on(fn, priority).off : () => {}
  return { off, resume: d.resume, pause: d.pause, isActive: d.isActive }
}

export function bindUseLoop(args: TresLoopBindArg) {
  const d = tresLoopProvider.bind(args) as Loop<TresLoopCallbackArg>
  return {
    trigger: d.trigger,
    dispose: d.dispose,
  }
}

export function useRenderLoop() {
  const loop = tresLoopProvider.get() as Loop<TresLoopCallbackArg>

  return {
    onBeforeLoop: (fn: TresLoopCallback) => {
      const off = fn ? loop.hook.on(fn, Number.NEGATIVE_INFINITY).off : () => {}
      return { off, resume: loop.resume, pause: loop.pause, isActive: loop.isActive }
    },
    onLoop: (fn: TresLoopCallback) => {
      const off = fn ? loop.hook.on(fn, 0).off : () => {}
      return { off, resume: loop.resume, pause: loop.pause, isActive: loop.isActive }
    },
    onAfterLoop: (fn: TresLoopCallback) => {
      const off = fn
        ? loop._compat_v3_afterLoopEventHook.on(fn, 0).off
        : () => {}
      return { off, resume: loop.resume, pause: loop.pause, isActive: loop.isActive }
    },
  }
}
