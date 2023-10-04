import { defineComponent, onUnmounted } from 'vue'
import StatsGlImpl from 'stats-gl'
import { useRenderLoop, useTresContext } from '@tresjs/core'

export interface StatsGlProps {
  /*
   * How often to log performance data, in logs per second.
   *
   * @default 20
   * @type {number}
   * @memberof StatsGlProps
   */
  logsPerSecond?: number

  /*
   * Number of recent log samples to keep for computing averages.
   *
   * @default 100
   * @type {number}
   * @memberof StatsGlProps
   */
  samplesLog?: number

  /*
   * Number of recent graph samples to keep for computing averages.
   *
   * @default 10
   * @type {number}
   * @memberof StatsGlProps
   */
  samplesGraph?: number

  /*
   * Precision of the data, in number of decimal places (only affects CPU and GPU).
   *
   * @default 2
   * @type {number}
   * @memberof StatsGlProps
   */
  precision?: number

  /*
   * Display the canvases on the X axis, set to align on vertical axis.
   *
   * @default true
   * @type {boolean}
   * @memberof StatsGlProps
   */
  horizontal?: boolean

  /*
   * A boolean value to control the minimalistic mode of the panel display. If set to true, a simple click on the panel will switch between different metrics.
   *
   * @default false
   * @type {boolean}
   * @memberof StatsGlProps
   */
  minimal?: boolean

  /*
   * Sets the initial panel to display - 0 for FPS, 1 for CPU, and 2 for GPU (if supported).
   *
   * @default 0
   * @type {number}
   * @memberof StatsGlProps
   */
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
    const statsGl = new StatsGlImpl({
      logsPerSecond: props.logsPerSecond,
      samplesLog: props.samplesLog,
      samplesGraph: props.samplesGraph,
      precision: props.precision,
      horizontal: props.horizontal,
      minimal: props.minimal,
      mode: props.mode,
    })

    expose({ statsGl })

    const node = document.body
    node?.appendChild(statsGl.container)

    const { renderer } = useTresContext()
    const { onBeforeLoop, onAfterLoop, resume } = useRenderLoop()

    statsGl.init(renderer.value.domElement)

    resume()
    onBeforeLoop(() => statsGl.begin())
    onAfterLoop(() => statsGl.end())

    onUnmounted(() => {
      node?.removeChild(statsGl.container)
    })

    return null
  },
})
