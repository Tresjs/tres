<script lang="ts" setup>
import { Camera, Vector3 } from 'three'
import { OrbitControls } from 'three-stdlib'
import { ref, watch, type Ref } from 'vue'

import { useCientos } from '../useCientos'

export interface OrbitControlsProps {
  /**
   * Whether to make this the default controls.
   *
   * @default false
   * @type {boolean}
   * @memberof OrbitControlsProps
   * @see https://threejs.org/docs/#examples/en/controls/OrbitControls
   */
  makeDefault?: boolean
  /**
   * The camera to control.
   *
   * @type {Camera}
   * @memberof OrbitControlsProps
   * @see https://threejs.org/docs/#examples/en/controls/OrbitControls
   */
  camera?: Camera
  /**
   * The dom element to listen to.
   *
   * @type {HTMLElement}
   * @memberof OrbitControlsProps
   * @see https://threejs.org/docs/#examples/en/controls/OrbitControls
   */
  domElement?: HTMLElement
  /**
   * The target to orbit around.
   *
   * @type {Ref<Vector3>}
   * @memberof OrbitControlsProps
   * @see https://threejs.org/docs/#examples/en/controls/OrbitControls
   */
  target?: Ref<Vector3>
  /**
   * Whether to enable damping.
   *
   * @default false
   * @type {boolean}
   * @memberof OrbitControlsProps
   * @see https://threejs.org/docs/#examples/en/controls/OrbitControls
   */
  enableDamping?: boolean
}

const props = withDefaults(defineProps<OrbitControlsProps>(), {
  makeDefault: false,
})

const { state, setState, extend } = useCientos()

const controls = ref(null)

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
    :args="[state.camera || camera, state.renderer?.domElement || domElement]"
  />
</template>
