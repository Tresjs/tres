<script setup lang="ts">
import { useTres } from '@tresjs/core'
import { Camera, Object3D, Scene, WebGLRenderer, type Event } from 'three'
import { TransformControls as TransformControlsImp } from 'three-stdlib'
import { inject, computed, type Ref, unref, watch, shallowRef, ShallowRef, onUnmounted } from 'vue'
import { pick, hasSetter } from '../utils'

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

const camera = inject<Ref<Camera>>('camera')
const renderer = inject<Ref<WebGLRenderer>>('renderer')
const scene = inject<Ref<Scene>>('local-scene')

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
const { state } = useTres()

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

watch(
  () => props.object,
  () => {
    if (camera?.value && renderer?.value && scene?.value && props.object) {
      controls.value = new TransformControlsImp(camera.value, unref(renderer).domElement)

      controls.value.attach(unref(props.object))
      scene.value.add(unref(controls) as TransformControlsImp)

      addEventListeners(unref(controls) as TransformControlsImp)
    }
  },
  {
    deep: true,
  },
)

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
