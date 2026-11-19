<script setup lang="ts">
import { useTres } from '@tresjs/core'
import { WebGLRenderTarget } from 'three'
import { onBeforeUnmount, shallowRef } from 'vue'
import { MeshDiscardMaterial } from '../meshDiscardMaterial/MeshDiscardMaterial'
import { useWebGPUSupportWarning } from '../../../utils/useWebGPUSupportWarning'
import { MeshTransmissionMaterial } from './MeshTransmissionMaterial'
import type { MeshTransmissionMaterialProps } from './props'
import { meshTransmissionMaterialDefaults } from './props'
import { useMeshTransmissionMaterial } from './useMeshTransmissionMaterial'

export type { MeshTransmissionMaterialProps } from './props'

const props = withDefaults(defineProps<MeshTransmissionMaterialProps>(), meshTransmissionMaterialDefaults)

useWebGPUSupportWarning(
  'MeshTransmissionMaterial',
  'renders to a texture with GLSL materials, which WebGPURenderer cannot compile. Import MeshTransmissionMaterial from @tresjs/cientos/webgpu instead',
)

const { extend } = useTres()
extend({ MeshTransmissionMaterial })

const materialRef = shallowRef<MeshTransmissionMaterial>()
const discardMaterial = new MeshDiscardMaterial()

const { constructorArgs, constructorKey, tresProps } = useMeshTransmissionMaterial(props, materialRef, {
  createTarget: (width, height, options) => new WebGLRenderTarget(width, height, options),
  discardMaterial,
  forWebGPURenderer: false,
})

onBeforeUnmount(() => discardMaterial.dispose())

defineExpose({ instance: materialRef })
</script>

<template>
  <TresMeshTransmissionMaterial
    :key="constructorKey"
    ref="materialRef"
    :args="constructorArgs"
    v-bind="tresProps"
  />
</template>
