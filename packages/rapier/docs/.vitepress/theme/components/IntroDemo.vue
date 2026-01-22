<script setup>
import { TresCanvas } from '@tresjs/core'
import { Physics, RigidBody } from '@tresjs/rapier'
import { shallowRef } from 'vue'

const rigidBallRef = shallowRef(null)
const resetBallPosition = () => {
  if (rigidBallRef.value) {
    rigidBallRef.value.instance.applyImpulse({ x: 0, y: 8, z: 0 }, true)
  }
}
</script>

<template>
  <button class="floating-button" @click="resetBallPosition">Jump</button>
  <TresCanvas>
    <TresPerspectiveCamera :position="[15, 15, 15]" :look-at="[0, 0, 0]" />

    <Suspense>
      <Physics>
        <RigidBody ref="rigidBallRef">
          <TresMesh :position="[0, 8, 0]">
            <TresSphereGeometry :args="[1, 16]" />
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

<style scoped>
.floating-button {
  position: relative;
  top: 0;
  left: 40%;
  z-index: 1000;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
}
</style>
