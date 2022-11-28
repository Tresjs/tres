import { Object3D } from 'three'
import { VNode, VNodeTypes } from 'vue'

export type TresInstance = Object3D<Event> & { [key: string]: any }

export type TresVNodeType = VNodeTypes & {
  name?: string | Array<string>
  __name?: string
  setup?: (props: Readonly<any>) => void
}
export type TresVNode = VNode & { children?: Array<VNode>; type: TresVNodeType }
