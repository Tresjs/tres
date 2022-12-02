<script setup lang="ts">
import { Camera, Object3D, Scene, WebGLRenderer } from 'three'
import { TransformControls as TransformControlsImp } from 'three-stdlib'
import { inject, computed, type Ref, unref, watch, shallowRef, ShallowRef } from 'vue'
import { pick } from '../utils'

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

let controls: ShallowRef<TransformControlsImp | undefined> = shallowRef()

const transformOnlyProps = [
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
]

const camera = inject<Ref<Camera>>('camera')
const renderer = inject<Ref<WebGLRenderer>>('renderer')
const scene = inject<Ref<Scene>>('local-scene')

const transformProps = computed(() => pick(props, transformOnlyProps))

watch(
  [camera, renderer],
  () => {
    if (camera?.value && renderer?.value && scene?.value) {
      controls.value = new TransformControlsImp(camera.value, unref(renderer).domElement)

      controls.value.attach(unref(props.object))
      scene.value.add(unref(controls) as TransformControlsImp)
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
    console.log([value, controlsValue])
    if (value && controlsValue) {
      for (const key in value) {
        const methodName = `set${key[0].toUpperCase()}${key.slice(1)}`

        if (typeof controlsValue[methodName] === 'function' && value[key] !== undefined) {
          ;(controlsValue[methodName] as (param: any) => void)(value[key])
        }
      }
    }
  },
  {
    immediate: true,
  },
)
</script>
<template>
  <slot />
</template>
