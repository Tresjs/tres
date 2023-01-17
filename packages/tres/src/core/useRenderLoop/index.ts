import { TresState } from './../useTres/index'
import { useTres } from '/@/core/'
import { createEventHook, EventHookOn, Fn, useRafFn } from '@vueuse/core'
import { Ref } from 'vue'

export interface RenderLoop {
  delta: number
  elapsed: number
  state: TresState
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

let delta = 0
let elapsed = 0
const { pause, resume, isActive } = useRafFn(
  () => {
    const { state } = useTres()
    onBeforeLoop.trigger({ delta, elapsed, state })
    onLoop.trigger({ delta, elapsed, state })
    onAfterLoop.trigger({ delta, elapsed, state })
  },
  { immediate: false },
)

onAfterLoop.on(() => {
  const { state } = useTres()
  delta = state.clock.getDelta()
  elapsed = state.clock.getElapsedTime()
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
