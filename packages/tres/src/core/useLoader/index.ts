import { isArray } from '@alvarosabu/utils'
import { Object3D } from 'three'
import { useLogger } from '/@/composables'

export interface TresLoader<T> extends THREE.Loader {
  load(
    url: string,
    onLoad?: (result: T) => void,
    onProgress?: (event: ProgressEvent) => void,
    onError?: (event: ErrorEvent) => void,
  ): unknown
}

export type LoaderProto<T> = new (...args: any) => TresLoader<T extends unknown ? any : T>
export type LoaderReturnType<T, L extends LoaderProto<T>> = T extends unknown
  ? Awaited<ReturnType<InstanceType<L>['loadAsync']>>
  : T

export function trasverseObjects(object: Object3D) {
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

export async function useLoader<T extends LoaderProto<T>, U extends string | string[]>(
  Loader: T,
  url: U,
  extensions?: Extensions<T>,
  onProgress?: (event: ProgressEvent<EventTarget>) => void,
  cb?: (proto: TresLoader<T>) => void,
) {
  const { logError } = useLogger()
  const proto = new Loader()
  if (cb) {
    cb(proto)
  }

  if (extensions) {
    extensions(proto)
  }

  const paths = (Array.isArray(url) ? url : [url]) as string[]

  const results = paths.map(
    path =>
      new Promise((resolve, reject) => {
        proto.load(
          path,
          data => {
            if (data.scene) {
              Object.assign(data, trasverseObjects(data.scene))
            }
            resolve(data)
          },
          onProgress,
          (error: ErrorEvent) => reject(logError('[useLoader] - Failed to load resource', error as unknown as Error)),
        )
      }),
  )

  return (isArray(url) ? await Promise.all(results) : await results[0]) as U extends any[]
    ? LoaderReturnType<T, T>[]
    : LoaderReturnType<T, T>
}
