<script setup lang="ts">
import { OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { CapsuleCollider, Physics, RigidBody } from '@tresjs/rapier'

// Every body sits off the origin. Each mesh shows where its collider belongs, so the debug
// wireframe must wrap it.
const bodyY = 1.5
</script>

<template>
  <TresCanvas clear-color="#82DBC5">
    <TresPerspectiveCamera :position="[2, 6, 14]" :look-at="[2, 1.5, 0]" />
    <OrbitControls :target="[2, 1.5, 0]" />
    <TresGridHelper :args="[20, 20]" />
    <TresAmbientLight :intensity="1" />
    <TresDirectionalLight :position="[5, 10, 5]" :intensity="2" />

    <Suspense>
      <Physics debug>
        <!-- Case 1: collider without a position. -->
        <RigidBody type="kinematic" :collider="false" :position="[-3, bodyY, 0]">
          <CapsuleCollider :args="[0.8, 0.5]" />
          <TresMesh>
            <TresCapsuleGeometry :args="[0.5, 1.6]" />
            <TresMeshStandardMaterial color="#f5a623" />
          </TresMesh>
        </RigidBody>

        <!-- Case 2: collider with a zero position. -->
        <RigidBody type="kinematic" :collider="false" :position="[0, bodyY, 0]">
          <CapsuleCollider :args="[0.8, 0.5]" :position="[0, 0, 0]" />
          <TresMesh>
            <TresCapsuleGeometry :args="[0.5, 1.6]" />
            <TresMeshStandardMaterial color="#4a90e2" />
          </TresMesh>
        </RigidBody>

        <!-- Automatic collider: the mesh's local offset inside the body is the collider offset. -->
        <RigidBody type="kinematic" :position="[3, bodyY, 0]">
          <TresMesh :position="[0, 0.5, 0]">
            <TresBoxGeometry />
            <TresMeshStandardMaterial color="#7ed321" />
          </TresMesh>
        </RigidBody>

        <!-- Rotated body: a collider without a rotation follows the body, once. -->
        <RigidBody
          type="kinematic"
          :collider="false"
          :position="[6, bodyY, 0]"
          :rotation="[0, 0, Math.PI / 2]"
        >
          <CapsuleCollider :args="[0.8, 0.5]" />
          <TresMesh>
            <TresCapsuleGeometry :args="[0.5, 1.6]" />
            <TresMeshStandardMaterial color="#bd10e0" />
          </TresMesh>
        </RigidBody>
      </Physics>
    </Suspense>
  </TresCanvas>
</template>
