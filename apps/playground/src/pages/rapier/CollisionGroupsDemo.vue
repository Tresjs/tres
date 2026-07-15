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
 * Rapier collision groups are encoded as a 32-bit integer:
 *   high 16 bits = membership  (which groups this collider belongs to)
 *   low  16 bits = filter      (which groups this collider can interact with)
 *
 * Two colliders A and B interact when:
 *   (A.membership & B.filter) !== 0  AND  (B.membership & A.filter) !== 0
 *
 * See: https://rapier.rs/docs/user_guides/javascript/colliders#collision-groups-and-solver-groups
 */
const G_RED = 0b0001 // bit 0 → red objects
const G_BLUE = 0b0010 // bit 1 → blue objects
const G_FLOOR = 0b0100 // bit 2 → floor / static surfaces

function encodeGroup(membership: number, filter: number): number {
  return (membership << 16) | filter
}

const { debug, redSeesBlue, blueSeesRed } = useControls({
  debug: false,
  redSeesBlue: false,
  blueSeesRed: false,
  reset: {
    label: 'Reset balls',
    type: 'button',
    onClick: resetBalls,
  },
})

// ─── Reactive collision group values ────────────────────────────────────────

// Red balls: always interact with other red things & floor,
//            optionally also with blue platform when redSeesBlue is on.
const redBallGroup = computed(() =>
  encodeGroup(G_RED, G_RED | G_FLOOR | (redSeesBlue.value ? G_BLUE : 0)),
)

// Blue balls: always interact with other blue things & floor,
//             optionally also with red platform when blueSeesRed is on.
const blueBallGroup = computed(() =>
  encodeGroup(G_BLUE, G_BLUE | G_FLOOR | (blueSeesRed.value ? G_RED : 0)),
)

// Red platform (fixed): only red balls can land on it by default,
//                        blue balls can land on it when blueSeesRed is on.
const redPlatformGroup = computed(() =>
  encodeGroup(G_RED, G_RED | (blueSeesRed.value ? G_BLUE : 0)),
)

// Blue platform (fixed): only blue balls can land on it by default,
//                         red balls can land on it when redSeesBlue is on.
const bluePlatformGroup = computed(() =>
  encodeGroup(G_BLUE, G_BLUE | (redSeesBlue.value ? G_RED : 0)),
)

// Floor: every ball lands on it regardless of group.
const floorGroup = encodeGroup(G_FLOOR, G_RED | G_BLUE | G_FLOOR)

// ─── Ball reset ─────────────────────────────────────────────────────────────

const showBalls = ref(true)

async function resetBalls() {
  showBalls.value = false
  await nextTick()
  showBalls.value = true
}

watch([redSeesBlue, blueSeesRed], resetBalls)
</script>

<template>
  <TresLeches />
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[0, 14, 32]" :look-at="[0, 5, 0]" />
    <OrbitControls />

    <Suspense>
      <Physics :debug>
        <!--
          Two platforms sit side-by-side:
            Left  (x = -6): belongs to G_RED  – red balls land here by default
            Right (x = +6): belongs to G_BLUE – blue balls land here by default

          Two red balls fall over the left AND right platform.
          Two blue balls fall over the left AND right platform.
          Toggle the controls to see which balls pass through which platform.
        -->

        <!-- ── Balls (remounted on reset) ── -->
        <template v-if="showBalls">
          <!-- Red ball over RED platform → lands by default -->
          <RigidBody
            collider="ball"
            :position="[-6, 20, 1]"
            :collision-groups="redBallGroup"
          >
            <TresMesh>
              <TresSphereGeometry />
              <TresMeshStandardMaterial color="#ff3333" />
            </TresMesh>
          </RigidBody>

          <!-- Red ball over BLUE platform → passes through by default -->
          <RigidBody
            collider="ball"
            :position="[6, 20, 1]"
            :collision-groups="redBallGroup"
          >
            <TresMesh>
              <TresSphereGeometry />
              <TresMeshStandardMaterial color="#ff3333" />
            </TresMesh>
          </RigidBody>

          <!-- Blue ball over RED platform → passes through by default -->
          <RigidBody
            collider="ball"
            :position="[-6, 20, -1]"
            :collision-groups="blueBallGroup"
          >
            <TresMesh>
              <TresSphereGeometry />
              <TresMeshStandardMaterial color="#3388ff" />
            </TresMesh>
          </RigidBody>

          <!-- Blue ball over BLUE platform → lands by default -->
          <RigidBody
            collider="ball"
            :position="[6, 20, -1]"
            :collision-groups="blueBallGroup"
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
          :collision-groups="redPlatformGroup"
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
          :collision-groups="bluePlatformGroup"
        >
          <TresMesh>
            <TresBoxGeometry :args="[9, 0.4, 7]" />
            <TresMeshStandardMaterial color="#1144cc" :opacity="0.85" transparent />
          </TresMesh>
        </RigidBody>

        <!-- ── Floor (catches all balls regardless of group) ── -->
        <RigidBody
          type="fixed"
          :position="[0, 0, 0]"
          :collision-groups="floorGroup"
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
