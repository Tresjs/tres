import type { Object3D } from 'three'
import type { MaybeRef } from '@vueuse/core'
import { buildGraph } from '../../utils/graph'
import { computed, toValue } from 'vue'
import type { TresObject } from '../../types'

export function useGraph(object: MaybeRef<Object3D | TresObject>) {
  return computed(() => buildGraph(toValue(object) as Object3D))
}
