<script setup lang="ts">
import {
  type DynamicRayCastVehicleController,
  Quaternion,
  Vector3,
} from '@dimforge/rapier3d-compat'
import { CuboidCollider, type ExposedRigidBody, RigidBody, useRapier } from '@tresjs/rapier'
import {
  Group,
  MathUtils,
  Mesh,
  MeshStandardMaterial,
  type Object3D,
  Quaternion as ThreeQuaternion,
  Vector3 as ThreeVector3,
  type Vector3Like
} from 'three'
import { nextTick, onUnmounted, shallowRef, watch } from 'vue'

const SIM_DT = 1 / 60
const SUSPENSION_REST_LENGTH = 0.8
const WHEEL_DIRECTION = { x: 0, y: -1, z: 0 }
const WHEEL_AXLE = { x: -1, y: 0, z: 0 }
const WHEEL_OFFSETS = [
  { x: -1, y: 0.4, z: -1.5, mirrorX: true, radius: 0.5 },
  { x: 1, y: 0.4, z: -1.5, mirrorX: false, radius: 0.5 },
  { x: -1, y: 0.45, z: 1.5, mirrorX: true, radius: 0.6 },
  { x: 1, y: 0.45, z: 1.5, mirrorX: false, radius: 0.6 },
] as const

const { world } = useRapier()
const chassisRef = shallowRef<ExposedRigidBody | null>(null)
const vehicleController = shallowRef<DynamicRayCastVehicleController | null>(null)

const movement = reactive({
  forward: 0,
  right: 0,
  brake: 0,
  reset: false,
  accelerateForce: { value: 0, min: -30, max: 30, step: 1 },
  brakeForce: { value: 0, min: 0, max: 1, step: 0.05 },
})


defineExpose({
  movement,
  chassisGroup: () => chassisRef.value?.group ?? null,
})

const { nodes: carModelNodes } = useGLTF('/models/rapier-car/car.glb', { draco: true })
const carModel = computed<Group | null>(() => carModelNodes.value.Scene)

const chassisModel = shallowRef<Group | null>(null)
const wheelModels = shallowRef<Group[]>([])

const wheelMounts: Group[] = []
const wheelVisuals: Object3D[] = []
const wheelSpinAngles = [0, 0, 0, 0]
const chassisQuat = new ThreeQuaternion()
const chassisVelocity = new ThreeVector3()

function correctMaterials(object: Object3D) {
  object.traverse((child) => {
    if (!(child instanceof Mesh)) { return }

    child.castShadow = true
    child.receiveShadow = true

    const materials = Array.isArray(child.material) ? child.material : [child.material]
    for (const material of materials) {
      if (!(material instanceof MeshStandardMaterial)) { continue }

      material.envMapIntensity = material.metalness > 0.5 ? 2.5 : 1.25
    }
  })
}

function getWheelMounts() {
  if (wheelMounts.length > 0) { return wheelMounts }

  return [...wheelModels.value]
    .filter(wheel => wheel.name.startsWith('wheel-'))
    .sort((a, b) => Number(a.name.split('-')[1]) - Number(b.name.split('-')[1]))
}

function addWheel(
  controller: DynamicRayCastVehicleController,
  index: number,
  pos: Vector3Like,
) {
  const offset = WHEEL_OFFSETS[index];

  controller.addWheel(
    pos,
    WHEEL_DIRECTION,
    WHEEL_AXLE,
    SUSPENSION_REST_LENGTH,
    offset ? offset.radius : 0.5,
  )
  controller.setWheelSuspensionStiffness(index, 24)
  controller.setWheelFrictionSlip(index, 1000)
}

async function initVehicle(chassis: ExposedRigidBody['instance']) {
  await nextTick()

  if (!chassis || vehicleController.value) { return }

  chassis.setTranslation(new Vector3(0, 1, 0), true)

  const controller = world.value.createVehicleController(chassis)

  WHEEL_OFFSETS.forEach((pos, index) => addWheel(controller, index, pos))
  vehicleController.value = controller

  controller.updateVehicle(SIM_DT)
  updateWheels()
}

function updateWheels(delta = SIM_DT) {
  const controller = vehicleController.value
  const chassis = chassisRef.value?.instance
  if (!controller) { return }

  let forwardSpeed = 0
  if (chassis) {
    const linvel = chassis.linvel()
    const rotation = chassis.rotation()
    chassisQuat.set(rotation.x, rotation.y, rotation.z, rotation.w)
    chassisVelocity.set(linvel.x, linvel.y, linvel.z)
    chassisVelocity.applyQuaternion(chassisQuat.invert())
    forwardSpeed = chassisVelocity.z
  }

  const mounts = getWheelMounts()

  mounts.forEach((mount, index) => {
    const visual = wheelVisuals[index] ?? mount.children[0]
    const offset = WHEEL_OFFSETS[index]
    if (!visual || !offset) { return }

    const connection = controller.wheelChassisConnectionPointCs(index)?.y ?? 0
    const suspension = controller.wheelSuspensionLength(index) ?? 0
    const steering = controller.wheelSteering(index) ?? 0

    const mountY = connection - suspension - (index > 1 ? 0.1 : 0.05)
    mount.position.set(offset.x, mountY, offset.z)
    mount.rotation.set(0, steering + (offset.mirrorX ? Math.PI : 0), 0)

    const spinAngle = (wheelSpinAngles[index] ?? 0) + (forwardSpeed * delta) / offset.radius
    wheelSpinAngles[index] = spinAngle
    visual.rotation.x = offset.mirrorX ? -spinAngle : spinAngle
  })
}

