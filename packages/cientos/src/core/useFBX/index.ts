import { FBXLoader } from 'three-stdlib'
import { useLoader } from '@tresjs/core'
import { Object3D } from 'three'

export async function useFBX(path: string | string[]): Promise<Object3D> {
  return (await useLoader(FBXLoader, path)) as unknown as Object3D
}
