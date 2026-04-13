<script setup lang="ts">
import { OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { TresLeches, useControls } from '@tresjs/leches'
import { Physics, RigidBody } from '@tresjs/rapier'
import { ACESFilmicToneMapping, SRGBColorSpace } from 'three'
import { computed, nextTick, ref, watch } from 'vue'

const gl = {
  clearColor: '#82DBC5',
  shadows: true,
  alpha: false,
  outputColorSpace: SRGBColorSpace,
  toneMapping: ACESFilmicToneMapping,
}

/**
 * Solver groups use the same 32-bit encoding as collision groups:
 *   high 16 bits = membership
 *   low  16 bits = filter
 *
 * The KEY difference from collision groups:
 *   - collisionGroups → controls whether collision *detection* happens at all
 *                        (no detection = no events, no forces)
 *   - solverGroups    → collision detection still runs (events fire!),
 *                        but if solver groups don't match, no contact *forces*
 *                        are applied — the ball passes through the platform
 *                        even though the collision was detected.
 *
 * See: https://rapier.rs/docs/user_guides/javascript/colliders#collision-groups-and-solver-groups
 */
const G_RED = 0b0001 // bit 0 → red objects
const G_BLUE = 0b0010 // bit 1 → blue objects
const G_FLOOR = 0b0100 // bit 2 → floor / static surfaces

function encodeGroup(membership: number, filter: number): number {
  return (membership << 16) | filter
}

// All objects share the same collision group so collision events always fire.
// Only solverGroups differs, controlling who actually bounces off whom.
const universalCollisionGroup = encodeGroup(0xFFFF, 0xFFFF)

const { debug, redSolvesBlue, blueSolvesRed } = useControls({
  debug: false,
  redSolvesBlue: false,
  blueSolvesRed: false,
  reset: {
    label: 'Reset balls',
    type: 'button',
    onClick: resetBalls,
  },
})

// ─── Reactive solver group values ────────────────────────────────────────────

// Red balls: always solve with red things & floor; optionally with blue platform.
const redBallSolverGroup = computed(() =>
  encodeGroup(G_RED, G_RED | G_FLOOR | (redSolvesBlue.value ? G_BLUE : 0)),
)

// Blue balls: always solve with blue things & floor; optionally with red platform.
const blueBallSolverGroup = computed(() =>
  encodeGroup(G_BLUE, G_BLUE | G_FLOOR | (blueSolvesRed.value ? G_RED : 0)),
)

// Red platform: solves with red balls; optionally also blue balls.
const redPlatformSolverGroup = computed(() =>
  encodeGroup(G_RED, G_RED | (blueSolvesRed.value ? G_BLUE : 0)),
)

// Blue platform: solves with blue balls; optionally also red balls.
const bluePlatformSolverGroup = computed(() =>
  encodeGroup(G_BLUE, G_BLUE | (redSolvesBlue.value ? G_RED : 0)),
)

// Floor: solves with every ball.
const floorSolverGroup = encodeGroup(G_FLOOR, G_RED | G_BLUE | G_FLOOR)

// ─── Ball reset ─────────────────────────────────────────────────────────────

const showBalls = ref(true)

async function resetBalls() {
  showBalls.value = false
  await nextTick()
  showBalls.value = true
}

watch([redSolvesBlue, blueSolvesRed], resetBalls)

// ─── Collision event logging (solver groups don't suppress events!) ──────────
const onCollision = (e: any) => {
  // eslint-disable-next-line no-console
  console.log(e)
}
</script>

<template>
  <TresLeches />
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[0, 14, 32]" :look-at="[0, 5, 0]" />
    <OrbitControls />

    <Suspense>
      <Physics :debug>
        <!--
          All objects share the same collisionGroups (universal) so every
          collision event fires regardless of the solver setting.

          solverGroups controls who receives contact *forces*:
            Left  (x = -6): red platform   → red balls land, blue balls pass through (by default)
            Right (x = +6): blue platform  → blue balls land, red balls pass through (by default)
            Floor (y =  0): catches everything

          Open the console to observe that collision events still fire even when
          the solver ignores the contact (balls pass through the platform).
        -->

        <!-- ── Balls (remounted on reset) ── -->
        <template v-if="showBalls">
          <!-- Red ball over RED platform → solved (lands) by default -->
          <RigidBody
            collider="ball"
            :position="[-6, 20, 1.5]"
            :collision-groups="universalCollisionGroup"
            :solver-groups="redBallSolverGroup"
            active-collision
            @collision-enter="onCollision('red-ball / red-platform')"
          >
            <TresMesh>
              <TresSphereGeometry />
              <TresMeshStandardMaterial color="#ff3333" />
            </TresMesh>
          </RigidBody>

          <!-- Red ball over BLUE platform → not solved (passes through) by default -->
          <RigidBody
            collider="ball"
            :position="[6, 20, 1.5]"
            :collision-groups="universalCollisionGroup"
            :solver-groups="redBallSolverGroup"
            active-collision
            @collision-enter="onCollision('red-ball / blue-platform')"
          >
            <TresMesh>
              <TresSphereGeometry />
              <TresMeshStandardMaterial color="#ff3333" />
            </TresMesh>
          </RigidBody>

          <!-- Blue ball over RED platform → not solved (passes through) by default -->
          <RigidBody
            collider="ball"
            :position="[-6, 20, -1.5]"
            :collision-groups="universalCollisionGroup"
            :solver-groups="blueBallSolverGroup"
            active-collision
            @collision-enter="onCollision('blue-ball / red-platform')"
          >
            <TresMesh>
              <TresSphereGeometry />
              <TresMeshStandardMaterial color="#3388ff" />
            </TresMesh>
          </RigidBody>

          <!-- Blue ball over BLUE platform → solved (lands) by default -->
          <RigidBody
            collider="ball"
            :position="[6, 20, -1.5]"
            :collision-groups="universalCollisionGroup"
            :solver-groups="blueBallSolverGroup"
            active-collision
            @collision-enter="onCollision('blue-ball / blue-platform')"
          >
            <TresMesh>
              <TresSphereGeometry />
              <TresMeshStandardMaterial color="#3388ff" />
            </TresMesh>
          </RigidBody>
        </template>

        <!-- ── Red platform (left) ── -->
        <RigidBody
          type="fixed"
          :position="[-6, 6, 0]"
          :collision-groups="universalCollisionGroup"
          :solver-groups="redPlatformSolverGroup"
        >
          <TresMesh>
            <TresBoxGeometry :args="[9, 0.4, 7]" />
            <TresMeshStandardMaterial color="#cc1111" :opacity="0.85" transparent />
          </TresMesh>
        </RigidBody>

        <!-- ── Blue platform (right) ── -->
        <RigidBody
          type="fixed"
          :position="[6, 6, 0]"
          :collision-groups="universalCollisionGroup"
          :solver-groups="bluePlatformSolverGroup"
        >
          <TresMesh>
            <TresBoxGeometry :args="[9, 0.4, 7]" />
            <TresMeshStandardMaterial color="#1144cc" :opacity="0.85" transparent />
          </TresMesh>
        </RigidBody>

        <!-- ── Floor (catches all balls) ── -->
        <RigidBody
          type="fixed"
          :position="[0, 0, 0]"
          :collision-groups="universalCollisionGroup"
          :solver-groups="floorSolverGroup"
        >
          <TresMesh>
            <TresBoxGeometry :args="[24, 0.4, 10]" />
            <TresMeshStandardMaterial color="#888888" />
          </TresMesh>
        </RigidBody>
      </Physics>
    </Suspense>

    <TresAmbientLight :intensity="0.6" />
    <TresDirectionalLight :position="[10, 20, 10]" :intensity="1.5" cast-shadow />
  </TresCanvas>
</template>
