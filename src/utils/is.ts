import type { TresCamera, TresInstance, TresObject, TresPrimitive } from 'src/types'
import type { BufferGeometry, Color, ColorRepresentation, Fog, Light, Material, Object3D, OrthographicCamera, PerspectiveCamera, Scene } from 'three'
import { Layers } from 'three'
import { makeMap } from './makeMap'

/**
 * Type guard to check if a value is undefined
 * @param value - The value to check
 * @returns True if the value is undefined, false otherwise
 * @example
 * ```ts
 * const value = undefined
 * if (isUndefined(value)) {
 *   // TypeScript knows value is undefined here
 * }
 * ```
 */
export function isUndefined(value: unknown): value is undefined {
  return typeof value === 'undefined'
}

/**
 * Type guard to check if a value is an array
 * @param value - The value to check
 * @returns True if the value is an array, false otherwise
 * @example
 * ```ts
 * const value = [1, 2, 3]
 * if (isArray(value)) {
 *   // TypeScript knows value is Array<unknown> here
 *   value.length // OK
 *   value.map(x => x) // OK
 * }
 * ```
 */
export function isArray(value: unknown): value is Array<unknown> {
  return Array.isArray(value)
}

/**
 * Type guard to check if a value is a number
 * @param value - The value to check
 * @returns True if the value is a number (including NaN and Infinity), false otherwise
 * @example
 * ```ts
 * const value = 42
 * if (isNumber(value)) {
 *   // TypeScript knows value is number here
 *   value.toFixed(2) // OK
 *   value * 2 // OK
 * }
 * ```
 */
export function isNumber(value: unknown): value is number {
  return typeof value === 'number'
}

/**
 * Type guard to check if a value is a string
 * @param value - The value to check
 * @returns True if the value is a string, false otherwise
 * @example
 * ```ts
 * const value = "hello"
 * if (isString(value)) {
 *   // TypeScript knows value is string here
 *   value.length // OK
 *   value.toUpperCase() // OK
 * }
 * ```
 */
export function isString(value: unknown): value is string {
  return typeof value === 'string'
}

/**
 * Type guard to check if a value is a boolean
 * @param value - The value to check
 * @returns True if the value is strictly true or false, false otherwise
 * @example
 * ```ts
 * const value = true
 * if (isBoolean(value)) {
 *   // TypeScript knows value is boolean here
 *   !value // OK
 *   value && true // OK
 * }
 * ```
 */
export function isBoolean(value: unknown): value is boolean {
  return value === true || value === false
}

/**
 * Type guard to check if a value is a function
 * @param value - The value to check
 * @returns True if the value is a callable function, false otherwise
 * @example
 * ```ts
 * const value = () => {}
 * if (isFunction(value)) {
 *   // TypeScript knows value is (...args: any[]) => any here
 *   value() // OK
 *   value.call(null) // OK
 * }
 * ```
 */
export function isFunction(value: unknown): value is (...args: any[]) => any {
  return typeof value === 'function'
}

/**
 * Type guard to check if a value is a plain object
 * @param value - The value to check
 * @returns True if the value is a plain object (not null, array, or function), false otherwise
 * @example
 * ```ts
 * const value = { key: 'value' }
 * if (isObject(value)) {
 *   // TypeScript knows value is Record<string | number | symbol, unknown> here
 *   Object.keys(value) // OK
 *   value.key // OK
 * }
 * ```
 */
export function isObject(value: unknown): value is Record<string | number | symbol, unknown> {
  return value === Object(value) && !isArray(value) && !isFunction(value)
}

/**
 * Type guard to check if a value is a Three.js Object3D
 * @param value - The value to check
 * @returns True if the value is a Three.js Object3D instance, false otherwise
 * @example
 * ```ts
 * const value = new THREE.Object3D()
 * if (isObject3D(value)) {
 *   // TypeScript knows value is Object3D here
 *   value.position // OK
 *   value.rotation // OK
 *   value.scale // OK
 * }
 * ```
 */
export function isObject3D(value: unknown): value is Object3D {
  return isObject(value) && !!(value.isObject3D)
}

/**
 * Type guard to check if a value is a Three.js Camera
 * @param value - The value to check
 * @returns True if the value is a Three.js Camera instance, false otherwise
 * @example
 * ```ts
 * const value = new THREE.PerspectiveCamera()
 * if (isCamera(value)) {
 *   // TypeScript knows value is Camera here
 *   value.fov // OK
 *   value.near // OK
 *   value.far // OK
 * }
 * ```
 */
export function isCamera(value: unknown): value is TresCamera {
  return isObject(value) && !!(value.isCamera)
}

export function isColor(value: unknown): value is Color {
  return isObject(value) && !!(value.isColor)
}

export function isColorRepresentation(value: unknown): value is ColorRepresentation {
  return value != null && (typeof value === 'string' || typeof value === 'number' || isColor(value))
}

interface VectorLike { set: (...args: any[]) => void, constructor?: (...args: any[]) => any }
export function isVectorLike(value: unknown): value is VectorLike {
  return value !== null && typeof value === 'object' && 'set' in value && typeof value.set === 'function'
}

