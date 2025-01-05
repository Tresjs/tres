import { type LoaderProto, type TresLoader, useLoader } from '@tresjs/core'
import { FBXLoader } from 'three-stdlib'
import { Loader } from 'three'
import type { Group, LoadingManager } from 'three'

/**
 * A wrapper class that implements TresLoader interface
 * to make FBXLoader compatible with TresJS loader system.
 */
class TresFBXLoaderClass extends Loader implements TresLoader<Group> {
  private fbxLoader: FBXLoader

  constructor(manager?: LoadingManager) {
    super(manager)
    this.fbxLoader = new FBXLoader(manager)
  }

  /**
   * Load an FBX model from a URL or array of URLs.
   * If an array is provided, only the first URL will be used.
   *
   * @param {(string | string[])} url - URL or array of URLs to load
   * @param {(result: Group) => void} onLoad - Callback when the model is loaded
   * @param {(event: ProgressEvent<EventTarget>) => void} [onProgress] - Loading progress callback
   * @param {(event: ErrorEvent) => void} [onError] - Error callback
   */
  load(
    url: string | string[],
    onLoad: (result: Group) => void,
    onProgress?: (event: ProgressEvent<EventTarget>) => void,
    onError?: (event: ErrorEvent) => void,
  ): void {
    const singleUrl = Array.isArray(url) ? url[0] : url
    this.fbxLoader.load(singleUrl, onLoad, onProgress, onError)
  }

  /**
   * Asynchronously load an FBX model.
   *
   * @param {string | string[]} url - URL or array of URLs to load
   * @returns {Promise<Group>} Promise that resolves with the loaded model
   */
  async loadAsync(url: string | string[]): Promise<Group> {
    const singleUrl = Array.isArray(url) ? url[0] : url
    return this.fbxLoader.loadAsync(singleUrl)
  }
}

const TresFBXLoader = TresFBXLoaderClass as LoaderProto<Group>

/**
 * Loads an FBX file and returns a THREE.Object3D.
 *
 * @export
 * @param {(string | string[])} path
 * @return {*}  {Promise<Group>}
 */
export async function useFBX<T extends string | string[]>(
  path: T,
): Promise<T extends string[] ? Group[] : Group> {
  const result = await useLoader(TresFBXLoader, path)
  return result as T extends string[] ? Group[] : Group
}
