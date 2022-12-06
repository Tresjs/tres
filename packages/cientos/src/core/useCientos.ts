import { useCatalogue } from '@tresjs/core'

export function useCientos() {
  const { catalogue, extend } = useCatalogue(window.__TRES__.app)

  return {
    catalogue,
    extend,
  }
}
