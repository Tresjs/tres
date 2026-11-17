import { tryOnScopeDispose } from '@vueuse/core'
import { effectScope } from 'vue'
import { useTresContext } from '..'
import type { Callback, PriorityEventHook } from '../../utils/createPriorityEventHook'
import { createPriorityEventHook } from '../../utils/createPriorityEventHook'
import type { RafLoopContext, useCreateRafLoop } from '../useCreateRafLoop'
import type { TresPartialContext } from '../useTres'
import { useTres } from '../useTres'

export type LoopContext = RafLoopContext & TresPartialContext

type RafLoop = ReturnType<typeof useCreateRafLoop>
type LoopHook = PriorityEventHook<LoopContext>

interface SharedLoopHooks {
  beforeRender: LoopHook
  render: LoopHook
  useLoopCallCount: number
}

const sharedLoopHooks = new WeakMap<RafLoop, SharedLoopHooks>()

const getSharedLoopHooks = (loop: RafLoop, tresContext: TresPartialContext) => {
  let hooks = sharedLoopHooks.get(loop)
  if (hooks) { return hooks }

  hooks = {
    beforeRender: createPriorityEventHook<LoopContext>(),
    render: createPriorityEventHook<LoopContext>(),
    useLoopCallCount: 0,
  }
  const { beforeRender, render } = hooks
  const forward = (hook: LoopHook) => (loopContext: RafLoopContext) => hook.trigger({ ...tresContext, ...loopContext })
  // Detached, or the listeners would be removed when the first component that calls useLoop unmounts.
  effectScope(true).run(() => {
    loop.onBeforeLoop(forward(beforeRender))
    loop.onLoop(forward(render))
  })
  sharedLoopHooks.set(loop, hooks)
  return hooks
}

/**
 * Composable that provides control over the render loop and animation lifecycle.
 */
export const useLoop = () => {
  const tresContext = useTres()
  const { renderer: rendererManager } = useTresContext()

  const hooks = getSharedLoopHooks(rendererManager.loop, tresContext)
  const callOrder = hooks.useLoopCallCount++

  // Callbacks registered outside a scope (a watch callback, a timer) must still stop when this component unmounts.
  const offs = new Set<() => void>()
  let disposed = false
  tryOnScopeDispose(() => {
    disposed = true
    offs.forEach(off => off())
  })

  const registerOn = (hook: LoopHook) => (fn: Callback<LoopContext>, priority = 0) => {
    if (disposed) { return { off: () => {} } }
    // A new wrapper per call, because the shared hook keeps one entry per function.
    const { off: removeFromHook } = hook.on((...args) => fn(...args), priority, callOrder)
    const off = () => {
      removeFromHook()
      offs.delete(off)
    }
    offs.add(off)
    // A child scope that stops before the component unmounts must also release its entry in offs.
    tryOnScopeDispose(off)
    return { off }
  }

  const render = rendererManager.replaceRenderFunction

  return {
    stop: rendererManager.loop.stop,
    start: rendererManager.loop.start,
    isActive: rendererManager.loop.isActive,
    onBeforeRender: registerOn(hooks.beforeRender),
    onRender: registerOn(hooks.render),
    render,
  }
}
