<script setup lang="ts">
import { Backdrop, CameraShake, ContactShadows, Environment, OrbitControls, useGLTF } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { SRGBColorSpace } from 'three'
import { computed } from 'vue'

const gl = {
  clearColor: '#333',
  alpha: true,
  outputColorSpace: SRGBColorSpace,
}

const { state } = useGLTF('https://raw.githubusercontent.com/Tresjs/assets/main/models/gltf/ugly-naked-bunny/ugly-naked-bunny-animated.gltf', { draco: true })

const model = computed(() => state?.value?.scene)
</script>

<template>
  <div class="hud-overlay"></div>

  <TresCanvas
    v-bind="gl"
  >
    <TresPerspectiveCamera :position="[0, 1.25, 3]" />

    <TresGroup name="model" :position="[0, -0.5, 0]" :scale="[0.5, 0.5, 0.5]">
      <primitive v-if="model" :object="model" />
    </TresGroup>

    <Backdrop
      :floor="5"
      :segments="10"
      receive-shadow
      :scale="[20, 8.5, 1]"
      :position="[0, -0.5, -2]"
    >
      <TresMeshPhysicalMaterial color="orange" />
    </Backdrop>

    <ContactShadows
      :position="[0, -0.475, 0]"
      :scale="5"
      :blur="1"
      :opacity="0.5"
    />

    <TresAmbientLight :intensity="0.5" />

    <Suspense>
      <Environment preset="dawn" :environment-intensity="0.5" />
    </Suspense>

    <OrbitControls make-default :max-polar-angle="Math.PI / 2" />

    <CameraShake
      :intensity="1"
      :maxYaw="0.1"
      :maxPitch="0.05"
      :maxRoll="0.05"
      :yawFrequency="0.05"
      :pitchFrequency="0.2"
      :rollFrequency="0.2"
      :decayRate="0.65"
    />
  </TresCanvas>
</template>

<style scoped>
.hud-overlay {
  position: absolute;
  z-index: 2;
  width: 90%;
  height: 100%;
  background-image: url('/camera-shake/fake-hud.svg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  pointer-events: none;
  left: 50%;
  transform: translateX(-50%);
  aspect-ratio: 486 / 274;
}
</style>
