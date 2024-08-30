import { type TresLoader, type TresObject3D, useLoader } from '@tresjs/core'
import type { AnimationClip, Material, Scene } from 'three'
import { DRACOLoader } from 'three-stdlib'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import type { GLTF } from 'three-stdlib'

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

export interface TresGLTFLoader extends TresLoader<GLTF> {
  setDRACOLoader?: (dracoLoader: DRACOLoader) => void
}

/**
 * Sets the extensions for the GLTFLoader.
 *
 * @param {GLTFLoaderOptions} options
 * @param {(loader: TresGLTFLoader) => void} [extendLoader]
 * @return {*}
 */
function setExtensions(options: GLTFLoaderOptions, extendLoader?: (loader: TresGLTFLoader) => void) {
  return (loader: TresGLTFLoader) => {
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
 * @param {(string | string[])} path
 * @param {GLTFLoaderOptions} [options]
 *
 *
 * @param {(loader: GLTFLoader) => void} [extendLoader]
 * @return {*}  {Promise<GLTFResult>}
 */
export async function useGLTF<T extends string | string[]>(
  path: T,
  options: GLTFLoaderOptions = {
    draco: false,
  },
  extendLoader?: (loader: TresGLTFLoader) => void,
): Promise<T extends string[] ? GLTFResult[] : GLTFResult> {
  const gltfModel = (await useLoader<GLTF>(GLTFLoader, path, setExtensions(options, extendLoader))) as unknown as GLTFResult
  dracoLoader?.dispose()
  dracoLoader = null
  return gltfModel as T extends string[] ? GLTFResult[] : GLTFResult
}
