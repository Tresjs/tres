<script lang="ts">
import { useTres } from '@tresjs/core'
import { RenderPixelatedPass } from 'three/examples/jsm/postprocessing/RenderPixelatedPass.js'
import { watchEffect } from 'vue'
import { makePropWatchers } from '../../util/prop'
import { useEffect } from './composables/useEffect'

export interface PixelationProps {
  pixelSize: number
  depthEdgeStrength?: number
  normalEdgeStrength?: number
}
</script>

<script lang="ts" setup>
const props = defineProps<PixelationProps>()

const { scene, camera } = useTres()

const { pass } = useEffect(() => new RenderPixelatedPass(props.pixelSize, scene.value, camera.value!), props)

defineExpose({ pass })

watchEffect(() => {
  pass.value.setPixelSize(props.pixelSize)
})

makePropWatchers(
  [
    [() => props.depthEdgeStrength, 'depthEdgeStrength'],
    [() => props.normalEdgeStrength, 'normalEdgeStrength'],
  ],
  pass,
  () => new RenderPixelatedPass(1, scene.value, camera.value!),
)
</script>
