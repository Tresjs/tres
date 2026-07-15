<script setup lang="ts">
import { OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { Physics, RigidBody } from '@tresjs/rapier'
import type { ContactForcePayload, ExposedRigidBody } from '@tresjs/rapier'
import { ACESFilmicToneMapping, SRGBColorSpace } from 'three'
import { shallowRef } from 'vue'
import { useControls } from '@tresjs/leches'
import LittleBoxForDemos from './LittleBoxForDemos.vue'

const gl = {
  clearColor: '#82DBC5',
  shadows: true,
  alpha: false,
  outputColorSpace: SRGBColorSpace,
  toneMapping: ACESFilmicToneMapping,
}

const sphereRef = shallowRef<ExposedRigidBody | null>(null)
const maxForceMagnitude = shallowRef(0)

const onContactForce = (e: ContactForcePayload) => {
  console.log('contact-force', e)
  maxForceMagnitude.value = Math.round(e.totalForceMagnitude)
}

const drop = () => {
  if (!sphereRef.value) { return }
  sphereRef.value.instance.setTranslation({ x: 0, y: 5, z: 0 }, true)
  sphereRef.value.instance.setLinvel({ x: 0, y: 0, z: 0 }, true)
}

const uuid = inject(`uuid`)

const { debug, forceThreshold: FORCE_THRESHOLD } = useControls({
  debug: false,
  forceThreshold: {
    label: 'Force threshold',
    value: 50,
    min: 0,
    max: 100,
    step: 1,
  },
  dropBall: {
    label: 'Drop ball',
    type: 'button',
    onClick: () => drop(),
  },
}, { uuid })
</script>

<template>
  <div class="floating">
    <div>
      Total force magnitude: <b>{{ maxForceMagnitude }}</b>
    </div>
    <div>Check the logs on console to get a complete expose object</div>
  </div>
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[11, 11, 11]" :look-at="[0, 0, 0]" />
    <OrbitControls />

    <Suspense>
      <Physics :debug>
        <RigidBody
          ref="sphereRef"
          activeContactForce
          :contact-force-event-threshold="FORCE_THRESHOLD"
          @contact-force="onContactForce"
        >
          <TresMesh :position="[0, 5, 0]">
            <TresSphereGeometry />
            <TresMeshStandardMaterial color="#5672cd" />
          </TresMesh>
        </RigidBody>

        <LittleBoxForDemos />
      </Physics>
    </Suspense>
    <TresAmbientLight :intensity="0.5" />
    <TresDirectionalLight :position="[1, 2, 3]" :intensity="1.5" />
  </TresCanvas>
</template>

<style scoped>
.floating {
  position: absolute;
  top: 0;
  left: 0;
  border-bottom-right-radius: 0.5rem;
  z-index: 1;
  padding: 0.5rem;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  font-size: 0.875rem;
}
</style>
