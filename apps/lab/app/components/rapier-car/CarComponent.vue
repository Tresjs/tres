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
  type Vector3Like,
} from 'three'
import { nextTick, onUnmounted, shallowRef, watch } from 'vue'
import ExhaustVFX from './ExhaustVFX.vue'
import { AIR_TUNING_DEFAULTS, createFlight } from './flight'

const SIM_DT = 1 / 60
const FALL_RESET_Y = -8
const CAR_SPAWN = { x: 0, y: 1, z: 0 }
const SUSPENSION_REST_LENGTH = 0.65
const WHEEL_DIRECTION = { x: 0, y: -1, z: 0 }
const WHEEL_AXLE = { x: -1, y: 0, z: 0 }
const WHEEL_OFFSETS = [
  { x: -1, y: 0.4, z: -1.5, mirrorX: true, radius: 0.5 },
  { x: 1, y: 0.4, z: -1.5, mirrorX: false, radius: 0.5 },
  { x: -1, y: 0.45, z: 1.5, mirrorX: true, radius: 0.6 },
  { x: 1, y: 0.45, z: 1.5, mirrorX: false, radius: 0.6 },
] as const
const FRICTION_SLIP = 1
const SIDE_FRICTION_STIFFNESS = 3
// Powerslide: side grip drops so the rear kicks out while steering
const SLIDE_SIDE_FRICTION_STIFFNESS = 0.8
const SUSPENSION_STIFFNESS = 28
const SUSPENSION_COMPRESSION = 10
const SUSPENSION_RELAXATION = 2.7
const MAX_SUSPENSION_FORCE = 150
const STEERING_AMPLITUDE = 0.58
const STEER_SPEED_FALLOFF = 55
const STEER_MIN_SCALE = 0.5
const STEER_RESPONSE = 0.55
// Original arcade tune. It assumes the sim runs ~2x real time (Physics :time-scale="2"),
// which also scales effective gravity/acceleration back to the snappy feel the car
// was tuned with on a high-refresh display.
const ENGINE_FORCE_AMPLITUDE = 22
const TOP_SPEED = 16
const TOP_SPEED_BOOST = 30
const BRAKE_AMPLITUDE = 12
const IDLE_BRAKE = 0.5
const REVERSE_BRAKE = 3.5
const FLIP_HOP = 2.4
const RIGHTING_DURATION = 0.5
const UPSIDE_DOWN_THRESHOLD = 0.28
const TIPPED_THRESHOLD = 0.18
const AUTO_RIGHT_DELAY_MS = 3000
const AIR_ANGULAR_DAMPING = 1.4
const GROUND_ANGULAR_DAMPING = 0.4
const LIGHT_GLOW_LERP = 0.18
// Exhaust glow at top (non-boost) speed, as a fraction of the full boost glow
const EXHAUST_SPEED_GLOW = 0.6

type LightKey = 'front' | 'back' | 'boost' | 'trails'

const LIGHT_CONFIG: Record<LightKey, {
  name: string
  color: string
  on: number
  off: number
}> = {
  front: { name: 'front-lights', color: '#ffe9a8', on: 3.2, off: 0 },
  back: { name: 'back-lights', color: '#ff1a1a', on: 4, off: 0 },
  boost: { name: 'boost-lights', color: '#ff2a14', on: 5, off: 0 },
  trails: { name: 'boost-trails', color: '#ff3b1f', on: 3.5, off: 0 },
}

const { world, onBeforeStep } = useRapier()
const chassisRef = shallowRef<ExposedRigidBody | null>(null)
const vehicleController = shallowRef<DynamicRayCastVehicleController | null>(null)

const movement = reactive({
  forward: 0,
  right: 0,
  roll: 0,
  boost: 0,
  brake: 0,
  jump: false,
  jumpHeld: false,
  slide: false,
  reset: false,
})

// Reactive mirror of flightCtx.grounded so input mapping can react to it
const isGrounded = shallowRef(true)

