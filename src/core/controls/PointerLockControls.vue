<script lang="ts" setup>
import { onUnmounted, ref, watch } from 'vue'
import { PointerLockControls } from 'three-stdlib'
import type { Camera } from 'three'
import { useEventListener } from '@vueuse/core'
import type { TresControl } from '@tresjs/core'
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

const emit = defineEmits(['isLock', 'change'])

const { camera: activeCamera, renderer, extend, controls, invalidate } = useTresContext()

watch(props, () => {
  invalidate()
})

const controlsRef = ref<TresControl & PointerLockControls | null>(null)
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

  useEventListener(controls.value as any, 'change', () => {
    emit('change', controls.value)
    invalidate()
  })
  useEventListener(triggerSelector, 'click', () => {
    controlsRef.value?.lock()
    controlsRef.value?.addEventListener('lock', () => isLockEmitter(true))
    controlsRef.value?.addEventListener('unlock', () => isLockEmitter(false))
    invalidate()
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
