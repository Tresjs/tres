/* eslint-disable @typescript-eslint/ban-types */
import type { DefineComponent, VNode, VNodeRef } from 'vue'

import type * as THREE from 'three'
import type { TresContext } from '../composables/useTresContextProvider'

// Based on React Three Fiber types by Pmndrs
// https://github.com/pmndrs/react-three-fiber/blob/v9/packages/fiber/src/three-types.ts

export type AttachFnType<O = any> = (parent: any, self: O) => () => void
export type AttachType<O = any> = string | AttachFnType<O>

export type ConstructorRepresentation = new (...args: any[]) => any
export type NonFunctionKeys<P> = { [K in keyof P]-?: P[K] extends Function ? never : K }[keyof P]
export type Overwrite<P, O> = Omit<P, NonFunctionKeys<O>> & O
export type Properties<T> = Pick<T, NonFunctionKeys<T>>
export type Mutable<P> = { [K in keyof P]: P[K] | Readonly<P[K]> }
export type Args<T> = T extends ConstructorRepresentation ? ConstructorParameters<T> : any[]

export interface TresCatalogue {
  [name: string]: ConstructorRepresentation
}
export type TresCamera = THREE.OrthographicCamera | THREE.PerspectiveCamera

export interface InstanceProps<T = any, P = any> {
  args?: Args<P>
  object?: T
  visible?: boolean
  dispose?: null
  attach?: AttachType<T>
}

interface TresBaseObject {
  attach?: string
  removeFromParent?: () => void
  dispose?: () => void
  [prop: string]: any // for arbitrary properties
}

export interface LocalState {
  type: string
  // objects and parent are used when children are added with `attach` instead of being added to the Object3D scene graph
  objects: TresObject3D[]
  parent: TresObject3D | null
  primitive?: boolean
  eventCount: number
  handlers: Partial<EventHandlers>
  memoizedProps: { [key: string]: any }
  disposable: boolean
  root: TresContext
}

// Custom type for geometry and material properties in Object3D
export interface TresObject3D extends THREE.Object3D<THREE.Object3DEventMap> {
  geometry?: THREE.BufferGeometry & TresBaseObject
  material?: THREE.Material & TresBaseObject
}

export type TresObject = 
  TresBaseObject & (TresObject3D | THREE.BufferGeometry | THREE.Material | THREE.Fog) & { __tres: LocalState }

export interface TresScene extends THREE.Scene {
  __tres: {
    root: TresContext
  }
}

// Events
// eslint-disable-next-line import/namespace
export interface Intersection extends THREE.Intersection {
  /** The event source (the object which registered the handler) */
  eventObject: TresObject
}

export interface IntersectionEvent<TSourceEvent> extends Intersection {
  /** The event source (the object which registered the handler) */
  eventObject: TresObject
  /** An array of intersections */
  intersections: Intersection[]
  /** vec3.set(pointer.x, pointer.y, 0).unproject(camera) */
  unprojectedPoint: THREE.Vector3
  /** Normalized event coordinates */
  pointer: THREE.Vector2
  /** Delta between first click and this event */
  delta: number
  /** The ray that pierced it */
  ray: THREE.Ray
  /** The camera that was used by the raycaster */
  camera: TresCamera
  /** stopPropagation will stop underlying handlers from firing */
  stopPropagation: () => void
  /** The original host event */
  nativeEvent: TSourceEvent
  /** If the event was stopped by calling stopPropagation */
  stopped: boolean
}

export type ThreeEvent<TEvent> = IntersectionEvent<TEvent> & Properties<TEvent>
export type DomEvent = PointerEvent | MouseEvent | WheelEvent

export interface Events {
  onClick: EventListener
  onContextMenu: EventListener
  onDoubleClick: EventListener
  onWheel: EventListener
  onPointerDown: EventListener
  onPointerUp: EventListener
  onPointerLeave: EventListener
  onPointerMove: EventListener
  onPointerCancel: EventListener
  onLostPointerCapture: EventListener
}

export interface EventHandlers {
  onClick?: (event: ThreeEvent<MouseEvent>) => void
  onContextMenu?: (event: ThreeEvent<MouseEvent>) => void
  onDoubleClick?: (event: ThreeEvent<MouseEvent>) => void
  onPointerUp?: (event: ThreeEvent<PointerEvent>) => void
  onPointerDown?: (event: ThreeEvent<PointerEvent>) => void
  onPointerOver?: (event: ThreeEvent<PointerEvent>) => void
  onPointerOut?: (event: ThreeEvent<PointerEvent>) => void
  onPointerEnter?: (event: ThreeEvent<PointerEvent>) => void
  onPointerLeave?: (event: ThreeEvent<PointerEvent>) => void
  onPointerMove?: (event: ThreeEvent<PointerEvent>) => void
  onPointerMissed?: (event: MouseEvent) => void
  onPointerCancel?: (event: ThreeEvent<PointerEvent>) => void
  onWheel?: (event: ThreeEvent<WheelEvent>) => void
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
  // eslint-disable-next-line max-len
  : T extends VectorRepresentation | THREE.Layers | THREE.Euler ? T | Parameters<T['set']> | number | VectorCoordinates : T | Parameters<T['set']>

export type TresVector2 = MathType<THREE.Vector2>
export type TresVector3 = MathType<THREE.Vector3>
export type TresVector4 = MathType<THREE.Vector4>
export type TresColor = MathType<THREE.Color>
export type TresLayers = MathType<THREE.Layers>
export type TresQuaternion = MathType<THREE.Quaternion>
export type TresEuler = MathType<THREE.Euler>

type WithMathProps<P> = { [K in keyof P]: P[K] extends MathRepresentation | THREE.Euler ? MathType<P[K]> : P[K] }

interface RaycastableRepresentation {
  raycast(raycaster: THREE.Raycaster, intersects: THREE.Intersection[]): void
}
type EventProps<P> = P extends RaycastableRepresentation ? Partial<EventHandlers> : unknown

export interface VueProps<P> {
  children?: VNode[]
  ref?: VNodeRef
  key?: string | number | symbol
}

type ElementProps<T extends ConstructorRepresentation, P = InstanceType<T>> = Partial<
  Overwrite<WithMathProps<P>, VueProps<P> & EventProps<P>>
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
  export interface GlobalComponents extends TresComponents { }
}
/* eslint-enable @typescript-eslint/ban-types */

