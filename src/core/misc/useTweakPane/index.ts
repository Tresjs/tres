import { onMounted, onUnmounted } from 'vue'
import { Pane } from 'tweakpane'
import { useRenderLoop } from '@tresjs/core'
import { useLogger } from '../../../composables/useLogger'

type TweakPane = Pane & { addBlade: (blade: any) => void, addInput: (blade: any) => void }
let pane: TweakPane

export const useTweakPane = (selector = 'body') => {
  if (!pane) {
    pane = new Pane({
      container: document.querySelector(selector) as HTMLElement,
    }) as TweakPane
    pane.element.style.position = 'absolute'
    pane.element.style.top = '1rem'
    pane.element.style.right = '1rem'
    pane.element.style.zIndex = '9999'
  }

  const { logWarning } = useLogger()

  logWarning('useTweakPane is deprecated as of Cientos v3.7.0 and will no longer be part of this package. Please migrate to @tresjs/leches package https://github.com/Tresjs/leches or v-tweakpane https://github.com/vinayakkulkarni/v-tweakpane instead.')
  // eslint-enabled

  /**
   * Disposes the TweakPane instance.
   *
   */
  function disposeTweakPane() {
    if (pane) {
      pane.dispose()
    }
  }

  onMounted(() => {
    const { resume } = useRenderLoop()
    resume()
  })
  onUnmounted(() => {
    disposeTweakPane()
  })

  return { pane, disposeTweakPane }
}
