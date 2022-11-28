import { createEventHook, EventHookOn, Fn, useRafFn } from '@vueuse/core'
import { Clock } from 'three'
import { Ref } from 'vue'

export interface RenderLoop {
  delta: number
  elapsed: number
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

const { pause, resume, isActive } = useRafFn(
  () => {
    const elapsed = clock.getElapsedTime()
    const delta = clock.getDelta()

    onBeforeLoop.trigger({ delta, elapsed })
    onLoop.trigger({ delta, elapsed })
    onAfterLoop.trigger({ delta, elapsed })
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
