import type { TresContext } from 'src/composables'
import type { Renderer } from 'src/types'
import { ACESFilmicToneMapping, WebGLRenderer } from 'three'

export async function createRenderer(ctx: TresContext, rendererParameters: Record<string, unknown> = {}) {
  if (ctx?.props?.renderer) {
    const fnOrRenderer = ctx.props.renderer
    if (typeof fnOrRenderer === 'function') {
      return await fnOrRenderer(ctx, rendererParameters)
    }
    else {
      return fnOrRenderer
    }
  }
  const renderer = new WebGLRenderer({ ...rendererParameters })
  renderer.toneMapping = ACESFilmicToneMapping
  return renderer as Renderer
}
