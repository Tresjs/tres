<script setup lang="ts">
import { Line2, OrbitControls, Sky } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import {
  CuboidCollider,
  CylinderCollider,
  type ExposedRigidBody,
  Physics,
  RigidBody,
} from '@tresjs/rapier'
import { ACESFilmicToneMapping, SRGBColorSpace } from 'three'
import { computed, nextTick, onMounted, ref, shallowRef, watch } from 'vue'
import { TresLeches, useControls } from '@tresjs/leches'

type Vec3 = [number, number, number]

const GL = {
  clearColor: '#87CEEB',
  shadows: true,
  alpha: false,
  outputColorSpace: SRGBColorSpace,
  toneMapping: ACESFilmicToneMapping,
}
const CAMERA_POSITION = [0, 6, 20] as Vec3
const CAMERA_TARGET = [0, 3, -5] as Vec3
const COURT_HALF_X = 9
const COURT_HALF_Z = 18
const WALL_HEIGHT = 12
const WALL_HALF_DEPTH = 0.14
const WALLS_BOUNDARIES: { position: Vec3, args: [number, number, number] }[] = [
  {
    position: [-COURT_HALF_X, WALL_HEIGHT / 2, 0],
    args: [WALL_HALF_DEPTH, WALL_HEIGHT / 2, COURT_HALF_Z],
  },
  {
    position: [COURT_HALF_X, WALL_HEIGHT / 2, 0],
    args: [WALL_HALF_DEPTH, WALL_HEIGHT / 2, COURT_HALF_Z],
  },
  {
    position: [0, WALL_HEIGHT / 2, COURT_HALF_Z],
    args: [COURT_HALF_X, WALL_HEIGHT / 2, WALL_HALF_DEPTH],
  },
]
const SIM_DT = 1 / 60
const POWER_MIN = 4
const POWER_MAX = 20
const DEFAULT_POWER = 17
const MIN_BALL_X = -6
const MAX_BALL_X = 6
const LANDING_X_MIN = -7
const LANDING_X_MAX = 7
const HOOP_PLACE = {
  xMin: -5.5,
  xMax: 5.5,
  zMin: -16,
  zMax: -3,
  yMin: 6.2,
  yMax: 9.5,
} as const

const {
  debug,
  showTrajectory,
  launchAngle,
  speedScale,
  gravityY,
  ballRadius,
  ballMass,
  ballRestitution,
  ballFriction,
  rimRadius,
  rimRestitution,
  rimFriction,
  powerStep,
  landingXStep,
} = useControls({
  debug: true,
  showTrajectory: { value: true, type: 'boolean', label: 'Trajectory arc' },
  launchAngle: { value: 0.85, min: 0.35, max: 1.25, step: 0.02, label: 'Launch angle (rad)' },
  speedScale: { value: 1.1, min: 0.4, max: 1.8, step: 0.05, label: 'Speed scale' },
  gravityY: { value: -9.81, min: -20, max: -1, step: 0.1, label: 'Gravity Y' },
  ballRadius: { value: 0.9, min: 0.5, max: 1.5, step: 0.05, label: 'Ball radius' },
  ballMass: { value: 2, min: 0.5, max: 10, step: 0.1, label: 'Ball mass' },
  ballRestitution: { value: 0.72, min: 0, max: 1.5, step: 0.02, label: 'Ball restitution' },
  ballFriction: { value: 0.45, min: 0, max: 1.5, step: 0.02, label: 'Ball friction' },
  rimRadius: { value: 1.8, min: 1, max: 3, step: 0.1, label: 'Rim radius' },
  rimRestitution: { value: 0.65, min: 0, max: 1.5, step: 0.02, label: 'Rim restitution' },
  rimFriction: { value: 0.35, min: 0, max: 1.5, step: 0.02, label: 'Rim friction' },
  powerStep: { value: 0.5, min: 0.1, max: 1, step: 0.05, label: 'Power step' },
  landingXStep: { value: 0.6, min: 0.1, max: 1, step: 0.05, label: 'Landing X step' },
})

