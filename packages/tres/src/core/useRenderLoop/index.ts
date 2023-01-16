import { createEventHook, EventHookOn, Fn, useRafFn } from '@vueuse/core'
import { Clock } from 'three'
import { Ref } from 'vue'

export interface RenderLoop {
  delta: number
  elapsed: number
  clock: Clock
  dt: number
}

export interface UseRenderLoopReturn {
  onBeforeLoop: EventHookOn<RenderLoop>
  onLoop: EventHookOn<RenderLoop>
  onAfterLoop: EventHookOn<RenderLoop>
  pause: Fn
  resume: Fn
  isActive: Ref<boolean>
}

const onBeforeLoop = createEventHook<RenderLoop>()
const onLoop = createEventHook<RenderLoop>()
const onAfterLoop = createEventHook<RenderLoop>()

console.count('clock')
const clock = new Clock()

let delta = 0

const { pause, resume, isActive } = useRafFn(
  ({ delta: dt }) => {
    const elapsed = clock.getElapsedTime()

    onBeforeLoop.trigger({ delta, elapsed, clock, dt })
    onLoop.trigger({ delta, elapsed, clock, dt })
    onAfterLoop.trigger({ delta, elapsed, clock, dt })

    delta = clock.getDelta()
  },
  { immediate: false },
)

export function useRenderLoop(): UseRenderLoopReturn {
  return {
    onBeforeLoop: onBeforeLoop.on,
    onLoop: onLoop.on,
    onAfterLoop: onAfterLoop.on,
    pause,
    resume,
    isActive,
  }
}
