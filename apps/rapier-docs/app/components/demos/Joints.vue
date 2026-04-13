<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { type ExposedRigidBody, Physics, RigidBody, SphericalJoint } from '@tresjs/rapier'
import { ACESFilmicToneMapping, SRGBColorSpace } from 'three'
import { useControls } from '@tresjs/leches'
import type { ShallowRef } from 'vue'


onErrorCaptured((err) => {
  console.error('Suspense error:', err)
  return false
})

const gl = {
  clearColor: '#82DBC5',
  shadows: true,
  alpha: false,
  outputColorSpace: SRGBColorSpace,
  toneMapping: ACESFilmicToneMapping,
}

const bodyRefA: ShallowRef<ExposedRigidBody | null> = shallowRef(null)
const bodyRefB: ShallowRef<ExposedRigidBody | null> = shallowRef(null)

const { debug } = useControls({
  debug: true,
}, { uuid: inject(`uuid`) })
</script>

<template>
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[0, 0, 15]" :look-at="[0, 0, 0]" />
    <Suspense>
      <Physics :debug>
        <RigidBody ref="bodyRefA" type="kinematic" :position="[0, 0, 0]" collider="ball">
          <TresMesh>
            <TresSphereGeometry />
            <TresMeshStandardMaterial color="#5672cd" />
          </TresMesh>
        </RigidBody>

        <RigidBody ref="bodyRefB" :position="[-2.2, 0, 0]" collider="ball">
          <TresMesh>
            <TresSphereGeometry />
            <TresMeshStandardMaterial color="#5672cd" />
          </TresMesh>
        </RigidBody>

        <SphericalJoint :bodies="[bodyRefA?.instance, bodyRefB?.instance]" :params="[
          [0, -1.1, 0],
          [0, 2, 0],
        ]" />

        <RigidBody type="fixed">
          <TresMesh :position="[0, -8, 0]">
            <TresPlaneGeometry :args="[40, 40, 20]" :rotate-x="-Math.PI / 2" />
            <TresMeshBasicMaterial color="#f4f4f4" />
          </TresMesh>
        </RigidBody>
      </Physics>
    </Suspense>
    <TresDirectionalLight :position="[1, 2, 3]" :intensity="1.5" />
  </TresCanvas>
</template>
