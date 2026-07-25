<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { BloomPmndrs, EffectComposerPmndrs } from '@tresjs/post-processing'
import { Physics } from '@tresjs/rapier'
import { useEventListener, useMagicKeys, whenever } from '@vueuse/core'
import { ACESFilmicToneMapping, MathUtils, type PerspectiveCamera, SRGBColorSpace, Vector3 } from 'three'
import { computed, onUnmounted, ref, shallowRef, watch, watchEffect } from 'vue'
import CarComponent from './CarComponent.vue'
import { useCarGamepad } from './gamepad'
import SceneLighting from './SceneLighting.vue'
import SceneWorld from './SceneWorld.vue'
import { createTrampleMap } from './trample'

const uuid = 'rapier-car'
useControls('fpsgraph', { uuid })

const { bloomEnabled, bloomIntensity, bloomThreshold, bloomSmoothing } = useControls({
  bloomEnabled: { value: true, type: 'boolean', label: 'Bloom' },
  bloomIntensity: { value: 0.6, min: 0, max: 3, step: 0.05, label: 'Intensity' },
  bloomThreshold: { value: 1, min: 0, max: 2, step: 0.05, label: 'Threshold' },
  bloomSmoothing: { value: 0.4, min: 0, max: 1, step: 0.05, label: 'Smoothing' },
}, { uuid })

const { padSteerSens, padSteerExpo, padDeadzone } = useControls({
  padSteerSens: { value: 1.25, min: 0.5, max: 2.5, step: 0.05, label: 'Pad steer sens' },
  padSteerExpo: { value: 0.3, min: 0, max: 1, step: 0.05, label: 'Pad steer expo' },
  padDeadzone: { value: 0.15, min: 0, max: 0.4, step: 0.01, label: 'Pad deadzone' },
}, { uuid })

const gl = {
  clearColor: '#06091a',
  shadows: true,
  alpha: false,
  outputColorSpace: SRGBColorSpace,
  toneMapping: ACESFilmicToneMapping,
  toneMappingExposure: 1.35,
}

// World-aligned trail the car stamps into; grass bends where it's marked (client-only: uses a 2D canvas)
const trample = import.meta.client
  ? createTrampleMap({ size: 100, resolution: 256, recovery: 0.35, stampRadius: 2 })
  : null

// Sim runs 2x real time: the car tune (incl. effective gravity) expects it
const SIM_SPEED = 2

const CAMERA_DISTANCE = 12
const CAMERA_HEIGHT = 5
const LOOK_AT_HEIGHT = 1.2
const CAMERA_LERP = 0.08
const CAMERA_BOOST_BLEND = 0.06
const CAMERA_FOV_BASE = 55
const CAMERA_FOV_BOOST = 68
const LOOK_AHEAD = 4
const CAMERA_MIN_HEIGHT = 3

const CAMERA_YAW_LERP = 0.06
const BALL_CAM_LERP = 0.1
// Position jump bigger than this in one frame = respawn → snap the camera behind the car
const TELEPORT_DISTANCE = 8
// Parked showing the car's front → pan back around after this long
const RESYNC_DELAY = 2.5
const RESYNC_YAW_SPEED = 2.5
const STOPPED_SPEED = 1.5

const cameraRef = shallowRef<PerspectiveCamera | null>(null)
const desiredPosition = new Vector3()
const lookAtTarget = new Vector3()
const smoothedLookAt = new Vector3()
const lookAheadOffset = new Vector3()
const flatForward = new Vector3()
const toBall = new Vector3()
// Smoothed, sign-stable follow heading so flips don't whip the camera around
const followForward = new Vector3(0, 0, -1)
const prevCarPosition = new Vector3()
// RL defaults: ball cam on, Space toggles, MMB holds the rear view
const ballCam = ref(true)
const rearView = ref(false)
let prevViewKey = ''
let prevCarPositionInit = false
let resyncTimer = 0
let resyncing = false
let boostBlend = 0
let lookAtInitialized = false

const physDebug = shallowRef('measuring…')
let dbgFrames = 0
let dbgAccum = 0
let dbgClamped = 0

