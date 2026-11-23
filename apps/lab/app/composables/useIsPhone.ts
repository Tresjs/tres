import { useMediaQuery } from '@vueuse/core'

// Coarse pointer, not viewport width: a narrow desktop window has a desktop GPU,
// a phone in landscape does not. iPads match too, which is intended, they share
// the same thermal limits. Resolves synchronously on the client, false during SSR.
export function useIsPhone() {
  return useMediaQuery('(pointer: coarse)')
}
