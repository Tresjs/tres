import { useTres, extend } from '@tresjs/core'
import { inject, watch } from 'vue'

/**
 * Allows to use and extend the state of the core package.
 *
 * @export
 * @return {*}
 */
export function useCientos() {
  const { state, setState } = inject('useTres', useTres())
  const extend =
    inject<(objects: any) => void>('extend') ||
    (() => {
      console.warn('No extend function provided')
    })

  watch(
    () => state,
    () => {
      console.log('cientos state changed', state)
    },
  )
  return {
    state,
    setState,
    extend,
  }
}