function followCarCamera({ delta }: { delta: number }) {
  const chassisGroup = carRef.value?.chassisGroup?.()
  const camera = cameraRef.value

  // TEMP diagnostic: real loop delta vs the (clamped) timestep actually stepped
  dbgAccum += delta
  dbgFrames++
  if (delta > 1 / 30) { dbgClamped++ }
  if (dbgFrames >= 15) {
    const avg = dbgAccum / dbgFrames
    const simTime = Math.min(avg, 1 / 30) * SIM_SPEED
    const substeps = Math.max(1, Math.ceil(simTime / (1 / 60)))
    physDebug.value = `fps ${(1 / avg).toFixed(0)} · real Δ ${(avg * 1000).toFixed(1)}ms · sim ${(simTime * 1000).toFixed(1)}ms in ${substeps} step(s) · clamped ${dbgClamped}/${dbgFrames}`
    dbgFrames = 0
    dbgAccum = 0
    dbgClamped = 0
  }

  // Stamp the car's trail, then fade the whole map back toward untrampled
  trample?.update(delta)
  if (chassisGroup) {
    trample?.stamp(chassisGroup.position.x, chassisGroup.position.z)
  }

  if (!chassisGroup || !camera) { return }

  const boosting = carRef.value?.boosting?.() ?? false
  boostBlend = MathUtils.lerp(boostBlend, boosting ? 1 : 0, CAMERA_BOOST_BLEND)

  // Yaw-only follow: project car forward onto XZ so flips don't put the camera underground
  flatForward.set(0, 0, -1).applyQuaternion(chassisGroup.quaternion)
  flatForward.y = 0
  const hasHeading = flatForward.lengthSq() > 1e-4
  if (hasHeading) {
    flatForward.normalize()
  }

  // A big position jump means the car respawned → snap straight behind it
  const movedDistance = prevCarPositionInit
    ? prevCarPosition.distanceTo(chassisGroup.position)
    : 0
  const teleported = movedDistance > TELEPORT_DISTANCE
  const carSpeed = teleported ? 0 : movedDistance / Math.max(delta, 1e-4)
  prevCarPosition.copy(chassisGroup.position)
  prevCarPositionInit = true

  const ballPos = ballCam.value ? sceneWorldRef.value?.ballPosition?.() : null
  const useBallCam = Boolean(ballPos)

  // Toggling ball cam / rear view cuts instantly, like RL
  const viewKey = `${useBallCam}:${rearView.value}`
  const snap = teleported || viewKey !== prevViewKey
  prevViewKey = viewKey

  if (useBallCam && ballPos) {
    resyncing = false
    resyncTimer = 0
    // Orbit the car so the ball stays centered
    toBall.set(
      ballPos.x - chassisGroup.position.x,
      0,
      ballPos.z - chassisGroup.position.z,
    )
    if (toBall.lengthSq() > 1e-4) {
      toBall.normalize()
      if (snap) {
        followForward.copy(toBall)
      }
      else {
        // Nearly-opposite headings stall a lerp; nudge sideways to pick a side
        if (toBall.dot(followForward) < -0.99) {
          followForward.x += 0.05
        }
        followForward.lerp(toBall, BALL_CAM_LERP).normalize()
      }
    }
  }
  else if (snap) {
    resyncing = false
    resyncTimer = 0
    if (hasHeading) {
      followForward.copy(flatForward)
    }
  }
  else if (hasHeading) {
    if (resyncing) {
      // Pan around to the car's true heading at a fixed yaw speed
      const currentYaw = Math.atan2(followForward.x, followForward.z)
      const targetYaw = Math.atan2(flatForward.x, flatForward.z)
      let deltaYaw = targetYaw - currentYaw
      deltaYaw = (((deltaYaw + Math.PI) % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2) - Math.PI
      const step = RESYNC_YAW_SPEED * delta
      const done = Math.abs(deltaYaw) <= step
      const yaw = done ? targetYaw : currentYaw + Math.sign(deltaYaw) * step
      followForward.set(Math.sin(yaw), 0, Math.cos(yaw))
      if (done) {
        resyncing = false
        resyncTimer = 0
      }
    }
    else {
      const facingAway = flatForward.dot(followForward) < 0

      // Parked while the camera shows the front → pan back after a moment
      if (facingAway && carSpeed < STOPPED_SPEED) {
        resyncTimer += delta
        if (resyncTimer > RESYNC_DELAY) {
          resyncing = true
        }
      }
      else {
        resyncTimer = 0
      }

      // Mid-flip the nose points backwards for a moment; treat that as the same
      // heading so a back/front flip doesn't spin the camera 180° and back
      if (facingAway) {
        flatForward.negate()
      }
      followForward.lerp(flatForward, CAMERA_YAW_LERP).normalize()
    }
  }

  // Behind the car on the ground plane, always world-up for height.
  // Rear view mirrors the offset to the front, still looking back at the car/ball
  const behindSign = rearView.value ? 1 : -1
  desiredPosition.copy(chassisGroup.position)
  desiredPosition.addScaledVector(followForward, behindSign * CAMERA_DISTANCE)
  desiredPosition.y = chassisGroup.position.y + CAMERA_HEIGHT
  desiredPosition.y = Math.max(desiredPosition.y, CAMERA_MIN_HEIGHT)

  if (snap) {
    camera.position.copy(desiredPosition)
  }
  else {
    camera.position.lerp(desiredPosition, CAMERA_LERP)
  }
  // Hard floor so a flipped chassis never drags the smoothed cam under the ground
  camera.position.y = Math.max(camera.position.y, CAMERA_MIN_HEIGHT)

  if (useBallCam && ballPos) {
    lookAtTarget.set(ballPos.x, ballPos.y, ballPos.z)
  }
  else {
    lookAheadOffset.copy(followForward).multiplyScalar(LOOK_AHEAD * boostBlend)
    lookAtTarget.copy(chassisGroup.position)
    lookAtTarget.y = chassisGroup.position.y + LOOK_AT_HEIGHT
    lookAtTarget.add(lookAheadOffset)
  }

  if (!lookAtInitialized || snap) {
    smoothedLookAt.copy(lookAtTarget)
    lookAtInitialized = true
  }
  else {
    smoothedLookAt.lerp(lookAtTarget, CAMERA_LERP)
  }
  camera.lookAt(smoothedLookAt)

  const targetFov = MathUtils.lerp(CAMERA_FOV_BASE, CAMERA_FOV_BOOST, boostBlend)
  if (Math.abs(camera.fov - targetFov) > 0.01) {
    camera.fov = MathUtils.lerp(camera.fov, targetFov, CAMERA_BOOST_BLEND)
    camera.updateProjectionMatrix()
  }
}

const carRef = shallowRef<InstanceType<typeof CarComponent>>()
const sceneWorldRef = shallowRef<InstanceType<typeof SceneWorld>>()

// KeyX/ArrowX are physical key codes, so Shift+WASD keeps working while boosting
const keys = useMagicKeys({
  passive: false,
  onEventFired(event) {
    // Keep Space from scrolling/clicking and arrows from scrolling the page
    if (
      event.type === 'keydown'
      && (event.code === 'Space' || event.code.startsWith('Arrow'))
    ) {
      event.preventDefault()
    }
  },
})

// Axes derived from the full pressed-key state: releasing one key of an
// opposing pair no longer zeroes the axis while the other is still held
const forwardAxis = computed(() =>
  Number(keys.KeyS.value || keys.ArrowDown.value) - Number(keys.KeyW.value || keys.ArrowUp.value))
const steerAxis = computed(() =>
  Number(keys.KeyA.value || keys.ArrowLeft.value) - Number(keys.KeyD.value || keys.ArrowRight.value))

const pad = useCarGamepad({
  steerSensitivity: padSteerSens,
  steerExpo: padSteerExpo,
  stickDeadzone: padDeadzone,
})

// RL mouse defaults: LMB boost, RMB jump, MMB rear view (canvas only, so the GUI stays clickable)
const boostHeld = ref(false)
const jumpHeld = ref(false)

function isCanvasEvent(event: Event) {
  return (event.target as HTMLElement | null)?.tagName === 'CANVAS'
}

useEventListener('mousedown', (event) => {
  if (!isCanvasEvent(event)) { return }
  event.preventDefault()

  if (event.button === 0) {
    boostHeld.value = true
  }
  else if (event.button === 1) {
    rearView.value = true
  }
  else if (event.button === 2) {
    jumpHeld.value = true
    const movement = carRef.value?.movement
    if (movement) { movement.jump = true }
  }
})

useEventListener('mouseup', (event) => {
  if (event.button === 0) {
    boostHeld.value = false
  }
  else if (event.button === 1) {
    rearView.value = false
  }
  else if (event.button === 2) {
    jumpHeld.value = false
  }
})

useEventListener('contextmenu', (event) => {
  if (isCanvasEvent(event)) { event.preventDefault() }
})

useEventListener('blur', () => {
  boostHeld.value = false
  jumpHeld.value = false
  rearView.value = false
})

watchEffect(() => {
  const movement = carRef.value?.movement
  if (!movement) { return }

  // RL pad semantics: triggers drive on the ground, stick Y pitches in the air
  const padForward = carRef.value?.grounded === false ? pad.pitch : pad.forward
  movement.forward = MathUtils.clamp(forwardAxis.value + padForward, -1, 1)
  movement.right = MathUtils.clamp(steerAxis.value + pad.right, -1, 1)
  movement.roll = Number(keys.KeyE.value) - Number(keys.KeyQ.value)
  movement.boost = boostHeld.value || pad.boost ? 1 : 0
  movement.brake = keys.control.value ? 1 : 0
  movement.jumpHeld = jumpHeld.value || pad.jumpHeld
  movement.slide = Boolean(keys.shift.value) || pad.slide
  movement.reset = keys.KeyR.value || pad.resetHeld
})

whenever(keys.space, () => {
  ballCam.value = !ballCam.value
})

whenever(() => pad.ballCamPressed, () => {
  ballCam.value = !ballCam.value
})

whenever(() => pad.jumpHeld, () => {
  const movement = carRef.value?.movement
  if (movement) { movement.jump = true }
})

watch(() => pad.rearViewHeld, (held) => {
  rearView.value = held
})

function resetScene() {
  sceneWorldRef.value?.reset?.()
  // Respawn far away snaps the camera via teleport detection; resetting near
  // the spawn doesn't, so force the pan back behind the car
  resyncing = true
}

whenever(keys.KeyR, resetScene)
whenever(() => pad.resetHeld, resetScene)

const KEYBOARD_HINTS = {
  throttle: ['W', 'S'],
  steer: ['A', 'D'],
  jump: ['RMB'],
  boost: ['LMB'],
  slide: ['shift'],
  roll: ['Q', 'E'],
  ballCam: ['Space'],
  rearView: ['MMB'],
  reset: ['R'],
}

const GAMEPAD_HINTS = {
  throttle: ['RT', 'LT'],
  steer: ['L-Stick'],
  jump: ['A'],
  boost: ['B', 'RB'],
  slide: ['LB'],
  roll: ['LB', 'L-Stick'],
  ballCam: ['Y'],
  rearView: ['X'],
  reset: ['Select'],
}

const hints = computed(() => pad.connected ? GAMEPAD_HINTS : KEYBOARD_HINTS)

// Bottom-left indicator: live pad state, doubles as a binding debugger
const PAD_BUTTONS = [
  { label: 'A', key: 'jumpHeld' },
  { label: 'B/RB', key: 'boost' },
  { label: 'X', key: 'rearViewHeld' },
  { label: 'Y', key: 'ballCamPressed' },
  { label: 'LB', key: 'slide' },
  { label: 'Sel', key: 'resetHeld' },
] as const

onUnmounted(() => {
  trample?.dispose()
})
</script>

<template>
  <ClientOnly>
    <TresLeches :uuid="uuid" collapsed />
  </ClientOnly>

  <div class="render-stats">
    <p>{{ physDebug }}</p>
  </div>

  <UCard
    class="fixed bottom-4 right-4 z-10 pointer-events-none select-none bg-default/75 backdrop-blur"
    :ui="{ body: 'p-3 sm:p-3' }"
  >
    <ul class="flex flex-col gap-1.5 text-xs text-muted">
      <li class="flex items-center justify-between gap-6">
        <span>Throttle / reverse · air pitch</span>
        <span class="flex items-center gap-0.5"><UKbd v-for="key in hints.throttle" :key="key" :value="key" /></span>
      </li>
      <li class="flex items-center justify-between gap-6">
        <span>Steer · air yaw</span>
        <span class="flex items-center gap-0.5"><UKbd v-for="key in hints.steer" :key="key" :value="key" /></span>
      </li>
      <li class="flex items-center justify-between gap-6">
        <span>Jump · dodge with direction</span>
        <span class="flex items-center gap-0.5"><UKbd v-for="key in hints.jump" :key="key" :value="key" /></span>
      </li>
      <li class="flex items-center justify-between gap-6">
        <span>Boost · ground &amp; air</span>
        <span class="flex items-center gap-0.5"><UKbd v-for="key in hints.boost" :key="key" :value="key" /></span>
      </li>
      <li class="flex items-center justify-between gap-6">
        <span>Powerslide · air-roll mod</span>
        <span class="flex items-center gap-0.5"><UKbd v-for="key in hints.slide" :key="key" :value="key" /></span>
      </li>
      <li class="flex items-center justify-between gap-6">
        <span>Air roll</span>
        <span class="flex items-center gap-0.5"><UKbd v-for="key in hints.roll" :key="key" :value="key" /></span>
      </li>
      <li class="flex items-center justify-between gap-6">
        <span class="flex items-center gap-1.5">
          Ball cam
          <UBadge size="sm" variant="subtle" :color="ballCam ? 'primary' : 'neutral'">
            {{ ballCam ? 'on' : 'off' }}
          </UBadge>
        </span>
        <span class="flex items-center gap-0.5"><UKbd v-for="key in hints.ballCam" :key="key" :value="key" /></span>
      </li>
      <li class="flex items-center justify-between gap-6">
        <span>Rear view (hold)</span>
        <span class="flex items-center gap-0.5"><UKbd v-for="key in hints.rearView" :key="key" :value="key" /></span>
      </li>
      <li class="flex items-center justify-between gap-6">
        <span>Reset</span>
        <span class="flex items-center gap-0.5"><UKbd v-for="key in hints.reset" :key="key" :value="key" /></span>
      </li>
    </ul>
  </UCard>

  <UCard
    v-if="pad.connected"
    class="fixed bottom-4 left-4 z-10 pointer-events-none select-none bg-default/75 backdrop-blur"
    :ui="{ body: 'p-3 sm:p-3' }"
  >
    <div class="flex flex-col gap-1.5 text-xs text-muted font-mono">
      <span class="truncate max-w-64" :title="pad.id">🎮 {{ pad.id }} · {{ pad.mapping || 'no mapping' }}</span>
      <span class="flex items-center gap-1">
        <UBadge
          v-for="btn in PAD_BUTTONS"
          :key="btn.label"
          size="sm"
          :variant="pad[btn.key] ? 'solid' : 'subtle'"
          :color="pad[btn.key] ? 'primary' : 'neutral'"
        >
          {{ btn.label }}
        </UBadge>
      </span>
      <span>
        RT {{ pad.throttle.toFixed(2) }} · LT {{ pad.brake.toFixed(2) }} · stick {{ pad.stickX.toFixed(2) }}, {{ pad.stickY.toFixed(2) }}
      </span>
      <span>raw pressed: {{ pad.pressedButtons.length ? pad.pressedButtons.join(', ') : '—' }}</span>
    </div>
  </UCard>

  <TheLoadingScreen :background="gl.clearColor" />

  <TresCanvas v-bind="gl" window-size @loop="followCarCamera">
    <!-- S drives the car in reverse, so the screenshot moves to P -->
    <TheScreenshot shortcut="p" />
    <TresPerspectiveCamera ref="cameraRef" :position="[0, CAMERA_HEIGHT, CAMERA_DISTANCE]" :fov="CAMERA_FOV_BASE" />

    <SceneLighting />

    <Suspense>
      <EffectComposerPmndrs>
        <!-- Threshold at/above 1 so only HDR emitters (toneMapped=false car lights/exhaust) bloom, not the sky -->
        <BloomPmndrs
          v-if="bloomEnabled"
          :intensity="bloomIntensity"
          :luminance-threshold="bloomThreshold"
          :luminance-smoothing="bloomSmoothing"
          mipmap-blur
        />
      </EffectComposerPmndrs>
    </Suspense>

    <Suspense>
      <Physics timestep="vary" :speed="SIM_SPEED" :gravity="[0, -9.81, 0]">
        <SceneWorld ref="sceneWorldRef" :trample="trample" />
        <Suspense>
          <CarComponent ref="carRef" />
        </Suspense>
      </Physics>
    </Suspense>
  </TresCanvas>
</template>

<style scoped>
  .render-stats {
    position: fixed;
    top: 10px;
    left: 10px;
    color: #84cc16;
    font-family: ui-monospace, monospace;
    font-size: 11px;
    font-weight: 600;
    pointer-events: none;
    z-index: 10;
  }

  .render-stats p {
    margin: 0;
  }
</style>
