<script lang="ts">
import { useTresContext } from '@tresjs/core'
import { Vector2 } from 'three'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'
import { LuminosityHighPassShader } from 'three/examples/jsm/shaders/LuminosityHighPassShader.js'
import { watchEffect } from 'vue'
import { useEffect } from './composables/useEffect'

export interface UnrealBloomProps {
  radius?: number
  strength?: number
  threshold?: number
}
</script>

<script lang="ts" setup>
const props = withDefaults(defineProps<UnrealBloomProps>(), {
  radius: 0,
  strength: 1,
  threshold: 0,
})

const { sizes } = useTresContext()
const { pass } = useEffect(() => new UnrealBloomPass(
  new Vector2(sizes.width.value, sizes.height.value),
  props.strength,
  props.radius,
  props.threshold,
), props)

defineExpose({ pass })

watchEffect(() => {
  pass.value.radius = props.radius
    ?? pass.value.getCompositeMaterial().uniforms.bloomRadius?.value
    ?? 0.1
})

watchEffect(() => {
  pass.value.strength
  = props.strength
    ?? pass.value.getCompositeMaterial().uniforms.bloomStrength?.value
    ?? 1
})

watchEffect(() => {
  pass.value.threshold
  = props.threshold
    ?? LuminosityHighPassShader.uniforms.luminosityThreshold?.value
    ?? 1
})
</script>
