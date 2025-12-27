/* eslint-disable ts/method-signature-style */
import type * as THREE from 'three'

import type { DefineComponent, VNode, VNodeRef } from 'vue'
import type { TresContext } from '../composables/useTresContextProvider'
import type { PointerEventHandlers } from '../utils/pointerEvents'

// Based on React Three Fiber types by Pmndrs
// https://github.com/pmndrs/react-three-fiber/blob/v9/packages/fiber/src/three-types.ts

export type AttachFnType = (parent: any, self: TresInstance) => () => void
export type AttachType = string | AttachFnType
export type DisposeType = ((self: TresInstance) => void) | boolean | 'default'

export type ConstructorRepresentation = new (...args: any[]) => any

export type NonFunctionKeys<P> = { [K in keyof P]-?: P[K] extends (...args: any[]) => any ? never : K }[keyof P]
export type Overwrite<P, O> = Omit<P, NonFunctionKeys<O>> & O
export type Properties<T> = Pick<T, NonFunctionKeys<T>>
export type Mutable<P> = { [K in keyof P]: P[K] | Readonly<P[K]> }
export type Args<T> = T extends ConstructorRepresentation ? ConstructorParameters<T> : any[]

export interface TresCatalogue {
  [name: string]: ConstructorRepresentation
}

export type TresCamera = THREE.OrthographicCamera | THREE.PerspectiveCamera

/**
 * Represents the properties of an instance.
 *
 * @template T - The type of the object.
 * @template P - The type of the arguments.
 */
export interface InstanceProps<T = any, P = any> {
  args?: Args<P>
  object?: T
  visible?: boolean
  dispose?: null
  attach?: AttachType
}

interface TresBaseObject {
  removeFromParent?: () => void
  dispose?: () => void
  [prop: string]: any // for arbitrary properties
}

export interface LocalState {
  type: string
  root: TresContext
  memoizedProps: { [key: string]: any }
  // NOTE:
  // LocalState holds information about the parent/child relationship
  // in the Vue graph. Note that this is distinct from THREE's
  // Object3D.parent/children graph. parent/objects holds all
  // <parent>
  //   <object />
  // </parent>
  // relationships. This includes Object3D.parent/children
  // added via tags. But it also includes materials and geometries.
  objects: TresObject[]
  parent: TresObject | null
  // NOTE: End graph info

  primitive?: boolean
  dispose?: DisposeType
  attach?: AttachType
  previousAttach: any
}

// Custom type for geometry and material properties in Object3D
export interface TresObject3D extends THREE.Object3D<THREE.Object3DEventMap> {
  geometry?: THREE.BufferGeometry & TresBaseObject
  material?: THREE.Material & TresBaseObject
}

export type TresObject =
  TresBaseObject & (TresObject3D | THREE.BufferGeometry | THREE.Material | THREE.Fog) & { __tres?: LocalState }

/**
 * Union type covering all common Three.js material types
 * This provides better TypeScript intellisense and type checking
 * when accessing specific material properties
 */
export type TresMaterial =
  | THREE.MeshBasicMaterial
  | THREE.MeshStandardMaterial
  | THREE.MeshPhysicalMaterial
  | THREE.MeshLambertMaterial
  | THREE.MeshPhongMaterial
  | THREE.MeshToonMaterial
  | THREE.MeshNormalMaterial
  | THREE.MeshMatcapMaterial
  | THREE.MeshDepthMaterial
  | THREE.MeshDistanceMaterial
  | THREE.LineBasicMaterial
  | THREE.LineDashedMaterial
  | THREE.PointsMaterial
  | THREE.SpriteMaterial
  | THREE.ShaderMaterial
  | THREE.RawShaderMaterial
  | THREE.ShadowMaterial
  | THREE.Material // Fallback for any other materials
export type TresInstance = TresObject & { __tres: LocalState }

export type TresPrimitive = TresInstance & { object: TresInstance, isPrimitive: true }

export interface TresScene extends THREE.Scene {
  __tres: {
    root: TresContext
  }
}

interface MathRepresentation {
  set(...args: number[] | [THREE.ColorRepresentation]): any
}
interface VectorRepresentation extends MathRepresentation {
  setScalar(s: number): any
}

export interface VectorCoordinates {
  x: number
  y: number
  z: number
}

export type MathType<T extends MathRepresentation | THREE.Euler> = T extends THREE.Color
  ? ConstructorParameters<typeof THREE.Color> | THREE.ColorRepresentation

  : T extends VectorRepresentation | THREE.Layers | THREE.Euler ? T | Parameters<T['set']> | number | VectorCoordinates : T | Parameters<T['set']>

type VectorLike<VectorClass extends THREE.Vector2 | THREE.Vector3 | THREE.Vector4> =
  | VectorClass
  | Parameters<VectorClass['set']>
  | Readonly<Parameters<VectorClass['set']>>
  | Parameters<VectorClass['setScalar']>[0]

export type TresVector2 = VectorLike<THREE.Vector2>
export type TresVector3 = VectorLike<THREE.Vector3>
export type TresVector4 = VectorLike<THREE.Vector4>
export type TresColor = ConstructorParameters<typeof THREE.Color> | THREE.Color | number | string // Parameters<T> will not work here because of multiple function signatures in three.js types
export type TresColorArray = typeof THREE.Color | [color: THREE.ColorRepresentation]
export type TresLayers = THREE.Layers | Parameters<THREE.Layers['set']>[0]
export type TresQuaternion = THREE.Quaternion | Parameters<THREE.Quaternion['set']>
export type TresEuler = THREE.Euler
export type TresControl = THREE.EventDispatcher & { enabled: boolean }
export type TresContextWithClock = TresContext & { delta: number, elapsed: number }

export type WithMathProps<P> = { [K in keyof P]: P[K] extends MathRepresentation | THREE.Euler ? MathType<P[K]> : P[K] }

interface RaycastableRepresentation {
  raycast: (raycaster: THREE.Raycaster, intersects: THREE.Intersection[]) => void
}
type EventProps<P> = P extends RaycastableRepresentation ? Partial<PointerEventHandlers> : unknown
export type { TresPointerEvent } from '../utils/pointerEvents'

export interface VueProps {
  children?: VNode[]
  ref?: VNodeRef
  key?: string | number | symbol
}

export type ElementProps<T extends ConstructorRepresentation, P = InstanceType<T>> = Partial<
  Overwrite<P, WithMathProps<P> & VueProps & EventProps<P>>
>

export type ThreeElement<T extends ConstructorRepresentation> = Mutable<
  Overwrite<ElementProps<T>, Omit<InstanceProps<InstanceType<T>, T>, 'object'>>
>

type ThreeExports = typeof THREE
type ThreeInstancesImpl = {
  [K in keyof ThreeExports as Uncapitalize<K>]: ThreeExports[K] extends ConstructorRepresentation
    ? ThreeElement<ThreeExports[K]>
    : never
}

export interface ThreeInstances extends ThreeInstancesImpl {
  primitive: Omit<ThreeElement<any>, 'args'> & { object: object }
}

type TresComponents = {
  [K in keyof ThreeInstances as `Tres${Capitalize<string & K>}`]: DefineComponent<ThreeInstances[K]>
}

declare module 'vue' {
  export interface GlobalComponents extends TresComponents {
    primitive: DefineComponent<TresPrimitive>
  }
}