interface Copyable { copy: (...args: any[]) => void, constructor?: (...args: any[]) => any }
export function isCopyable(value: unknown): value is Copyable {
  return isVectorLike(value) && 'copy' in value && typeof value.copy === 'function'
}

interface ClassInstance { constructor?: (...args: any[]) => any }
export function isClassInstance(object: unknown): object is ClassInstance {
  return !!(object)?.constructor
}

export function isLayers(value: unknown): value is Layers {
  return value instanceof Layers // three does not implement .isLayers
}

/**
 * Type guard to check if a value is a Three.js OrthographicCamera
 * @param value - The value to check
 * @returns True if the value is a Three.js OrthographicCamera instance, false otherwise
 */
export function isOrthographicCamera(value: unknown): value is OrthographicCamera {
  return isObject(value) && !!(value.isOrthographicCamera)
}

/**
 * Type guard to check if a value is a Three.js PerspectiveCamera
 * @param value - The value to check
 * @returns True if the value is a Three.js PerspectiveCamera instance, false otherwise
 */
export function isPerspectiveCamera(value: unknown): value is PerspectiveCamera {
  return isObject(value) && !!(value.isPerspectiveCamera)
}

/**
 * Type guard to check if a value is a Three.js BufferGeometry
 * @param value - The value to check
 * @returns True if the value is a Three.js BufferGeometry instance, false otherwise
 * @example
 * ```ts
 * const value = new THREE.BufferGeometry()
 * if (isBufferGeometry(value)) {
 *   // TypeScript knows value is BufferGeometry here
 *   value.attributes // OK
 *   value.index // OK
 *   value.computeVertexNormals() // OK
 * }
 * ```
 */
export function isBufferGeometry(value: unknown): value is BufferGeometry {
  return isObject(value) && !!(value.isBufferGeometry)
}

/**
 * Type guard to check if a value is a Three.js Material
 * @param value - The value to check
 * @returns True if the value is a Three.js Material instance, false otherwise
 * @example
 * ```ts
 * const value = new THREE.MeshStandardMaterial()
 * if (isMaterial(value)) {
 *   // TypeScript knows value is Material here
 *   value.color // OK
 *   value.metalness // OK
 *   value.roughness // OK
 * }
 * ```
 */
export function isMaterial(value: unknown): value is Material {
  return isObject(value) && !!(value.isMaterial)
}

/**
 * Type guard to check if a value is a Three.js Light
 * @param value - The value to check
 * @returns True if the value is a Three.js Light instance, false otherwise
 * @example
 * ```ts
 * const value = new THREE.DirectionalLight()
 * if (isLight(value)) {
 *   // TypeScript knows value is Light here
 *   value.intensity // OK
 *   value.color // OK
 *   value.position // OK
 * }
 * ```
 */
export function isLight(value: unknown): value is Light {
  return isObject(value) && !!(value.isLight)
}

/**
 * Type guard to check if a value is a Three.js Fog
 * @param value - The value to check
 * @returns True if the value is a Three.js Fog instance, false otherwise
 * @example
 * ```ts
 * const value = new THREE.Fog(0x000000, 1, 1000)
 * if (isFog(value)) {
 *   // TypeScript knows value is Fog here
 *   value.color // OK
 *   value.near // OK
 *   value.far // OK
 * }
 * ```
 */
export function isFog(value: unknown): value is Fog {
  return isObject(value) && !!(value.isFog)
}

/**
 * Type guard to check if a value is a Three.js Scene
 * @param value - The value to check
 * @returns True if the value is a Three.js Scene instance, false otherwise
 * @example
 * ```ts
 * const value = new THREE.Scene()
 * if (isScene(value)) {
 *   // TypeScript knows value is Scene here
 *   value.children // OK
 *   value.add(new THREE.Object3D()) // OK
 *   value.remove(new THREE.Object3D()) // OK
 * }
 * ```
 */
export function isScene(value: unknown): value is Scene {
  return isObject(value) && !!(value.isScene)
}

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
export function isTresObject(value: unknown): value is TresObject {
  // NOTE: TresObject is currently defined as
  // TresObject3D | THREE.BufferGeometry | THREE.Material | THREE.Fog
  return isObject3D(value) || isBufferGeometry(value) || isMaterial(value) || isFog(value)
}

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
export function isTresPrimitive(value: unknown): value is TresPrimitive {
  return isObject(value) && !!(value.isPrimitive)
}

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
export function isTresInstance(value: unknown): value is TresInstance {
  return isTresObject(value) && '__tres' in value
}

const HTML_TAGS
  = 'html,body,base,head,link,meta,style,title,address,article,aside,footer,'
    + 'header,hgroup,h1,h2,h3,h4,h5,h6,nav,section,div,dd,dl,dt,figcaption,'
    + 'figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,'
    + 'data,dfn,em,i,kbd,mark,q,rp,rt,ruby,s,samp,small,span,strong,sub,sup,'
    + 'time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,'
    + 'canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,'
    + 'th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,'
    + 'option,output,progress,select,textarea,details,dialog,menu,'
    + 'summary,template,blockquote,iframe,tfoot'

export const isHTMLTag = /* #__PURE__ */ makeMap(HTML_TAGS)
