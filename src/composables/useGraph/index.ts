import type { Object3D } from 'three'
import type { MaybeRef } from '@vueuse/core'
import { buildGraph } from '../../utils/graph'
import { computed, toValue } from 'vue'

export function useGraph(object: MaybeRef<Object3D>) {
  return computed(() => buildGraph(toValue(object)))
}
