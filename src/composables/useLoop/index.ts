import { useTresContext } from '..'
import { createPriorityEventHook } from '../../utils/createPriorityEventHook'
import type { LoopContext as RafLoopContext } from '../useCreateRafLoop'
import type { TresPartialContext } from '../useTres'
import { useTres } from '../useTres'

export type LoopContext = RafLoopContext & TresPartialContext

// TODO write explanation -> syntax sugar for useTresContext.renderer.loop + context
export const useLoop = () => {
  const tresContext = useTres()
  const { renderer: rendererManager } = useTresContext()

  const eventHookBeforeRender = createPriorityEventHook<LoopContext>()
  const eventHookAfterRender = createPriorityEventHook<LoopContext>()

  rendererManager.loop.onBeforeCycle((loopContext) => {
    eventHookBeforeRender.trigger({ ...tresContext, ...loopContext })
  })

  rendererManager.loop.onCycle((loopContext) => {
    eventHookAfterRender.trigger({ ...tresContext, ...loopContext })
  })

  const render = (fn: () => void) => {
    rendererManager.loop.replaceCycleFunction(fn)
  }

  return {
    stop: rendererManager.loop.stop,
    start: rendererManager.loop.start,
    isActive: rendererManager.loop.isActive,
    onBeforeRender: eventHookBeforeRender.on,
    onRender: eventHookAfterRender.on,
    render,
  }
}
