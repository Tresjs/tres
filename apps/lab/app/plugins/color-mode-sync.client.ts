// The shell and the viewer iframe are separate Nuxt apps on one origin. A `storage` event fires in
// every other same-origin window when one of them writes the color mode, so the iframe follows the shell.
export default defineNuxtPlugin(() => {
  const colorMode = useColorMode()
  // @nuxtjs/color-mode's default key; nuxt.config does not override it.
  const storageKey = 'nuxt-color-mode'

  window.addEventListener('storage', (event) => {
    if (event.key === storageKey && event.newValue && event.newValue !== colorMode.preference) {
      colorMode.preference = event.newValue
    }
  })
})
