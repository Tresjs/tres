import { WebGLRenderer } from 'three'
import type { TresRendererSetupContext } from '../composables'
import type { TresRenderer } from '../types'
import type { TresCanvasProps } from '../components/TresCanvas.vue'
import { toValue } from 'vue'
import { isObject } from '../utils/is'

export async function createRenderer(ctx: TresRendererSetupContext, options: TresCanvasProps): Promise<TresRenderer> {
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

  return new WebGLRenderer(rendererConstructorArgs)
}
