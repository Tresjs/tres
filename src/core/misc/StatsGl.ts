import { defineComponent } from 'vue'
import StatsGlImpl from 'stats-gl'
import { useRenderLoop, useTresContext } from '@tresjs/core'

export interface StatsGlProps {
  logsPerSecond?: number
  samplesLog?: number
  samplesGraph?: number
  precision?: number
  horizontal?: boolean
  minimal?: boolean
  mode?: number
}

export const StatsGl = defineComponent<StatsGlProps>({
  name: 'StatsGl',
  props: [
    'logsPerSecond',
    'samplesLog',
    'samplesGraph',
    'precision',
    'horizontal',
    'minimal',
    'mode',
  ] as unknown as undefined,

  async setup(props, { expose }) {
    const stats = new StatsGlImpl({
      logsPerSecond: props.logsPerSecond,
      samplesLog: props.samplesLog,
      samplesGraph: props.samplesGraph,
      precision: props.precision,
      horizontal: props.horizontal,
      minimal: props.minimal,
      mode: props.mode,
    })

    expose({ stats })

    const node = document.body
    node?.appendChild(stats.container)

    const { renderer } = useTresContext()
    const { onBeforeLoop, onAfterLoop, resume } = useRenderLoop()

    stats.init(renderer.value.domElement)

    resume()
    onBeforeLoop(() => stats.begin())
    onAfterLoop(() => stats.end())

    return null
  },
})
