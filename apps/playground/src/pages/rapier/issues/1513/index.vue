<script setup lang="ts">
import { OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { CapsuleCollider, CuboidCollider, Physics, RigidBody } from '@tresjs/rapier'
</script>

<!--
  #1513: <Physics debug> lines were near-black, hidden by meshes and frustum-culled.
  Expected: Rapier's colored debug lines show the floor edges and the capsule inside the box.
-->
<template>
  <TresCanvas clear-color="#111111">
    <TresPerspectiveCamera :position="[6, 4, 8]" :look-at="[0, 0, 0]" />
    <OrbitControls />
    <TresAmbientLight :intensity="0.5" />
    <TresDirectionalLight :position="[5, 8, 5]" :intensity="1.5" />

    <Suspense>
      <Physics debug>
        <!-- Stands in for a GLTF character: the capsule sits fully inside an opaque mesh. -->
        <RigidBody type="kinematic" :collider="false">
          <TresMesh>
            <TresBoxGeometry :args="[1.5, 3, 1.5]" />
            <TresMeshStandardMaterial color="#4a6cd4" />
          </TresMesh>
          <CapsuleCollider :args="[0.8, 0.5]" />
        </RigidBody>

        <RigidBody type="fixed" :collider="false">
          <TresMesh :position="[0, -1.5, 0]" :rotation="[-Math.PI / 2, 0, 0]">
            <TresPlaneGeometry :args="[20, 20]" />
            <TresMeshStandardMaterial color="#1a1a1a" />
          </TresMesh>
          <CuboidCollider :args="[10, 0.1, 10]" :position="[0, -1.6, 0]" />
        </RigidBody>
      </Physics>
    </Suspense>
  </TresCanvas>
</template>
