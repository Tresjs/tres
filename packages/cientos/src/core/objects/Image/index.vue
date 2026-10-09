<script setup lang="ts">
import { extend } from '@tresjs/core'
import { shallowRef } from 'vue'
import { useWebGPUSupportWarning } from '../../../utils/useWebGPUSupportWarning'
import { ImageMaterial } from './ImageMaterial'
import type { ImageProps } from './props'
import { imageDefaults } from './props'
import { useImage } from './useImage'

const props = withDefaults(defineProps<ImageProps>(), imageDefaults)

useWebGPUSupportWarning('Image', 'uses a GLSL ShaderMaterial, which WebGPURenderer cannot compile. Import Image from @tresjs/cientos/webgpu instead')

extend({ ImageMaterial })

const imageRef = shallowRef()
const { materialProps, scale } = useImage(props)

defineExpose({ instance: imageRef })
</script>

<template>
  <TresMesh ref="imageRef" :scale="scale">
    <slot>
      <TresPlaneGeometry :args="[1, 1, props.segments, props.segments]" />
    </slot>
    <TresImageMaterial v-bind="materialProps" />
  </TresMesh>
</template>
