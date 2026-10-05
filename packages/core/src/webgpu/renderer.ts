import type { WebGPURendererParameters } from 'three/webgpu'
import type { RendererOptions } from '../composables'

const WEBGPU_RENDERER_OPTIONS = [
  'antialias',
  'alpha',
  'depth',
  'stencil',
  'logarithmicDepthBuffer',
] as const satisfies readonly (keyof RendererOptions & keyof WebGPURendererParameters)[]

/**
 * Picks the `TresCanvas` props that `WebGPURenderer` takes in its constructor.
 * Undefined props are left out so three keeps its own defaults.
 */
export const toWebGPURendererParameters = (options: RendererOptions): WebGPURendererParameters => {
  const parameters: WebGPURendererParameters = {}

  for (const key of WEBGPU_RENDERER_OPTIONS) {
    if (options[key] !== undefined) {
      parameters[key] = options[key]
    }
  }

  // 'default' exists only in WebGL. WebGPU picks its own default when the value is unset.
  if (options.powerPreference && options.powerPreference !== 'default') {
    parameters.powerPreference = options.powerPreference
  }

  return parameters
}
