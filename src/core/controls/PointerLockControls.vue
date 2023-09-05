<script lang="ts" setup>
import { ref, watch, onUnmounted } from 'vue'
import { PointerLockControls } from 'three-stdlib'
import type { Camera } from 'three'
import { useEventListener } from '@vueuse/core'
import { useTresContext } from '@tresjs/core'

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

const emit = defineEmits(['isLock'])

const { camera: activeCamera, renderer, extend, controls } = useTresContext()

const controlsRef = ref<null | PointerLockControls>(null)
let triggerSelector: HTMLElement | undefined

extend({ PointerLockControls })

const isLockEmitter = (event: boolean) => {
  emit('isLock', event)
}

watch(controlsRef, (value) => {
  if (value && props.makeDefault) {
    controls.value = value
  }
  else {
    controls.value = null
  }
  const selector = document.getElementById(props.selector || '')
  triggerSelector = selector ? selector : renderer.value.domElement

  useEventListener(triggerSelector, 'click', () => {
    controls.value?.lock()
    controls.value?.addEventListener('lock', () => isLockEmitter(true))
    controls.value?.addEventListener('unlock', () => isLockEmitter(false))
  })
})

onUnmounted(() => {
  controls.value?.removeEventListener('lock', () => isLockEmitter(true))
  controls.value?.removeEventListener('unlock', () => isLockEmitter(false))
  if (controlsRef.value) {
    controlsRef.value.dispose()
  }
})

defineExpose({
  value: controls,
})
</script>

<template>
  <TresPointerLockControls
    v-if="activeCamera && renderer"
    ref="controlsRef"
    :args="[activeCamera || camera, renderer?.domElement || domElement]"
  />
</template>
