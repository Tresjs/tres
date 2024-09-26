<script lang="ts">
import type { Blending } from 'three/src/constants.js'
import { useTresContext } from '@tresjs/core'
import { HalftonePass } from 'three/examples/jsm/postprocessing/HalftonePass.js'
import { HalftoneShader } from 'three/examples/jsm/shaders/HalftoneShader.js'
import { computed, watchEffect } from 'vue'
import { useEffect } from './composables/useEffect'

export const Dot = 1
export const Ellipse = 2
export const Line = 3
export const Square = 4

export type HalftoneShape = typeof Dot | typeof Ellipse | typeof Line | typeof Square

interface HalftonePassProps {
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
const props = defineProps<HalftonePassProps>()
const { sizes } = useTresContext()

const shakedProps = computed(() =>
  Object.fromEntries(
    Object.entries(props).filter(([_, value]) => value !== undefined),
  ),
)

const { pass } = useEffect(() => new HalftonePass(
  sizes.width.value,
  sizes.height.value,
  shakedProps.value,
))
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
