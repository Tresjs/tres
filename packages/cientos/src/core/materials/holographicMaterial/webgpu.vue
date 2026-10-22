<script setup lang="ts">
import { extend } from '@tresjs/core'
import { computed, shallowRef } from 'vue'
import { HolographicNodeMaterial } from './HolographicNodeMaterial'
import type { HolographicMaterialProps } from './props'
import { holographicDefaults, toHolographicMaterialProps } from './props'

const props = withDefaults(defineProps<HolographicMaterialProps>(), holographicDefaults)

extend({ HolographicNodeMaterial })

const materialRef = shallowRef<HolographicNodeMaterial>()

defineExpose({ root: materialRef, constructor: HolographicNodeMaterial })

const materialProps = computed(() => toHolographicMaterialProps(props))
</script>

<template>
  <!-- The TSL `time` node animates the material, so it needs no per-frame update. -->
  <TresHolographicNodeMaterial ref="materialRef" v-bind="materialProps" />
</template>
