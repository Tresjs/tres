<script setup lang="ts">
import { OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { TresLeches, useControls } from '@tresjs/leches'
import { BallCollider, type ExposedRigidBody, Physics, RigidBody } from '@tresjs/rapier'
import { ACESFilmicToneMapping, SRGBColorSpace } from 'three'
import { shallowRef } from 'vue'
import '@tresjs/leches/styles'

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
  rigidTorusRef.value.instance.applyImpulse({ x: 0, y: 35, z: 0 }, true)
}

const rotate = () => {
  if (!rigidBoxRef.value) { return }
  rigidBoxRef.value.instance.applyTorqueImpulse({ x: 3, y: 5, z: 0 }, true)
}

const { gravityScale, linearDamping, angularDamping, lockT, linvelX, friction, mass, density, restitution } = useControls({
  gravityScale: { value: 2.5, min: -10, max: 10, step: 1 },
  linearDamping: { value: 0, min: -10, max: 10, step: 1 },
  angularDamping: { value: 0, min: -10, max: 10, step: 1 },
  linvelX: { value: 0, min: -10, max: 10, step: 1 },
  lockT: false,
  // colliders
  friction: { value: 0, min: 0, max: 10, step: 1 },
  mass: { value: 1, min: 0, max: 10, step: 1 },
  density: { value: 1, min: 0, max: 10, step: 1 },
  restitution: { value: 1, min: 0, max: 10, step: 1 },
})
</script>

<template>
  <TresLeches />
  <TresCanvas v-bind="gl" window-size>
    <TresPerspectiveCamera :position="[11, 11, 11]" :look-at="[0, 0, 0]" />
    <OrbitControls />

    <Suspense>
      <Physics debug>
        <!-- TORUS -->
        <RigidBody
          ref="rigidTorusRef"
          :gravityScale="gravityScale.value"
          :linearDamping="linearDamping.value"
          :angularDamping="angularDamping.value"
          :enabledTranslations="[true, true, true]"
          :lockTranslations="lockT.value"
          :linvelX="linvelX.value"
          :friction="friction.value"
          :mass="mass.value"
          :density="density.value"
          :restitution="restitution.value"
        >
          <TresMesh :position="[4, 8, 0]" @click="jump">
            <TresTorusGeometry />
            <TresMeshNormalMaterial />
          </TresMesh>
        </RigidBody>

        <RigidBody>
          <BallCollider :restitution="2" :args="[1, 1, 1]" :position="[2, 10, 2]" />
        </RigidBody>

        <!-- BOX -->

        <RigidBody
          ref="rigidBoxRef"
          :gravityScale="-0.01"
          :additionalMass="50"
          :enabledRotations="[true, true, true]"
          :linvel="{ x: linvelX.value, y: 0, z: 0 }"
        >
          <TresMesh :position="[4, 2, 5]" @click="rotate">
            <TresBoxGeometry />
            <TresMeshBasicMaterial :color="0xFF0000" />
          </TresMesh>
        </RigidBody>

        <RigidBody>
          <TresMesh :position="[0, 8, 5]">
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
