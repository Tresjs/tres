<script setup lang="ts">
import { RenderTarget } from 'three'
import { nodeMaterials } from './ContactShadowsNodeMaterial'
import type { ContactShadowsProps } from './props'
import { contactShadowsDefaults } from './props'
import { useContactShadows } from './useContactShadows'

const props = withDefaults(defineProps<ContactShadowsProps>(), contactShadowsDefaults)

const { shadowGroup } = useContactShadows(props, {
  ...nodeMaterials,
  createTarget: size => new RenderTarget(size, size),
  forWebGPURenderer: true,
})

defineExpose({ instance: shadowGroup })
</script>

<template>
  <primitive :object="shadowGroup" />
</template>
