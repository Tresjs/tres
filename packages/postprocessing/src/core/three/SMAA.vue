<script lang="ts">
import { useTresContext } from '@tresjs/core'
import { useDevicePixelRatio } from '@vueuse/core'
import { SMAAPass } from 'three/examples/jsm/postprocessing/SMAAPass.js'
import { computed, watchEffect } from 'vue'
import { useEffect } from './composables/useEffect'

export interface SMAAProps {
  width?: number
  height?: number
}
</script>

<script lang="ts" setup>
const props = defineProps<SMAAProps>()

const { sizes } = useTresContext()
const { pixelRatio } = useDevicePixelRatio() // the renderers pixel ratio is not used because it is not reactive

const width = computed(() => props.width ?? sizes.width.value * pixelRatio.value)
const height = computed(() => props.height ?? sizes.height.value * pixelRatio.value)

const { pass } = useEffect(() => new SMAAPass(), props)

defineExpose({ pass })

watchEffect(() => {
  pass.value.setSize(width.value, height.value)
})
</script>
