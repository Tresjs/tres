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

const controlDefaults = {
  gravityScale: 1,
  additionalMass: 0,
  lockTranslations: false,
  lockRotations: false,
  linvelX: 0,
  linvelY: 0,
  linvelZ: 0,
  angvelX: 0,
  angvelY: 0,
  angvelZ: 0,
  enabledTranslationX: true,
  enabledTranslationY: true,
  enabledTranslationZ: true,
  debug: true,
}

const controls = useControls({
  resetBtn: {
    label: 'Reset',
    type: 'button',
    onClick: () => {
      resetControls(controls, controlDefaults)
      resetRigidBody(rigidTorusRef.value?.instance)
    },
  },
  gravityScale: { value: controlDefaults.gravityScale, min: -10, max: 10, step: 0.1 },
  additionalMass: { value: controlDefaults.additionalMass, min: 0, max: 100, step: 0.1 },
  lockTranslations: controlDefaults.lockTranslations,
  lockRotations: controlDefaults.lockRotations,
  linvelX: { value: controlDefaults.linvelX, min: -10, max: 10, step: 0.1 },
  linvelY: { value: controlDefaults.linvelY, min: -10, max: 10, step: 0.1 },
  linvelZ: { value: controlDefaults.linvelZ, min: -10, max: 10, step: 0.1 },
  angvelX: { value: controlDefaults.angvelX, min: -10, max: 10, step: 0.1 },
  angvelY: { value: controlDefaults.angvelY, min: -10, max: 10, step: 0.1 },
  angvelZ: { value: controlDefaults.angvelZ, min: -10, max: 10, step: 0.1 },
  enabledTranslationX: controlDefaults.enabledTranslationX,
  enabledTranslationY: controlDefaults.enabledTranslationY,
  enabledTranslationZ: controlDefaults.enabledTranslationZ,
  debug: controlDefaults.debug,
}, { uuid })

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
} = controls
</script>

<template>
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[15, 15, 15]" :look-at="[0, 0, 0]" />
    <OrbitControls />
    <TresDirectionalLight :position="[1, 2, 3]" :intensity="1.5" />

    <Suspense>
      <Physics :debug>
        <RigidBody
          ref="rigidTorusRef"
          :gravityScale
          :additionalMass
          :lockTranslations
          :lockRotations
          :linvel="{
            x: linvelX,
            y: linvelY,
            z: linvelZ,
          }"
          :angvel="{
            x: angvelX,
            y: angvelY,
            z: angvelZ,
          }"
          :enabledTranslations="[enabledTranslationX, enabledTranslationY, enabledTranslationZ]"
        >
          <TresMesh :position="[0, 8, 0]">
            <TresTorusGeometry />
            <TresMeshStandardMaterial color="#5672cd" />
          </TresMesh>
        </RigidBody>

        <RigidBody type="fixed">
          <TresMesh>
            <TresPlaneGeometry :args="[20, 20]" :rotate-x="-Math.PI / 2" />
            <TresMeshBasicMaterial color="#f4f4f4" />
          </TresMesh>
        </RigidBody>
      </Physics>
    </Suspense>
  </TresCanvas>
</template>
