<script setup>
import { useLoop, useTres } from '@tresjs/core'
import { OrbitControls, useGLTF, useAnimations } from '@tresjs/cientos'
import { RigidBody, CapsuleCollider } from '@tresjs/rapier'
import { useMagicKeys, watchOnce } from '@vueuse/core'
import { Quaternion, Vector3 } from 'three'
import { HEIGHT_SCALE } from './constants'

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
const orbitControlsRef = shallowRef()
const bodyRef = shallowRef()
const currentAction = ref()

const changeAnimation = (action) => {
  if (!action || !currentAction.value || currentAction.value === action) return
  currentAction.value.fadeOut(fadeDuration)
  action.reset().fadeIn(fadeDuration).play()
  currentAction.value = action
}

// KEYS
const { w, s, a, d } = useMagicKeys()
const hasPressed = computed(() => w.value || s.value || a.value || d.value)
watch(hasPressed, (pressed) => {
  changeAnimation(pressed ? actions.SwordAndShieldRun : actions.Idle)
})

const moveBody = (body, position) => {
  const angleYCameraDirection = Math.atan2(
    camera.value.position.x - position.x,
    camera.value.position.z - position.z,
  )
  const directionOffset = getOffset()
  const directionOffsetModel = getInvertOffset() // correct rotation model coordinates

  // rotate model
  rotateQuarternion.setFromAxisAngle(rotateAngle, angleYCameraDirection + directionOffsetModel)
  model.value.quaternion.rotateTowards(rotateQuarternion, 0.2)

  // calculate direction
  camera.value.getWorldDirection(walkDirection)
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
const updateCameraTarget = (position) => {
  // move camera by the actual physics displacement
  camera.value.position.x += position.x - prevPosition.x
  camera.value.position.z += position.z - prevPosition.z

  // update camera target
  cameraTarget.set(position.x, position.y + 1, position.z)
  orbitControlsRef.value.instance.target = cameraTarget
}
const { onBeforeRender } = useLoop()

onBeforeRender(() => {
  if (isLoading.value) return

  const body = bodyRef.value?.instance
  if (!body || !camera.value || !orbitControlsRef.value) return

  const position = body.translation()
  if (!hasPrevPosition) {
    prevPosition.set(position.x, position.y, position.z)
    hasPrevPosition = true
  }

  if (hasPressed.value) {
    moveBody(body, position)
  } else {
    body.setLinvel({ x: 0, y: body.linvel().y, z: 0 }, true)
  }

  updateCameraTarget(position)
  prevPosition.set(position.x, position.y, position.z)
  orbitControlsRef.value.instance.update()
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
