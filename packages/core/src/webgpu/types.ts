import type * as THREE_WEBGPU from 'three/webgpu'
import type { ThreeInstancesOf, TresComponents, TresComponentsOf } from '../types'

/**
 * Tres components for the `three/webgpu` classes that `three` does not export
 * (node materials, nodes, ...). Shared names keep the root types, which also matches the
 * runtime catalogue (see `TresCanvas.vue`).
 */
export type TresWebGPUComponents = Omit<TresComponentsOf<ThreeInstancesOf<typeof THREE_WEBGPU>>, keyof TresComponents>

declare module 'vue' {
  interface GlobalComponents extends TresWebGPUComponents {}
}