function updateCarControl() {
  const controller = vehicleController.value
  const chassis = chassisRef.value?.instance
  if (!controller || !chassis) { return }

  if (movement.reset) {
    chassis.setTranslation(new Vector3(0, 1, 0), true)
    chassis.setRotation(new Quaternion(0, 0, 0, 1), true)
    chassis.setLinvel(new Vector3(0, 0, 0), true)
    chassis.setAngvel(new Vector3(0, 0, 0), true)
    movement.accelerateForce.value = 0
    movement.brakeForce.value = 0
    wheelSpinAngles.fill(0)
    wheelVisuals.forEach((visual) => {
      visual.rotation.x = 0
    })
    return
  }

  let accelerateForce = movement.accelerateForce.value

  if (movement.forward < 0) {
    accelerateForce -= movement.accelerateForce.step
    if (accelerateForce < movement.accelerateForce.min) {
      accelerateForce = movement.accelerateForce.min
    }
  }
  else if (movement.forward > 0) {
    accelerateForce += movement.accelerateForce.step
    if (accelerateForce > movement.accelerateForce.max) {
      accelerateForce = movement.accelerateForce.max
    }
  }
  else {
    const { step } = movement.accelerateForce
    if (accelerateForce > 0) {
      accelerateForce = Math.max(0, accelerateForce - step)
    }
    else if (accelerateForce < 0) {
      accelerateForce = Math.min(0, accelerateForce + step)
    }
    if (chassis.isSleeping()) {
      chassis.wakeUp()
    }
  }

  movement.accelerateForce.value = accelerateForce

  let brakeForce = movement.brakeForce.value
  if (movement.brake > 0) {
    brakeForce += movement.brakeForce.step
    if (brakeForce > movement.brakeForce.max) {
      brakeForce = movement.brakeForce.max
    }
  }
  else if (brakeForce > 0) {
    brakeForce = Math.max(0, brakeForce - movement.brakeForce.step)
  }
  movement.brakeForce.value = brakeForce

  const engineForce = accelerateForce
  controller.setWheelEngineForce(0, engineForce)
  controller.setWheelEngineForce(1, engineForce)

  const currentSteering = controller.wheelSteering(0) ?? 0
  const steerAngle = Math.PI / 4
  const steering = MathUtils.lerp(currentSteering, steerAngle * movement.right, 0.25)

  controller.setWheelSteering(0, steering)
  controller.setWheelSteering(1, steering)

  const wheelBrake = movement.brake * brakeForce
  for (let i = 0; i < 4; i++) {
    controller.setWheelBrake(i, wheelBrake)
  }
}

watch([() => carModel.value, () => chassisRef.value?.instance], ([car, chassis]) => {
  if (!car || !chassis) { return }

  const chassisGroup = car.getObjectByName('chassis') as Group | null
  const wheelGroup = car.getObjectByName('wheel-front-right') as Group | null

  if (!chassisModel.value && chassisGroup) {
    chassisGroup.position.set(0, 0.4, 0)
    correctMaterials(chassisGroup)
    chassisModel.value = chassisGroup
  }

  if (!wheelModels.value.length && wheelGroup) {
    correctMaterials(wheelGroup)
    WHEEL_OFFSETS.forEach((offset, index) => {
      const mount = new Group()
      const visual = wheelGroup.clone()
      const scale = 0.5 + offset.radius

      mount.name = `wheel-${index}`
      mount.position.set(offset.x, offset.y, offset.z)
      visual.position.set(0, 0, 0)
      visual.rotation.set(0, 0, 0)
      visual.quaternion.identity()
      visual.scale.setScalar(scale)
      mount.add(visual)

      wheelMounts[index] = mount
      wheelVisuals[index] = visual
      wheelModels.value?.push(mount)
    })
  }

  if (
    chassisModel.value &&
    wheelModels.value.length &&
    chassisRef.value?.instance
  ) {
    initVehicle(chassisRef.value.instance)
  }

}, { immediate: true, })

const { onBeforeRender } = useLoop()

onBeforeRender(() => {
  if (!vehicleController.value) { return }
  updateCarControl()
  vehicleController.value.updateVehicle(SIM_DT)
}, -1)

onBeforeRender(({ delta }) => {
  updateWheels(delta)
}, 1)

onUnmounted(() => {
  vehicleController.value?.free()
  vehicleController.value = null
})
</script>

<template>
  <RigidBody
    ref="chassisRef"
    :collider="false"
  >
    <CuboidCollider
      :args="[1, 0.7, 2.4]"
      :mass="10"
      :friction="0.5"
      :restitution="0.4"
      :position="[0, 0.35, 0]"
    />

    <primitive v-if="chassisModel" :object="chassisModel" />
    <primitive  v-for="(wheel) in wheelModels" :key="wheel.name" :object="wheel" />

  </RigidBody>
</template>