const isAiming = ref(true)
const ballRef = shallowRef<ExposedRigidBody | null>(null)
const ballX = ref(0)
const ballLandingX = ref(0)
const ballPower = ref(DEFAULT_POWER)
const shootAttempts = ref(0)
const shootScore = ref(0)
const shootStreak = ref(0)
const scoreMessage = ref('Aim & shoot!')
const scoredThisShot = ref(false)
const scoreFlash = ref(false)
const hoopPos = ref({ x: 0, y: 8, z: -12 })

const hoopBackboardZ = computed(() => hoopPos.value.z - 2)
const hoopPlacementKey = computed(
  () => `${hoopPos.value.x.toFixed(2)}-${hoopPos.value.y.toFixed(2)}-${hoopPos.value.z.toFixed(2)}`,
)
const backboardPos = computed((): Vec3 => [hoopPos.value.x, hoopPos.value.y + 1.8, hoopBackboardZ.value])
const rimPos = computed((): Vec3 => [hoopPos.value.x, hoopPos.value.y, hoopPos.value.z])
const polePos = computed((): Vec3 => [hoopPos.value.x, hoopPos.value.y / 2, hoopBackboardZ.value])
const ballPosition = computed(() => ({
  x: ballX.value,
  y: 2.6,
  z: 10,
}))
const showAimTrajectory = computed(() => showTrajectory.value && isAiming.value)
const trajectoryPreview = computed(() => {
  if (!showAimTrajectory.value) {
    return { points: [] as Vec3[], landing: null as Vec3 | null }
  }
  const velocity = getShotVelocity(ballPosition.value, ballPower.value)
  return simulateTrajectory(ballPosition.value, velocity, gravityY.value)
})
const trajectoryLineKey = computed(() => trajectoryPreview.value.points.length)

function randomInRange(min: number, max: number) {
  return min + Math.random() * (max - min)
}

function randomizeRound() {
  ballX.value = randomInRange(MIN_BALL_X, MAX_BALL_X)
  ballLandingX.value = ballX.value
  ballPower.value = DEFAULT_POWER

  hoopPos.value = {
    x: randomInRange(HOOP_PLACE.xMin, HOOP_PLACE.xMax),
    y: randomInRange(HOOP_PLACE.yMin, HOOP_PLACE.yMax),
    z: randomInRange(HOOP_PLACE.zMin, HOOP_PLACE.zMax),
  }
}

function getShotVelocity(pos: { x: number, y: number, z: number }, shotPower: number) {
  const dx = ballLandingX.value - pos.x
  const dz = hoopPos.value.z - pos.z
  const horizLen = Math.hypot(dx, dz) || 1
  const speed = shotPower * speedScale.value
  const horizSpeed = Math.cos(launchAngle.value) * speed
  const vertSpeed = Math.sin(launchAngle.value) * speed

  return {
    x: (dx / horizLen) * horizSpeed,
    y: vertSpeed,
    z: (dz / horizLen) * horizSpeed,
  }
}

function simulateTrajectory(
  start: { x: number, y: number, z: number },
  velocity: { x: number, y: number, z: number },
  gravity: number,
) {
  let pos = { ...start }
  const vel = { ...velocity }
  const points: Vec3[] = [[start.x, start.y, start.z]]
  let landing: Vec3 | null = null

  for (let i = 0; i < 200; i++) {
    vel.y += gravity * SIM_DT
    const next = {
      x: pos.x + vel.x * SIM_DT,
      y: pos.y + vel.y * SIM_DT,
      z: pos.z + vel.z * SIM_DT,
    }

    if (next.y <= ballRadius.value && vel.y < 0) {
      const t = (ballRadius.value - pos.y) / (next.y - pos.y)
      const lx = pos.x + (next.x - pos.x) * t
      const lz = pos.z + (next.z - pos.z) * t
      points.push([lx, ballRadius.value, lz])
      landing = [lx, 0.25, lz]
      break
    }

    pos = next
    points.push([pos.x, pos.y, pos.z])

    if (pos.z < hoopPos.value.z - 8 || pos.y > 22) {
      break
    }
  }

  if (points.length < 2) {
    points.push([
      start.x + velocity.x * 0.2,
      start.y + velocity.y * 0.2,
      start.z + velocity.z * 0.2,
    ])
  }

  return { points, landing }
}

