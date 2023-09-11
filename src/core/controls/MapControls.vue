<script lang="ts" setup>
import { useTresContext } from '@tresjs/core'
import type { Camera } from 'three'
import { MapControls } from 'three-stdlib'
import { ref, watch, onUnmounted } from 'vue'

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

const { camera: activeCamera, renderer, extend, controls } = useTresContext()

const controlsRef = ref<MapControls | null>(null)

extend({ MapControls })

watch(controls, (value) => {
  if (value && props.makeDefault) {
    controls.value = value
  }
  else {
    controls.value = null
  }
})

onUnmounted(() => {
  if (controlsRef.value) {
    controlsRef.value.dispose()
  }
})
</script>

<template>
  <TresMapControls
    v-if="(camera || activeCamera) && (domElement || renderer)"
    ref="controlsRef"
    :args="[camera || activeCamera, domElement || renderer.domElement]"
  />
</template>
