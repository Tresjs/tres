<script lang="ts">
import { useLoop, useTres } from '@tresjs/core'
import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass.js'
import { makePropWatchers } from '../../util/prop'
import { useEffect } from './composables/useEffect'

export interface GlitchProps {
  /**
   * The size of the generated noise map
   */
  dtSize?: number
  /**
   * If true, the glitch effect will be more wild 🤪
   */
  goWild?: boolean
}
</script>

<script lang="ts" setup>
const props = defineProps<GlitchProps>()

const { pass } = useEffect(() => new GlitchPass(props.dtSize), props, ['dtSize'])

const { invalidate } = useTres()

defineExpose({ pass })

const { onBeforeRender } = useLoop()
onBeforeRender(() => invalidate())

makePropWatchers(
  [[() => props.goWild, 'goWild']],
  pass,
  () => new GlitchPass(),
)
</script>
