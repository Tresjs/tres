<script lang="ts">
import type { Blending } from 'three/src/constants.js'
import { useTresContext } from '@tresjs/core'
import { HalftonePass } from 'three/examples/jsm/postprocessing/HalftonePass.js'
import { HalftoneShader } from 'three/examples/jsm/shaders/HalftoneShader.js'
import { computed, watchEffect } from 'vue'
import { useEffect } from './composables/useEffect'

export enum HalftoneShape {
  Dot = 1,
  Ellipse = 2,
  Line = 3,
  Square = 4,
}

export interface HalftoneProps {
  shape?: HalftoneShape
  radius?: number
  rotateR?: number
  rotateG?: number
  rotateB?: number
  scatter?: number
  blending?: number
  greyscale?: boolean
  blendingMode?: Blending
}
</script>

<script lang="ts" setup>
const props = defineProps<HalftoneProps>()
const { sizes } = useTresContext()

const shakedProps = computed(() =>
  Object.fromEntries(
    Object.entries(props).filter(([_, value]) => value !== undefined),
  ),
)

const { pass } = useEffect(() => new HalftonePass(shakedProps.value), props)

defineExpose({ pass })

watchEffect(() => {
  pass.value.setSize(sizes.width.value, sizes.height.value)
})

watchEffect(() => {
  type UniformsKey = keyof typeof pass.value.uniforms

  Object.entries(props).forEach(([key, value]) => {
    if (key in pass.value.uniforms) {
      pass.value.uniforms[key as UniformsKey].value = value ?? HalftoneShader.uniforms[key as UniformsKey].value
    }
  })
})
</script>
