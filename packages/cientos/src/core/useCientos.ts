import { inject } from 'vue'

export function useCientos() {
  const extend =
    inject<(objects: any) => void>('extend') ||
    (() => {
      console.warn('No extend function provided')
    })
  return {
    extend,
  }
}