const { steerAmplitude, steerResponse, steerFalloff, pitchAccel, yawAccel, rollAccel } = useControls({
  steerAmplitude: { value: STEERING_AMPLITUDE, min: 0.2, max: 1.2, step: 0.02, label: 'Steer amplitude' },
  steerResponse: { value: STEER_RESPONSE, min: 0.1, max: 1, step: 0.05, label: 'Steer response' },
  steerFalloff: { value: STEER_SPEED_FALLOFF, min: 10, max: 150, step: 5, label: 'Steer speed falloff' },
  pitchAccel: { value: AIR_TUNING_DEFAULTS.pitchAccel, min: 1, max: 12, step: 0.5, label: 'Air pitch accel' },
  yawAccel: { value: AIR_TUNING_DEFAULTS.yawAccel, min: 1, max: 12, step: 0.5, label: 'Air yaw accel' },
  rollAccel: { value: AIR_TUNING_DEFAULTS.rollAccel, min: 2, max: 20, step: 0.5, label: 'Air roll accel' },
}, { uuid: 'rapier-car' })

defineExpose({
  movement,
  boosting: () => movement.boost > 0,
  grounded: isGrounded,
  chassisGroup: () => chassisRef.value?.group ?? null,
})

const { nodes: carModelNodes } = useGLTF(
  '/models/rapier-car/car.glb?v=tex-small-1',
  { draco: true }
)
const carModel = computed<Group | null>(() => carModelNodes.value.Scene)

const chassisModel = shallowRef<Group | null>(null)
const wheelModels = shallowRef<Group[]>([])

const wheelMounts: Group[] = []
const wheelVisuals: Object3D[] = []
const wheelSpinAngles = [0, 0, 0, 0]
const chassisQuat = new ThreeQuaternion()
const chassisVelocity = new ThreeVector3()
const localVelocity = new ThreeVector3()
const sideward = new ThreeVector3()
const upward = new ThreeVector3()
const forward = new ThreeVector3()
const worldUp = new ThreeVector3(0, 1, 0)
const impulse = new ThreeVector3()
const flatForward = new ThreeVector3()
const targetUprightQuat = new ThreeQuaternion()
const rightingQuat = new ThreeQuaternion()

const upsideDown = reactive({
  active: false,
  ratio: 0,
})

const righting = {
  active: false,
  elapsed: 0,
}

let wheelsInContact = 0
let autoRightTimer: ReturnType<typeof setTimeout> | null = null
let forwardSpeed = 0
let xzSpeed = 0
let lightsReady = false

const flight = createFlight()
// forward/sideward/upward are the world-space body axes above, refreshed each substep
const flightCtx = {
  chassis: null as ExposedRigidBody['instance'] | null,
  grounded: false,
  forward,
  sideward,
  upward,
  movement,
  tuning: {
    get pitchAccel() { return pitchAccel.value },
    get yawAccel() { return yawAccel.value },
    get rollAccel() { return rollAccel.value },
  },
}

const lightMaterials: Partial<Record<LightKey, MeshStandardMaterial>> = {}
const lightMeshes: Partial<Record<LightKey, Object3D>> = {}
// Exhaust VFX inputs: mesh ref for template binding, state read per-frame (not reactive)
const exhaustMesh = shallowRef<Object3D | null>(null)
const exhaustState = { level: 0, boost: 0 }
const lightGlow: Record<LightKey, number> = {
  front: 0,
  back: 0,
  boost: 0,
  trails: 0,
}

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

function setupCarLights(root: Object3D) {
  const lightParts = Object.keys(LIGHT_CONFIG) as LightKey[]
  lightParts.forEach((key) => {
    const cfg = LIGHT_CONFIG[key]
    const part = root.getObjectByName(cfg.name)
    if (!part) { return }

    lightMeshes[key] = part

    part.traverse((child) => {
      if (!(child instanceof Mesh)) { return }

      child.castShadow = false
      child.receiveShadow = false

      // Fresh material so export colors / clearcoat never leak through
      const mat = new MeshStandardMaterial({
        color: cfg.color,
        emissive: cfg.color,
        emissiveIntensity: 0,
        metalness: 0,
        roughness: 0.35,
        toneMapped: false,
      })

      if (key === 'trails') {
        mat.transparent = true
        mat.opacity = 0
        mat.depthWrite = false
        child.visible = false
      }

      child.material = mat
      lightMaterials[key] = mat
    })
  })

  lightsReady = Boolean(lightMaterials.front || lightMaterials.back || lightMaterials.boost)
  exhaustMesh.value = lightMeshes.boost ?? null
}

