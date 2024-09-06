import { useLoop } from '@tresjs/core'
import StatsImpl from 'stats.js'
import { defineComponent, onUnmounted } from 'vue'

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

    expose({ instance: stats })

    const node = document.body
    stats.showPanel(props.showPanel || 0)
    node?.appendChild(stats.dom)

    const { onBeforeRender, onAfterRender } = useLoop()
    onBeforeRender(() => stats.begin(), Number.NEGATIVE_INFINITY)
    onAfterRender(() => stats.end(), Number.POSITIVE_INFINITY)

    onUnmounted(() => {
      node?.removeChild(stats.dom)
    })
  },
})
