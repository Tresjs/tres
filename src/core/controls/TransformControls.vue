<script setup lang="ts">
import type { ShallowRef } from 'vue'
import { onUnmounted, shallowRef, watchEffect, toRefs } from 'vue'
import type { Object3D, Event } from 'three'

import { TransformControls } from 'three-stdlib'
import { useEventListener } from '@vueuse/core'
import { useTresContext } from '@tresjs/core'

export interface TransformControlsProps {
  object: Object3D
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

const controlsRef: ShallowRef<TransformControls | undefined> = shallowRef()

const { controls, camera, renderer, extend } = useTresContext()

extend({ TransformControls })

const onDragingChange = (e: Event) => {
  if (controls.value) controls.value.enabled = !e.value
  emit('dragging', e.value)
}

function addEventListeners() {
  useEventListener(controlsRef.value as any, 'change', () => emit('change'))
  useEventListener(controlsRef.value as any, 'dragging-changed', onDragingChange)
  useEventListener(controlsRef.value as any, 'mouseDown', () => emit('mouseDown'))
  useEventListener(controlsRef.value as any, 'mouseUp', () => emit('mouseUp'))
  useEventListener(controlsRef.value as any, 'objectChange', () => emit('objectChange'))
}

watchEffect(() => {
  if (controlsRef.value) {
    addEventListeners()
  }
})

onUnmounted(() => {
  if (controlsRef.value) {
    controlsRef.value.dispose()
  }
})
</script>

<template>
  <TresTransformControls
    v-if="camera && renderer"
    ref="controlsRef"
    :object="object"
    :args="[camera, renderer.domElement]"
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
