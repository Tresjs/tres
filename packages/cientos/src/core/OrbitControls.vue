<script lang="ts" setup>
import { Camera, Vector3, WebGLRenderer } from 'three'
import { OrbitControls } from 'three-stdlib'
import { inject, ref, type Ref } from 'vue'

import { useCientos } from './useCientos'

const props = withDefaults(
  defineProps<{
    makeDefault?: boolean
    camera?: Camera
    domElement?: HTMLElement
    target?: Ref<Vector3>
    enableDamping?: boolean
  }>(),
  {
    makeDefault: false,
  },
)

const controls = ref(null)
const camera = inject<Ref<Camera>>('camera')
const renderer = inject<Ref<WebGLRenderer>>('renderer')

const { extend } = useCientos()
extend({ OrbitControls })
</script>

<template>
  <TresOrbitControls
    v-if="camera && renderer"
    ref="controls"
    :args="[camera, renderer?.domElement]"
    :enabling-dampling="enableDamping"
  />
</template>

<!-- <script setup lang="ts">
import { useRenderLoop } from '@tresjs/core'
import { Camera, Vector3, WebGLRenderer } from 'three'
import { OrbitControls as OrbitControlsImp } from 'three-stdlib'
import { inject, type Ref, unref, watch } from 'vue'

const props = withDefaults(
  defineProps<{
    makeDefault?: boolean
    camera?: Camera
    domElement?: HTMLElement
    target?: Ref<Vector3>
  }>(),
  {
    makeDefault: false,
  },
)
let controls: OrbitControlsImp

const camera = inject<Ref<Camera>>('camera')
const renderer = inject<Ref<WebGLRenderer>>('renderer')
watch(
  [camera, renderer],
  () => {
    if (camera?.value && renderer?.value) {
      if (controls) controls.reset()
      controls = new OrbitControlsImp(camera.value, unref(renderer).domElement)
      controls.enableDamping = true

      const { onLoop } = useRenderLoop()

      onLoop(() => {
        if (controls.enabled) {
          controls.update()
        }
      })
    }
  },
  {
    deep: true,
  },
)
</script>
 -->
