<script setup lang="ts">
import type { Group } from 'three'
import { shallowRef } from 'vue'
import { useWebGPUSupportWarning } from '../../../utils/useWebGPUSupportWarning'
import { OutlineMaterial } from './OutlineMaterial'
import type { OutlineMaterialLike, OutlineProps } from './props'
import { outlineDefaults } from './props'
import { useOutline } from './useOutline'

const props = withDefaults(defineProps<OutlineProps>(), outlineDefaults)

useWebGPUSupportWarning('Outline', 'uses a GLSL ShaderMaterial, which WebGPURenderer cannot compile. Import Outline from @tresjs/cientos/webgpu instead')

const groupRef = shallowRef<Group>()

defineExpose({ instance: groupRef })

useOutline(props, groupRef, new OutlineMaterial() as unknown as OutlineMaterialLike)
</script>

<template>
  <TresGroup ref="groupRef" />
</template>