function adjustLandingX(direction: 'left' | 'right') {
  if (!isAiming.value) { return }

  ballLandingX.value += direction === 'left' ? -landingXStep.value : landingXStep.value
  ballLandingX.value = Math.min(LANDING_X_MAX, Math.max(LANDING_X_MIN, ballLandingX.value))
}

function adjustPower(direction: 'up' | 'down') {
  if (!isAiming.value) { return }
  ballPower.value += direction === 'up' ? powerStep.value : -powerStep.value
  ballPower.value = Math.min(POWER_MAX, Math.max(POWER_MIN, ballPower.value))
}

function setBallForAim() {
  const body = ballRef.value?.instance
  if (!body || !isAiming.value) { return }

  body.setTranslation(ballPosition.value, true)
  body.setLinvel({ x: 0, y: 0, z: 0 }, true)
  body.setAngvel({ x: 0, y: 0, z: 0 }, true)
}

function setAimMode() {
  isAiming.value = true
  scoredThisShot.value = false

  setBallForAim()
}

function resetGame() {
  const missed = !scoredThisShot.value && !isAiming.value

  scoreMessage.value = missed ? 'Close one — try again!' : 'Aim & shoot!'
  if (missed) {
    shootStreak.value = 0
  }

  randomizeRound()
  setAimMode()
}

function shootBall() {
  if (!isAiming.value) { return resetGame() }

  isAiming.value = false
  scoredThisShot.value = false
  shootAttempts.value += 1
  scoreMessage.value = 'Meteor incoming ☄️'

  setTimeout(() => {
    const body = ballRef.value?.instance

    body?.resetForces(true)
    body?.setLinvel(getShotVelocity(ballPosition.value, ballPower.value), true)
    body?.setAngvel({
      x: Math.random() * 5,
      y: Math.random() * 2.5,
      z: 0,
    }, true)
  }, 0)
}

function onScore() {
  if (isAiming.value || scoredThisShot.value) { return }

  scoredThisShot.value = true
  shootScore.value += 1
  shootStreak.value += 1
  scoreMessage.value = shootStreak.value > 1
    ? `${shootStreak.value}x Streak!` : 'On fire🔥'
  scoreFlash.value = true

  window.setTimeout(() => {
    scoreFlash.value = false
  }, 600)
}

function onLoop() {
  const body = ballRef.value?.instance
  if (!body || isAiming.value) { return }

  if (body.translation().y < -0.5) {
    resetGame()
  }
}

watch(ballRef, () => {
  nextTick(() => {
    setTimeout(() => {
      setBallForAim()
    }, 0);
  })
}, { once: true })

onMounted(() => {
  window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft' || e.key === 'a') {
      adjustLandingX('left')
    } else if (e.key === 'ArrowRight' || e.key === 'd') {
      adjustLandingX('right')
    } else if (e.key === 'ArrowUp' || e.key === 'w') {
      adjustPower('up')
    } else if (e.key === 'ArrowDown' || e.key === 's') {
      adjustPower('down')
    } else if (e.key === ' ' || e.key === 'Enter') {
      shootBall()
    } else if (e.key === 'Escape' || e.key === 'r') {
      resetGame()
    }
  })
});
</script>

