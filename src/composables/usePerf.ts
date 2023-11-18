import type { Ref } from 'vue'
import { provide, reactive } from 'vue'
import { useTresContext } from '@tresjs/core'
import type { WebGLRenderer } from 'three'

export const PERF_CONTEXT_KEY = Symbol('PERF_CONTEXT_KEY')
const DEFAULT_UUID = 'default'

// Internal state
const perfStore: { [uuid: string]: { [key: string]: any } } = reactive({
  [DEFAULT_UUID]: {
    gl: undefined,
  },
})

export function usePerfProvider(uuid: string = DEFAULT_UUID) {
  provide(PERF_CONTEXT_KEY, perfStore)
  return perfStore[uuid]
}

export interface TresPerfOptions {
  renderer?: Ref<WebGLRenderer>
}

export function usePerf(options?: TresPerfOptions) {
  const { renderer: TresRenderer } = useTresContext()
  const gl = options?.renderer || TresRenderer.value
  if (!gl) {
    throw new Error('Renderer not found')
  }
  perfStore[DEFAULT_UUID].gl = gl
  return { gl }
}