import type { WebGPURenderer } from 'three/webgpu'
import type { TresPartialContext } from '../composables'
import { useTres as useRootTres } from '../composables'

export interface TresWebGPUPartialContext extends Omit<TresPartialContext, 'renderer'> {
  /**
   * The renderer instance. The WebGPU `TresCanvas` creates a `WebGPURenderer` by default.
   */
  renderer: WebGPURenderer
}

/**
 * `useTres` for canvases from `@tresjs/core/webgpu`, with the renderer typed as `WebGPURenderer`.
 */
export function useTres(): TresWebGPUPartialContext {
  // A custom `renderer` factory can return another renderer, but this entry is for WebGPU canvases.
  return useRootTres() as TresWebGPUPartialContext
}
