// NOTE: Maintained for compatiblity with the v3 API
// TODO: Deprecate and remove

import type { Clock } from 'three'
import type { EventHookOn, IsAny, type Pausable } from '@vueuse/core'
import { getAndProvideUseLoop } from '../useLoop'

export interface RenderLoop {
  delta: number
  elapsed: number
  clock: Clock
}

type Callback<T> = IsAny<T> extends true
  ? (param: any) => void
  : (
      [T] extends [void]
        ? () => void
        : (param: T) => void
    )

export interface UseRenderLoopReturn extends Pausable {
  onBeforeLoop: EventHookOn<RenderLoop>
  onLoop: EventHookOn<RenderLoop>
  onAfterLoop: EventHookOn<RenderLoop>
}

export const useRenderLoop = () => {
  const result = getAndProvideUseLoop()
  return {
    onBeforeLoop: (fn: Callback<RenderLoop>) => result.onUpdate(fn, Number.NEGATIVE_INFINITY),
    onLoop: (fn: Callback<RenderLoop>) => result.onUpdate(fn, 0),
    onAfterLoop: (fn: Callback<RenderLoop>) => result.onAfter(fn, 0),
    isActive: result.isActive,
    pause: result.pause,
    resume: result.resume,
  } as UseRenderLoopReturn
}
