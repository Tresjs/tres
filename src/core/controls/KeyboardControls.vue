<script setup lang="ts">
import { ref, shallowRef, toRefs } from 'vue'
import { useRenderLoop, useTresContext } from '@tresjs/core'
import { PointerLockControls } from 'three-stdlib'
import { onKeyStroke } from '@vueuse/core'

export type KeyboardControlsProps = {
  /**
   * Keys to go forward.
   * @type {string[]}
   * @default '[w, W]'
   * @memberof KeyboardControlsProps
   *
   **/
  forward?: string[] | string
  /**
   * Keys to go back.
   * @type {string[]}
   * @default '[s, S]'
   * @memberof KeyboardControlsProps
   *
   **/
  back?: string[] | string
  /**
   * Keys to go left.
   * @type {string[]}
   * @default '[a, A]'
   * @memberof KeyboardControlsProps
   *
   **/
  left?: string[] | string
  /**
   * Keys to go right.
   * @type {string[]}
   * @default '[d, D]'
   * @memberof KeyboardControlsProps
   *
   **/
  right?: string[] | string
  /**
   * Key to jump (only with PointerLockControls).
   * @type {string[]}
   * @default 'space'
   * @memberof KeyboardControlsProps
   *
   **/
  jump?: string[] | string
  /**
   * Default gravity number for jump.
   * @type {number}
   * @default 9.8
   * @memberof KeyboardControlsProps
   *
   **/
  gravity?: number
  /**
   * Speed movement.
   * @type {number}
   * @default 0.1
   * @memberof KeyboardControlsProps
   *
   **/
  moveSpeed?: number
  /**
   * Activate/deactivate headBobbing effect (only with PointerLockControls).
   * @type {boolean}
   * @default false
   * @memberof KeyboardControlsProps
   *
   **/
  headBobbing?: boolean
  /**
   * Indicates if the forward movement is in the Z axis or Y axis.
   * @type {boolean}
   * @default false
   * @memberof KeyboardControlsProps
   *
   **/
  is2D?: boolean
}
// TODO: remove disable once eslint is updated to support vue 3.3
// eslint-disable-next-line vue/no-setup-props-destructure
const props = withDefaults(defineProps<KeyboardControlsProps>(), {
  forward: () => ['w', 'W'],
  back: () => ['s', 'S'],
  left: () => ['a', 'A'],
  right: () => ['d', 'D'],
  jump: () => [' '],
  gravity: 9.8,
  moveSpeed: 0.1,
  headBobbing: false,
  is2D: false,
})

const { forward, back, left, right, jump, gravity, moveSpeed, headBobbing, is2D } = toRefs(props)

const { camera: activeCamera, controls } = useTresContext()

const xMove = ref(0)
const zMove = ref(0)
const isHeadBobbing = ref(false)
const isJumping = ref(false)
const HBSpeed = 5
const jumpSpeed = 6
const HBAmplitude = 0.3
const initJumpTime = ref(0)
const wrapperRef = shallowRef()
const _forward = is2D.value ? 'y' : 'z'
let initCameraPos = activeCamera.value.position?.y || 0

// FORWARD DIRECTION MOVEMENTS
onKeyStroke(
  forward.value,
  () => {
    isHeadBobbing.value = true
    zMove.value = moveSpeed.value
  },
  { eventName: 'keydown' },
)
onKeyStroke(
  back.value,
  () => {
    isHeadBobbing.value = true
    zMove.value = -moveSpeed.value
  },
  { eventName: 'keydown' },
)
onKeyStroke(
  [...forward.value, ...back.value],
  () => {
    isHeadBobbing.value = false
    zMove.value = 0
  },
  { eventName: 'keyup' },
)
// X DIRECTION MOVEMENTS
onKeyStroke(
  left.value,
  () => {
    isHeadBobbing.value = true
    xMove.value = -moveSpeed.value
  },
  { eventName: 'keydown' },
)
onKeyStroke(
  right.value,
  () => {
    isHeadBobbing.value = true
    xMove.value = moveSpeed.value
  },
  { eventName: 'keydown' },
)
onKeyStroke(
  [...left.value, ...right.value],
  () => {
    isHeadBobbing.value = false
    xMove.value = 0
  },
  { eventName: 'keyup' },
)
//JUMP BUTTON
onKeyStroke(jump.value, () => {
  if (!isJumping.value) initJumpTime.value = Date.now()
  isJumping.value = true
})

// HEAD BOBBING
const headBobbingMov = (elapsedTime: number) => {
  return isHeadBobbing.value ? Math.sin(elapsedTime * HBSpeed) * HBAmplitude + initCameraPos : initCameraPos
}
// JUMP
const getJumpTime = () => ((Date.now() - initJumpTime.value) / 1000) * 3
const getJumpDistance = (jumpTime: number) => {
  return initCameraPos + jumpSpeed * jumpTime - 0.5 * gravity.value * Math.pow(jumpTime, 2)
}

const getJump = () => {
  if (isJumping.value) {
    const jumpDistance = getJumpDistance(getJumpTime())
    if (jumpDistance <= initCameraPos) isJumping.value = false
    return jumpDistance
  }
  return 0
}

const { onLoop } = useRenderLoop()

onLoop(({ elapsed }) => {
  // has PointerLockControls?
  if (controls.value instanceof PointerLockControls && controls.value?.isLocked) {
    controls.value.moveForward(zMove.value)
    controls.value.moveRight(xMove.value)
    if (activeCamera.value.position) {
      activeCamera.value.position.y = headBobbing.value ? headBobbingMov(elapsed) : initCameraPos
      activeCamera.value.position.y += getJump()
    }
  } else if (wrapperRef.value.children.length > 0 && !(controls.value instanceof PointerLockControls)) {
    wrapperRef.value.position.x += xMove.value
    wrapperRef.value.position[_forward] += is2D.value ? zMove.value : -zMove.value
  }
})
</script>
<template>
  <TresGroup ref="wrapperRef">
    <slot />
  </TresGroup>
</template>
