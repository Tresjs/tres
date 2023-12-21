/**
 * Shows a toast or console.log
 *
 * @param message - message to log
 * @param type - different color of the tooltip
 */
export function toastMessage(
  message: string,
  type?: 'normal' | 'error' | 'warn' | undefined,
) {
  const tresMessage = `▲ ■ ●${message}`

  if (typeof __VUE_DEVTOOLS_TOAST__ === 'function') {
    // No longer available :(
    __VUE_DEVTOOLS_TOAST__(tresMessage, type)
  }
  else if (type === 'error') {
    console.error(tresMessage)
  }
  else if (type === 'warn') {
    console.warn(tresMessage)
  }
  else {
    console.log(tresMessage)
  }
}