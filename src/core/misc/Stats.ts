import { onUnmounted, defineComponent } from 'vue'
import { useRenderLoop } from '@tresjs/core'
import StatsImpl from 'stats.js'

export const Stats = defineComponent({
  name: 'Stats',
  props: {
    showPanel: {
      type: Number,
      default: 0,
    },
  },

  setup(props, { expose }) {

    const stats = new StatsImpl()

    expose({ stats })

    const node = document.body
    stats.showPanel(props.showPanel || 0)
    node?.appendChild(stats.dom)

    const { onBeforeLoop, onAfterLoop, resume } = useRenderLoop()
    resume()
    onBeforeLoop(() => stats.begin())
    onAfterLoop(() => stats.end())
    
    onUnmounted(() => {
      node?.removeChild(stats.dom)
    })
  },
})
