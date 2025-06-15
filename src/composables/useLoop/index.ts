import { createPriorityEventHook } from '../../utils/createPriorityEventHook'
import type { TresContext } from '../useTresContextProvider'
import { useTresContext } from '../useTresContextProvider'
import type { RenderLoopContext } from '../useRenderLoop'

type ContextParts = Pick<TresContext, 'camera' | 'scene' | 'controls' | 'events' | 'renderer'>
export type LoopContext = RenderLoopContext & ContextParts

// TODO write explanation
export const useLoop = () => {
  const tresContext = useTresContext()

  const tresContextParts: ContextParts = {
    camera: tresContext.camera,
    scene: tresContext.scene,
    renderer: tresContext.renderer,
    controls: tresContext.controls,
    events: tresContext.events,
  }

  const eventHookBeforeRender = createPriorityEventHook<LoopContext>()
  const eventHookAfterRender = createPriorityEventHook<LoopContext>()

  const rendererManager = tresContext.renderer

  rendererManager.loop.onBeforeRender((loopContext) => {
    eventHookBeforeRender.trigger({ ...tresContextParts, ...loopContext })
  })

  rendererManager.loop.onAfterRender((loopContext) => {
    eventHookAfterRender.trigger({ ...tresContextParts, ...loopContext })
  })

  const render = (fn: () => void) => {
    rendererManager.loop.replaceRenderFunction(fn)
  }

  return {
    stop: rendererManager.loop.stop,
    start: rendererManager.loop.start,
    isActive: rendererManager.loop.isActive,
    onBeforeRender: eventHookBeforeRender.on,
    onAfterRender: eventHookAfterRender.on,
    render, // TODO I'd call this replaceRenderFunction or similar
  }
}
