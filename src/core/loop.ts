import type { Ref } from 'vue'
import { ref } from 'vue'
import { Clock, MathUtils } from 'three'
import type { Fn } from '@vueuse/core'

export type LoopStage = 'before' | 'render' | 'after'
export interface LoopCallbackParams {
  delta: number
  elapsed: number
  clock: Clock
}
export interface LoopCallback {
  (params: LoopCallbackParams): void
}

export interface RendererLoop {
  subscribersBefore: Map<number, Fn[]>
  subscribersRender: Map<number, Fn[]>
  subscribersAfter: Map<number, Fn[]>
  loopId: string
  register: (callback: LoopCallback, stage: LoopStage, index?: number) => void
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

  const subscribersBefore = new Map()
  const subscribersRender = new Map()
  const subscribersAfter = new Map()

  function registerCallback(callback: LoopCallback, stage: 'before' | 'render' | 'after', index = 0) {
    let targetMap
    if (stage === 'before') {
      targetMap = subscribersBefore
    }
    else if (stage === 'render') {
      targetMap = subscribersRender
    }
    else {
      targetMap = subscribersAfter
    }

    if (stage === 'render' && index === 0) {
      targetMap.set(index, [callback])
    }
    else {
      if (!targetMap.has(index)) {
        targetMap.set(index, [])
      }
      targetMap.get(index).push(callback)
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

    const executeCallbacks = (subscribers: Map<number, Fn[]>) => {
      Array.from(subscribers.keys())
        .sort((a, b) => a - b) // Ensure numerical order
        .forEach((index) => {
          subscribers?.get(index)?.forEach((callback: LoopCallback) => {
            callback({ delta, elapsed, clock })
          })
        })
    }
    if (isActive.value) {
      executeCallbacks(subscribersBefore)
    }

    if (!isRenderPaused.value) {
      executeCallbacks(subscribersRender)
    }

    if (isActive.value) {
      executeCallbacks(subscribersAfter)
    }

    animationFrameId = requestAnimationFrame(loop)
  }

  return {
    subscribersBefore,
    subscribersRender,
    subscribersAfter,
    loopId,
    register: (callback: LoopCallback, stage: 'before' | 'render' | 'after', index) => registerCallback(callback, stage, index),
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
