<script setup lang="ts">
import { OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { TresLeches, useControls } from '@tresjs/leches'
import { CuboidCollider, Physics, RigidBody } from '@tresjs/rapier'
import type { ContactForcePayload } from '@tresjs/rapier'
import { ACESFilmicToneMapping, SRGBColorSpace } from 'three'
import { shallowRef } from 'vue'

const gl = {
  clearColor: '#1a1a2e',
  shadows: true,
  alpha: false,
  outputColorSpace: SRGBColorSpace,
  toneMapping: ACESFilmicToneMapping,
}

const sphereRef = shallowRef()

const onContactForce = (event: ContactForcePayload) => {
  const magnitude = Math.round(event.totalForceMagnitude)
  // eslint-disable-next-line no-console
  console.log('onContactForce ~ magnitude:', magnitude)
}
const onContactForceCustomCollider = (event: ContactForcePayload) => {
  const magnitude = Math.round(event.totalForceMagnitude)
  // eslint-disable-next-line no-console
  console.log('onContactForceCustomCollider ~ magnitude:', magnitude)
}

const drop = () => {
  if (!sphereRef.value) {
    return
  }
  sphereRef.value.instance.setTranslation({ x: 0, y: 10, z: 0 }, true)
  sphereRef.value.instance.setLinvel({ x: 0, y: 0, z: 0 }, true)
}

const { forceThreshold: FORCE_THRESHOLD, debug, activeContactForce } = useControls({
  debug: false,
  activeContactForce: true,
  forceThreshold: {
    label: 'Force threshold',
    value: 10,
    min: 0,
    max: 25,
    step: 0.1,
  },
  acceptBtn: {
    label: 'Drop ball',
    type: 'button',
    onClick: () => {
      drop()
    },
  },
})
</script>

<template>
  <TresLeches />
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[0, 8, 20]" :look-at="[0, 0, 0]" />
    <OrbitControls />

    <TresAmbientLight :intensity="0.5" />
    <TresDirectionalLight :position="[5, 10, 5]" :intensity="1.5" cast-shadow />

    <Suspense>
      <Physics :debug>
        <!-- Falling sphere with contact force events enabled -->
        <RigidBody
          ref="sphereRef"
          :active-contact-force="activeContactForce"
          :contact-force-event-threshold="FORCE_THRESHOLD"
          collider="ball"
          @contact-force="onContactForce"
        >
          <TresMesh :position="[0, 10, 0]" cast-shadow>
            <TresSphereGeometry :args="[1, 32, 32]" />
            <TresMeshStandardMaterial color="#e94560" />
          </TresMesh>
        </RigidBody>

        <RigidBody :collider="false">
          <CuboidCollider
            :active-contact-force="activeContactForce"
            :contact-force-event-threshold="FORCE_THRESHOLD"
            :args="[1, 1, 1]"
            :position="[0, 10, 0]"
            @contact-force="onContactForceCustomCollider"
          />
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
</template>
