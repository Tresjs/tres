import { Object3D } from 'three'
import { VNode, VNodeTypes } from 'vue'

export type TresInstance = Object3D<Event> & { [key: string]: any }

export type TresCatalogue = Record<string, any>
export type TresVNodeType = VNodeTypes & {
  name?: string | Array<string>
  __name?: string
  setup?: (props: Readonly<any>) => void
}
export type TresVNode = VNode & { children?: Array<VNode>; type: TresVNodeType }
export type TresAttributes = Record<string, any> & { args?: number[] }

declare global {
  // Define the window interface, with type annotations for the properties and methods of the window object
  interface Window {
    // Define the location property, with a type of Location
    __TRES__: {
      app: App
      version: string
    }
  }
}
