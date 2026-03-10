import type { TresObject } from '@tresjs/core'
import type { SetupContext, VNode } from 'vue'

/** @description Approximate VueJs {@link VNode} representation. */
export type TresVNode = Omit<VNode, 'children'> & {
  __vnode: VNode & {
    children: Array<TresVNode>
    ctx: SetupContext
  }
  children: Array<TresVNode>
  ctx: SetupContext
}

/** @description approximate {@link TresObject} representation. */
export type TresVNodeObject = TresObject & { __vnode: TresVNode }

/** @description Utility type to exclude properties with the type `never` */
export type NonNever<T extends object> = {
  [K in keyof T as T[K] extends never ? never : K]: T[K];
}

/** @description Utility type to extract only **methods** of an `object` */
export type Methods<T extends object> = NonNever<{
  [K in keyof T]: T[K] extends (...args: any[]) => any ? T[K] : never;
}>

/** @description Utility picking methods/functions withing object. */
export type CallableProps<T extends object = object> = Record<keyof Methods<T>, (...args: any[]) => unknown>

/** @description */
export type VectorArray = [x: number, y: number, z: number]

/** @description */
export type QuaternionArray = [x: number, y: number, z: number, w: number]
