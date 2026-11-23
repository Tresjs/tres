<script setup lang="ts">
import { OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { Physics, RigidBody } from '@tresjs/rapier'
</script>

<!--
  TRES-433: automatic colliders ignored the bounding-box centre, so meshes whose origin is not
  at their centre (Blender exports: origin at the base or a corner) got misplaced colliders.
  Expected: every debug outline wraps its mesh (the purple block is scaled), the blocks rest on the
  floor and the ball lands on the beam.
-->
<template>
  <TresCanvas clear-color="#111111">
    <TresPerspectiveCamera :position="[10, 9, 14]" :look-at="[0, 1, 0]" />
    <OrbitControls />
    <TresAmbientLight :intensity="0.5" />
    <TresDirectionalLight :position="[5, 8, 5]" :intensity="1.5" />

    <Suspense>
      <Physics debug>
        <RigidBody type="fixed">
          <TresMesh :position="[-8, 0, 8]">
            <TresBoxGeometry :args="[16, 1, 16]" :translate="[8, -0.5, -8]" />
            <TresMeshStandardMaterial color="#3a3a3a" />
          </TresMesh>
        </RigidBody>

        <RigidBody type="fixed">
          <TresMesh :position="[-3, 0, 0]">
            <TresBoxGeometry :args="[2, 4, 2]" :translate="[0, 2, 0]" />
            <TresMeshStandardMaterial color="#4a6cd4" />
          </TresMesh>
        </RigidBody>

        <RigidBody type="fixed">
          <TresMesh :position="[3, 0, 0]" :rotation="[0, Math.PI / 4, 0]">
            <TresBoxGeometry :args="[2, 4, 2]" :translate="[0, 2, 0]" />
            <TresMeshStandardMaterial color="#4a6cd4" />
          </TresMesh>
        </RigidBody>

        <RigidBody type="fixed">
          <TresMesh :position="[-5, 0, -4]" :scale="[2, 0.5, 2]">
            <TresBoxGeometry :args="[1, 4, 1]" :translate="[0, 2, 0]" />
            <TresMeshStandardMaterial color="#8a4ad4" />
          </TresMesh>
        </RigidBody>

        <RigidBody type="fixed">
          <TresMesh :position="[0, 3, 0]">
            <TresBoxGeometry :args="[8, 1, 1]" :translate="[0, 0.5, 0]" />
            <TresMeshStandardMaterial color="#d4a84a" />
          </TresMesh>
        </RigidBody>

        <RigidBody collider="ball" :position="[0, 8, 0]">
          <TresMesh>
            <TresSphereGeometry :args="[0.5]" :translate="[0, 0.5, 0]" />
            <TresMeshStandardMaterial color="#d44a6c" />
          </TresMesh>
        </RigidBody>

        <RigidBody :position="[5, 6, 4]">
          <TresGroup>
            <TresMesh :position="[0, 1, 0]">
              <TresBoxGeometry />
              <TresMeshStandardMaterial color="#4ad48a" />
            </TresMesh>
          </TresGroup>
        </RigidBody>
      </Physics>
    </Suspense>
  </TresCanvas>
</template>
