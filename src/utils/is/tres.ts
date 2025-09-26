import type { TresCamera, TresInstance, TresObject, TresPrimitive } from '../../types'
import { isBufferGeometry, isCamera, isFog, isMaterial, isObject3D, isOrthographicCamera, isPerspectiveCamera } from './three'
import { createTypeGuard } from './util'

interface VectorLike { set: (...args: any[]) => void, constructor?: (...args: any[]) => any }
export const isVectorLike = (value: unknown): value is VectorLike =>
  value !== null && typeof value === 'object' && 'set' in value && typeof value.set === 'function'

interface Copyable { copy: (...args: any[]) => void, constructor?: (...args: any[]) => any }
export const isCopyable = (value: unknown): value is Copyable =>
  isVectorLike(value) && 'copy' in value && typeof value.copy === 'function'

interface ClassInstance { constructor?: (...args: any[]) => any }
export const isClassInstance = (object: unknown): object is ClassInstance =>
  !!(object)?.constructor

/**
 * Type guard to check if a value is a TresCamera
 * @param value - The value to check
 * @returns True if the value is a TresCamera instance, false otherwise
 */
export const isTresCamera = (value: unknown): value is TresCamera => isCamera(value) || isOrthographicCamera(value) || isPerspectiveCamera(value)

/**
 * Type guard to check if a value is a TresObject
 * @param value - The value to check
 * @returns True if the value is a TresObject (Object3D | BufferGeometry | Material | Fog), false otherwise
 * @example
 * ```ts
 * const value = new THREE.Mesh()
 * if (isTresObject(value)) {
 *   // TypeScript knows value is TresObject here
 *   // You can use common properties and methods shared by all TresObjects
 * }
 * ```
 * @remarks
 * TresObject is a union type that represents the core Three.js objects that can be used in TresJS.
 * This includes Object3D, BufferGeometry, Material, and Fog instances.
 */
export const isTresObject = (value: unknown): value is TresObject =>
  // NOTE: TresObject is currently defined as
  // TresObject3D | THREE.BufferGeometry | THREE.Material | THREE.Fog
  isObject3D(value) || isBufferGeometry(value) || isMaterial(value) || isFog(value)

/**
 * Type guard to check if a value is a TresPrimitive
 * @param value - The value to check
 * @returns True if the value is a TresPrimitive instance, false otherwise
 * @example
 * ```ts
 * const value = { isPrimitive: true }
 * if (isTresPrimitive(value)) {
 *   // TypeScript knows value is TresPrimitive here
 *   // You can use properties and methods specific to TresPrimitives
 * }
 * ```
 * @remarks
 * TresPrimitive is a special type in TresJS that represents primitive objects
 * that can be used directly in the scene without needing to be wrapped in a Three.js object.
 */
export const isTresPrimitive = createTypeGuard<TresPrimitive>('isPrimitive')

/**
 * Type guard to check if a value is a TresInstance (has __tres property)
 * @param value - The value to check
 * @returns True if the value is a TresInstance (has __tres property), false otherwise
 * @example
 * ```ts
 * const value = new THREE.Mesh()
 * if (isTresInstance(value)) {
 *   // TypeScript knows value is TresInstance here
 *   // You can safely access value.__tres
 * }
 * ```
 */
export const isTresInstance = (value: unknown): value is TresInstance =>
  isTresObject(value) && '__tres' in value
