<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { useControls } from '@tresjs/leches'
import { DEFAULT_GRAVITY, DEFAULT_TIMESTEP, Physics, RigidBody } from '@tresjs/rapier'
import { ACESFilmicToneMapping, SRGBColorSpace } from 'three'

const gl = {
  clearColor: '#82DBC5',
  shadows: true,
  alpha: false,
  outputColorSpace: SRGBColorSpace,
  toneMapping: ACESFilmicToneMapping,
}

const uuid = inject(`uuid`)
const ballRef = shallowRef()

const controlDefaults = {
  gravityX: DEFAULT_GRAVITY.x,
  gravityY: DEFAULT_GRAVITY.y,
  gravityZ: DEFAULT_GRAVITY.z,
  timeStep: DEFAULT_TIMESTEP as number | 'vary',
  timeScale: 1,
  pause: false,
  debug: true,
}

const controls = useControls({
  resetBtn: {
    label: 'Reset',
    type: 'button',
    onClick: () => {
      resetControls(controls, controlDefaults)
      resetRigidBody(ballRef.value?.instance)
    },
  },
  gravityX: { value: controlDefaults.gravityX, min: -20, max: 20, step: 0.1 },
  gravityY: { value: controlDefaults.gravityY, min: -20, max: 20, step: 0.1 },
  gravityZ: { value: controlDefaults.gravityZ, min: -20, max: 20, step: 0.1 },
  timeStep: {
    value: controlDefaults.timeStep,
    options: [
      { text: '1/30', value: 1 / 30 },
      { text: '1/60', value: 1 / 60 },
      { text: '1/120', value: 1 / 120 },
      { text: 'vary', value: 'vary' },
    ],
  },
  timeScale: { value: controlDefaults.timeScale, min: 0, max: 4, step: 0.1 },
  pause: controlDefaults.pause,
  debug: controlDefaults.debug,
}, { uuid })

const { gravityY, gravityX, gravityZ, debug, pause, timeStep, timeScale } = controls
</script>

<template>
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[0, 0, 35]" :look-at="[0, 0, 0]" />
    <Suspense>
      <Physics
        :debug
        :pause
        :time-step="timeStep"
        :time-scale="timeScale"
        :gravity="[gravityX, gravityY, gravityZ]"
      >
        <RigidBody ref="ballRef" collider="ball" :position="[0, 0, 0]">
          <TresMesh :position="[0, 0, 0]">
            <TresSphereGeometry />
            <TresMeshStandardMaterial color="#5672cd" />
          </TresMesh>
        </RigidBody>

        <RigidBody type="fixed" :restitution="0.5" :position="[0, -10, 0]">
          <TresMesh>
            <TresPlaneGeometry :args="[20, 20]" :rotate-x="-Math.PI / 2" />
            <TresMeshStandardMaterial color="#f4f4f4" />
          </TresMesh>
        </RigidBody>
        <RigidBody type="fixed" :restitution="0.5" :position="[0, -10, 35]">
          <TresMesh>
            <TresPlaneGeometry :args="[40, 40, 40]" :rotate-y="-Math.PI" />
            <TresMeshStandardMaterial color="red" />
          </TresMesh>
        </RigidBody>
        <RigidBody type="fixed" :restitution="0.5" :position="[0, 0, -10]">
          <TresMesh>
            <TresPlaneGeometry :args="[20, 20]" />
            <TresMeshStandardMaterial color="#f4f4f4" />
          </TresMesh>
        </RigidBody>
        <RigidBody type="fixed" :restitution="0.5" :position="[0, 10, 0]">
          <TresMesh>
            <TresPlaneGeometry :args="[20, 20]" :rotate-x="Math.PI / 2" />
            <TresMeshStandardMaterial color="#f4f4f4" />
          </TresMesh>
        </RigidBody>
        <RigidBody type="fixed" :restitution="0.5" :position="[10, 0, 0]" :rotate-y="-Math.PI / 2">
          <TresMesh>
            <TresPlaneGeometry :args="[20, 20]" />
            <TresMeshStandardMaterial color="#f4f4f4" />
          </TresMesh>
        </RigidBody>
        <RigidBody type="fixed" :restitution="0.5" :position="[-10, 0, 0]" :rotate-y="Math.PI / 2">
          <TresMesh>
            <TresPlaneGeometry :args="[20, 20]" />
            <TresMeshStandardMaterial color="#f4f4f4" />
          </TresMesh>
        </RigidBody>
      </Physics>
    </Suspense>
    <TresAmbientLight :intensity="0.5" />
    <TresDirectionalLight :position="[10, 10, 5]" />
  </TresCanvas>
</template>