function updateCarLights() {
  if (!lightsReady) { return }

  const driving = movement.forward < 0
  const reversing = movement.forward > 0
  const boosting = movement.boost > 0
  const braking = movement.brake > 0

  // Exhaust heats up with speed, full blast while boosting
  const speedRatio = MathUtils.clamp(Math.abs(forwardSpeed) / TOP_SPEED, 0, 1)
  const exhaustLevel = Math.max(movement.boost, speedRatio * EXHAUST_SPEED_GLOW)
  // Smoothed glow drives the particle spawn rate so VFX ramp with the lights
  exhaustState.level = MathUtils.clamp(lightGlow.boost / LIGHT_CONFIG.boost.on, 0, 1)
  exhaustState.boost = movement.boost

  const targets: Record<LightKey, number> = {
    front: driving || boosting ? LIGHT_CONFIG.front.on : LIGHT_CONFIG.front.off,
    back: reversing || braking ? LIGHT_CONFIG.back.on : LIGHT_CONFIG.back.off,
    boost: LIGHT_CONFIG.boost.on * exhaustLevel,
    trails: boosting ? LIGHT_CONFIG.trails.on : LIGHT_CONFIG.trails.off,
  }
  const lightParts = Object.keys(targets) as LightKey[]

  lightParts.forEach((key) => {
    lightGlow[key] = MathUtils.lerp(lightGlow[key], targets[key], LIGHT_GLOW_LERP)
    const mat = lightMaterials[key]
    if (!mat) { return }

    mat.emissiveIntensity = lightGlow[key]

    if (key === 'trails') {
      const strength = lightGlow.trails / LIGHT_CONFIG.trails.on
      mat.opacity = MathUtils.clamp(strength * 0.85, 0, 0.85)
      const trails = lightMeshes.trails
      if (trails) {
        trails.visible = lightGlow.trails > 0.05
      }
    }
  })
}

function getWheelMounts() {
  if (wheelMounts.length > 0) { return wheelMounts }

  return [...wheelModels.value]
    .filter(wheel => wheel.name.startsWith('wheel-'))
    .sort((a, b) => Number(a.name.split('-')[1]) - Number(b.name.split('-')[1]))
}

function clearAutoRightTimer() {
  if (autoRightTimer) {
    clearTimeout(autoRightTimer)
    autoRightTimer = null
  }
}

function scheduleAutoRight() {
  clearAutoRightTimer()
  autoRightTimer = setTimeout(() => {
    autoRightTimer = null
    if (upsideDown.active) {
      // Only auto-right a car that's actually stuck, not one mid-aerial
      if (isResting()) {
        startRighting()
      }
      scheduleAutoRight()
    }
  }, AUTO_RIGHT_DELAY_MS)
}

function addWheel(
  controller: DynamicRayCastVehicleController,
  index: number,
  pos: Vector3Like,
) {
  const offset = WHEEL_OFFSETS[index]

  controller.addWheel(
    pos,
    WHEEL_DIRECTION,
    WHEEL_AXLE,
    SUSPENSION_REST_LENGTH,
    offset ? offset.radius : 0.5,
  )
  controller.setWheelSuspensionStiffness(index, SUSPENSION_STIFFNESS)
  controller.setWheelSuspensionCompression(index, SUSPENSION_COMPRESSION)
  controller.setWheelSuspensionRelaxation(index, SUSPENSION_RELAXATION)
  controller.setWheelMaxSuspensionForce(index, MAX_SUSPENSION_FORCE)
  controller.setWheelFrictionSlip(index, FRICTION_SLIP)
  controller.setWheelSideFrictionStiffness(index, SIDE_FRICTION_STIFFNESS)
}

