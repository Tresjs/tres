<script setup lang="ts">
import { CoefficientCombineRule, Quaternion, Vector3 } from '@dimforge/rapier3d-compat'
import { BallCollider, type ExposedRigidBody, RigidBody } from '@tresjs/rapier'
import { Mesh, MeshStandardMaterial, type Object3D } from 'three'
import { shallowRef, watch } from 'vue'

const BALL_RADIUS = 2.94
const FALL_RESET_Y = -8
const BALL_SPAWN = new Vector3(0, BALL_RADIUS + 3, -8)
const BALL_URL = '/models/rapier-car/ball.glb'
// Ball restitution wins over the ground's (Max rule), so this IS the bounce
const BALL_RESTITUTION = 0.75
const BUBBLE_MATERIAL = 'Mat.4'
const BUBBLE_PULSE_SPEED = 2.5
const BUBBLE_EMISSIVE_MIN = 0.6
const BUBBLE_EMISSIVE_MAX = 2.4

const { state: ballGltf } = useGLTF(BALL_URL, { draco: true })

const ballRef = shallowRef<ExposedRigidBody | null>(null)
const ballModel = shallowRef<Object3D | null>(null)
let bubbleMaterial: MeshStandardMaterial | null = null

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

    const materials = Array.isArray(child.material) ? child.material : [child.material]
    for (const material of materials) {
      if (!(material instanceof MeshStandardMaterial)) { continue }
      if (material.name !== BUBBLE_MATERIAL) { continue }

      // HDR emissive so the bloom pass (threshold 1) picks up the pulse
      material.toneMapped = false
      material.emissiveIntensity = BUBBLE_EMISSIVE_MIN
      bubbleMaterial = material
    }
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

defineExpose({
  reset,
  position: () => ballRef.value?.instance?.translation() ?? null,
})

watch(() => ballRef.value?.instance, (body) => {
  if (!body) { return }

  // Max rule: the ball's restitution applies instead of averaging with the ground's
  for (let i = 0; i < body.numColliders(); i++) {
    body.collider(i).setRestitutionCombineRule(CoefficientCombineRule.Max)
  }
  reset()
})

const { onBeforeRender } = useLoop()
onBeforeRender(({ elapsed }) => {
  const body = ballRef.value?.instance
  if (!body) { return }
  if (body.translation().y < FALL_RESET_Y) {
    reset()
  }

  if (bubbleMaterial) {
    const pulse = 0.5 + 0.5 * Math.sin(elapsed * BUBBLE_PULSE_SPEED)
    bubbleMaterial.emissiveIntensity
      = BUBBLE_EMISSIVE_MIN + (BUBBLE_EMISSIVE_MAX - BUBBLE_EMISSIVE_MIN) * pulse
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
      :restitution="BALL_RESTITUTION"
      :friction="0.55"
      :mass="2"
    />
    <primitive :object="ballModel" />
  </RigidBody>
</template>
