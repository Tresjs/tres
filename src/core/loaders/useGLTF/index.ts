import { GLTFLoader, DRACOLoader } from 'three-stdlib'
import { TresObject3D, useLoader } from '@tresjs/core'

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
  animations: Array<THREE.AnimationClip>
  nodes: Record<string, TresObject3D>
  materials: Record<string, THREE.Material>
  scene: THREE.Scene
}

let dracoLoader: DRACOLoader | null = null

/**
 * Sets the extensions for the GLTFLoader.
 *
 * @param {GLTFLoaderOptions} options
 * @param {(loader: GLTFLoader) => void} [extendLoader]
 * @return {*}
 */
function setExtensions(options: GLTFLoaderOptions, extendLoader?: (loader: GLTFLoader) => void) {
  return (loader: GLTFLoader) => {
    if (extendLoader) {
      extendLoader(loader as GLTFLoader)
    }
    if (options.draco) {
      if (!dracoLoader) {
        dracoLoader = new DRACOLoader()
      }
      dracoLoader.setDecoderPath(options.decoderPath || 'https://www.gstatic.com/draco/versioned/decoders/1.4.3/')
      loader.setDRACOLoader(dracoLoader)
    }
  }
}

/**
 * Loads a GLTF file and returns a THREE.Object3D.
 *
 * @export
 * @param {(string | string[])} path
 * @param {GLTFLoaderOptions} [options={
 *     draco: false,
 *   }]
 * @param {(loader: GLTFLoader) => void} [extendLoader]
 * @return {*}  {Promise<GLTFResult>}
 */
export async function useGLTF(
  path: string | string[],
  options: GLTFLoaderOptions = {
    draco: false,
  },
  extendLoader?: (loader: GLTFLoader) => void,
): Promise<GLTFResult> {
  return (await useLoader(GLTFLoader, path, setExtensions(options, extendLoader))) as unknown as GLTFResult
}
