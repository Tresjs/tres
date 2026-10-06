import type { InstancedMesh } from 'three'
import type { InjectionKey, ShallowRef } from 'vue'
import type { PositionMesh } from './PositionMesh'

export interface InstancesApi {
  mesh: ShallowRef<InstancedMesh | null>
  register: (node: PositionMesh) => void
  unregister: (node: PositionMesh) => void
  requestColorBuffer: () => void
}

export const INSTANCES_INJECTION_KEY: InjectionKey<InstancesApi> = Symbol('tresInstances')

export const MERGED_INJECTION_KEY: InjectionKey<Record<string, InstancesApi>> = Symbol('tresMergedInstances')
