<script setup lang="ts">
/* import { useRenderLoop } from '@tresjs/core' */
import { Camera, Object3D, Scene, WebGLRenderer } from 'three'
import { TransformControls as TransformControlsImp } from 'three-stdlib'
import { inject, type Ref, unref, watch, useSlots } from 'vue'

let controls: TransformControlsImp

const props = defineProps<{
  object: Ref<Object3D>
  mode: 'translate' | 'rotate' | 'scale' | 'scaleUniform'
}>()

const camera = inject<Ref<Camera>>('camera')
const renderer = inject<Ref<WebGLRenderer>>('renderer')
const scene = inject<Ref<Scene>>('local-scene')

watch(
  [camera, renderer],
  () => {
    if (camera?.value && renderer?.value && scene?.value) {
      controls = new TransformControlsImp(camera.value, unref(renderer).domElement)

      controls.attach(unref(props.object))
      scene.value.add(controls)
    }
  },
  {
    deep: true,
  },
)
</script>
<template>
  <slot />
</template>
