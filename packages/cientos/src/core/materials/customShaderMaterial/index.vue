<script setup lang="ts">
import { useTres } from '@tresjs/core'
import CustomShaderMaterial from 'three-custom-shader-material/vanilla'
import { shallowRef, watch } from 'vue'
import type { Fn } from '@vueuse/core'
import { useWebGPUSupportWarning } from '../../../utils/useWebGPUSupportWarning'

interface CustomShaderMaterialProps {
  baseMaterial: Fn
  vertexShader?: string
  fragmentShader?: string
  silent?: boolean
  uniforms?: { [uniform: string]: any }
}

const props = defineProps<CustomShaderMaterialProps>()

useWebGPUSupportWarning('CustomShaderMaterial', 'uses the GLSL mode of three-custom-shader-material')

const customShaderMaterialClass = shallowRef(null)

const { extend, invalidate } = useTres()
extend({ CustomShaderMaterial })
watch(props, () => {
  invalidate()
})

defineExpose({ instance: customShaderMaterialClass })
</script>

<template>
  <TresCustomShaderMaterial
    ref="customShaderMaterialClass"
    :args="[props]"
  />
</template>
