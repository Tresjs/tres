<script setup lang="ts">
import { TresPortal, useTres } from '@tresjs/core'
import { WebGLRenderTarget } from 'three'
import { shallowRef } from 'vue'
import { useWebGPUSupportWarning } from '../../../utils/useWebGPUSupportWarning'
import { createPortalBlendPass, PortalMaterialImpl } from './PortalMaterialImpl'
import type { MeshPortalMaterialProps } from './props'
import { meshPortalMaterialDefaults } from './props'
import { useMeshPortalMaterial } from './useMeshPortalMaterial'

export type { MeshPortalMaterialProps } from './props'

const props = withDefaults(defineProps<MeshPortalMaterialProps>(), meshPortalMaterialDefaults)

useWebGPUSupportWarning(
  'MeshPortalMaterial',
  'renders to a texture with GLSL materials, which WebGPURenderer cannot compile. Import MeshPortalMaterial from @tresjs/cientos/webgpu instead',
)

const { extend } = useTres()
extend({ PortalMaterialImpl })

const materialRef = shallowRef<PortalMaterialImpl>()

const { portalScene } = useMeshPortalMaterial(props, materialRef, {
  createTarget: (width, height, options) => new WebGLRenderTarget(width, height, options),
  createBlendPass: createPortalBlendPass,
  forWebGPURenderer: false,
})

defineExpose({ instance: materialRef })
</script>

<template>
  <TresPortalMaterialImpl ref="materialRef" />
  <TresPortal :to="portalScene">
    <slot></slot>
  </TresPortal>
</template>
