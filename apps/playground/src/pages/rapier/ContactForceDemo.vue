<script setup lang="ts">
import { OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { Physics, RigidBody } from '@tresjs/rapier'
import { ACESFilmicToneMapping, SRGBColorSpace } from 'three'
import { ref, shallowRef } from 'vue'

const gl = {
  clearColor: '#1a1a2e',
  shadows: true,
  alpha: false,
  outputColorSpace: SRGBColorSpace,
  toneMapping: ACESFilmicToneMapping,
}

const sphereRef = shallowRef()
const forceLog = ref<{ magnitude: number, time: number }[]>([])
const maxEntries = 6

const FORCE_THRESHOLD = 10

const onContactForce = (event: any) => {
  const magnitude = Math.round(event.totalForceMagnitude)
  forceLog.value.unshift({ magnitude, time: Date.now() })
  if (forceLog.value.length > maxEntries) {
    forceLog.value.pop()
  }
}

const drop = () => {
  if (!sphereRef.value) { return }
  sphereRef.value.instance.setTranslation({ x: 0, y: 10, z: 0 }, true)
  sphereRef.value.instance.setLinvel({ x: 0, y: 0, z: 0 }, true)
}
</script>

<template>
  <div class="relative h-full w-full">
    <TresCanvas v-bind="gl">
      <TresPerspectiveCamera :position="[0, 8, 20]" :look-at="[0, 0, 0]" />
      <OrbitControls />

      <TresAmbientLight :intensity="0.5" />
      <TresDirectionalLight :position="[5, 10, 5]" :intensity="1.5" cast-shadow />

      <Suspense>
        <Physics>
          <!-- Falling sphere with contact force events enabled -->
          <RigidBody
            ref="sphereRef"
            active-contact-force
            :contact-force-event-threshold="FORCE_THRESHOLD"
            @contact-force="onContactForce"
          >
            <TresMesh :position="[0, 10, 0]" cast-shadow>
              <TresSphereGeometry :args="[1, 32, 32]" />
              <TresMeshStandardMaterial color="#e94560" />
            </TresMesh>
          </RigidBody>

          <!-- Fixed floor -->
          <RigidBody type="fixed">
            <TresMesh receive-shadow>
              <TresBoxGeometry :args="[20, 0.5, 20]" />
              <TresMeshStandardMaterial color="#16213e" />
            </TresMesh>
          </RigidBody>
        </Physics>
      </Suspense>
    </TresCanvas>

    <!-- HUD overlay -->
    <div class="absolute top-4 left-4 right-4 flex flex-col gap-3 pointer-events-none">
      <div class="bg-black/70 text-white rounded-lg p-4 text-sm font-mono max-w-xs">
        <p class="text-gray-400 mb-1 text-xs uppercase tracking-wide">Contact Force Events</p>
        <p class="text-gray-500 text-xs mb-3">
          Threshold: {{ FORCE_THRESHOLD }}
        </p>
        <div v-if="forceLog.length === 0" class="text-gray-500 italic text-xs">
          No events yet — drop the sphere!
        </div>
        <ul class="space-y-1">
          <li
            v-for="(entry, i) in forceLog"
            :key="entry.time"
            class="flex justify-between"
            :style="{ opacity: 1 - i * 0.14 }"
          >
            <span class="text-red-400">contact-force</span>
            <span class="text-yellow-300">{{ entry.magnitude }} N</span>
          </li>
        </ul>
      </div>

      <button
        class="pointer-events-auto bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg w-fit text-sm"
        @click="drop"
      >
        Drop sphere
      </button>
    </div>
  </div>
</template>
