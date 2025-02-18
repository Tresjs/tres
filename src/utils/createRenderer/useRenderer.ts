import { useTresContext } from 'src/composables'

export function useRenderer() {
  return useTresContext().renderer
}
