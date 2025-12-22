<script lang="ts" setup>
import type { Camera, Object3D } from 'three'
import { DragControls } from 'three-stdlib'
import { onUnmounted, shallowRef, watch } from 'vue'
import { useTres } from '@tresjs/core'
import { useEventListener } from '@vueuse/core'

export interface DragControlsProps {
  objects: Object3D[]
  camera?: Camera
  mode?: 'translate' | 'rotate'
  enabled?: boolean
  /**
   * The dom element to listen to.
   *
   * @type {HTMLElement}
   * @memberof OrbitControlsProps
   * @see https://threejs.org/docs/#DragControls
   */
  domElement?: HTMLElement
}
const props = withDefaults(defineProps<DragControlsProps>(), {
  mode: 'translate',
  enabled: true,
})
const emit = defineEmits(['dragstart', 'drag', 'dragend', 'hoveron', 'hoveroff'])
const { camera: activeCamera, renderer, extend } = useTres()
const controlsRef = shallowRef<DragControls | null>(null)
extend({ DragControls })

watch(() => props.objects, () => {
  controlsRef.value = new DragControls(
    props.objects,
    props.camera || activeCamera.value!,
    props.domElement || renderer.domElement,
  )

  addEventListeners()
})

function addEventListeners() {
  useEventListener(controlsRef.value as any, 'dragstart', () => {
    return emit('dragstart', controlsRef.value)
  })
  useEventListener(controlsRef.value as any, 'drag', () =>
    emit('drag', controlsRef.value))
  useEventListener(controlsRef.value as any, 'dragend', () =>
    emit('dragend', controlsRef.value))
  useEventListener(controlsRef.value as any, 'hoveron', () =>
    emit('hoveron', controlsRef.value))
  useEventListener(controlsRef.value as any, 'hoveroff', () =>
    emit('hoveroff', controlsRef.value))
}
onUnmounted(() => {
  if (controlsRef.value) {
    controlsRef.value.dispose()
  }
})
defineExpose({ instance: controlsRef })
</script>

<template>
  <TresGroup />
</template>
