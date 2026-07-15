<script setup lang="ts">
import { computed, inject, ref } from 'vue'
import { MARCHING_CUBES_PROVIDE_KEY } from './const'
import type { MarchingCubesApi } from './MarchingCubes.vue'
import { useLoop } from '@tresjs/core'

interface MarchingPlaneProps {
  planeType?: 'x' | 'y' | 'z'
  strength?: number
  subtract?: number
}

const props = withDefaults(defineProps<MarchingPlaneProps>(), {
  planeType: 'x',
  strength: 0.5,
  subtract: 12,
})

const { parent } = inject(MARCHING_CUBES_PROVIDE_KEY) as MarchingCubesApi
const wallRef = ref()
const planeType = computed(
  () => (props.planeType === 'x' ? 'addPlaneX' : props.planeType === 'y' ? 'addPlaneY' : 'addPlaneZ'),
)

useLoop().onBeforeRender(() => {
  if (!parent.value || !wallRef.value) { return }
  parent.value[planeType.value](props.strength, props.subtract)
})
</script>

<template>
  <TresGroup ref="wallRef" />
</template>
