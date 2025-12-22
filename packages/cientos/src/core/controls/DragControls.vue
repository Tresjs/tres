<script lang="ts" setup>
import type { Camera, Object3D } from 'three'
import { DragControls } from 'three-stdlib'
import { onUnmounted, ref, watchEffect } from 'vue'
import { useTres } from '@tresjs/core'
import { useEventListener } from '@vueuse/core'

export interface TransformControlsProps {
  objects: Object3D[]
  camera?: Camera
  mode?: 'translate' | 'rotate'
  enabled?: boolean
  /**
   * The dom element to listen to.
   *
   * @type {HTMLElement}
   * @memberof OrbitControlsProps
   * @see https://threejs.org/docs/#examples/en/controls/OrbitControls.domElement
   */
  domElement?: HTMLElement
}
withDefaults(defineProps<TransformControlsProps>(), {
  mode: 'translate',
  enabled: true,
})
const emit = defineEmits(['dragstart', 'drag', 'dragend', 'hoveron', 'hoveroff'])
const { camera: activeCamera, renderer, extend } = useTres()
const controlsRef = ref<DragControls | null>(null)
extend({ DragControls })
watchEffect(() => {
  if (controlsRef.value) {
    addEventListeners()
  }
})
function addEventListeners() {
  useEventListener(controlsRef.value as any, 'dragstart', () => emit('dragstart', controlsRef.value))
  useEventListener(controlsRef.value as any, 'drag', () => emit('drag', controlsRef.value))
  useEventListener(controlsRef.value as any, 'dragend', () => emit('dragend', controlsRef.value))
  useEventListener(controlsRef.value as any, 'hoveron', () => emit('hoveron', controlsRef.value))
  useEventListener(controlsRef.value as any, 'hoveroff', () => emit('hoveroff', controlsRef.value))
}
onUnmounted(() => {
  if (controlsRef.value) {
    controlsRef.value.dispose()
  }
})
defineExpose({ value: controlsRef })
</script>

<template>
  <TresDragControls
    v-if="(camera || activeCamera) && (domElement || renderer.domElement)"
    ref="controlsRef"
    :args="[objects, camera || activeCamera, domElement || renderer.domElement]"
    :objects="objects"
    :camera="camera || activeCamera"
    :mode="mode"
    :enabled="enabled"
  />
</template>
