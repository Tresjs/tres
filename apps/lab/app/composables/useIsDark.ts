// Experiments read dark mode from Nuxt color mode, the source the shell toggle writes and the iframe sync
// follows. VueUse `useDark` keeps its own storage key and writes the <html> class too, so it drifts from both.
export function useIsDark() {
  const colorMode = useColorMode()
  return computed(() => colorMode.value === 'dark')
}
