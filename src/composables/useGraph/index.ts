import type { MaybeRef } from '@vueuse/core'
import { buildGraph } from '../../utils/graph'
import { computed, toValue } from 'vue'
import type { TresObject } from '../../types'

export function useGraph(object: MaybeRef<TresObject>) {
  return computed(() => buildGraph(toValue(object)))
}
