import { type LoaderProto, type TresLoader, type TresObject3D, useLoader } from '@tresjs/core'
import { DRACOLoader, GLTFLoader } from 'three-stdlib'
import { Loader } from 'three'
import type { AnimationClip, LoadingManager, Material, Scene } from 'three'
import type { GLTF } from 'three-stdlib'

/**
 * A wrapper class that implements TresLoader<GLTF> interface
 * to make GLTFLoader compatible with TresJS loader system.
 */
class TresGLTFLoaderClass extends Loader implements TresLoader<GLTF> {
  private gltfLoader: GLTFLoader

  constructor(manager?: LoadingManager) {
    super(manager)
    this.gltfLoader = new GLTFLoader(manager)
  }

  /**
   * Load a GLTF model from a URL or array of URLs.
   * If an array is provided, only the first URL will be used.
   *
   * @param {(string | string[])} url - URL or array of URLs to load
   * @param {(result: GLTF) => void} onLoad - Callback when the model is loaded
   * @param {(event: ProgressEvent<EventTarget>) => void} [onProgress] - Loading progress callback
   * @param {(event: ErrorEvent) => void} [onError] - Error callback
   */
  load(
    url: string | string[],
    onLoad: (result: GLTF) => void,
    onProgress?: (event: ProgressEvent<EventTarget>) => void,
    onError?: (event: ErrorEvent) => void,
  ): void {
    const singleUrl = Array.isArray(url) ? url[0] : url
    this.gltfLoader.load(singleUrl, onLoad, onProgress, onError)
  }

  /**
   * Asynchronously load a GLTF model.
   *
   * @param {string | string[]} url - URL or array of URLs to load
   * @returns {Promise<GLTF>} Promise that resolves with the loaded model
   */
  async loadAsync(url: string | string[]): Promise<GLTF> {
    const singleUrl = Array.isArray(url) ? url[0] : url
    return this.gltfLoader.loadAsync(singleUrl)
  }

  /**
   * Set the DRACO loader for compressed models.
   *
   * @param {DRACOLoader} dracoLoader - The DRACO loader instance
   * @returns {GLTFLoader} The loader instance for chaining
   */
  setDRACOLoader(dracoLoader: DRACOLoader): GLTFLoader {
    return this.gltfLoader.setDRACOLoader(dracoLoader)
  }
}

const TresGLTFLoader = TresGLTFLoaderClass as unknown as LoaderProto<GLTF>

export interface GLTFLoaderOptions {
  /**
   * Whether to use Draco compression.
   *
   * @type {boolean}
   * @memberof GLTFLoaderOptions
   */
  draco?: boolean
  /**
   * The path to the Draco decoder.
   *
   * @type {string}
   * @memberof GLTFLoaderOptions
   */
  decoderPath?: string
}

export interface GLTFResult {
  animations: Array<AnimationClip>
  nodes: Record<string, TresObject3D>
  materials: Record<string, Material>
  scene: Scene
}

let dracoLoader: DRACOLoader | null = null

export interface TresGLTFLoaderType extends TresLoader<GLTF> {
  setDRACOLoader?: (dracoLoader: DRACOLoader) => void
}

/**
 * Sets the extensions for the GLTFLoader.
 *
 * @param {GLTFLoaderOptions} options - Options for the loader
 * @param {(loader: TresGLTFLoaderType) => void} [extendLoader] - Function to extend the loader
 */
function setExtensions(options: GLTFLoaderOptions, extendLoader?: (loader: TresGLTFLoaderType) => void) {
  return (loader: TresGLTFLoaderType) => {
    if (extendLoader) {
      extendLoader(loader)
    }
    if (options.draco) {
      if (!dracoLoader) {
        dracoLoader = new DRACOLoader()
      }
      dracoLoader.setDecoderPath(options.decoderPath || 'https://www.gstatic.com/draco/versioned/decoders/1.4.3/')
      if (loader.setDRACOLoader) {
        loader.setDRACOLoader(dracoLoader)
      }
    }
  }
}

/**
 * Loads a GLTF file and returns a THREE.Object3D.
 *
 * @export
 * @template T
 * @param {T} path - Path or array of paths to the GLTF file(s)
 * @param {GLTFLoaderOptions} [options] - Options for the loader
 * @param {(loader: TresGLTFLoaderType) => void} [extendLoader] - Function to extend the loader
 * @returns {Promise<T extends string[] ? GLTFResult[] : GLTFResult>} Promise that resolves with the loaded model(s)
 */
export async function useGLTF<T extends string | string[]>(
  path: T,
  options: GLTFLoaderOptions = {
    draco: false,
  },
  extendLoader?: (loader: TresGLTFLoaderType) => void,
): Promise<T extends string[] ? GLTFResult[] : GLTFResult> {
  const gltfModel = (await useLoader<GLTF>(TresGLTFLoader, path, setExtensions(options, extendLoader))) as unknown as GLTFResult
  dracoLoader?.dispose()
  dracoLoader = null
  return gltfModel as T extends string[] ? GLTFResult[] : GLTFResult
}
