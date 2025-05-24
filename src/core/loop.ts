import type { Fn } from '@vueuse/core'
import type { Camera, EventDispatcher, Raycaster, Scene, WebGLRenderer } from 'three'
import type { Ref } from 'vue'
import type { Callback } from '../utils/createPriorityEventHook'
import { Clock, MathUtils } from 'three'
import { ref, unref } from 'vue'
import { createPriorityEventHook } from '../utils/createPriorityEventHook'

export type LoopStage = 'before' | 'render' | 'after'

export interface LoopCallback {
  delta: number
  elapsed: number
  clock: Clock
}

export interface LoopCallbackWithCtx extends LoopCallback {
  camera: Camera
  scene: Scene
  renderer: WebGLRenderer
  raycaster: Raycaster
  controls: Ref<(EventDispatcher<object> & {
    enabled: boolean
  }) | null>
}

export type LoopCallbackFn = (params: LoopCallbackWithCtx) => void

export interface RendererLoop {
  loopId: string
  register: (callback: LoopCallbackFn, stage: LoopStage, index?: number) => { off: Fn }
  start: Fn
  stop: Fn
  pause: Fn
  resume: Fn
  pauseRender: Fn
  resumeRender: Fn
  isActive: Ref<boolean>
  isRenderPaused: Ref<boolean>
  setContext: (newContext: Record<string, any>) => void
  setReady: (isReady: boolean) => void
}

export function createRenderLoop(): RendererLoop {
  let isReady = true
  let isStopped = true
  let isPaused = false
  const clock = new Clock(false)
  const isActive = ref(clock.running)
  const isRenderPaused = ref(false)
  let animationFrameId: number
  const loopId = MathUtils.generateUUID()
  let defaultRenderFn: Callback<LoopCallbackWithCtx> | null = null
  const subscribersBefore = createPriorityEventHook<LoopCallbackWithCtx>()
  const subscriberRender = createPriorityEventHook<LoopCallbackWithCtx>()
  const subscribersAfter = createPriorityEventHook<LoopCallbackWithCtx>()

  _syncState()

  // Context to be passed to callbacks
  let context: Record<string, any> = {}

  function setContext(newContext: Record<string, any>) {
    context = newContext
  }

  function registerCallback(callback: LoopCallbackFn, stage: 'before' | 'render' | 'after', index = 0): { off: Fn } {
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
    // NOTE: `loop()` produces side effects on each call.
    // Those side effects are only desired if `isStopped` goes
    // from `true` to `false` below.  So while we don't need
    // a guard in `stop`, `resume`, and `pause`, we do need
    // a guard here.
    if (!isStopped) { return }
    isStopped = false
    _syncState()
    loop()
  }

  function stop() {
    isStopped = true
    _syncState()
    cancelAnimationFrame(animationFrameId)
  }

  function resume() {
    isPaused = false
    _syncState()
  }

  function pause() {
    isPaused = true
    _syncState()
  }

  function pauseRender() {
    isRenderPaused.value = true
  }

  function resumeRender() {
    isRenderPaused.value = false
  }

  function loop() {
    if (!isReady) {
      animationFrameId = requestAnimationFrame(loop)
      return
    }
    const delta = clock.getDelta()
    const elapsed = clock.getElapsedTime()
    const snapshotCtx = {
      camera: unref(context.camera?.activeCamera),
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

  function _syncState() {
    const shouldClockBeRunning = !isStopped && !isPaused
    if (clock.running !== shouldClockBeRunning) {
      if (!clock.running) {
        clock.start()
      }
      else {
        clock.stop()
      }
    }
    isActive.value = clock.running
  }

  return {
    loopId,
    register: (callback: LoopCallbackFn, stage: 'before' | 'render' | 'after', index) => registerCallback(callback, stage, index),
    start,
    stop,
    pause,
    resume,
    pauseRender,
    resumeRender,
    isRenderPaused,
    isActive,
    setContext,
    setReady: (b: boolean) => isReady = b,
  }
}
