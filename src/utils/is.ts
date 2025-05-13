import type { TresObject, TresPrimitive } from 'src/types'
import type { BufferGeometry, Camera, Color, ColorRepresentation, Fog, Light, Material, Object3D, Scene } from 'three'
import { Layers } from 'three'

export function und(u: unknown): u is undefined {
  return typeof u === 'undefined'
}

export function arr(u: unknown): u is Array<unknown> {
  return Array.isArray(u)
}

export function num(u: unknown): u is number {
  return typeof u === 'number'
}

export function str(u: unknown): u is string {
  return typeof u === 'string'
}

export function bool(u: unknown): u is boolean {
  return u === true || u === false
}

export function fun(u: unknown): u is (...args: any[]) => any {
  return typeof u === 'function'
}

export function obj(u: unknown): u is Record<string | number | symbol, unknown> {
  return u === Object(u) && !arr(u) && !fun(u)
}

export function object3D(u: unknown): u is Object3D {
  return obj(u) && !!(u.isObject3D)
}

export function color(u: unknown): u is Color {
  return obj(u) && !!(u.isColor)
}

export function colorRepresentation(u: unknown): u is ColorRepresentation {
  return u != null && (typeof u === 'string' || typeof u === 'number' || color(u))
}

interface VectorLike { set: (...args: any[]) => void, constructor?: (...args: any[]) => any }
export function vectorLike(u: unknown): u is VectorLike {
  return u !== null && typeof u === 'object' && 'set' in u && typeof u.set === 'function'
}

interface Copyable { copy: (...args: any[]) => void, constructor?: (...args: any[]) => any }
export function copyable(u: unknown): u is Copyable {
  return vectorLike(u) && 'copy' in u && typeof u.copy === 'function'
}

interface ClassInstance { constructor?: (...args: any[]) => any }
export function classInstance(object: unknown): object is ClassInstance {
  return !!(object as any)?.constructor
}

export function layers(u: unknown): u is Layers {
  return u instanceof Layers // three does not implement .isLayers
}

export function camera(u: unknown): u is Camera {
  return obj(u) && !!(u.isCamera)
}

export function bufferGeometry(u: unknown): u is BufferGeometry {
  return obj(u) && !!(u.isBufferGeometry)
}

export function material(u: unknown): u is Material {
  return obj(u) && !!(u.isMaterial)
}

export function light(u: unknown): u is Light {
  return obj(u) && !!(u.isLight)
}

export function fog(u: unknown): u is Fog {
  return obj(u) && !!(u.isFog)
}

export function scene(u: unknown): u is Scene {
  return obj(u) && !!(u.isScene)
}

export function tresObject(u: unknown): u is TresObject {
  // NOTE: TresObject is currently defined as
  // TresObject3D | THREE.BufferGeometry | THREE.Material | THREE.Fog
  return object3D(u) || bufferGeometry(u) || material(u) || fog(u)
}

export function tresPrimitive(u: unknown): u is TresPrimitive {
  return obj(u) && !!(u.isPrimitive)
}
