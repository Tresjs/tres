import type { TresContext } from '@tresjs/core'
import { useControls } from '@tresjs/leches'

/**
 * Adds a `backend` control to the Leches panel and returns the `@ready` handler for
 * `TresCanvas` that fills it. `ready` fires after `renderer.init()`, so the backend is final
 * (WebGPU, or the WebGL2 fallback when the browser has no WebGPU).
 */
export function useBackendControl(uuid: string) {
  const { backend } = useControls({ backend: '…' }, { uuid })

  return ({ renderer }: TresContext) => {
    // Only WebGPURenderer has a `backend`. A page can also pass a WebGLRenderer to compare.
    const instance = renderer.instance as { backend?: object }
    if (!instance.backend) {
      backend.value = 'WebGLRenderer'
      return
    }
    backend.value = 'isWebGPUBackend' in instance.backend ? 'WebGPU' : 'WebGL2 (fallback)'
  }
}
