<script setup lang="ts">
import type { AnimationAction } from 'three'
import { useLoop, useTres } from '@tresjs/core'
import { OrbitControls, useAnimations, useGLTF } from '@tresjs/cientos'
import { CapsuleCollider, RigidBody } from '@tresjs/rapier'
import { useMagicKeys } from '@vueuse/core'
import { Quaternion, Vector3 } from 'three'
import { createHeightSampler, loadHeightImage } from './heightmap'
import { CAMERA_CLEARANCE, CAMERA_OFFSET, HEIGHTFIELD_ROWS, SPAWN, SPAWN_CLEARANCE, WALK_BOUNDS } from './constants'

type Body = NonNullable<InstanceType<typeof RigidBody>['instance']>
type BodyPosition = ReturnType<Body['translation']>
type Controls = NonNullable<InstanceType<typeof OrbitControls>['instance']>

// sample at the collider resolution so the spawn height matches the heightfield the
// capsule lands on, not the finer displaced mesh
const sampler = createHeightSampler(await loadHeightImage(), HEIGHTFIELD_ROWS + 1)
const spawn: [number, number, number] = [
  SPAWN.x,
  sampler.heightAt(SPAWN.x, SPAWN.z) + SPAWN_CLEARANCE,
  SPAWN.z,
]

const { state, isLoading } = useGLTF('https://raw.githubusercontent.com/Tresjs/assets/main/models/gltf/warcraft-3-alliance-footmanfanmade/source/Footman_RIG.glb')

const animations = computed(() => state.value?.animations || [])
const model = computed(() => state?.value?.scene)
const { actions } = useAnimations(animations, model)

// constants
const fadeDuration = 0.2
const speed = 5
// radians per second, not per frame: 0.2 a frame meant a 144Hz panel turned him 2.4x
// faster than a 60Hz one. 12 is that same 0.2 at 60Hz
const turnSpeed = 12
const rotateAngle = new Vector3(0, 1, 0)
const walkDirection = new Vector3()
const rotateQuaternion = new Quaternion()
const prevPosition = new Vector3()
let hasPrevPosition = false

// template ref
const { camera } = useTres()
type Camera = NonNullable<typeof camera.value>
const orbitControlsRef = shallowRef<InstanceType<typeof OrbitControls> | null>(null)
const bodyRef = shallowRef<InstanceType<typeof RigidBody> | null>(null)
const currentAction = ref<AnimationAction>()

const changeAnimation = (action: AnimationAction | undefined) => {
  if (!action || !currentAction.value || currentAction.value === action) { return }
  currentAction.value.fadeOut(fadeDuration)
  action.reset().fadeIn(fadeDuration).play()
  currentAction.value = action
}

// KEYS
const keys = useMagicKeys()
const w = keys.w!
const s = keys.s!
const a = keys.a!
const d = keys.d!
const hasPressed = computed(() => w.value || s.value || a.value || d.value)
watch(hasPressed, (pressed) => {
  changeAnimation(pressed ? actions.SwordAndShieldRun : actions.Idle)
})

// useAnimations binds the actions post-flush, so seed off `actions` rather than the
// loading flag — a pre-flush watcher on isLoading reads them before they exist
watch(actions, (newActions) => {
  const idle = newActions.Idle
  if (!idle || currentAction.value) { return }
  currentAction.value = idle
  idle.play()
  if (hasPressed.value) { changeAnimation(newActions.SwordAndShieldRun) }
})

// the key pairs are the two axes of a stick: atan2 turns them straight into the angle
// the walk veers off the camera direction, diagonals included
const getOffset = () => {
  const x = Number(a.value) - Number(d.value)
  const z = Number(w.value) - Number(s.value)
  return Math.atan2(x, z)
}

const moveBody = (body: Body, position: BodyPosition, camera: Camera, delta: number) => {
  const angleYCameraDirection = Math.atan2(
    camera.position.x - position.x,
    camera.position.z - position.z,
  )
  const directionOffset = getOffset()

  // rotate model: it faces -Z, so it points a half turn away from the walk direction
  rotateQuaternion.setFromAxisAngle(rotateAngle, angleYCameraDirection + directionOffset + Math.PI)
  model.value?.quaternion.rotateTowards(rotateQuaternion, turnSpeed * delta)

  // calculate direction
  camera.getWorldDirection(walkDirection)
  walkDirection.y = 0
  walkDirection.normalize()
  walkDirection.applyAxisAngle(rotateAngle, directionOffset)

  // the terrain collider ends at the heightfield bounds: drop whichever component would
  // carry him past the edge, so he slides along it instead of walking off into the void
  if (Math.abs(position.x) > WALK_BOUNDS && Math.sign(walkDirection.x) === Math.sign(position.x)) { walkDirection.x = 0 }
  if (Math.abs(position.z) > WALK_BOUNDS && Math.sign(walkDirection.z) === Math.sign(position.z)) { walkDirection.z = 0 }

  // gravity keeps the y velocity, the heightfield does the rest
  body.setLinvel(
    { x: walkDirection.x * speed, y: body.linvel().y, z: walkDirection.z * speed },
    true,
  )
}
const updateCameraTarget = (position: BodyPosition, camera: Camera, controls: Controls) => {
  // move camera by the actual physics displacement
  camera.position.x += position.x - prevPosition.x
  camera.position.z += position.z - prevPosition.z

  controls.target.set(position.x, position.y + 1, position.z)
}
const { onBeforeRender } = useLoop()

onBeforeRender(({ delta }) => {
  if (isLoading.value) { return }

  const body = bodyRef.value?.instance
  const controls = orbitControlsRef.value?.instance
  const activeCamera = camera.value
  if (!body || !activeCamera || !controls) { return }

  const position = body.translation()
  if (!hasPrevPosition) {
    prevPosition.set(position.x, position.y, position.z)
    hasPrevPosition = true
    // frame the footman from behind once he exists: from here on the camera only
    // tracks his displacement, so this is the shot the demo opens on
    const camX = position.x + CAMERA_OFFSET.x
    const camZ = position.z + CAMERA_OFFSET.z
    activeCamera.position.set(
      camX,
      // uphill of the footman the offset alone can end up inside the slope
      Math.max(position.y + CAMERA_OFFSET.y, sampler.heightAt(camX, camZ) + CAMERA_CLEARANCE),
      camZ,
    )
  }

  if (hasPressed.value) {
    moveBody(body, position, activeCamera, delta)
  }
  else {
    body.setLinvel({ x: 0, y: body.linvel().y, z: 0 }, true)
  }

  updateCameraTarget(position, activeCamera, controls)
  prevPosition.set(position.x, position.y, position.z)
  controls.update()
})
</script>

<template>
  <OrbitControls
    ref="orbitControlsRef"
    enable-damping
    :enable-pan="false"
    :min-distance="3"
    :max-distance="12"
    :min-polar-angle="Math.PI / 3"
    :max-polar-angle="Math.PI / 2 - 0.05"
  />
  <RigidBody
    v-if="model"
    ref="bodyRef"
    type="dynamic"
    :collider="false"
    lock-rotations
    :position="spawn"
  >
    <CapsuleCollider :args="[0.5, 0.35]" :position="[0, 0.85, 0]" />
    <primitive :object="model" />
  </RigidBody>
</template>
