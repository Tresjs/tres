<script setup lang="ts">
import { TresPortal, useTres } from '@tresjs/core'
import { RenderTarget } from 'three'
import { shallowRef } from 'vue'
import { createPortalBlendNodePass, MeshPortalNodeMaterial } from './MeshPortalNodeMaterial'
import type { MeshPortalMaterialProps } from './props'
import { meshPortalMaterialDefaults } from './props'
import { useMeshPortalMaterial } from './useMeshPortalMaterial'

const props = withDefaults(defineProps<MeshPortalMaterialProps>(), meshPortalMaterialDefaults)

const { extend } = useTres()
extend({ MeshPortalNodeMaterial })

const materialRef = shallowRef<MeshPortalNodeMaterial>()

const { portalScene } = useMeshPortalMaterial(props, materialRef, {
  createTarget: (width, height, options) => new RenderTarget(width, height, options),
  createBlendPass: createPortalBlendNodePass,
  forWebGPURenderer: true,
})

defineExpose({ instance: materialRef })
</script>

<template>
  <TresMeshPortalNodeMaterial ref="materialRef" />
  <TresPortal :to="portalScene">
    <slot></slot>
  </TresPortal>
</template>
