import type { UseAsyncStateOptions, UseAsyncStateReturn } from '@vueuse/core'
import { useAsyncState } from '@vueuse/core'
import type { Loader, LoadingManager } from 'three'
import type { MaybeRef } from 'vue'
import { onUnmounted, toValue, watch } from 'vue'
import { useGraph } from '../useGraph'
import type { TresObject } from '../../../types'
import type { TresObjectMap } from '../../utils/graph'
import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader'

import { disposeObject3D } from '../../utils/'

export interface LoaderMethods {
  setDRACOLoader: (dracoLoader: any) => void
  setMeshoptDecoder: (meshoptDecoder: any) => void
  setKTX2Loader: (ktx2Loader: any) => void
}

export type TresGLTF = GLTF & TresObjectMap

export type TresLoader<T> = Loader & Partial<LoaderMethods> & {
  load: (
    url: string,
    onLoad: (result: T) => void,
    onProgress?: (event: ProgressEvent<EventTarget>) => void,
    onError?: (err: unknown) => void
  ) => void
  loadAsync: (url: string, onProgress?: (event: ProgressEvent) => void) => Promise<T>
}

export type LoaderProto<T> = new (manager?: LoadingManager) => TresLoader<T>

/**
 * Type representing a model path or multiple model paths
 */
export type ModelPath = string | string[]

export interface TresLoaderOptions<T extends TresObjectMap, Shallow extends boolean> {
  manager?: LoadingManager
  extensions?: (loader: TresLoader<T>) => void
  asyncOptions?: UseAsyncStateOptions<Shallow, any | null>
}

export function useLoader<T extends TresObjectMap, G extends MaybeRef<ModelPath>, Shallow extends boolean = false>(
  Loader: LoaderProto<T>,
  path: G,
  options?: TresLoaderOptions<T, Shallow>,
): G extends MaybeRef<string> ? UseAsyncStateReturn<T, [ModelPath], Shallow> : UseAsyncStateReturn<T, [ModelPath], Shallow>[] {
  const proto = new Loader(options?.manager)

  const loadModel = (initialPath?: string) => useAsyncState(
    (path: string) => new Promise((resolve, reject) => {
      proto.load(path || initialPath || '', (result: T) => {
        const loadedData = result as unknown as TresObject
        if (loadedData.scene) {
          const graph = useGraph(loadedData.scene)
          Object.assign(loadedData, graph.value)
        }
        resolve(result)
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

  const initialPath = toValue(path)
  // Create a type-safe result variable
  let singleResult: UseAsyncStateReturn<T | null, [ModelPath], Shallow> | undefined
  let arrayResult: UseAsyncStateReturn<T | null, [ModelPath], Shallow>[] | undefined

  if (options?.extensions) {
    options.extensions(proto)
  }

  if (typeof initialPath === 'string') {
    singleResult = loadModel(initialPath) as UseAsyncStateReturn<T | null, [ModelPath], Shallow>
  }
  else {
    arrayResult = initialPath.map(loadModel) as UseAsyncStateReturn<T | null, [ModelPath], Shallow>[]
  }

  const unsub = watch(() => toValue(path), (newPath) => {
    if (newPath) {
      if (typeof newPath === 'string' && singleResult) {
        // Safely dispose the scene if it exists
        const value = singleResult.state.value
        if (value && 'scene' in value && value.scene) {
          disposeObject3D(value.scene as unknown as TresObject)
        }
        singleResult.execute(0, newPath)
      }
      else if (Array.isArray(newPath) && arrayResult) {
        newPath.forEach((path, index) => {
          // Safely dispose the scene if it exists
          const value = arrayResult[index].state.value
          if (value && 'scene' in value && value.scene) {
            disposeObject3D(value.scene as unknown as TresObject)
          }
          arrayResult[index].execute(0, path)
        })
      }
    }
  })

  onUnmounted(() => {
    unsub()
    if (singleResult) {
      // Safely dispose the scene if it exists
      const value = singleResult.state.value
      if (value && 'scene' in value && value.scene) {
        disposeObject3D(value.scene as unknown as TresObject)
      }
    }
    if (arrayResult) {
      arrayResult.forEach((result) => {
        // Safely dispose the scene if it exists
        const value = result.state.value
        if (value && 'scene' in value && value.scene) {
          disposeObject3D(value.scene as unknown as TresObject)
        }
      })
    }
  })

  // Return the appropriate result based on the input type
  return (singleResult || arrayResult) as G extends MaybeRef<string> ?
    UseAsyncStateReturn<T, [ModelPath], Shallow> :
    UseAsyncStateReturn<T, [ModelPath], Shallow>[]
}