<template>
  <div class="gui">
    <div class="score-panel" :class="{ flash: scoreFlash }">
      <div class="score-panel-stats">
        <div>
          <span class="label">Score</span>
          <strong>{{ shootScore }}</strong>
        </div>
        <div>
          <span class="label">Streak</span>
          <strong>{{ shootStreak }}</strong>
        </div>
        <div>
          <span class="label">Shots</span>
          <strong>{{ shootAttempts }}</strong>
        </div>
      </div>
      <p class="score-panel-message">
        {{ scoreMessage }}
      </p>
    </div>

    <div class="controls">
      <div class="controls-row">
        <button class="controls-btn" aria-label="More power" @click="adjustPower('up')">
          ▲
        </button>
      </div>
      <div class="controls-row">
        <button class="controls-btn" aria-label="Move landing left" @click="adjustLandingX('left')">
          ◀
        </button>
        <button
          class="controls-btn controls-btn-shoot"
          :class="{ reset: !isAiming }"
          @click="shootBall"
          @keydown.space="(e) => e.preventDefault()"
          @keydown.enter="(e) => e.preventDefault()"
        >
          {{ isAiming ? '🏀' : '↺' }}
        </button>
        <button class="controls-btn" aria-label="Move landing right" @click="adjustLandingX('right')">
          ▶
        </button>
      </div>
      <div class="controls-row">
        <button class="controls-btn" aria-label="Less power" @click="adjustPower('down')">
          ▼
        </button>
      </div>
      <p class="controls-hint">
        {{ isAiming ? '◀ ▶ angle · ▲ ▼ power' : 'Tap center for new round' }}
      </p>
    </div>
  </div>

  <TresLeches />
  <TresCanvas v-bind="GL" @loop="onLoop">
    <TresPerspectiveCamera :position="CAMERA_POSITION" :look-at="CAMERA_TARGET" />
    <OrbitControls
      :target="CAMERA_TARGET"
      :max-polar-angle="Math.PI / 2.05"
      :min-distance="10"
      :max-distance="40"
    />

    <Sky
      :elevation="1.5"
      :azimuth="30"
      :mie-coefficient="0.005"
      :mie-directional-g="0.7"
      :rayleigh="2"
      :turbidity="3.4"
    />

    <TresAmbientLight :intensity="0.7" color="#fff8e7" />
    <TresHemisphereLight :intensity="0.55" color="#fff9c4" ground-color="#d97706" />
    <TresDirectionalLight
      :position="[5, 7, 15]"
      :intensity="1.5"
      cast-shadow
      :shadow-camera-far="45"
      :shadow-camera-top="20"
      :shadow-camera-bottom="-20"
      :shadow-camera-left="-20"
      :shadow-camera-right="20"
      :shadow-radius="1.5"
    />


    <Suspense>
      <Physics :debug :gravity="[0, gravityY, 0]">
        <!-- Court floor -->
        <RigidBody type="fixed" :restitution="0.35" :friction="0.8">
          <TresMesh receive-shadow>
            <TresBoxGeometry :args="[COURT_HALF_X * 2, 0.2, COURT_HALF_Z * 2]" />
            <TresMeshStandardMaterial color="#f59e0b" />
          </TresMesh>
        </RigidBody>

        <!-- Court markings -->
        <TresMesh :position="[0, 0.22, HOOP_PLACE.zMax + 0.5]" :rotation-x="-Math.PI / 2">
          <TresPlaneGeometry :args="[COURT_HALF_X * 2, 0.2]" />
          <TresMeshBasicMaterial color="#fffbeb" :opacity="0.5" transparent />
        </TresMesh>
        <TresMesh :position="[0, 0.22, -HOOP_PLACE.zMax]" :rotation-x="-Math.PI / 2">
          <TresPlaneGeometry :args="[0.2, COURT_HALF_Z * 0.6]" />
          <TresMeshBasicMaterial color="#fffbeb" :opacity="0.5" transparent />
        </TresMesh>
        <TresMesh :position="[0, 0.22, COURT_HALF_Z * 0.55]" :rotation-x="-Math.PI / 2">
          <TresRingGeometry :args="[1.3, 1.5, 40]" />
          <TresMeshBasicMaterial color="#fffbeb" :opacity="0.5" transparent />
        </TresMesh>

        <!-- Back wall -->
        <RigidBody type="fixed">
          <TresMesh :position="[0, WALL_HEIGHT / 2, -COURT_HALF_Z]" cast-shadow receive-shadow>
            <TresBoxGeometry :args="[COURT_HALF_X * 2, WALL_HEIGHT, WALL_HALF_DEPTH * 2]" />
            <TresMeshStandardMaterial color="#6f7f96" :roughness="0.75" />
          </TresMesh>
        </RigidBody>

        <!-- Boundary walls -->
        <RigidBody
          v-for="(wall, index) in WALLS_BOUNDARIES"
          :key="`wall-${index}`"
          type="fixed"
          :collider="false"
          :restitution="0.45"
          :friction="0.6"
        >
          <CuboidCollider :args="wall.args" :position="wall.position" />
        </RigidBody>

        <!-- Backboard -->
        <RigidBody :key="`backboard-${hoopPlacementKey}`" type="fixed" :restitution="0.25">
          <TresMesh
            :position="backboardPos"
            cast-shadow
            receive-shadow
          >
            <TresBoxGeometry :args="[5.5, 3.8, 0.35]" />
            <TresMeshStandardMaterial color="#fff5e8" />
          </TresMesh>
          <TresMesh
            :position="[hoopPos.x, hoopPos.y + 1.8, hoopBackboardZ + 0.18]"
            receive-shadow
          >
            <TresBoxGeometry :args="[2.2, 1.6, 0.05]" />
            <TresMeshStandardMaterial color="#ff6b35" />
          </TresMesh>
        </RigidBody>

        <!-- Rim -->
        <RigidBody
          :key="`rim-${hoopPlacementKey}`"
          type="fixed"
          collider="trimesh"
          :restitution="rimRestitution"
          :friction="rimFriction"
        >
          <TresMesh
            :position="rimPos"
            :rotation="[Math.PI / 2, 0, 0]"
            receive-shadow
            cast-shadow
          >
            <TresTorusGeometry :args="[rimRadius, 0.18, 12, 32]" />
            <TresMeshStandardMaterial color="#ff4500" :metalness="0.6" :roughness="0.35" />
          </TresMesh>

          <CylinderCollider
            :args="[0.05, rimRadius - 0.25]"
            :position="[rimPos[0], rimPos[1] - 0.4, rimPos[2]]"
            sensor
            active-collision
            @intersection-enter="onScore"
          />
        </RigidBody>

        <!-- Pole -->
        <RigidBody :key="`pole-${hoopPlacementKey}`" type="fixed" collider="cylinder">
          <TresMesh
            :position="polePos"
            cast-shadow
          >
            <TresCylinderGeometry :args="[0.18, 0.22, hoopPos.y, 12]" />
            <TresMeshStandardMaterial color="#444444" :metalness="0.8" :roughness="0.4" />
          </TresMesh>
        </RigidBody>

        <!-- Basketball -->
        <RigidBody
          ref="ballRef"
          :type="isAiming ? 'fixed' : 'dynamic'"
          collider="ball"
          :mass="ballMass"
          :restitution="ballRestitution"
          :friction="ballFriction"
          :linear-damping="0.08"
          enable-ccd
          active-collision
        >
          <TresMesh cast-shadow receive-shadow>
            <TresSphereGeometry :args="[ballRadius, 32, 32]" />
            <TresMeshStandardMaterial color="#f97316" :roughness="0.55" />
          </TresMesh>
          <TresMesh
            v-for="(rotation, index) in [
              [0, 0, Math.PI / 2],
              [Math.PI / 2, 0, 0],
            ]"
            :key="`seam-${index}`"
            :rotation="rotation"
          >
            <TresTorusGeometry :args="[ballRadius * 1.01, 0.04, 8, 48]" />
            <TresMeshBasicMaterial color="#1a1a1a" />
          </TresMesh>
        </RigidBody>
      </Physics>
    </Suspense>

    <!-- Score glow -->
    <TresPointLight
      v-if="scoreFlash"
      :position="[rimPos[0], rimPos[1] + 0.3, rimPos[2]]"
      color="#fde047"
      :intensity="20"
      :distance="16"
    />

    <!-- Aim arc -->
    <Line2
      v-if="showAimTrajectory && trajectoryPreview.points.length > 1"
      :key="trajectoryLineKey"
      :points="trajectoryPreview.points"
      color="#facc15"
      :line-width="0.12"
      :world-units="true"
    />
    <TresMesh
      v-if="showAimTrajectory && trajectoryPreview.landing"
      :position="trajectoryPreview.landing"
      :rotation-x="-Math.PI / 2"
    >
      <TresRingGeometry :args="[0.35, 0.55, 32]" />
      <TresMeshBasicMaterial color="#facc15" transparent :opacity="0.7" />
    </TresMesh>
  </TresCanvas>
