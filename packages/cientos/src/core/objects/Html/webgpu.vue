<script setup lang="ts">
import { HtmlNodeMaterial } from './HtmlNodeMaterial'
import type { HtmlProps } from './props'
import { htmlDefaults } from './props'
import { useHtml } from './useHtml'

const props = withDefaults(defineProps<HtmlProps>(), htmlDefaults)

const emit = defineEmits<{ onOcclude: [occluded: boolean] }>()

const {
  groupRef,
  occlusionMeshRef,
  defaultPlaneGeometry,
  effectiveMaterial,
  isRayCastOcclusion,
  isVisible,
} = useHtml(props, emit, billboard => new HtmlNodeMaterial(billboard))

defineExpose({
  instance: groupRef,
  isVisible,
  occlusionMesh: occlusionMeshRef,
})
</script>

<template>
  <TresGroup ref="groupRef">
    <template v-if="occlude && !isRayCastOcclusion">
      <TresMesh
        ref="occlusionMeshRef"
        :material="effectiveMaterial"
        :cast-shadow="castShadow"
        :receive-shadow="receiveShadow"
        :geometry="geometry || defaultPlaneGeometry"
      />
    </template>
  </TresGroup>
</template>
