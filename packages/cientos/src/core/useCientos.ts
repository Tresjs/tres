import { useCatalogue } from '@tresjs/core'
import { getCurrentInstance } from 'vue'

export function useCientos() {
  const { appContext } = getCurrentInstance()
  const { catalogue, extend } = useCatalogue(appContext.app)

  return {
    catalogue,
    extend,
  }
}
