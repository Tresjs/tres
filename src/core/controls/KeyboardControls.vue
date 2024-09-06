<script setup lang="ts">
import { useLoop, useTresContext } from '@tresjs/core'
import { useMagicKeys } from '@vueuse/core'
import { Quaternion, Vector3 } from 'three'
import { PointerLockControls as PointerLockControlsType } from 'three-stdlib'
import { ref, toRefs, watch, watchEffect } from 'vue'
import type { Camera } from 'three'
import { PointerLockControls } from './index'

export interface KeyboardControlsProps {
  /**
   * Whether to make this the default controls.
   *
   * @default true
   * @type {boolean}
   * @memberof KeyboardControlsProps
   * @see https://threejs.org/docs/index.html?q=pointe#examples/en/controls/PointerLockControls
   */
  makeDefault?: boolean
  /**
   * The camera to control.
   *
   * @default false
   * @type {boolean}
   * @memberof KeyboardControlsProps
   * @see https://threejs.org/docs/index.html?q=pointe#examples/en/controls/PointerLockControls
   */
  camera?: Camera
  /**
   * The dom element to listen to.
   *
   * @type {HTMLElement}
   * @memberof KeyboardControlsProps
   * @see https://threejs.org/docs/index.html?q=pointe#examples/en/controls/PointerLockControls
   */
  domElement?: HTMLElement
  /**
   * Indicates the movement speed.
   * @type {number}
   * @default 0.2
   * @memberof KeyboardControlsProps
   *
   */
  moveSpeed?: number
  /**
   * The trigger id.
   *
   * @type {string}
   * @memberof KeyboardControlsProps
   * @see https://threejs.org/docs/index.html?q=pointe#examples/en/controls/PointerLockControls
   */
  selector?: string
}

const props = withDefaults(defineProps<KeyboardControlsProps>(), {
  moveSpeed: 0.2,
  makeDefault: true,
})

const emit = defineEmits(['isLock', 'change'])

const { moveSpeed } = toRefs(props)

const { camera: activeCamera, controls, renderer, invalidate } = useTresContext()

watch(props, () => {
  invalidate()
})

const sidewardMove = ref(0)
const forwardMove = ref(0)

const { w, s, a, d, Up, Down, Left, Right } = useMagicKeys()

watchEffect(() => {
  if (a.value || Left.value) { sidewardMove.value = -moveSpeed.value }
  else if (d.value || Right.value) { sidewardMove.value = moveSpeed.value }
  else { sidewardMove.value = 0 }
  if (w.value || Up.value) { forwardMove.value = moveSpeed.value }
  else if (s.value || Down.value) { forwardMove.value = -moveSpeed.value }
  else { forwardMove.value = 0 }
})

defineExpose({
  instance: controls,
})

const isActive = (isLock: boolean) => emit('isLock', isLock)

const hasChange = (state: any) => emit('change', state)

const moveVector = new Vector3()
const rotationVector = new Vector3()
const tmpQuaternion = new Quaternion()

const moveForward = (delta: number, movementSpeed: number) => {
  if (!activeCamera.value?.position && !moveVector) { return }
  const camera = activeCamera.value
  const rotMult = delta * 0.001
  camera?.translateZ(-movementSpeed)

  tmpQuaternion.set(rotationVector.x * rotMult, rotationVector.y * rotMult, rotationVector.z * rotMult, 1).normalize()
  camera?.quaternion.multiply(tmpQuaternion)
  if (sidewardMove.value || forwardMove.value) { emit('change', controls.value) }
}

const { onBeforeRender } = useLoop()

onBeforeRender(({ delta, invalidate }) => {
  if (controls.value instanceof PointerLockControlsType && controls.value?.isLocked) {
    moveForward(delta, forwardMove.value)
    controls.value.moveRight(sidewardMove.value)

    invalidate()
  }
})
</script>

<template>
  <PointerLockControls
    :selector="selector"
    :make-default="makeDefault"
    :camera="camera || activeCamera"
    :dom-element="domElement || renderer.domElement"
    @is-lock="isActive"
    @change="hasChange"
  />
</template>