</template>

<style scoped>
  .gui {
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 10;
    font-family: 'Segoe UI', system-ui, sans-serif;
  }

  .score-panel {
    position: absolute;
    top: 1rem;
    left: 1rem;
    min-width: 11rem;
    padding: 1rem 1.15rem;
    border-radius: 1rem;
    color: #1e293b;
    background: linear-gradient(135deg, #F2EEDD, #edb06a);
    box-shadow: 0 8px 24px #00000018;
    transition:
      transform 0.25s ease,
      box-shadow 0.25s ease;
  }

  .score-panel.flash {
    transform: scale(1.05);
    box-shadow: 0 0 28px #fde047;
  }

  .score-panel-title {
    font-size: 1.15rem;
    font-weight: 800;
    letter-spacing: 0.02em;
    margin-bottom: 0.65rem;
  }

  .score-panel-stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.5rem;
    margin-bottom: 0.55rem;
  }

  .score-panel-stats .label {
    display: block;
    font-size: 0.65rem;
    text-transform: uppercase;
    opacity: 0.85;
    letter-spacing: 0.06em;
  }

  .score-panel-stats strong {
    font-size: 1.35rem;
    line-height: 1.1;
  }

  .score-panel-message {
    margin: 0;
    font-size: 0.85rem;
    font-weight: 600;
    opacity: 0.95;
  }

  .controls {
    position: absolute;
    right: 1rem;
    bottom: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.35rem;
    pointer-events: auto;
  }

  .controls-row {
    display: flex;
    gap: 0.35rem;
  }

  .controls-btn {
    width: 3.25rem;
    height: 3.25rem;
    border: none;
    border-radius: 0.85rem;
    background: linear-gradient(180deg, #fff7ed, #fed7aa);
    color: #9a3412;
    font-size: 1.15rem;
    font-weight: 700;
    cursor: pointer;
    box-shadow:
      0 4px 0 #c2410c,
      0 8px 20px rgb(0 0 0 / 0.18);
    transition:
      transform 0.08s ease,
      box-shadow 0.08s ease;
    user-select: none;
  }

  .controls-btn:active:not(:disabled) {
    transform: translateY(3px);
    box-shadow:
      0 1px 0 #c2410c,
      0 4px 12px rgb(0 0 0 / 0.15);
  }

  .controls-btn-shoot {
    font-size: 1.45rem;
    background: linear-gradient(180deg, #fb923c, #ea580c);
    color: #fff;
    box-shadow:
      0 4px 0 #9a3412,
      0 8px 24px #ea580c45;
  }

  .controls-btn-shoot.reset {
    background: linear-gradient(145deg, #576574, #2f3542);
    font-size: 1.35rem;
  }

  .controls-hint {
    margin: 0.35rem 0 0;
    font-size: 0.72rem;
    color: white;
    text-shadow: 0 1px 4px #00000035;
    text-align: center;
  }
</style>