async function initVehicle(chassis: ExposedRigidBody['instance']) {
  await nextTick()

  if (!chassis || vehicleController.value) { return }

  chassis.setTranslation(new Vector3(CAR_SPAWN.x, CAR_SPAWN.y, CAR_SPAWN.z), true)
  chassis.setLinearDamping(0.15)
  chassis.setAngularDamping(GROUND_ANGULAR_DAMPING)

  const controller = world.value.createVehicleController(chassis)

  WHEEL_OFFSETS.forEach((pos, index) => addWheel(controller, index, pos))
  vehicleController.value = controller

  controller.updateVehicle(SIM_DT)
  updateWheels()
}

function updateChassisMeasures() {
  const chassis = chassisRef.value?.instance
  if (!chassis) { return }

  const linvel = chassis.linvel()
  const rotation = chassis.rotation()
  chassisQuat.set(rotation.x, rotation.y, rotation.z, rotation.w)

  chassisVelocity.set(linvel.x, linvel.y, linvel.z)
  localVelocity.copy(chassisVelocity).applyQuaternion(chassisQuat.clone().invert())
  // Car forward is -Z in model space
  forwardSpeed = -localVelocity.z
  xzSpeed = Math.hypot(linvel.x, linvel.z)

  sideward.set(1, 0, 0).applyQuaternion(chassisQuat)
  upward.set(0, 1, 0).applyQuaternion(chassisQuat)
  forward.set(0, 0, -1).applyQuaternion(chassisQuat)

  upsideDown.ratio = upward.dot(new ThreeVector3(0, -1, 0)) * 0.5 + 0.5
  const wasUpsideDown = upsideDown.active
  upsideDown.active = upsideDown.ratio > UPSIDE_DOWN_THRESHOLD

  if (upsideDown.active && !wasUpsideDown) {
    scheduleAutoRight()
  }
  else if (!upsideDown.active && wasUpsideDown) {
    clearAutoRightTimer()
  }

  const controller = vehicleController.value
  wheelsInContact = 0
  if (controller) {
    for (let i = 0; i < 4; i++) {
      if (controller.wheelIsInContact(i)) {
        wheelsInContact++
      }
    }
  }

  const grounded = wheelsInContact > 0
  flightCtx.chassis = chassis
  flightCtx.grounded = grounded
  isGrounded.value = grounded
  chassis.setAngularDamping(grounded ? GROUND_ANGULAR_DAMPING : AIR_ANGULAR_DAMPING)
}

/** Soft hop + smooth slerp to upright (keeps current yaw). */
function startRighting() {
  const chassis = chassisRef.value?.instance
  if (!chassis || righting.active) { return }

  const mass = chassis.mass()
  chassis.wakeUp()
  chassis.setAngvel(new Vector3(0, 0, 0), true)

  // Small hop — not a launch
  impulse.set(0, FLIP_HOP * mass, 0)
  chassis.applyImpulse(impulse, true)

  flatForward.copy(forward)
  flatForward.y = 0
  if (flatForward.lengthSq() < 1e-4) {
    flatForward.set(0, 0, -1)
  }
  else {
    flatForward.normalize()
  }

  const yaw = Math.atan2(flatForward.x, flatForward.z)
  targetUprightQuat.setFromAxisAngle(worldUp, yaw)

  righting.active = true
  righting.elapsed = 0
  clearAutoRightTimer()
}

