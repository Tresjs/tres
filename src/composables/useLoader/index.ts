import type { UseAsyncStateOptions, UseAsyncStateReturn } from '@vueuse/core'
import { useAsyncState } from '@vueuse/core'
import type { Loader, LoadingManager } from 'three'
import type { MaybeRef } from 'vue'
import { onUnmounted, toValue, watch } from 'vue'

import type { TresObject } from '../../../types'

import { disposeObject3D } from '../../utils/'

export interface LoaderMethods {
  setDRACOLoader: (dracoLoader: any) => void
  setMeshoptDecoder: (meshoptDecoder: any) => void
  setKTX2Loader: (ktx2Loader: any) => void
}

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

export interface TresLoaderOptions<T, Shallow extends boolean> {
  manager?: LoadingManager
  extensions?: (loader: TresLoader<T>) => void
  asyncOptions?: UseAsyncStateOptions<Shallow, any | null>
}

/**
 * Vue composable for loading 3D models using Three.js loaders
 * @param Loader - The Three.js loader constructor
 * @param path - The path to the model file
 * @param options - Optional configuration for the loader
 * @returns UseAsyncState composable with the loaded model
 */
export function useLoader<T, Shallow extends boolean = false>(
  Loader: LoaderProto<T>,
  path: MaybeRef<string>,
  options?: TresLoaderOptions<T, Shallow>,
): UseAsyncStateReturn<T, [string], Shallow> {
  const proto = new Loader(options?.manager)

  if (options?.extensions) {
    options.extensions(proto)
  }

  const initialPath = toValue(path)
  const result = useAsyncState(
    (path?: string) => new Promise((resolve, reject) => {
      proto.load(path || initialPath || '', (result: T) => {
        resolve(result as unknown as TresObject)
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

  // Watch for path changes and reload the model
  const unsub = watch(() => toValue(path), (newPath) => {
    if (newPath) {
      const value = result.state.value
      // Safely dispose the scene if it exists
      if (value && typeof value === 'object' && 'scene' in value && value.scene) {
        disposeObject3D(value.scene as unknown as TresObject)
      }
      result.execute(0, newPath)
    }
  })

  // Cleanup on component unmount
  onUnmounted(() => {
    unsub()
    const value = result.state.value
    if (value && typeof value === 'object' && 'scene' in value && value.scene) {
      disposeObject3D(value.scene as unknown as TresObject)
    }
  })

  return result as UseAsyncStateReturn<T, [string], Shallow>
}
