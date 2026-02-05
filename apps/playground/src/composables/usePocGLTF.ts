import type { TresObject } from '@tresjs/core'
import { buildGraph } from '@tresjs/core'
import type { UseAsyncStateOptions, UseAsyncStateReturn } from '@vueuse/core'
import { useAsyncState } from '@vueuse/core'
import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import type { TresObjectMap } from '@/types/tres'
import { DRACOLoader } from 'three/examples/jsm/Addons.js'
import type { LoadingManager } from 'three'

export function usePocGLTF(path: MaybeRef<string>, options?: {
  draco?: boolean
  manager?: LoadingManager
  asyncOptions?: UseAsyncStateOptions<true, any | null>
}) {
  const loader = new GLTFLoader(options?.manager)
  if (options?.draco) {
    const dracoLoader = new DRACOLoader()
    dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/')
    loader.setDRACOLoader(dracoLoader)
  }

  const initialPath = toValue(path)

  const result = useAsyncState(
    (path?: string) => new Promise((resolve, reject) => {
      loader.load(path || initialPath || '', (result: GLTF) => {
        const loadedData = result
        if (loadedData.scene) {
          const graph = buildGraph(loadedData.scene)
          Object.assign(loadedData, graph)
        }
        resolve(loadedData as unknown as TresObject)
      }, undefined, (err: unknown) => {
        reject(err)
      })
    }),
    null,
    {
      ...options?.asyncOptions,
      immediate: options?.asyncOptions?.immediate ?? true,
    },
  )

  return result as UseAsyncStateReturn<GLTF & TresObjectMap, [string], true>
}
