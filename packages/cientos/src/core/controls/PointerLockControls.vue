<script lang="ts" setup>
import { useTres } from '@tresjs/core'
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

const { camera: activeCamera, renderer, extend, controls, invalidate } = useTres()

watch(props, () => {
  invalidate()
})

const controlsRef = shallowRef<ExtendedPointerLockControls | null>(null)
let triggerSelector: HTMLElement | undefined

extend({ PointerLockControls })

const onLock = () => emit('isLock', true)
const onUnlock = () => emit('isLock', false)
const onChange = () => invalidate()

watch(controlsRef, (value, oldValue) => {
  if (oldValue) {
    oldValue.removeEventListener('lock', onLock)
    oldValue.removeEventListener('unlock', onUnlock)
    oldValue.removeEventListener('change', onChange)
  }

  if (!value) {
    controls.value = null
    return
  }

  if (props.makeDefault) {
    controls.value = value
  }

  value.addEventListener('lock', onLock)
  value.addEventListener('unlock', onUnlock)
  value.addEventListener('change', onChange)

  const selector = document.getElementById(props.selector || '')
  triggerSelector = selector || renderer.domElement

  useEventListener(triggerSelector, 'click', () => {
    value.lock()
    invalidate()
  })
})

onUnmounted(() => {
  const instance = controlsRef.value
  if (instance) {
    instance.removeEventListener('lock', onLock)
    instance.removeEventListener('unlock', onUnlock)
    instance.removeEventListener('change', onChange)
    instance.dispose()
  }
})

defineExpose({
  instance: controls,
})
</script>

<template>
  <TresPointerLockControls
    v-if="(camera || activeCamera) && (domElement || renderer.domElement)"
    ref="controlsRef"
    :args="[camera || activeCamera, domElement || renderer.domElement]"
  />
</template>