function updateRighting(delta = SIM_DT) {
  if (!righting.active) { return }

  const chassis = chassisRef.value?.instance
  if (!chassis) {
    righting.active = false
    return
  }

  righting.elapsed += delta
  const t = Math.min(1, righting.elapsed / RIGHTING_DURATION)
  const smooth = t * t * (3 - 2 * t)

  const rotation = chassis.rotation()
  rightingQuat.set(rotation.x, rotation.y, rotation.z, rotation.w)
  rightingQuat.slerp(targetUprightQuat, 0.14 + smooth * 0.22)
  chassis.setRotation(
    new Quaternion(rightingQuat.x, rightingQuat.y, rightingQuat.z, rightingQuat.w),
    true,
  )

  // Soften upward drift so the hop doesn't keep climbing
  const linvel = chassis.linvel()
  if (linvel.y > 1.5) {
    chassis.setLinvel(new Vector3(linvel.x, linvel.y * 0.9, linvel.z), true)
  }

  const upDot = upward.set(0, 1, 0).applyQuaternion(rightingQuat).dot(worldUp)
  if (t >= 1 || upDot > 0.92) {
    righting.active = false
    chassis.setAngvel(new Vector3(0, 0, 0), true)
    if (upsideDown.active) {
      scheduleAutoRight()
    }
  }
}

function isResting() {
  return xzSpeed < 2 && Math.abs(chassisVelocity.y) < 1.5
}

function handleJumpRequest() {
  if (!movement.jump) { return }
  movement.jump = false

  if (righting.active) { return }

  // Right the car only when it's sitting tipped; mid-air you dodge/air-roll instead
  const tipped = upsideDown.active || upsideDown.ratio > TIPPED_THRESHOLD
  if (tipped && isResting()) {
    startRighting()
    return
  }

  flight.onJumpPressed(flightCtx)
}

