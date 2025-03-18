import { ref, type Ref, shallowRef, type ShallowRef } from 'vue'
import type { Loader, LoadingManager, Object3D } from 'three'
import type { TresObject } from '../../types'
import { useLogger } from '..'
import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader'

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

export type LoaderReturnType<T, L extends LoaderProto<T>> = T extends unknown
  ? Awaited<ReturnType<InstanceType<L>['loadAsync']>>
  : T

export interface UseLoaderReturn<T> {
  /**
   * The loaded resource(s). Uses shallowRef for better performance with complex 3D objects.
   * - For single resources: ShallowRef<T | null>
   * - For multiple resources: ShallowRef<T[] | null>
   */
  data: ShallowRef<T | null>

  /**
   * Whether the resource is currently being loaded.
   * - true: Loading is in progress
   * - false: Loading completed or failed
   */
  isLoading: Ref<boolean>

  /**
   * Any error that occurred during loading.
   * - null: No error
   * - Error: Contains error message and details
   */
  error: Ref<Error | null>

  /**
   * Load additional resources after initial load.
   * @example
   * ```ts
   * // Load single resource
   * const model = await load('model.glb')
   *
   * // Load multiple resources
   * const models = await load(['model1.glb', 'model2.glb'])
   * ```
   */
  load: {
    (url: string): Promise<T>
    (urls: string[]): Promise<T[]>
  }

  /**
   * Promise that resolves when the resource is loaded.
   * Useful for await/Suspense patterns.
   */
  promise: Promise<UseLoaderReturn<T>>
}

export type TresGLTF = GLTF & {
  nodes: { [key: string]: Object3D }
  materials: { [key: string]: any }
}

/**
 * Traverse an object and return all the nodes and materials
 *
 * @export
 * @param {Object3D} object
 * @return { [key: string]: any }
 */
export function traverseObjects(object: Object3D) {
  const data: { [key: string]: any } = { nodes: {}, materials: {} }
  if (object) {
    object.traverse((obj: any) => {
      if (obj.name) {
        data.nodes[obj.name] = obj
      }
      if (obj.material && !data.materials[obj.material.name]) {
        data.materials[obj.material.name] = obj.material
      }
    })
  }
  return data
}

export type Extensions<T extends { prototype: LoaderProto<any> }> = (loader: T['prototype']) => void

/**
 * Load resources using THREE loaders and return the result as a promise
 * Can be used with or without await/Suspense
 *
 * @see https://tresjs.org/api/composables.html#useloader
 * @see https://threejs.org/docs/index.html?q=loader#api/en/loaders/Loader
 *
 * @example
 * ```ts
 * import { useLoader } from '@tresjs/core'
 * import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
 *
 * // Single resource with proper typing
 * const { data } = useLoader<GLTF, typeof GLTFLoader>(GLTFLoader, 'model.gltf')
 *
 * // Multiple resources - returns array
 * const { data: models } = useLoader(GLTFLoader, [
 *   'path/to/model1.gltf',
 *   'path/to/model2.gltf'
 * ])
 *
 * // With async/await
 * const { data } = await useLoader(GLTFLoader, 'model.gltf')
 * ```
 *
 * @export
 * @template T - The type of resource being loaded
 * @param {LoaderProto<T>} Loader - The THREE.js loader class to use
 * @param {string | string[]} path - URL or array of URLs to load
 * @param {Extensions<TresLoader<T>>} [extensions] - Optional loader extensions
 * @param {(event: ProgressEvent<EventTarget>) => void} [onProgress] - Optional progress callback
 * @param {(proto: TresLoader<T>) => void} [cb] - Optional callback for loader configuration
 * @returns {UseLoaderReturn<T> & Promise<UseLoaderReturn<T>>} - Returns both a reactive object and a promise
 */
export function useLoader<T>(
  Loader: LoaderProto<T>,
  path: string,
  extensions?: (loader: TresLoader<T>) => void,
  onProgress?: (event: ProgressEvent<EventTarget>) => void,
  cb?: (proto: TresLoader<T>) => void,
): UseLoaderReturn<T> & Promise<UseLoaderReturn<T>>

export function useLoader<T>(
  Loader: LoaderProto<T>,
  paths: string[],
  extensions?: (loader: TresLoader<T>) => void,
  onProgress?: (event: ProgressEvent<EventTarget>) => void,
  cb?: (proto: TresLoader<T>) => void,
): UseLoaderReturn<T[]> & Promise<UseLoaderReturn<T[]>>

export function useLoader<T>(
  Loader: LoaderProto<T>,
  paths: string | string[],
  extensions?: (loader: TresLoader<T>) => void,
  onProgress?: (event: ProgressEvent<EventTarget>) => void,
  cb?: (proto: TresLoader<T>) => void,
): UseLoaderReturn<T | T[]> & Promise<UseLoaderReturn<T | T[]>> {
  const { logError } = useLogger()
  const data = shallowRef<T | T[] | null>(null)
  const isLoading = ref(true)
  const error = ref<Error | null>(null)
  const proto = new Loader()

  if (cb) {
    cb(proto)
  }
  if (extensions) {
    extensions(proto)
  }

  const loadResource = async (url: string): Promise<T> =>
    new Promise((resolve, reject) => {
      proto.load(
        url,
        (result: T) => {
          const loadedData = result as unknown as TresObject
          if (loadedData.scene) {
            Object.assign(loadedData, traverseObjects(loadedData.scene))
          }
          isLoading.value = false
          resolve(loadedData as T)
        },
        onProgress,
        (err: unknown) => {
          const errorMessage = err instanceof Error ? err.message : 'Unknown error'
          error.value = new Error(`Failed to load resource: ${errorMessage}`)
          isLoading.value = false
          logError('[useLoader] - Failed to load resource', error.value)
          reject(error.value)
        },
      )
    })

  // Overloaded load function
  const load = ((paths: string | string[]): Promise<T | T[]> => {
    isLoading.value = true
    error.value = null

    if (typeof paths === 'string') {
      return loadResource(paths)
    }
    else {
      return Promise.all(paths.map(path => loadResource(path)))
    }
  }) as UseLoaderReturn<T | T[]>['load']

  // Make the return value awaitable
  const returnValue = {
    data,
    isLoading,
    error,
    load,
  } as UseLoaderReturn<T | T[]> & Promise<UseLoaderReturn<T | T[]>>

  // Initial load
  if (typeof paths === 'string') {
    returnValue.promise = loadResource(paths).then((result) => {
      data.value = result
      return returnValue as UseLoaderReturn<T>
    })
  }
  else {
    returnValue.promise = Promise.all(paths.map(path => loadResource(path))).then((results) => {
      data.value = results
      return returnValue as UseLoaderReturn<T[]>
    })
  }

  return returnValue
}
