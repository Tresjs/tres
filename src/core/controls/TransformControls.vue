<script setup lang="ts">
import { useTres } from '@tresjs/core'
import { useEventListener } from '@vueuse/core'

import { TransformControls } from 'three-stdlib'
import { onUnmounted, shallowRef, toRefs, watch } from 'vue'
import type { Camera, Event, Object3D } from 'three'

export interface TransformControlsProps {
  object: Object3D
  camera?: Camera
  mode?: string
  enabled?: boolean
  axis?: 'X' | 'Y' | 'Z' | 'XY' | 'YZ' | 'XZ' | 'XYZ'
  translationSnap?: number
  rotationSnap?: number
  scaleSnap?: number
  space?: 'local' | 'world'
  size?: number
  showX?: boolean
  showY?: boolean
  showZ?: boolean
}

const props = withDefaults(defineProps<TransformControlsProps>(), {
  mode: 'translate',
  enabled: true,
  axis: 'XYZ',
  space: 'world',
  size: 1,
  showX: true,
  showY: true,
  showZ: true,
})

const emit = defineEmits(['dragging', 'change', 'mouseDown', 'mouseUp', 'objectChange'])

const { object, mode, enabled, axis, translationSnap, rotationSnap, scaleSnap, space, size, showX, showY, showZ }
  = toRefs(props)

const controlsRef = shallowRef<TransformControls | null>(null)

const { controls, camera: activeCamera, renderer, extend, invalidate } = useTres()

watch([object, mode, enabled, axis, translationSnap, rotationSnap, scaleSnap, space, size, showX, showY, showZ], () => {
  invalidate()
})

extend({ TransformControls })

const onChange = () => {
  invalidate()
  emit('change')
}

interface DraggingEvent extends Event {
  value: boolean
}

const onDragingChange = (e: DraggingEvent) => {
  if (controls.value) { controls.value.enabled = !(e).value }
  invalidate()
  emit('dragging', e.value)
}

const onMouseDown = () => {
  invalidate()
  emit('mouseDown')
}

const onMouseUp = () => {
  invalidate()
  emit('mouseUp')
}

const onObjectChange = () => {
  invalidate()
  emit('objectChange')
}

function addEventListeners() {
  useEventListener(controlsRef.value as any, 'change', onChange)
  useEventListener(controlsRef.value as any, 'dragging-changed', onDragingChange)
  useEventListener(controlsRef.value as any, 'mouseDown', onMouseDown)
  useEventListener(controlsRef.value as any, 'mouseUp', onMouseUp)
  useEventListener(controlsRef.value as any, 'objectChange', onObjectChange)
}

watch(controlsRef, (value) => {
  if (value) {
    addEventListeners()
  }
})

onUnmounted(() => {
  if (controlsRef.value) {
    controlsRef.value.dispose()
  }
})

defineExpose({
  instance: controlsRef,
})
</script>

<template>
  <TresTransformControls
    v-if="(camera || activeCamera) && renderer.domElement"
    ref="controlsRef"
    :key="(camera || activeCamera)?.uuid"
    :object="object"
    :args="[camera || activeCamera, renderer.domElement]"
    :mode="mode"
    :enabled="enabled"
    :axis="axis"
    :translation-snap="translationSnap"
    :rotation-snap="rotationSnap"
    :scale-snap="scaleSnap"
    :space="space"
    :size="size"
    :show-x="showX"
    :show-y="showY"
    :show-z="showZ"
    :visible="true"
  />
</template>
