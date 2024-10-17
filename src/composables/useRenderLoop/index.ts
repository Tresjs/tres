import type { EventHookOn, Fn } from '@vueuse/core'
import type { Ref } from 'vue'
import { createEventHook, useRafFn } from '@vueuse/core'
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

let startedOnce = false
export const useRenderLoop = (): UseRenderLoopReturn => {
  if (!startedOnce) {
    // NOTE: `useRenderLoop` is not started by default
    // in order not to waste user resources. Instead, we'll
    // start the loop the first time the user uses
    // `useRenderLoop`.
    startedOnce = true
    resume()
  }
  return {
    onBeforeLoop: onBeforeLoop.on,
    onLoop: onLoop.on,
    onAfterLoop: onAfterLoop.on,
    pause,
    resume,
    isActive,
  }
}
