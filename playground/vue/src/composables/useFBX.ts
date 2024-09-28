import { useLoader } from '@tresjs/core'
import { FBXLoader } from 'three-stdlib'
import type { Object3D } from 'three'

/**
 * Loads an FBX file and returns a THREE.Object3D.
 *
 * @export
 * @param {(string | string[])} path
 * @return {*}  {Promise<Object3D>}
 */
export async function useFBX(path: string | string[]): Promise<Object3D> {
  return (await useLoader(FBXLoader, path)) as unknown as Object3D
}
