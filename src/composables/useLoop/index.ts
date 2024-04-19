import type { TresContext } from 'src'
import { inject, provide } from 'vue'
import type { Clock } from 'three'
import { createUseLoop } from './createLoop'

interface Time {
  delta: number
  elapsed: number
  clock: Clock
}

export interface EventParam extends Time {
  tresContext: TresContext
}

const INJECTION_KEY = Symbol('useLoop')

export const getAndProvideUseLoop = () => {
  let result = inject(INJECTION_KEY, createUseLoop, true)
  if (!result) {
    result = createUseLoop()
    provide(INJECTION_KEY, result)
  }
  return result
}

export const useLoop = (fn?: Event, priority = 0) => {
  const result = getAndProvideUseLoop()
  if (fn) {
    if (priority > 0) {
      result.onUpdate(fn, priority)
    }
    else {
      result.onRender(fn, priority)
    }
  }
  return {
    isActive: result.isActive,
    pause: () => result.pause(),
    resume: () => result.resume(),
  }
}

export const bindUseLoop = (props: BindUseLoopProp) => {
  let result = inject(INJECTION_KEY, createUseLoop, true)
  if (!result || result.isBound) {
    result = createUseLoop()
    provide(INJECTION_KEY, result)
  }
  result.bind(props)
  return result
}
