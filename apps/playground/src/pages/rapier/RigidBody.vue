<script setup lang="ts">
import { OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { TresLeches, useControls } from '@tresjs/leches'
import { type ExposedRigidBody, Physics, RigidBody } from '@tresjs/rapier'
import { ACESFilmicToneMapping, SRGBColorSpace } from 'three'
import { shallowRef } from 'vue'

const gl = {
  clearColor: '#82DBC5',
  shadows: true,
  alpha: false,
  outputColorSpace: SRGBColorSpace,
  toneMapping: ACESFilmicToneMapping,
}

const rigidTorusRef = shallowRef<ExposedRigidBody>()
const rigidBoxRef = shallowRef<ExposedRigidBody>()

const jump = () => {
  if (!rigidTorusRef.value) { return }
  rigidTorusRef.value.instance.applyImpulse({ x: 0, y: 15, z: 0 }, true)
}

const rotate = () => {
  if (!rigidBoxRef.value) { return }
  rigidBoxRef.value.instance.applyTorqueImpulse({ x: 0, y: 2.5, z: 0 }, true)
}

const {
  type,
  collider,
  gravityScale,
  additionalMass,
  linearDamping,
  angularDamping,
  dominanceGroup,
  lockTranslations,
  lockRotations,
  linvelX,
  linvelY,
  linvelZ,
  angvelX,
  angvelY,
  angvelZ,
  enabledRotationX,
  enabledRotationY,
  enabledRotationZ,
  enabledTranslationX,
  enabledTranslationY,
  enabledTranslationZ,
  debug,
} = useControls({
  // this is not reactive yet
  type: { value: 'dynamic', options: ['dynamic', 'fixed'] },
  // this is not reactive yet
  collider: { value: 'cuboid', options: ['cuboid', 'ball'] },
  gravityScale: { value: 1, min: -10, max: 10, step: 0.1 },
  additionalMass: { value: 0, min: 0, max: 100, step: 0.1 },
  linearDamping: { value: 0, min: 0, max: 10, step: 0.1 },
  angularDamping: { value: 0, min: 0, max: 10, step: 0.1 },
  dominanceGroup: { value: 0, min: -127, max: 127, step: 1 },
  lockTranslations: false,
  lockRotations: false,
  linvelX: { value: 0, min: -10, max: 10, step: 0.1 },
  linvelY: { value: 0, min: -10, max: 10, step: 0.1 },
  linvelZ: { value: 0, min: -10, max: 10, step: 0.1 },
  angvelX: { value: 0, min: -10, max: 10, step: 0.1 },
  angvelY: { value: 0, min: -10, max: 10, step: 0.1 },
  angvelZ: { value: 0, min: -10, max: 10, step: 0.1 },
  enabledRotationX: true,
  enabledRotationY: true,
  enabledRotationZ: true,
  enabledTranslationX: true,
  enabledTranslationY: true,
  enabledTranslationZ: true,
  debug: true,
})
</script>

<template>
  <TresLeches />
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[11, 11, 11]" :look-at="[0, 0, 0]" />
    <OrbitControls />

    <Suspense>
      <Physics :debug>
        <!-- TORUS -->
        <RigidBody
          ref="rigidTorusRef"
          :type
          :collider
          :gravityScale
          :additionalMass
          :linearDamping
          :angularDamping
          :dominanceGroup
          :lockTranslations
          :lockRotations
          :linvel="{ x: linvelX,
                     y: linvelY,
                     z: linvelZ }"
          :angvel="{ x: angvelX,
                     y: angvelY,
                     z: angvelZ }"
          :enabledRotations="[enabledRotationX, enabledRotationY, enabledRotationZ]"
          :enabledTranslations="[enabledTranslationX, enabledTranslationY, enabledTranslationZ]"
        >
          <TresMesh :position="[4, 8, 0]" @click="jump">
            <TresTorusGeometry />
            <TresMeshNormalMaterial />
          </TresMesh>
        </RigidBody>

        <!-- BOX -->
        <RigidBody
          ref="rigidBoxRef"
          :type
          :collider
          :gravityScale
          :additionalMass
          :linearDamping
          :angularDamping
          :dominanceGroup
          :lockTranslations
          :linvel="{ x: linvelX,
                     y: linvelY,
                     z: linvelZ }"
          :angvel="{ x: angvelX,
                     y: angvelY,
                     z: angvelZ }"
          :enabledRotations="[enabledRotationX, enabledRotationY, enabledRotationZ]"
          :enabledTranslations="[enabledTranslationX, enabledTranslationY, enabledTranslationZ]"
        >
          <TresMesh :position="[4, 2, 5]" @click="rotate">
            <TresBoxGeometry />
            <TresMeshBasicMaterial :color="0xFF0000" />
          </TresMesh>
        </RigidBody>

        <RigidBody type="fixed">
          <TresMesh :position="[0, 0, 0]">
            <TresPlaneGeometry :args="[20, 20, 20]" :rotate-x="-Math.PI / 2" />
            <TresMeshBasicMaterial color="#f4f4f4" />
          </TresMesh>
        </RigidBody>
      </Physics>
    </Suspense>
  </TresCanvas>
</template>
