<script setup lang="ts">
import { useTres } from '@tresjs/core'
import { RenderTarget } from 'three'
import { onBeforeUnmount, shallowRef } from 'vue'
import { MeshDiscardNodeMaterial } from '../meshDiscardMaterial/MeshDiscardNodeMaterial'
import { MeshTransmissionNodeMaterial } from './MeshTransmissionNodeMaterial'
import type { MeshTransmissionMaterialProps } from './props'
import { meshTransmissionMaterialDefaults } from './props'
import { useMeshTransmissionMaterial } from './useMeshTransmissionMaterial'

const props = withDefaults(defineProps<MeshTransmissionMaterialProps>(), meshTransmissionMaterialDefaults)

const { extend } = useTres()
extend({ MeshTransmissionNodeMaterial })

const materialRef = shallowRef<MeshTransmissionNodeMaterial>()
const discardMaterial = new MeshDiscardNodeMaterial()

const { constructorArgs, constructorKey, tresProps } = useMeshTransmissionMaterial(props, materialRef, {
  createTarget: (width, height, options) => new RenderTarget(width, height, options),
  discardMaterial,
  forWebGPURenderer: true,
})

onBeforeUnmount(() => discardMaterial.dispose())

defineExpose({ instance: materialRef })
</script>

<template>
  <TresMeshTransmissionNodeMaterial
    :key="constructorKey"
    ref="materialRef"
    :args="constructorArgs"
    v-bind="tresProps"
  />
</template>
