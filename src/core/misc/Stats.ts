import { onUnmounted, onMounted } from 'vue'
import { useRenderLoop } from '@tresjs/core'
import StatsImpl from 'stats.js'

export /**
 * Initialize stats with a specific panel.
 *
 * @param {number} [showPanel=0]
 * @return {*}
 */
const stats = (showPanel = 0) => {
  const stats = new StatsImpl()

  if (stats) {
    const node = document.body
    stats.showPanel(showPanel)
    node?.appendChild(stats.dom)

    onMounted(() => {
      const { onBeforeLoop, onAfterLoop, resume } = useRenderLoop()
      resume()
      onBeforeLoop(() => stats.begin())
      onAfterLoop(() => stats.end())
    })
    onUnmounted(() => {
      node?.removeChild(stats.dom)
    })
  }

  return null
}
