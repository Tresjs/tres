import type { MaybeRef } from '@vueuse/core'
import { buildGraph } from '../../utils/graph'
import { computed, toValue } from 'vue'
import type { TresObject } from '../../types'

export const useGraph = (object: MaybeRef<TresObject | undefined>) => {
  return computed(() => {
    const obj = toValue(object)
    if (!obj) { return undefined }
    return buildGraph(obj)
  })
}
