import { useTresContext } from '..'
import { createPriorityEventHook } from '../../utils/createPriorityEventHook'
import type { RafLoopContext } from '../useCreateRafLoop'
import type { TresPartialContext } from '../useTres'
import { useTres } from '../useTres'

export type LoopContext = RafLoopContext & TresPartialContext

/**
 * Composable that provides control over the render loop and animation lifecycle.
 */
export const useLoop = () => {
  const tresContext = useTres()
  const { renderer: rendererManager } = useTresContext()

  const eventHookBeforeRender = createPriorityEventHook<LoopContext>()
  const eventHookAfterRender = createPriorityEventHook<LoopContext>()

  rendererManager.loop.onBeforeLoop((loopContext) => {
    eventHookBeforeRender.trigger({ ...tresContext, ...loopContext })
  })

  rendererManager.loop.onLoop((loopContext) => {
    eventHookAfterRender.trigger({ ...tresContext, ...loopContext })
  })

  const render = rendererManager.replaceRenderFunction

  return {
    stop: rendererManager.loop.stop,
    start: rendererManager.loop.start,
    isActive: rendererManager.loop.isActive,
    onBeforeRender: eventHookBeforeRender.on,
    onRender: eventHookAfterRender.on,
    render,
  }
}
