<script setup lang="ts">
import type { AnimationAction } from 'three'
import { useLoop, useTres } from '@tresjs/core'
import { OrbitControls, useGLTF, useAnimations } from '@tresjs/cientos'
import { RigidBody, CapsuleCollider } from '@tresjs/rapier'
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

// useAnimations binds the actions post-flush, so seed off `actions` rather than the
// loading flag — a pre-flush watcher on isLoading reads them before they exist
watch(actions, (newActions) => {
  const idle = newActions.Idle
  if (!idle || currentAction.value) return
  currentAction.value = idle
  idle.play()
  if (hasPressed.value) changeAnimation(newActions.SwordAndShieldRun)
})

// constants
const fadeDuration = 0.2
const speed = 5
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
  if (!action || !currentAction.value || currentAction.value === action) return
  currentAction.value.fadeOut(fadeDuration)
  action.reset().fadeIn(fadeDuration).play()
  currentAction.value = action
}

// KEYS
// useMagicKeys types its keys through an index signature, so each one comes back
// as possibly undefined under noUncheckedIndexedAccess
const keys = useMagicKeys()
const w = keys.w!
const s = keys.s!
const a = keys.a!
const d = keys.d!
const hasPressed = computed(() => w.value || s.value || a.value || d.value)
watch(hasPressed, (pressed) => {
  changeAnimation(pressed ? actions.SwordAndShieldRun : actions.Idle)
})

const moveBody = (body: Body, position: BodyPosition, camera: Camera) => {
  const angleYCameraDirection = Math.atan2(
    camera.position.x - position.x,
    camera.position.z - position.z,
  )
  const directionOffset = getOffset()
  const directionOffsetModel = getInvertOffset() // correct rotation model coordinates

  // rotate model
  rotateQuaternion.setFromAxisAngle(rotateAngle, angleYCameraDirection + directionOffsetModel)
  model.value?.quaternion.rotateTowards(rotateQuaternion, 0.2)

  // calculate direction
  camera.getWorldDirection(walkDirection)
  walkDirection.y = 0
  walkDirection.normalize()
  walkDirection.applyAxisAngle(rotateAngle, directionOffset)

  // the terrain collider ends at the heightfield bounds: drop whichever component would
  // carry him past the edge, so he slides along it instead of walking off into the void
  if (Math.abs(position.x) > WALK_BOUNDS && Math.sign(walkDirection.x) === Math.sign(position.x)) walkDirection.x = 0
  if (Math.abs(position.z) > WALK_BOUNDS && Math.sign(walkDirection.z) === Math.sign(position.z)) walkDirection.z = 0

  // gravity keeps the y velocity, the heightfield does the rest
  body.setLinvel(
    { x: walkDirection.x * speed, y: body.linvel().y, z: walkDirection.z * speed },
    true,
  )
}

const getOffset = () => {
  let directionOffset = 0 // ww
  if (w.value) {
    if (a.value) {
      directionOffset = Math.PI / 4 // w+a
    } else if (d.value) {
      directionOffset = -Math.PI / 4 // w+d
    }
  } else if (s.value) {
    if (a.value) {
      directionOffset = Math.PI / 4 + Math.PI / 2 // s+a
    } else if (d.value) {
      directionOffset = -Math.PI / 4 - Math.PI / 2 // s+d
    } else {
      directionOffset = Math.PI // s
    }
  } else if (a.value) {
    directionOffset = Math.PI / 2 // a
  } else if (d.value) {
    directionOffset = -Math.PI / 2 // d
  }

  return directionOffset
}
const getInvertOffset = () => {
  let directionOffset = Math.PI // ww
  if (w.value) {
    if (a.value) {
      directionOffset = -Math.PI / 4 - Math.PI / 2 // w+a
    } else if (d.value) {
      directionOffset = Math.PI / 4 + Math.PI / 2 // w+d
    }
  } else if (s.value) {
    if (a.value) {
      directionOffset = -Math.PI / 4 // s+a
    } else if (d.value) {
      directionOffset = Math.PI / 4 // s+d
    } else {
      directionOffset = 0 // s
    }
  } else if (a.value) {
    directionOffset = -Math.PI / 2 // a
  } else if (d.value) {
    directionOffset = +Math.PI / 2 // d
  }

  return directionOffset
}
const updateCameraTarget = (position: BodyPosition, camera: Camera, controls: Controls) => {
  // move camera by the actual physics displacement
  camera.position.x += position.x - prevPosition.x
  camera.position.z += position.z - prevPosition.z

    controls.target.set(position.x, position.y + 1, position.z)
}
const { onBeforeRender } = useLoop()

onBeforeRender(() => {
  if (isLoading.value) return

  const body = bodyRef.value?.instance
  const controls = orbitControlsRef.value?.instance
  const activeCamera = camera.value
  if (!body || !activeCamera || !controls) return

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
    moveBody(body, position, activeCamera)
  } else {
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
