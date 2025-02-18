import { useTresContext } from 'src/composables'

export function useEvents() {
  return useTresContext().events
}
