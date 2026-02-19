<script setup lang="ts">
import { OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { useControls } from '@tresjs/leches'
import { Physics, RigidBody } from '@tresjs/rapier'
import { ACESFilmicToneMapping, SRGBColorSpace } from 'three'

const gl = {
  clearColor: '#82DBC5',
  shadows: true,
  alpha: false,
  outputColorSpace: SRGBColorSpace,
  toneMapping: ACESFilmicToneMapping,
}

const uuid = inject(`uuid`)
const rigidTorusRef = shallowRef()

const {
  gravityScale,
  additionalMass,
  lockTranslations,
  lockRotations,
  linvelX,
  linvelY,
  linvelZ,
  angvelX,
  angvelY,
  angvelZ,
  enabledTranslationX,
  enabledTranslationY,
  enabledTranslationZ,
  debug,
} = useControls({
    resetBtn: {
    label: 'Reset Rigid Body',
    type: 'button',
    onClick: () => {
      rigidTorusRef.value?.instance?.setRotation({ x: 0, y: 0, z: 0, w: 1 }, true)
      rigidTorusRef.value?.instance?.setTranslation({ x: 0, y: 0, z: 0 }, true)
      rigidTorusRef.value?.instance?.resetForces(true)
    },
  },
  gravityScale: { value: 1, min: -10, max: 10, step: 0.1 },
  additionalMass: { value: 0, min: 0, max: 100, step: 0.1 },
  lockTranslations: false,
  lockRotations: false,
  linvelX: { value: 0, min: -10, max: 10, step: 0.1 },
  linvelY: { value: 0, min: -10, max: 10, step: 0.1 },
  linvelZ: { value: 0, min: -10, max: 10, step: 0.1 },
  angvelX: { value: 0, min: -10, max: 10, step: 0.1 },
  angvelY: { value: 0, min: -10, max: 10, step: 0.1 },
  angvelZ: { value: 0, min: -10, max: 10, step: 0.1 },
  enabledTranslationX: true,
  enabledTranslationY: true,
  enabledTranslationZ: true,
  debug: true,
}, { uuid })
</script>

<template>
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[15, 15, 15]" :look-at="[0, 0, 0]" />
    <OrbitControls />

    <Suspense>
      <Physics ref="physicsRef" :debug >
        <RigidBody
          ref="rigidTorusRef"
          :gravityScale
          :additionalMass
          :lockTranslations
          :lockRotations
          :linvel="{ x: linvelX,
                     y: linvelY,
                     z: linvelZ }"
          :angvel="{ x: angvelX,
                     y: angvelY,
                     z: angvelZ }"
          :enabledTranslations="[enabledTranslationX, enabledTranslationY, enabledTranslationZ]"
        >
          <TresMesh :position="[0, 8, 0]">
            <TresTorusGeometry />
            <TresMeshNormalMaterial />
          </TresMesh>
        </RigidBody>

        <RigidBody type="fixed">
          <TresMesh>
            <TresPlaneGeometry :args="[20, 20, 20]" :rotate-x="-Math.PI / 2" />
            <TresMeshBasicMaterial color="#f4f4f4" />
          </TresMesh>
        </RigidBody>
      </Physics>
    </Suspense>
  </TresCanvas>
</template>
