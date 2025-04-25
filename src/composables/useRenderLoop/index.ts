import type { UseRafFnOptions } from '@vueuse/core'
import { createEventHook, useRafFn } from '@vueuse/core'
import { Clock } from 'three'

export interface RenderLoop {
  delta: number
  elapsed: number
  clock: Clock
}

const clocksPerSceneUuid = new Map<string, Clock>()

const getRandomString = () => crypto?.randomUUID // check if method is available in browser
  ? crypto.randomUUID()
  : Math.random().toString()

export const useRenderLoop = ({
  loopId = getRandomString(),
  options,
}: {
  loopId?: string
  options?: UseRafFnOptions
} = {}) => {
  const onBeforeLoop = createEventHook<RenderLoop>()
  const onLoop = createEventHook<RenderLoop>()
  const onAfterLoop = createEventHook<RenderLoop>()

  if (!clocksPerSceneUuid.has(loopId)) {
    clocksPerSceneUuid.set(loopId, new Clock())
  }

  const clock = clocksPerSceneUuid.get(loopId)!

  let delta = 0
  let elapsed = 0

  onAfterLoop.on(() => {
    delta = clock.getDelta()
    elapsed = clock.getElapsedTime()
  })

  const pausable = useRafFn(
    () => {
      onBeforeLoop.trigger({ delta, elapsed, clock })
      onLoop.trigger({ delta, elapsed, clock })
      onAfterLoop.trigger({ delta, elapsed, clock })
    },
    options,
  )

  return {
    onBeforeLoop: onBeforeLoop.on,
    onLoop: onLoop.on,
    onAfterLoop: onAfterLoop.on,
    ...pausable,
  }
}
