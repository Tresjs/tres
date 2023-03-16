import { Color, Intersection, Object3D, Vector2, Vector3, Event } from 'three'
import { VNode, VNodeTypes } from 'vue'

export type TresInstance = Object3D<Event> & { [key: string]: any }

export type TresObject = {
  /**
   * A Vector3 | Array | scalar representing the object's local position. Default is (0, 0, 0).
   *
   * @type {TresVectorProp}
   */
  position?: TresVectorProp
  /**
   * A Vector3 | Array | scalar representing the object's local rotation. Default is (0, 0, 0).
   *
   * @type {TresVectorProp}
   */
  rotation?: TresVectorProp
  /**
   * A Vector3 | Array | scalar representing the object's local scale. Default is (0, 0, 0).
   *
   * @type {TresVectorProp}
   */
  scale?: TresVectorProp
  /**
   * Color of the material, by default set to white (0xffffff).
   *
   * @type {TresColor}
   */
  color?: TresColor
  opacity?: number
  visible?: boolean
  attach: string
  parent: TresObject | null
  dispose?: () => void
  __previousAttach?: string
  [key: string]: any
}

export type TresCatalogue = Record<string, any>
export type TresVNodeType = VNodeTypes & {
  name?: string | Array<string>
  __name?: string
  setup?: (props: Readonly<any>) => void
}
export type TresVNode = VNode & { children?: Array<VNode | { default: any }>; type: TresVNodeType }
export type TresAttributes = Record<string, any> & { args?: number[] }

export type TresVectorProp = Vector2 | Vector3 | number[] | number
export type TresColor = string | number | Color | number[]

export interface TresEvent extends Intersection<Object3D<Event>> {
  object: Object3D
  distance: number
  faceIndex?: number | undefined
  point: Vector3
  uv?: Vector2
}
