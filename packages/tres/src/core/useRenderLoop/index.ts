import { createEventHook, EventHookOn, Fn, useRafFn } from '@vueuse/core'
import { Ref } from 'vue'
import { Clock } from 'three'

export interface RenderLoop {
  delta: number
  elapsed: number
  clock: Clock
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

const clock = new Clock()
let delta = 0
let elapsed = 0

const { pause, resume, isActive } = useRafFn(
  () => {
    onBeforeLoop.trigger({ delta, elapsed, clock })
    onLoop.trigger({ delta, elapsed, clock })
    onAfterLoop.trigger({ delta, elapsed, clock })
  },
  { immediate: false },
)

onAfterLoop.on(() => {
  delta = clock.getDelta()
  elapsed = clock.getElapsedTime()
})

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
