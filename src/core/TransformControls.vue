<script setup lang="ts">
import { Object3D, type Event } from 'three'
import { TransformControls as TransformControlsImp } from 'three-stdlib'
import { computed, watch, shallowRef, ShallowRef, onUnmounted, watchEffect } from 'vue'
import { pick, hasSetter } from '../utils'
import { useCientos } from './useCientos'

const props = withDefaults(
  defineProps<{
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
  }>(),
  {
    enabled: true,
  },
)

const emit = defineEmits(['dragging', 'change', 'mouseDown', 'mouseUp', 'objectChange'])

let controls: ShallowRef<TransformControlsImp | undefined> = shallowRef()

const { state } = useCientos()

const transformProps = computed(() =>
  pick(props, [
    'enabled',
    'axis',
    'mode',
    'translationSnap',
    'rotationSnap',
    'scaleSnap',
    'space',
    'size',
    'showX',
    'showY',
    'showZ',
  ]),
)

const onChange = () => emit('change', controls.value)
const onMouseDown = () => emit('mouseDown', controls.value)
const onMouseUp = () => emit('mouseUp', controls.value)
const onObjectChange = () => emit('objectChange', controls.value)

const onDragingChange = (e: Event) => {
  if (state.controls) state.controls.enabled = !e.value
  emit('dragging', e.value)
}

function addEventListeners(controls: TransformControlsImp) {
  controls.addEventListener('dragging-changed', onDragingChange)
  controls.addEventListener('change', onChange)
  controls.addEventListener('mouseDown', onMouseDown)
  controls.addEventListener('mouseUp', onMouseUp)
  controls.addEventListener('objectChange', onObjectChange)
}

watchEffect(() => {
  if (state.camera && state.renderer && state.scene && props.object) {
    controls.value = new TransformControlsImp(state.camera, state.renderer.domElement)
    controls.value.attach(props.object)
    state.scene.add(controls.value)
    addEventListeners(controls.value)
  }
})

watch(
  [transformProps, controls],
  // TODO: properly type this
  ([value, controlsValue]: [any, any]) => {
    if (value && controlsValue) {
      for (const key in value) {
        if (!hasSetter(controlsValue, key)) {
          controlsValue[key] = value[key]
        } else {
          const methodName = `set${key[0].toUpperCase()}${key.slice(1)}`
          if (typeof controlsValue[methodName] === 'function' && value[key] !== undefined) {
            ;(controlsValue[methodName] as (param: any) => void)(value[key])
          }
        }
      }
    }
  },
  {
    immediate: true,
  },
)

onUnmounted(() => {
  if (controls.value) {
    controls.value.removeEventListener('dragging-changed', onDragingChange)
    controls.value.removeEventListener('change', onChange)
    controls.value.removeEventListener('mouseDown', onMouseDown)
    controls.value.removeEventListener('mouseUp', onMouseUp)
    controls.value.removeEventListener('objectChange', onObjectChange)
  }
})
</script>
<template>
  <slot />
</template>
