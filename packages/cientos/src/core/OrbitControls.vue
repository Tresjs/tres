<script lang="ts" setup>
import { Camera, Vector3, WebGLRenderer } from 'three'
import { OrbitControls } from 'three-stdlib'
import { inject, ref, type Ref } from 'vue'

import { useCientos } from './useCientos'

withDefaults(
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
