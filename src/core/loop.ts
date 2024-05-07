import type { Ref } from 'vue'
import { ref } from 'vue'
import { Clock, MathUtils } from 'three'
import { createEventHook } from '@vueuse/core'
import type { Callback } from '../utils/createPriorityEventHook'
import { createPriorityEventHook } from '../utils/createPriorityEventHook'

export type LoopStage = 'before' | 'render' | 'after'

export interface LoopCallback {
  delta: number
  elapsed: number
  clock: Clock
}

export interface RendererLoop {
  loopId: string
  register: (callback: Callback<LoopCallback>, stage: LoopStage, index?: number) => void
  start: () => void
  stop: () => void
  pause: () => void
  resume: () => void
  pauseRender: () => void
  resumeRender: () => void
  isActive: Ref<boolean>
  isRenderPaused: Ref<boolean>
}

export function createRenderLoop(): RendererLoop {
  const clock = new Clock(false)
  const isActive = ref(false)
  const isRenderPaused = ref(false)
  let animationFrameId: number
  const loopId = MathUtils.generateUUID()

  const subscribersBefore = createPriorityEventHook<LoopCallback>()
  let subscriberRender = createEventHook<LoopCallback>()
  const subscribersAfter = createPriorityEventHook<LoopCallback>()

  function registerCallback(callback: Callback<LoopCallback>, stage: 'before' | 'render' | 'after', index = 0) {
    switch (stage) {
      case 'before':
        subscribersBefore.on(callback, index)
        return subscribersBefore
      case 'render':
        subscriberRender = createEventHook<LoopCallback>()
        subscriberRender.on(callback)
        return subscriberRender
      case 'after':
        subscribersAfter.on(callback, index)
        return subscribersAfter
    }
  }

  function start() {
    if (!isActive.value) {
      clock.start()
      isActive.value = true
      loop()
    }
  }

  function stop() {
    if (isActive.value) {
      clock.stop()
      cancelAnimationFrame(animationFrameId)
      isActive.value = false
    }
  }

  function pause() {
    clock.stop()
    isActive.value = false
  }

  function resume() {
    clock.start()
    isActive.value = true
  }

  function pauseRender() {
    isRenderPaused.value = true
  }

  function resumeRender() {
    isRenderPaused.value = false
  }

  function loop() {
    const delta = clock.getDelta()
    const elapsed = clock.getElapsedTime()

    if (isActive.value) {
      subscribersBefore.trigger({ delta, elapsed, clock })
    }

    if (!isRenderPaused.value) {
      subscriberRender.trigger({ delta, elapsed, clock })
    }

    if (isActive.value) {
      subscribersAfter.trigger({ delta, elapsed, clock })
    }

    animationFrameId = requestAnimationFrame(loop)
  }

  return {
    loopId,
    register: (callback: Callback<LoopCallback>, stage: 'before' | 'render' | 'after', index) => registerCallback(callback, stage, index),
    start,
    stop,
    pause,
    resume,
    pauseRender,
    resumeRender,
    isRenderPaused,
    isActive,
  }
}
