<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { Physics } from '@tresjs/rapier'
import { ACESFilmicToneMapping, MathUtils, type PerspectiveCamera, SRGBColorSpace, Vector3 } from 'three'
import { onUnmounted, shallowRef, watch } from 'vue'
import CarComponent from './CarComponent.vue'
import SceneLighting from './SceneLighting.vue'
import SceneWorld from './SceneWorld.vue'

const gl = {
  clearColor: '#b6d7f5',
  shadows: true,
  alpha: false,
  outputColorSpace: SRGBColorSpace,
  toneMapping: ACESFilmicToneMapping,
  toneMappingExposure: 1.35,
}

const SIM_DT = 1 / 60
const CAMERA_DISTANCE = 12
const CAMERA_HEIGHT = 5
const LOOK_AT_HEIGHT = 1.2
const CAMERA_LERP = 0.08
const CAMERA_BOOST_BLEND = 0.06
const CAMERA_FOV_BASE = 55
const CAMERA_FOV_BOOST = 68
const LOOK_AHEAD = 4
const CAMERA_MIN_HEIGHT = 3

const cameraRef = shallowRef<PerspectiveCamera | null>(null)
const desiredPosition = new Vector3()
const lookAtTarget = new Vector3()
const smoothedLookAt = new Vector3()
const lookAheadOffset = new Vector3()
const flatForward = new Vector3()
let boostBlend = 0
let lookAtInitialized = false

let unbindKeys: (() => void) | undefined

function followCarCamera() {
  const chassisGroup = carRef.value?.chassisGroup?.()
  const camera = cameraRef.value
  if (!chassisGroup || !camera) { return }

  const boosting = carRef.value?.boosting?.() ?? false
  boostBlend = MathUtils.lerp(boostBlend, boosting ? 1 : 0, CAMERA_BOOST_BLEND)

  // Yaw-only follow: project car forward onto XZ so flips don't put the camera underground
  flatForward.set(0, 0, -1).applyQuaternion(chassisGroup.quaternion)
  flatForward.y = 0
  if (flatForward.lengthSq() < 1e-4) {
    flatForward.set(0, 0, -1)
  }
  else {
    flatForward.normalize()
  }

  // Behind the car on the ground plane, always world-up for height
  desiredPosition.copy(chassisGroup.position)
  desiredPosition.addScaledVector(flatForward, -CAMERA_DISTANCE)
  desiredPosition.y = chassisGroup.position.y + CAMERA_HEIGHT
  desiredPosition.y = Math.max(desiredPosition.y, CAMERA_MIN_HEIGHT)

  camera.position.lerp(desiredPosition, CAMERA_LERP)
  // Hard floor so a flipped chassis never drags the smoothed cam under the ground
  camera.position.y = Math.max(camera.position.y, CAMERA_MIN_HEIGHT)

  lookAheadOffset.copy(flatForward).multiplyScalar(LOOK_AHEAD * boostBlend)
  lookAtTarget.copy(chassisGroup.position)
  lookAtTarget.y = chassisGroup.position.y + LOOK_AT_HEIGHT
  lookAtTarget.add(lookAheadOffset)

  if (!lookAtInitialized) {
    smoothedLookAt.copy(lookAtTarget)
    lookAtInitialized = true
  }
  else {
    smoothedLookAt.lerp(lookAtTarget, CAMERA_LERP)
  }
  camera.lookAt(smoothedLookAt)

  const targetFov = MathUtils.lerp(CAMERA_FOV_BASE, CAMERA_FOV_BOOST, boostBlend)
  if (Math.abs(camera.fov - targetFov) > 0.01) {
    camera.fov = MathUtils.lerp(camera.fov, targetFov, CAMERA_BOOST_BLEND)
    camera.updateProjectionMatrix()
  }
}

function bindCarMovementKeys() {
  const car = carRef.value
  const { movement } = car ?? {}

  if (!movement) { return }

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.repeat && event.code === 'Space') { return }

    // Use event.code so Shift+WASD still works while boosting
    switch (event.code) {
      case 'KeyW':
      case 'ArrowUp':
        movement.forward = -1
        break
      case 'KeyS':
      case 'ArrowDown':
        movement.forward = 1
        break
      case 'KeyA':
      case 'ArrowLeft':
        movement.right = 1
        break
      case 'KeyD':
      case 'ArrowRight':
        movement.right = -1
        break
      case 'ShiftLeft':
      case 'ShiftRight':
        movement.boost = 1
        break
      case 'ControlLeft':
      case 'ControlRight':
        movement.brake = 1
        break
      case 'Space':
        event.preventDefault()
        movement.jump = true
        break
      case 'KeyR':
        movement.reset = true
        sceneWorldRef.value?.reset?.()
        break
    }
  }

  const onKeyUp = (event: KeyboardEvent) => {
    switch (event.code) {
      case 'KeyW':
      case 'KeyS':
      case 'ArrowUp':
      case 'ArrowDown':
        movement.forward = 0
        break
      case 'KeyA':
      case 'KeyD':
      case 'ArrowLeft':
      case 'ArrowRight':
        movement.right = 0
        break
      case 'ShiftLeft':
      case 'ShiftRight':
        movement.boost = 0
        break
      case 'ControlLeft':
      case 'ControlRight':
        movement.brake = 0
        break
      case 'KeyR':
        movement.reset = false
        break
    }
  }

  window.addEventListener('keydown', onKeyDown)
  window.addEventListener('keyup', onKeyUp)

  return () => {
    window.removeEventListener('keydown', onKeyDown)
    window.removeEventListener('keyup', onKeyUp)
  }
}

const carRef = shallowRef<InstanceType<typeof CarComponent>>()
const sceneWorldRef = shallowRef<InstanceType<typeof SceneWorld>>()

watch(carRef, (car) => {
  if (car) {
    unbindKeys = bindCarMovementKeys()
  }
})

onUnmounted(() => {
  unbindKeys?.()
})
</script>

<template>
  <div class="info">
    <p>WASD / arrows drive · Shift boost · Ctrl brake</p>
    <p>Space jump / double-jump · flip when upside-down · R reset</p>
  </div>

  <TresCanvas v-bind="gl" window-size @loop="followCarCamera">
    <TresPerspectiveCamera ref="cameraRef" :position="[0, CAMERA_HEIGHT, CAMERA_DISTANCE]" :fov="CAMERA_FOV_BASE" />

    <SceneLighting />

    <Suspense>
      <Physics :timestep="SIM_DT" :gravity="[0, -9.81, 0]">
        <SceneWorld ref="sceneWorldRef" />
        <Suspense>
          <CarComponent ref="carRef" />
        </Suspense>
      </Physics>
    </Suspense>
  </TresCanvas>
</template>

<style scoped>
  .info {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
    text-align: center;
    color: #333;
    font-family: system-ui, sans-serif;
    font-size: 14px;
    pointer-events: none;
    z-index: 10;
  }

  .info p {
    margin: 0.25rem 0;
  }
</style>
