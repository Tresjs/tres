<script setup lang="ts">
import type { AnimationAction } from 'three'
import { useLoop, useTres } from '@tresjs/core'
import { OrbitControls, useGLTF, useAnimations } from '@tresjs/cientos'
import { RigidBody, CapsuleCollider } from '@tresjs/rapier'
import { useMagicKeys, watchOnce } from '@vueuse/core'
import { Quaternion, Vector3 } from 'three'
import { HEIGHT_SCALE } from './constants'

type Body = NonNullable<InstanceType<typeof RigidBody>['instance']>
type BodyPosition = ReturnType<Body['translation']>
type Controls = NonNullable<InstanceType<typeof OrbitControls>['instance']>

const { state, isLoading } = useGLTF('https://raw.githubusercontent.com/Tresjs/assets/main/models/gltf/warcraft-3-alliance-footmanfanmade/source/Footman_RIG.glb')

const animations = computed(() => state.value?.animations || [])
const model = computed(() => state?.value?.scene)
const { actions } = useAnimations(animations, model)

watchOnce(isLoading, (v) => {
  if (!v) {
    currentAction.value = actions.Idle
    currentAction.value?.play()
    if (hasPressed.value) changeAnimation(actions.SwordAndShieldRun)
  }
})

// constants
const fadeDuration = 0.2
const velocity = 5
const rotateAngle = new Vector3(0, 1, 0)
const cameraTarget = new Vector3()
const walkDirection = new Vector3()
const rotateQuarternion = new Quaternion()
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
  rotateQuarternion.setFromAxisAngle(rotateAngle, angleYCameraDirection + directionOffsetModel)
  model.value?.quaternion.rotateTowards(rotateQuarternion, 0.2)

  // calculate direction
  camera.getWorldDirection(walkDirection)
  walkDirection.y = 0
  walkDirection.normalize()
  walkDirection.applyAxisAngle(rotateAngle, directionOffset)

  // gravity keeps the y velocity, the heightfield does the rest
  body.setLinvel(
    { x: walkDirection.x * velocity, y: body.linvel().y, z: walkDirection.z * velocity },
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

  // update camera target
  cameraTarget.set(position.x, position.y + 1, position.z)
  controls.target = cameraTarget
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
    :max-polar-angle="Math.PI / 2 - 0.05"
  />
  <RigidBody
    v-if="model"
    ref="bodyRef"
    type="dynamic"
    :collider="false"
    lock-rotations
    :position="[0, HEIGHT_SCALE / 2, 0]"
  >
    <CapsuleCollider :args="[0.5, 0.35]" :position="[0, 0.85, 0]" />
    <primitive :object="model" />
  </RigidBody>
</template>
