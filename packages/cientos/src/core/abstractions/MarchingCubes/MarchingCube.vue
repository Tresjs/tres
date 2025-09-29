<script setup lang="ts">
import { useLoop } from '@tresjs/core'
import { computed, inject, shallowRef } from 'vue'
import { Color, type ColorRepresentation, Vector3 } from 'three'
import type { MarchingCubesApi } from './MarchingCubes.vue'
import { MARCHING_CUBES_PROVIDE_KEY } from './const'

interface MarchingCubeProps {
  strength?: number
  subtract?: number
  color?: ColorRepresentation
}

const props = withDefaults(defineProps<MarchingCubeProps>(), {
  strength: 0.5,
  subtract: 12,
})

const { parent } = inject(MARCHING_CUBES_PROVIDE_KEY) as MarchingCubesApi
const cubeRef = shallowRef()
const vec = new Vector3()
const color = computed(() => new Color(props.color))

useLoop().onBeforeRender(() => {
  if (!parent.value || !cubeRef.value) { return }
  cubeRef.value.getWorldPosition(vec)
  parent.value.addBall(0.5 + vec.x * 0.5, 0.5 + vec.y * 0.5, 0.5 + vec.z * 0.5, props.strength, props.subtract, color.value)
})

defineExpose({ instance: cubeRef })
</script>

<template>
  <TresGroup ref="cubeRef" />
</template>
