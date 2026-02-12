<script setup lang="ts">
import { OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { BallCollider, CapsuleCollider, ConeCollider, CuboidCollider, CylinderCollider, Physics, RigidBody } from '@tresjs/rapier'
import { ACESFilmicToneMapping, SRGBColorSpace } from 'three'

const gl = {
  clearColor: '#82DBC5',
  shadows: true,
  alpha: false,
  outputColorSpace: SRGBColorSpace,
  toneMapping: ACESFilmicToneMapping,
}
</script>

<template>
  <TresCanvas v-bind="gl" >
    <TresPerspectiveCamera :position="[11, 11, 11]" :look-at="[0, 0, 0]" />
    <OrbitControls />

    <Suspense>
      <Physics debug>
        <RigidBody :collider="false">
          <BallCollider :args="[1, 1, 1]" :position="[2, 10, 0]" />
          <CapsuleCollider :args="[1, 1, 1]" :position="[-2, 10, 0]" />
          <ConeCollider :args="[1, 1, 1]" :position="[0, 10, 2]" />
          <CuboidCollider :args="[1, 1, 1]" :position="[0, 10, -2]" />
          <CylinderCollider :args="[1, 1, 1]" :position="[2, 10, 2]" />
        </RigidBody>

        <RigidBody collider="cuboid">
          <BallCollider :args="[1, 1, 1]" :position="[0, 15, 0]" />

          <TresMesh :position="[0, 15, 0]">
            <TresTorusGeometry />
            <TresMeshNormalMaterial />
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
