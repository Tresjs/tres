import type { TresObject } from 'src/types'
import type { BufferGeometry, Camera, Fog, Material, Object3D } from 'three'

export function arr(a: any) {
  return Array.isArray(a)
}

export function fun(a: any): a is Function {
  return typeof a === 'function'
}

export function obj(a: any) {
  return a === Object(a) && !arr(a) && !fun(a)
}

export function object3D(a: any): a is Object3D {
  return obj(a) && 'isObject3D' in a && a.isObject3D
}

export function camera(a: any): a is Camera {
  return obj(a) && 'isCamera' in a && a.isCamera
}

export function bufferGeometry(a: any): a is BufferGeometry {
  return obj(a) && 'isBufferGeometry' in a && a.isBufferGeometry
}

export function material(a: any): a is Material {
  return obj(a) && 'isMaterial' in a && a.isMaterial
}

export function fog(a: any): a is Fog {
  return obj(a) && 'isFog' in a && a.isFog
}

export function tresObject(a: any): a is TresObject {
  // NOTE: TresObject is currently defined as
  // TresObject3D | THREE.BufferGeometry | THREE.Material | THREE.Fog
  return object3D(a) || bufferGeometry(a) || material(a) || fog(a)
}
