<script lang="ts" setup>
import { useTres } from '@tresjs/core'
import { Camera, Vector3 } from 'three'
import { OrbitControls } from 'three-stdlib'
import { ref, type Ref } from 'vue'

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

const controls: Ref<OrbitControls | null> = ref(null)

defineExpose({ controls })

const { state, setState } = useTres()

watchEffect(
  () => {
    if (!state.renderer || !state.camera) return

    controls.value = new OrbitControls(state.camera, state.renderer.domElement)
    if (props.makeDefault) {
      setState('controls', controls.value)
    }
  },
  {
    flush: 'post',
  },
)
</script>

<template></template>
