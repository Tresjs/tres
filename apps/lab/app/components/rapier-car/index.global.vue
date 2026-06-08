<script setup lang="ts">
import { OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { Physics } from '@tresjs/rapier'
import { ACESFilmicToneMapping, SRGBColorSpace, Vector3 } from 'three'
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib'
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
const CAMERA_TARGET_OFFSET_Y = 1

const orbitControlsRef = shallowRef<{ instance: OrbitControlsImpl | null } | null>(null)
const cameraTarget = new Vector3(0, 2, 0)

let unbindKeys: (() => void) | undefined

function followCarCamera() {
  const chassisGroup = carRef.value?.chassisGroup?.()
  const controlsInstance = orbitControlsRef.value?.instance
  const controls = (
    controlsInstance && 'value' in controlsInstance
      ? controlsInstance.value
      : controlsInstance
  ) as OrbitControlsImpl | null
  if (!chassisGroup || !controls) { return }

  cameraTarget.copy(chassisGroup.position)
  cameraTarget.y += CAMERA_TARGET_OFFSET_Y
  controls.target.copy(cameraTarget)
  controls.update()
}

function bindCarMovementKeys() {
  const car = carRef.value
  const { movement } = car ?? {}

  if (!movement) { return }

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'w' || event.key === 'ArrowUp') { movement.forward = -1 }
    if (event.key === 's' || event.key === 'ArrowDown') { movement.forward = 1 }
    if (event.key === 'a' || event.key === 'ArrowLeft') { movement.right = 1 }
    if (event.key === 'd' || event.key === 'ArrowRight') { movement.right = -1 }
    if (event.key === 'r') {
      movement.reset = true
      sceneWorldRef.value?.reset()
    }
    if (event.key === ' ') { movement.brake = 1 }
  }

  const onKeyUp = (event: KeyboardEvent) => {
    if (
      event.key === 'w'
      || event.key === 's'
      || event.key === 'ArrowUp'
      || event.key === 'ArrowDown'
    ) {
      movement.forward = 0
    }
    if (
      event.key === 'a'
      || event.key === 'd'
      || event.key === 'ArrowLeft'
      || event.key === 'ArrowRight'
    ) {
      movement.right = 0
    }
    if (event.key === 'r') { movement.reset = false }
    if (event.key === ' ') { movement.brake = 0 }
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
    <p>Rapier vehicle controller — WASD or arrow keys to move</p>
    <p>Space to brake · R to reset</p>
  </div>

  <TresCanvas v-bind="gl" window-size @loop="followCarCamera">
    <TresPerspectiveCamera :position="[0, 4, 10]" />
    <OrbitControls ref="orbitControlsRef" :target="cameraTarget" />

    <SceneLighting />

    <Suspense>
      <Physics :timestep="SIM_DT" :gravity="[0, -9.81, 0]" >
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
