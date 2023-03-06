import { Color, Intersection, Object3D, Vector2, Vector3, Event } from 'three'
import { VNode, VNodeTypes } from 'vue'

export type TresInstance = Object3D<Event> & { [key: string]: any }

export type TresObject = Object3D<Event> & {
  position?: TresVectorProp
  rotation?: TresVectorProp
  scale?: TresVectorProp
  color?: TresColor
  opacity?: number
  visible?: boolean
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