function updateWheels(delta = SIM_DT) {
  const controller = vehicleController.value
  if (!controller) { return }

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

function resetCar() {
  const chassis = chassisRef.value?.instance
  if (!chassis) { return }

  chassis.setTranslation(new Vector3(CAR_SPAWN.x, CAR_SPAWN.y, CAR_SPAWN.z), true)
  chassis.setRotation(new Quaternion(0, 0, 0, 1), true)
  chassis.setLinvel(new Vector3(0, 0, 0), true)
  chassis.setAngvel(new Vector3(0, 0, 0), true)
  wheelSpinAngles.fill(0)
  wheelVisuals.forEach((visual) => {
    visual.rotation.x = 0
  })
  upsideDown.active = false
  upsideDown.ratio = 0
  righting.active = false
  righting.elapsed = 0
  flight.reset()
  clearAutoRightTimer()
}

function updateCarControl(dt = SIM_DT) {
  const controller = vehicleController.value
  const chassis = chassisRef.value?.instance
  if (!controller || !chassis) { return }

  updateChassisMeasures()
  handleJumpRequest()
  updateRighting(dt)
  // Righting owns the rotation while active; flight torques would fight it
  if (!righting.active) {
    flight.update(flightCtx, dt)
  }
  updateCarLights()

  if (movement.reset || chassis.translation().y < FALL_RESET_Y) {
    resetCar()
    return
  }

  // W => forward=-1 => throttle=+1 (car-forward / -Z).
  // Boost acts as throttle on its own (RL), holding reverse cancels it out
  const boosting = movement.boost
  const throttle = MathUtils.clamp(-movement.forward + boosting, -1, 1)
  const goingForward = forwardSpeed > 0.5
  const topSpeed = MathUtils.lerp(TOP_SPEED, TOP_SPEED_BOOST, boosting)
  const overflowSpeed = Math.max(0, xzSpeed - topSpeed)

  // Boost thrust itself is a body force through the CoM (flight.ts) — wheel
  // engine force stays at normal levels so the fronts keep grip for steering
  // and the rear-applied force can't wheelie the nose up
  let engineForce = (throttle * ENGINE_FORCE_AMPLITUDE) / (1 + overflowSpeed * 0.15)

  let brake = movement.brake

  if (!movement.brake && Math.abs(throttle) < 0.1) {
    brake = IDLE_BRAKE
  }

  // Opposing throttle while moving → reverse-as-brake (Bruno)
  if (
    xzSpeed > 0.5
    && (
      (throttle > 0 && !goingForward)
      || (throttle < 0 && goingForward)
    )
  ) {
    brake = REVERSE_BRAKE
    engineForce = 0
  }

  brake *= BRAKE_AMPLITUDE

  // Speed-scaled steering — keep a floor so boost / high speed still turns
  const steerScale = Math.max(
    STEER_MIN_SCALE,
    1 / (1 + Math.abs(forwardSpeed) / steerFalloff.value),
  )
  const targetSteer = movement.right * steerAmplitude.value * steerScale
  const currentSteering = controller.wheelSteering(0) ?? 0
  // Frame-rate-independent smoothing: steerResponse is the per-frame factor
  // tuned at 1/60, re-based to real dt so steering feel is consistent at any fps
  const steerT = 1 - (1 - steerResponse.value) ** (dt / SIM_DT)
  const steering = MathUtils.lerp(currentSteering, targetSteer, steerT)

  controller.setWheelSteering(0, steering)
  controller.setWheelSteering(1, steering)

  const sideFriction = movement.slide
    ? SLIDE_SIDE_FRICTION_STIFFNESS
    : SIDE_FRICTION_STIFFNESS

  for (let i = 0; i < 4; i++) {
    // Engine force sign: positive force pushes +Z (reverse); negative pushes -Z (forward)
    controller.setWheelEngineForce(i, -engineForce)
    controller.setWheelBrake(i, brake)
    controller.setWheelSideFrictionStiffness(i, sideFriction)
  }

  if (chassis.isSleeping() && (Math.abs(throttle) > 0.1 || movement.brake || boosting)) {
    chassis.wakeUp()
  }
}

watch([() => carModel.value, () => chassisRef.value?.instance], ([car, chassis]) => {
  if (!car || !chassis) { return }

  const chassisGroup = car.getObjectByName('chassis') as Group | null
  const wheelGroup = car.getObjectByName('wheel-front-right') as Group | null

  if (!chassisModel.value && chassisGroup) {
    const lightParts = Object.keys(LIGHT_CONFIG) as LightKey[]

    chassisGroup.position.set(0, 0.4, 0)

    // Keep light parts glued to the chassis visual even if exported as siblings
    lightParts.forEach((key) => {
      const part = car.getObjectByName(LIGHT_CONFIG[key].name)
      if (part && part.parent !== chassisGroup) {
        chassisGroup.attach(part)
      }
    })

    correctMaterials(chassisGroup)
    setupCarLights(chassisGroup)
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
    chassisModel.value
    && wheelModels.value.length
    && chassisRef.value?.instance
  ) {
    initVehicle(chassisRef.value.instance)
  }
}, { immediate: true })

const { onBeforeRender } = useLoop()

// Sim time covered this frame across substeps; wheel visuals spin by the total
let frameSimTime = 0

// Runs before every solver substep so suspension/steering forces are applied
// at the same rate the world is solved (one big per-frame update jitters)
onBeforeStep((dt) => {
  if (!vehicleController.value) { return }
  updateCarControl(dt)
  vehicleController.value.updateVehicle(dt)
  frameSimTime += dt
})

onBeforeRender(() => {
  updateWheels(frameSimTime)
  frameSimTime = 0
}, 1)

onUnmounted(() => {
  clearAutoRightTimer()
  vehicleController.value?.free()
  vehicleController.value = null
})
</script>

<template>
  <RigidBody
    ref="chassisRef"
    :collider="false"
    :linear-damping="0.15"
    :angular-damping="0.4"
  >
    <!-- Lowered collider keeps mass closer to the ground (arcade stability) -->
    <CuboidCollider
      :args="[1, 0.55, 2.4]"
      :mass="10"
      :friction="0.5"
      :restitution="0.2"
      :position="[0, 0.15, 0]"
    />

    <primitive v-if="chassisModel" :object="chassisModel" />
    <primitive v-for="(wheel) in wheelModels" :key="wheel.name" :object="wheel" />
  </RigidBody>

  <!-- World-space flames/smoke trailing from the exhaust tips -->
  <ExhaustVFX :source="exhaustMesh" :state="exhaustState" />
</template>
