import { GLTFLoader, DRACOLoader } from 'three-stdlib'
/* import { useLoader } from '../../../../tres/src/core' */
import { useLoader } from '@tresjs/core'
import { Object3D } from 'three'

export interface GLTFLoaderOptions {
  draco?: boolean
  decoderPath?: string
}

export interface TresObject extends Object3D {
  geometry: THREE.BufferGeometry
  material: THREE.Material
}
export interface GLTFResult {
  nodes: Array<TresObject>
  materials: Array<THREE.Material>
  scene: THREE.Scene
}

let dracoLoader: DRACOLoader | null = null

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
export async function useGLTF(
  path: string | string[],
  options: GLTFLoaderOptions = {
    draco: false,
  },
  extendLoader?: (loader: GLTFLoader) => void,
): Promise<GLTFResult> {
  return (await useLoader(GLTFLoader, path, setExtensions(options, extendLoader))) as unknown as GLTFResult
}
