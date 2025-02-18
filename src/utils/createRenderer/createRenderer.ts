import type { TresContext } from 'src/composables'
import type { Renderer } from 'src/types'
import { ACESFilmicToneMapping, WebGLRenderer } from 'three'
import * as is from '../is'

export async function createRenderer(ctx: TresContext) {
  if (ctx?.props?.renderer) {
    const fnOrRenderer = ctx.props.renderer
    if (typeof fnOrRenderer === 'function') {
      return await fnOrRenderer(ctx)
    }
    else {
      return fnOrRenderer
    }
  }
  const rendererConstructorArgs = {
    ...(is.obj(ctx.props?.renderer) ? ctx.props.renderer : {}),
    canvas: ctx.canvas.value,
  }
  const renderer = new WebGLRenderer(rendererConstructorArgs)
  renderer.toneMapping = ACESFilmicToneMapping
  return renderer as Renderer
}
