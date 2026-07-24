<script setup lang="ts">
import { Quaternion, Vector3 } from '@dimforge/rapier3d-compat'
import { BallCollider, type ExposedRigidBody, RigidBody } from '@tresjs/rapier'
import { Mesh, type Object3D } from 'three'
import { shallowRef, watch } from 'vue'

const BALL_RADIUS = 2.94
const FALL_RESET_Y = -8
const BALL_SPAWN = new Vector3(0, BALL_RADIUS + 3, -8)
const BALL_URL = '/models/rapier-car/ball.glb'

const { state: ballGltf } = useGLTF(BALL_URL, { draco: true })

const ballRef = shallowRef<ExposedRigidBody | null>(null)
const ballModel = shallowRef<Object3D | null>(null)

watch(ballGltf, (gltf) => {
  if (!gltf?.scene) { return }

  const ball = gltf.scene.getObjectByName('ball')
  if (!ball) { return }

  ball.position.set(0, 0, 0)
  ball.rotation.set(0, 0, 0)
  ball.scale.set(1, 1, 1)

  ball.traverse((child) => {
    if (!(child instanceof Mesh)) { return }

    child.castShadow = true
    child.receiveShadow = true
  })

  ballModel.value = ball
}, { immediate: true })

function reset() {
  const body = ballRef.value?.instance
  if (!body) { return }

  body.setTranslation(BALL_SPAWN, true)
  body.setRotation(new Quaternion(0, 0, 0, 1), true)
  body.setLinvel(new Vector3(0, 0, 0), true)
  body.setAngvel(new Vector3(0, 0, 0), true)
  body.wakeUp()
}

defineExpose({ reset })

watch(() => ballRef.value?.instance, (body) => {
  if (body) { reset() }
})

const { onBeforeRender } = useLoop()
onBeforeRender(() => {
  const body = ballRef.value?.instance
  if (!body) { return }
  if (body.translation().y < FALL_RESET_Y) {
    reset()
  }
})
</script>

<template>
  <RigidBody
    v-if="ballModel"
    :key="ballModel.uuid"
    ref="ballRef"
    :collider="false"
    :position="[BALL_SPAWN.x, BALL_SPAWN.y, BALL_SPAWN.z]"
  >
    <BallCollider
      :args="[BALL_RADIUS]"
      :position="[0, 0, 0]"
      :restitution="0.9"
      :friction="0.55"
      :mass="2"
    />
    <primitive :object="ballModel" />
  </RigidBody>
</template>
