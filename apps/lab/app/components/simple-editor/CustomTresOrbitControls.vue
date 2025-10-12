<script setup lang="ts">
import { extend, useTresContext } from '@tresjs/core'
import { OrbitControls } from 'three-stdlib'

const props = defineProps({
  enabled: {
    type: Boolean,
    default: true,
  },
  camera: {
    type: Object,
  },
})

const { camera: contextCamera, renderer } = useTresContext()

const orbitControlsRef = ref()

const internalCamera = computed(() => props.camera ?? contextCamera.value)

extend({ OrbitControls })

defineExpose({ value: orbitControlsRef })
</script>

<template>
  <TresOrbitControls
    v-if="renderer"
    :key="internalCamera?.uuid"
    ref="orbitControlsRef"
    :args="[internalCamera, renderer?.domElement]"
    :camera="internalCamera"
    :enabled="enabled"
  />
</template>
