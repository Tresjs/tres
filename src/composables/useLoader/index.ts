import type { UseAsyncStateOptions, UseAsyncStateReturn } from '@vueuse/core'
import { useAsyncState } from '@vueuse/core'
import type { Loader, LoadingManager } from 'three'
import type { MaybeRef } from 'vue'
import { onUnmounted, reactive, toValue, watch } from 'vue'

import type { TresObject } from '../../types'
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
  initialValue?: T
  asyncOptions?: UseAsyncStateOptions<Shallow, any | null>
}

/**
 * Return type for the useLoader composable
 * @template T - The type of the loaded asset (e.g., GLTF, Texture, etc.)
 * @template Shallow - Whether to use shallow reactivity for better performance
 * @extends {UseAsyncStateReturn<T, [string], Shallow>} - Extends VueUse's useAsyncState return type
 */
export type UseLoaderReturn<T, Shallow extends boolean> = UseAsyncStateReturn<T, [string], Shallow> & {
  /**
   * Loads a new asset from the given path
   * @param path - The URL or path to the asset to load
   */
  load: (path: string) => void
  /**
   * Progress of the loading process
   * @property loaded - The number of bytes loaded
   * @property total - The total number of bytes to load
   * @property percentage - The percentage of the loading process
   */
  progress: {
    loaded: number
    total: number
    percentage: number
  }
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
): UseLoaderReturn<T, Shallow> {
  const proto = new Loader(options?.manager)
  const progress = reactive({
    loaded: 0,
    total: 0,
    percentage: 0,
  })
  if (options?.extensions) {
    options.extensions(proto)
  }

  const initialPath = toValue(path)
  const result = useAsyncState(
    (path?: string) => new Promise((resolve, reject) => {
      const assetPath = path || initialPath || ''

      proto.load(assetPath, (result: T) => {
        // Send asset loading complete event to devtools
        resolve(result as unknown as TresObject)
      }, (event: ProgressEvent<EventTarget>) => {
        progress.loaded = event.loaded
        progress.total = event.total
        progress.percentage = ((progress.loaded / progress.total) * 100)

        // Send asset loading progress event to devtools
        if (typeof window !== 'undefined' && window.__TRES__DEVTOOLS__) {
          window.__TRES__DEVTOOLS__.send('asset-load', {
            url: assetPath,
            type: Loader.name.toLowerCase().replace('loader', ''),
            progress: progress.percentage,
            loaded: false,
            sizeKB: Math.round(event.total / 1024),
          })
        }
      }, (err: unknown) => {
        reject(err)
      })
    }),
    options?.initialValue ?? null,
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

  return {
    ...result,
    load: (path: string) => {
      result.execute(0, path)
    },
    progress,
  } as UseLoaderReturn<T, Shallow>
}
