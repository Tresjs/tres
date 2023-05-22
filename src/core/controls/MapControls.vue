<script lang="ts" setup>
import { Camera } from 'three'
import { MapControls } from 'three-stdlib'
import { ref, watch } from 'vue'

import { useCientos } from '../../core/useCientos'

export interface MapControlsProps {
  /**
   * Whether to make this the default controls.
   *
   * @default false
   * @type {boolean}
   * @memberof MapControlsProps
   * @see https://threejs.org/docs/#examples/en/controls/MapControls
   */
  makeDefault?: boolean
  /**
   * The camera to control.
   *
   * @type {Camera}
   * @memberof MapControlsProps
   * @see https://threejs.org/docs/#examples/en/controls/MapControls
   */
  camera?: Camera
  /**
   * The dom element to listen to.
   *
   * @type {HTMLElement}
   * @memberof MapControlsProps
   * @see https://threejs.org/docs/#examples/en/controls/MapControls
   */
  domElement?: HTMLElement
}

const props = withDefaults(defineProps<MapControlsProps>(), {
  makeDefault: false,
})

const { state, setState, extend } = useCientos()

const controls = ref(null)

extend({ MapControls })

watch(controls, value => {
  if (value && props.makeDefault) {
    setState('controls', value)
  } else {
    setState('controls', null)
  }
})
</script>

<template>
  <TresMapControls
    v-if="state.camera && state.renderer"
    ref="controls"
    :args="[state.camera || camera, state.renderer?.domElement || domElement]"
  />
</template>
