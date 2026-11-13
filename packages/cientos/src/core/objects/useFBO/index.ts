import { WebGLRenderTarget } from 'three'
import type { Ref } from 'vue'
import { useFBOTarget } from './useFBOTarget'
import type { FboOptions } from './useFBOTarget'

export type { FboOptions } from './useFBOTarget'

export function useFBO(options: FboOptions): Ref<WebGLRenderTarget | null> {
  return useFBOTarget(options, (width, height, settings) => new WebGLRenderTarget(width, height, settings))
}
