import { createEventHook, useRafFn } from '@vueuse/core'
import { Clock } from 'three'

export interface ClockState {
  delta: number
  elapsed: number
  clock: Clock
}

const clocksPerSceneUuid = new Map<string, Clock>()

const getRandomString = () => crypto?.randomUUID // check if method is available in browser
  ? crypto.randomUUID()
  : Math.random().toString()

export const useRenderLoop = (loopId = getRandomString()) => {
  const onBeforeLoop = createEventHook<ClockState>()
  const onLoop = createEventHook<ClockState>()
  const onAfterLoop = createEventHook<ClockState>()

  if (!clocksPerSceneUuid.has(loopId)) {
    clocksPerSceneUuid.set(loopId, new Clock()) // TODO this creates a memory leak. Fix this.
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
    { immediate: false },
  )

  return {
    onBeforeLoop: onBeforeLoop.on,
    onLoop: onLoop.on,
    onAfterLoop: onAfterLoop.on,
    ...pausable,
  }
}
