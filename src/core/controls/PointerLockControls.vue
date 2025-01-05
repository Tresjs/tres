<script lang="ts" setup>
import { useTresContext } from '@tresjs/core'
import { useEventListener } from '@vueuse/core'
import { PointerLockControls } from 'three-stdlib'
import { onUnmounted, shallowRef, watch } from 'vue'
import type { Camera, EventDispatcher } from 'three'

// Define the event types for PointerLockControls
interface PointerLockControlsEvents {
  lock: () => void
  unlock: () => void
}

// Extend the PointerLockControls type to include enabled property
type ExtendedPointerLockControls = PointerLockControls & EventDispatcher<PointerLockControlsEvents> & { enabled: boolean }

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

const emit = defineEmits(['isLock', 'change'])

const { camera: activeCamera, renderer, extend, controls, invalidate } = useTresContext()

watch(props, () => {
  invalidate()
})

const controlsRef = shallowRef<ExtendedPointerLockControls | null>(null)
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
  triggerSelector = selector || renderer.value.domElement

  useEventListener(triggerSelector, 'click', () => {
    if (controlsRef.value) {
      controlsRef.value.lock()
      controlsRef.value.addEventListener('lock', () => isLockEmitter(true))
      controlsRef.value.addEventListener('unlock', () => isLockEmitter(false))
      invalidate()
    }
  })
})

onUnmounted(() => {
  const controls = controlsRef.value
  if (controls) {
    controls.removeEventListener('lock', () => isLockEmitter(true))
    controls.removeEventListener('unlock', () => isLockEmitter(false))
    controls.dispose()
  }
})

defineExpose({
  instance: controls,
})
</script>

<template>
  <TresPointerLockControls
    v-if="(camera || activeCamera) && (domElement || renderer)"
    ref="controlsRef"
    :args="[camera || activeCamera, domElement || renderer.domElement]"
  />
</template>
