import type { Ref } from 'vue'
import { ref, unref } from 'vue'
import { Clock, MathUtils } from 'three'
import type { Fn } from '@vueuse/core'
import type { Callback, PriorityEventHookOn } from '../utils/createPriorityEventHook'
import { createPriorityEventHook } from '../utils/createPriorityEventHook'

export type LoopStage = 'before' | 'render' | 'after'

export interface LoopCallback {
  delta: number
  elapsed: number
  clock: Clock
}

export interface RendererLoop {
  loopId: string
  register: (callback: Fn, stage: LoopStage, index?: number) => Partial<PriorityEventHookOn<LoopCallback>>
  start: () => void
  stop: () => void
  pause: () => void
  resume: () => void
  pauseRender: () => void
  resumeRender: () => void
  isActive: Ref<boolean>
  isRenderPaused: Ref<boolean>
  setContext: (newContext: Record<string, any>) => void
}

export function createRenderLoop(): RendererLoop {
  const clock = new Clock(false)
  const isActive = ref(false)
  const isRenderPaused = ref(false)
  let animationFrameId: number
  const loopId = MathUtils.generateUUID()
  let defaultRenderFn: Callback<LoopCallback> | null = null
  const subscribersBefore = createPriorityEventHook<LoopCallback>()
  const subscriberRender = createPriorityEventHook<LoopCallback>()
  const subscribersAfter = createPriorityEventHook<LoopCallback>()

  // Context to be passed to callbacks
  let context: Record<string, any> = {}

  function setContext(newContext: Record<string, any>) {
    context = newContext
  }

  function registerCallback(callback: Callback<LoopCallback>, stage: 'before' | 'render' | 'after', index = 0): Partial<PriorityEventHookOn<LoopCallback>> {
    switch (stage) {
      case 'before':
        return subscribersBefore.on(callback, index)
      case 'render':
        if (!defaultRenderFn) {
          defaultRenderFn = callback
        }
        subscriberRender.dispose()
        return subscriberRender.on(callback)
      case 'after':
        return subscribersAfter.on(callback, index)
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
    const snapshotCtx = {
      camera: unref(context.camera),
      scene: unref(context.scene),
      renderer: unref(context.renderer),
      raycaster: unref(context.raycaster),
      controls: unref(context.controls),
      invalidate: context.invalidate,
      advance: context.advance,
    }
    const params = { delta, elapsed, clock, ...snapshotCtx }

    if (isActive.value) {
      subscribersBefore.trigger(params)
    }

    if (!isRenderPaused.value) {
      if (subscriberRender.count) {
        subscriberRender.trigger(params)
      }
      else {
        if (defaultRenderFn) {
          defaultRenderFn(params) // <-- keep the default render function separate
        }
      }
    }

    if (isActive.value) {
      subscribersAfter.trigger(params)
    }

    animationFrameId = requestAnimationFrame(loop)
  }

  return {
    loopId,
    register: (callback: Fn, stage: 'before' | 'render' | 'after', index) => registerCallback(callback, stage, index),
    start,
    stop,
    pause,
    resume,
    pauseRender,
    resumeRender,
    isRenderPaused,
    isActive,
    setContext,
  }
}
