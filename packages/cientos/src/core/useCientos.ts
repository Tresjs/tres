import { useTres, useLogger } from '@tresjs/core'
import { inject } from 'vue'
/**
 * Allows to use and extend the state of the core package.
 *
 * @export
 * @return {*}
 */
export function useCientos() {
  const { logWarning } = useLogger()
  const { state, setState } = inject('useTres', useTres())
  const extend =
    inject<(objects: any) => void>('extend') ||
    (() => {
      logWarning('No extend function provided')
    })

  return {
    state,
    setState,
    extend,
  }
}
