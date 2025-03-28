import { useTresContext } from '../../composables'

export function useRenderer() {
  return useTresContext().renderer
}
