<script setup lang="ts">
import { onUnmounted, shallowRef, ShallowRef, watchEffect, toRefs } from 'vue'
import { Object3D, type Event } from 'three'
import { TransformControls } from 'three-stdlib'
import { useEventListener } from '@vueuse/core'

import { useCientos } from '../useCientos'

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

const { object, mode, enabled, axis, translationSnap, rotationSnap, scaleSnap, space, size, showX, showY, showZ } =
  toRefs(props)

const emit = defineEmits(['dragging', 'change', 'mouseDown', 'mouseUp', 'objectChange'])

const controls: ShallowRef<TransformControls | undefined> = shallowRef()

const { state, extend } = useCientos()

extend({ TransformControls })

const onDragingChange = (e: Event) => {
  if (state.controls) state.controls.enabled = !e.value
  emit('dragging', e.value)
}

function addEventListeners() {
  useEventListener(controls.value as any, 'change', () => emit('change'))
  useEventListener(controls.value as any, 'dragging-changed', onDragingChange)
  useEventListener(controls.value as any, 'mouseDown', () => emit('mouseDown'))
  useEventListener(controls.value as any, 'mouseUp', () => emit('mouseUp'))
  useEventListener(controls.value as any, 'objectChange', () => emit('objectChange'))
}

watchEffect(() => {
  if (controls.value) {
    addEventListeners()
  }
})

onUnmounted(() => {
  if (controls.value) {
    controls.value.dispose()
  }
})
</script>
<template>
  <TresTransformControls
    v-if="state.camera && state.renderer"
    ref="controls"
    :object="object"
    :args="[state.camera, state.renderer.domElement]"
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
