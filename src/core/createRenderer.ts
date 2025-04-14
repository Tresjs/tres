import { WebGLRenderer } from 'three'
import type { TresContext } from '../composables'
import type { TresRenderer } from '../types'
import type { TresCanvasProps } from '../components/TresCanvas.vue'
import { toValue } from 'vue'
import { isObject } from '../utils/is'

export async function createRenderer(ctx: TresContext, options: TresCanvasProps): Promise<TresRenderer> {
  if (options.renderer) {
    const fnOrRenderer = options.renderer
    if (typeof fnOrRenderer === 'function') {
      return await fnOrRenderer(ctx)
    }
    return fnOrRenderer
  }

  const rendererConstructorArgs = {
    ...(isObject(options) ? options : {}),
    canvas: toValue(ctx.canvas),
  }
  const renderer = new WebGLRenderer(rendererConstructorArgs)

  return renderer
}
