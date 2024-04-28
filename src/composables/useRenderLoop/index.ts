import type { EventHookOn, Fn } from '@vueuse/core'
import { createEventHook, useRafFn } from '@vueuse/core'
import type { Ref } from 'vue'
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

export const useRenderLoop = (): UseRenderLoopReturn => {
  // TODO: add migration guide link here
  return {
    onBeforeLoop: onBeforeLoop.on,
    onLoop: onLoop.on,
    onAfterLoop: onAfterLoop.on,
    pause,
    resume,
    isActive,
  }
}
