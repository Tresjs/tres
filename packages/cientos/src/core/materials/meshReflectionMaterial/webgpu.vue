<script setup lang="ts">
import { useTres } from '@tresjs/core'
import { RenderTarget } from 'three'
import { shallowRef } from 'vue'
import { ConvolutionNodeMaterial } from './ConvolutionNodeMaterial'
import { MeshReflectionNodeMaterial } from './MeshReflectionNodeMaterial'
import type { MeshReflectionMaterialProps } from './props'
import { meshReflectionMaterialDefaults } from './props'
import { useMeshReflectionMaterial } from './useMeshReflectionMaterial'

const props = withDefaults(defineProps<MeshReflectionMaterialProps>(), meshReflectionMaterialDefaults)

const { extend } = useTres()
extend({ MeshReflectionNodeMaterial })

const materialRef = shallowRef<MeshReflectionNodeMaterial>()

const { tresProps, hasBlur, hasDepth } = useMeshReflectionMaterial(props, materialRef, {
  createTarget: (width, height, options) => new RenderTarget(width, height, options),
  createConvolutionMaterial: () => new ConvolutionNodeMaterial(),
  forWebGPURenderer: true,
})

defineExpose({ instance: materialRef })
</script>

<template>
  <!-- The GLSL defines are uniforms here, so the material never remounts. -->
  <TresMeshReflectionNodeMaterial
    ref="materialRef"
    v-bind="tresProps"
    :use-blur="hasBlur"
    :use-depth="hasDepth"
  />
</template>
