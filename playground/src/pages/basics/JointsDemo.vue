<script setup lang="ts">
import { OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { type ExposedRigidBody, Physics, RigidBody, SphericalJoint } from '@tresjs/rapier'
import { ACESFilmicToneMapping, SRGBColorSpace } from 'three'
import { shallowRef } from 'vue'
import type { ShallowRef } from 'vue'

const gl = {
  clearColor: '#82DBC5',
  shadows: true,
  alpha: false,
  outputColorSpace: SRGBColorSpace,
  toneMapping: ACESFilmicToneMapping,
}

const bodyRefA: ShallowRef<ExposedRigidBody | null> = shallowRef(null)
const bodyRefB: ShallowRef<ExposedRigidBody | null> = shallowRef(null)
</script>

<template>
  <TresCanvas v-bind="gl" window-size>
    <TresPerspectiveCamera :position="[0, 0, 30]" :look-at="[0, 0, 0]" />
    <OrbitControls />

    <Suspense>
      <Physics debug>
        <RigidBody
          ref="bodyRefA"
          type="kinematic"
          :position="[0, 0, 0]"
          collider="ball"
        >
          <TresMesh>
            <TresSphereGeometry />
            <TresMeshNormalMaterial />
          </TresMesh>
        </RigidBody>

        <RigidBody
          ref="bodyRefB"
          :position="[-2.2, 0, 0]"
          collider="ball"
        >
          <TresMesh>
            <TresSphereGeometry />
            <TresMeshNormalMaterial />
          </TresMesh>
        </RigidBody>

        <SphericalJoint
          :bodies="[bodyRefA?.instance, bodyRefB?.instance]"
          :params="[
            [0, -1.1, 0],
            [0, 2, 0],
          ]"
        />

        <RigidBody type="fixed">
          <TresMesh :position="[0, -8, 0]">
            <TresPlaneGeometry :args="[40, 40, 20]" :rotate-x="-Math.PI / 2" />
            <TresMeshBasicMaterial color="#f4f4f4" />
          </TresMesh>
        </RigidBody>
      </Physics>
    </Suspense>
  </TresCanvas>
</template>
