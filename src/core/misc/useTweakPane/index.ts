import { onUnmounted, onMounted } from 'vue'
import { Pane } from 'tweakpane'
import * as EssentialsPlugin from '@tweakpane/plugin-essentials'
import { useRenderLoop } from '@tresjs/core'

type TweakPane = Pane & { addBlade(blade: any): void }
let pane: TweakPane
let fpsGraph: any

export /**
 * Creates a TweakPane instance and returns it.
 *
 * @param {string} [selector='body']
 * @return {*}
 */
  const useTweakPane = (selector = 'body') => {
    if (!pane) {
      pane = new Pane({
        container: document.querySelector(selector) as HTMLElement,
      }) as TweakPane
      pane.element.style.position = 'absolute'
      pane.element.style.top = '1rem'
      pane.element.style.right = '1rem'
      pane.element.style.zIndex = '9999'
      pane.registerPlugin(EssentialsPlugin)

      fpsGraph = pane.addBlade({
        view: 'fpsgraph',
        label: 'fpsgraph',
      })
    }

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
      const { onBeforeLoop, onAfterLoop, resume } = useRenderLoop()
      resume()
      onBeforeLoop(() => fpsGraph.begin())
      onAfterLoop(() => fpsGraph.end())
    })
    onUnmounted(() => {
      disposeTweakPane()
    })

    return { pane, fpsGraph, disposeTweakPane }
  }
