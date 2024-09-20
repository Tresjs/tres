import type { TresContext } from '../useTresContextProvider'
import { useTresContext } from '../useTresContextProvider'
import { createReadyEventHook } from './createReadyEventHook'

const ctxToUseTresReady = new WeakMap<
  TresContext,
  ReturnType<typeof createReadyEventHook<TresContext>>
>()

export function useTresReady(ctx?: TresContext) {
  ctx = ctx || useTresContext()
  if (ctxToUseTresReady.has(ctx)) {
    return ctxToUseTresReady.get(ctx)!
  }

  const MAX_READY_WAIT_MS = 100
  const start = Date.now()

  // NOTE: Consider Tres to be "ready" if either is true:
  // - MAX_READY_WAIT_MS has passed (assume Tres is intentionally degenerate)
  // - Tres is not degenerate
  //     - A renderer exists
  //     - A DOM element exists
  //     - The DOM element's height/width is not 0
  const getTresIsReady = () => {
    if (Date.now() - start >= MAX_READY_WAIT_MS) {
      return true
    }
    else {
      const renderer = ctx.renderer.value
      const domElement = renderer?.domElement || { width: 0, height: 0 }
      return !!(renderer && domElement.width > 0 && domElement.height > 0)
    }
  }

  const args = ctx as TresContext
  const result = createReadyEventHook(getTresIsReady, args)
  ctxToUseTresReady.set(ctx, result)

  return result
}

export function onTresReady(fn: (ctx: TresContext) => void) {
  const ctx = useTresContext()
  if (ctx) {
    if (ctxToUseTresReady.has(ctx)) {
      return ctxToUseTresReady.get(ctx)!.on(fn)
    }
    else {
      return useTresReady(ctx).on(fn)
    }
  }
}
