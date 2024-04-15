import type { EventHookOn, Fn } from '@vueuse/core'
import { createEventHook, useRafFn } from '@vueuse/core'
import { type Ref, inject, provide } from 'vue'
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

const INJECTION_KEY = Symbol('onRenderLoop')

function getNewRenderLoop() {
  const onBeforeLoop = createEventHook<RenderLoop>()
  const onLoop = createEventHook<RenderLoop>()
  const onAfterLoop = createEventHook<RenderLoop>()

  const clock = new Clock()
  let delta = 0
  let elapsed = 0

  onAfterLoop.on(() => {
    delta = clock.getDelta()
    elapsed = clock.getElapsedTime()
  })

  const { pause, resume, isActive } = useRafFn(
    () => {
      onBeforeLoop.trigger({ delta, elapsed, clock })
      onLoop.trigger({ delta, elapsed, clock })
      onAfterLoop.trigger({ delta, elapsed, clock })
    },
    { immediate: false },
  )

  const result = {
    onBeforeLoop: onBeforeLoop.on,
    onLoop: onLoop.on,
    onAfterLoop: onAfterLoop.on,
    pause,
    resume,
    isActive,
  }

  provide(INJECTION_KEY, result)
  return result
}

export const useRenderLoop = () => {
  return inject(INJECTION_KEY, getNewRenderLoop, true)
}
