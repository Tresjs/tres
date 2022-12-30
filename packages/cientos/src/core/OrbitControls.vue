<script lang="ts" setup>
import { useTres } from '@tresjs/core'
import { Camera, Vector3, WebGLRenderer } from 'three'
import { OrbitControls } from 'three-stdlib'
import { inject, ref, watch, type Ref } from 'vue'

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

const { setState } = useTres()

const controls = ref(null)
const camera = inject<Ref<Camera>>('camera')
const renderer = inject<Ref<WebGLRenderer>>('renderer')

const { extend } = useCientos()
extend({ OrbitControls })

watch(controls, value => {
  if (value && props.makeDefault) {
    setState('controls', value)
  } else {
    setState('controls', null)
  }
})
</script>

<template>
  <TresOrbitControls
    v-if="camera && renderer"
    ref="controls"
    :args="[camera, renderer?.domElement]"
    :enabling-dampling="enableDamping"
  />
</template>
