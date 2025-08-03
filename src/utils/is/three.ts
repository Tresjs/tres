import type { BufferGeometry, Camera, Color, ColorRepresentation, Fog, Group, Light, Material, Mesh, Object3D, OrthographicCamera, PerspectiveCamera, Scene } from 'three'
import { Layers } from 'three'
import { isNumber, isString } from './typed'
import { createTypeGuard } from './util'

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
export const isObject3D = createTypeGuard<Object3D>('isObject3D')

/**
 * Type guard to check if a value is a Three.js Mesh
 * @param value - The value to check
 * @returns True if the value is a Three.js Mesh instance, false otherwise
 * @example
 * ```ts
 * const value = new THREE.Mesh()
 * if (isMesh(value)) {
 *   // TypeScript knows value is Mesh here
 *   value.geometry // OK
 */
export const isMesh = createTypeGuard<Mesh>('isMesh')

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
export const isCamera = createTypeGuard<Camera>('isCamera')

/**
 * Type guard to check if a value is a Three.js OrthographicCamera
 * @param value - The value to check
 * @returns True if the value is a Three.js OrthographicCamera instance, false otherwise
 */
export const isOrthographicCamera = createTypeGuard<OrthographicCamera>('isOrthographicCamera')

/**
 * Type guard to check if a value is a Three.js PerspectiveCamera
 * @param value - The value to check
 * @returns True if the value is a Three.js PerspectiveCamera instance, false otherwise
 */
export const isPerspectiveCamera = createTypeGuard<PerspectiveCamera>('isPerspectiveCamera')

/**
 * Type guard to check if a value is a Three.js Color
 * @param value - The value to check
 * @returns True if the value is a Three.js Color instance, false otherwise
 */
export const isColor = createTypeGuard<Color>('isColor')

/**
 * Type guard to check if a value is a Three.js ColorRepresentation
 * @param value - The value to check
 * @returns True if the value is a Three.js ColorRepresentation instance, false otherwise
 */
export const isColorRepresentation = (value: unknown): value is ColorRepresentation =>
  isString(value) || isNumber(value) || isColor(value)

/**
 * Type guard to check if a value is a Three.js Layers
 * @param value - The value to check
 * @returns True if the value is a Three.js Layers instance, false otherwise
 */
export const isLayers = (value: unknown): value is Layers => value instanceof Layers // three does not implement .isLayers

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
export const isBufferGeometry = createTypeGuard<BufferGeometry>('isBufferGeometry')

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
export const isMaterial = createTypeGuard<Material>('isMaterial')

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
export const isLight = createTypeGuard<Light>('isLight')

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
export const isFog = createTypeGuard<Fog>('isFog')

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
export const isScene = createTypeGuard<Scene>('isScene')

/**
 * Type guard to check if a value is a Three.js Group
 * @param value - The value to check
 * @returns True if the value is a Three.js Group instance, false otherwise
 * ```
 */
export const isGroup = createTypeGuard<Group>('isGroup')
