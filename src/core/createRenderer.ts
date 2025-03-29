import { WebGLRenderer } from 'three'
import * as is from '../utils/is'
import type { TresContext } from '../composables'
import type { TresRenderer } from '../types'
import type { TresCanvasProps } from '../components/TresCanvas.vue'

export async function createRenderer(ctx: TresContext, options: TresCanvasProps): Promise<TresRenderer> {
  if (options.renderer) {
    const fnOrRenderer = options.renderer
    if (typeof fnOrRenderer === 'function') {
      return await fnOrRenderer(ctx)
    }
    return fnOrRenderer
  }

  const rendererConstructorArgs = {
    ...(is.obj(options) ? options : {}),
    canvas: ctx.canvas.value,
  }
  const renderer = new WebGLRenderer(rendererConstructorArgs)

  return renderer
}
