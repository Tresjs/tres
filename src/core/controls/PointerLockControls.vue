<script lang="ts" setup>
import { ref, watch } from 'vue'
import { PointerLockControls } from 'three-stdlib'
import { Camera } from 'three'
import { useEventListener } from '@vueuse/core'
import { useCientos } from '../../core/useCientos'

export interface PointerLockControlsProps {
  /**
   * Whether to make this the default controls.
   *
   * @default false
   * @type {boolean}
   * @memberof PointerLockControlsProps
   * @see https://threejs.org/docs/index.html?q=pointe#examples/en/controls/PointerLockControls
   */
  makeDefault?: boolean
  /**
   * The camera to control.
   *
   * @default false
   * @type {boolean}
   * @memberof PointerLockControlsProps
   * @see https://threejs.org/docs/index.html?q=pointe#examples/en/controls/PointerLockControls
   */
  camera?: Camera
  /**
   * The dom element to listen to.
   *
   * @type {HTMLElement}
   * @memberof PointerLockControlsProps
   * @see https://threejs.org/docs/index.html?q=pointe#examples/en/controls/PointerLockControls
   */
  domElement?: HTMLElement
  /**
   * The trigger id.
   *
   * @type {string}
   * @memberof PointerLockControlsProps
   * @see https://threejs.org/docs/index.html?q=pointe#examples/en/controls/PointerLockControls
   */
  selector?: string
}

const props = withDefaults(defineProps<PointerLockControlsProps>(), {
  makeDefault: false,
})

const { state, setState, extend } = useCientos()

const controls = ref<null | PointerLockControls>(null)
let triggerSelector: HTMLElement | undefined

extend({ PointerLockControls })

watch(controls, value => {
  if (value && props.makeDefault) {
    setState('controls', value)
  } else {
    setState('controls', null)
  }
  const selector = document.getElementById(props.selector || '')
  triggerSelector = selector ? selector : state.renderer?.domElement
  useEventListener(triggerSelector, 'click', () => {
    controls.value?.lock()
  })
})

defineExpose({
  value: controls,
})
</script>

<template>
  <TresPointerLockControls
    v-if="state.camera && state.renderer"
    ref="controls"
    :args="[state.camera || camera, state.renderer?.domElement || domElement]"
  />
</template>
