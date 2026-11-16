import { logWarning, useTresContext } from '@tresjs/core'
import { RenderTarget } from 'three'
import type { Ref } from 'vue'
import { useFBOTarget } from './useFBOTarget'
import type { FboOptions } from './useFBOTarget'

export type { FboOptions } from './useFBOTarget'

let warnedSamples = false

export function useFBO(options: FboOptions): Ref<RenderTarget | null> {
  const { isWebGPU } = useTresContext()

  return useFBOTarget(options, (width, height, settings) => {
    if (settings.samples === 1 && isWebGPU.value && !warnedSamples) {
      warnedSamples = true
      logWarning('useFBO: `samples: 1` slows WebGPURenderer to about 1 fps (three r186). Use 0 for no multisampling or 4 for multisampling.')
    }
    return new RenderTarget(width, height, settings)
  })
}
