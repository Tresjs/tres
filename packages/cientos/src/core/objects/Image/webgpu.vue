<script setup lang="ts">
import { extend } from '@tresjs/core'
import { shallowRef } from 'vue'
import { ImageNodeMaterial } from './ImageNodeMaterial'
import type { ImageProps } from './props'
import { imageDefaults } from './props'
import { useImage } from './useImage'

const props = withDefaults(defineProps<ImageProps>(), imageDefaults)

extend({ ImageNodeMaterial })

const imageRef = shallowRef()
const { materialProps, scale } = useImage(props)

defineExpose({ instance: imageRef })
</script>

<template>
  <TresMesh ref="imageRef" :scale="scale">
    <slot>
      <TresPlaneGeometry :args="[1, 1, props.segments, props.segments]" />
    </slot>
    <!-- WebGPURenderer tone-maps the whole frame, so it ignores `toneMapped`. -->
    <TresImageNodeMaterial v-bind="materialProps" />
  </TresMesh>
</template>
