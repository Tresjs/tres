<script setup lang="ts">
import type { Group } from 'three'
import { shallowRef } from 'vue'
import { OutlineNodeMaterial } from './OutlineNodeMaterial'
import type { OutlineProps } from './props'
import { outlineDefaults } from './props'
import { useOutline } from './useOutline'

const props = withDefaults(defineProps<OutlineProps>(), outlineDefaults)

const groupRef = shallowRef<Group>()

defineExpose({ instance: groupRef })

useOutline(props, groupRef, new OutlineNodeMaterial())
</script>

<template>
  <TresGroup ref="groupRef" />
</template>
