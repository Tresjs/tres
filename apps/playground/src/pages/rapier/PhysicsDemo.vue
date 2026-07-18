<script setup lang="ts">
import { OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { TresLeches, useControls } from '@tresjs/leches'
import { Physics, RigidBody } from '@tresjs/rapier'
import { ACESFilmicToneMapping, SRGBColorSpace } from 'three'
import { computed } from 'vue'

const gl = {
  clearColor: '#82DBC5',
  shadows: true,
  alpha: false,
  outputColorSpace: SRGBColorSpace,
  toneMapping: ACESFilmicToneMapping,
}

const TIME_STEP_OPTIONS = ['1/60', '1/30', '1/120', 'vary'] as const

const {
  gravityX,
  gravityY,
  gravityZ,
  timeScale,
  timeStep,
  pause,
  debug,
} = useControls({
  gravityX: { value: 0, min: -20, max: 20, step: 0.1 },
  gravityY: { value: 0, min: -20, max: 20, step: 0.1 },
  gravityZ: { value: 0, min: -20, max: 20, step: 0.1 },
  timeScale: { value: 1, min: 0, max: 4, step: 0.05 },
  timeStep: { value: '1/60', options: [...TIME_STEP_OPTIONS] },
  pause: false,
  debug: true,
})

const resolvedTimeStep = computed(() => {
  switch (timeStep.value) {
    case 'vary':
      return 'vary' as const
    case '1/30':
      return 1 / 30
    case '1/120':
      return 1 / 120
    default:
      return 1 / 60
  }
})

const BODY_SHAPES = ['cuboid', 'ball'] as const

const randomInRange = (min: number, max: number): number => min + Math.random() * (max - min)

const bodies = Array.from({ length: 10 }, () => ({
  shape: BODY_SHAPES[Math.floor(Math.random() * BODY_SHAPES.length)]!,
  position: [
    randomInRange(0, 2),
    randomInRange(0, 2),
    randomInRange(0, 2),
  ] as [number, number, number],
}))

/**
 * Enclosed cube walls (planes) on one fixed RigidBody.
 * Use trimesh — default cuboid auto-colliders are degenerate on planes and crash Rapier.
 */
const walls: { position: [number, number, number], rotation: [number, number, number] }[] = [
  { position: [0, -10, 0], rotation: [-Math.PI / 2, 0, 0] },
  { position: [0, 10, 0], rotation: [Math.PI / 2, 0, 0] },
  { position: [0, 0, -10], rotation: [0, 0, 0] },
  { position: [0, 0, 10], rotation: [0, Math.PI, 0] },
  { position: [10, 0, 0], rotation: [0, -Math.PI / 2, 0] },
  { position: [-10, 0, 0], rotation: [0, Math.PI / 2, 0] },
]
</script>

<template>
  <TresLeches />
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[0, 0, 45]" :look-at="[0, 0, 0]" />
    <OrbitControls />

    <Suspense>
      <Physics
        :debug
        :pause
        :time-scale
        :time-step="resolvedTimeStep"
        :gravity="[gravityX, gravityY, gravityZ]"
      >
        <RigidBody
          v-for="(body, index) in bodies"
          :key="`body-${index}`"
          :collider="body.shape"
          :position="body.position"
          :restitution="0.4"
        >
          <TresMesh cast-shadow receive-shadow>
            <TresSphereGeometry v-if="body.shape === 'ball'" />
            <TresBoxGeometry v-else />
            <TresMeshNormalMaterial />
          </TresMesh>
        </RigidBody>

        <RigidBody type="fixed" :restitution="0.5">
          <TresMesh
            v-for="(wall, index) in walls"
            :key="`wall-${index}`"
            :position="wall.position"
            :rotation="wall.rotation"
            receive-shadow
          >
            <TresPlaneGeometry :args="[20, 20, 20]" />
            <TresMeshStandardMaterial color="#f4f4f4" />
          </TresMesh>
        </RigidBody>
      </Physics>
    </Suspense>

    <TresAmbientLight :intensity="0.5" />
    <TresDirectionalLight
      :position="[12, 18, 10]"
      :intensity="1.2"
      cast-shadow
      :shadow-camera-near="0.5"
      :shadow-camera-far="60"
      :shadow-camera-left="-18"
      :shadow-camera-right="18"
      :shadow-camera-top="18"
      :shadow-camera-bottom="-18"
      :shadow-bias="-0.0001"
      :shadow-radius="3"
    />
  </TresCanvas>
</template>
