<script setup lang="ts">
import { RigidBody, useRapier } from '@tresjs/rapier'
import { Euler, Quaternion } from 'three'
import { ref } from 'vue'

// Spins in lockstep with the solver via onBeforeStep: speed scales with
// timeScale, halts on pause, and stays constant across timeStep modes
// (1/30, 1/120, 'vary') since it advances by solved simulation time.
const PADDLE_SPEED = Math.PI / 2 // rad/s of simulation time

const paddleRef = ref()
const { onBeforeStep } = useRapier()

let angle = 0
const quaternion = new Quaternion()
const euler = new Euler()

onBeforeStep((timestep) => {
  const body = paddleRef.value?.instance
  if (!body) { return }
  angle += PADDLE_SPEED * timestep
  quaternion.setFromEuler(euler.set(0, angle, 0))
  body.setNextKinematicRotation(quaternion)
})
</script>

<template>
  <RigidBody ref="paddleRef" type="kinematic">
    <TresMesh cast-shadow>
      <TresBoxGeometry :args="[16, 1.5, 1.5]" />
      <TresMeshStandardMaterial color="#EFAC35" />
    </TresMesh>
  </RigidBody>
</template>
