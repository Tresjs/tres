<script lang="ts" setup>
import { Camera, Vector3 } from 'three'
import { OrbitControls } from 'three-stdlib'
import { ref, watch, type Ref } from 'vue'

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

const { state, setState } = useCientos()

const controls = ref(null)

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
    v-if="state.camera && state.renderer"
    ref="controls"
    :args="[state.camera, state.renderer?.domElement]"
    :enabling-dampling="enableDamping"
  />
</template>
