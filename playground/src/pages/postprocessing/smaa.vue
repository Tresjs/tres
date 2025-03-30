<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { OrbitControls } from '@tresjs/cientos'
import { TresLeches, useControls } from '@tresjs/leches'
import { NoToneMapping } from 'three'
import { BlendFunction, EdgeDetectionMode, PredicationMode, SMAAPreset } from 'postprocessing'
import { ref } from 'vue'
import { EffectComposerPmndrs, SMAAPmndrs } from '@tresjs/post-processing'
import type { PerspectiveCamera } from 'three'

import '@tresjs/leches/styles'

const gl = {
  antialias: false,
  clearColor: '#2e3440',
  toneMapping: NoToneMapping,
}

const wrapperRef = ref<HTMLElement | undefined>(undefined)
const cameraRef = ref<PerspectiveCamera | null>(null)

const { blendFunction, debug, autoRotateSpeed, opacity, preset, wireframe, predicationMode, edgeDetectionMode } = useControls({
  blendFunction: {
    options: Object.keys(BlendFunction).map(key => ({
      text: key,
      value: BlendFunction[key as keyof typeof BlendFunction],
    })),
    value: BlendFunction.NORMAL,
  },
  debug: {
    options: [
      { text: 'OFF', value: 0 },
      { text: 'EDGES', value: 1 },
      { text: 'WEIGHTS', value: 2 },
    ],
    value: 0,
  },
  preset: {
    options: Object.keys(SMAAPreset).map(key => ({
      text: key,
      value: SMAAPreset[key as keyof typeof SMAAPreset],
    })),
    value: SMAAPreset.MEDIUM,
  },
  predicationMode: {
    options: Object.keys(PredicationMode).map(key => ({
      text: key,
      value: PredicationMode[key as keyof typeof PredicationMode],
    })),
    value: PredicationMode.DISABLED,
  },
  edgeDetectionMode: {
    options: Object.keys(EdgeDetectionMode).map(key => ({
      text: key,
      value: EdgeDetectionMode[key as keyof typeof EdgeDetectionMode],
    })),
    value: EdgeDetectionMode.COLOR,
  },
  opacity: {
    value: 1,
    min: 0,
    max: 1,
    step: 0.01,
  },
  autoRotateSpeed: {
    value: 0.5,
    min: 0,
    max: 10,
    step: 0.1,
  },
  wireframe: false,
})

const onChange = (e: { object: PerspectiveCamera }) => {
  if (!cameraRef.value) { return }

  cameraRef.value.position.copy(e.object.position)
  cameraRef.value.rotation.copy(e.object.rotation)
  cameraRef.value.zoom = e.object.zoom
  cameraRef.value.quaternion.copy(e.object.quaternion)
}
</script>

<template>
  <TresLeches />

  <div ref="wrapperRef" class="h-[100%] w-[100%] relative">
    <p class="playground-smaa-infos text-xl absolute">Left: No SMAA — Right: SMAA</p>

    <TresCanvas
      v-bind="gl"
      class="playground-smaa-canvas-left"
      window-size
    >
      <TresPerspectiveCamera :position="[0, 2.5, 3.5]" />
      <OrbitControls
        auto-rotate
        :domElement="wrapperRef"
        :auto-rotate-speed="autoRotateSpeed"
        :target="[0, 0.25, 0]"
        @change="onChange"
      />

      <TresMesh :position="[0, 0.5, 0]">
        <TresBoxGeometry :args="[2, 2, 2]" />
        <TresMeshBasicMaterial color="#ffffff" :wireframe="wireframe" />
      </TresMesh>
    </TresCanvas>

    <TresCanvas
      v-bind="gl"
      class="playground-smaa-canvas-right"
      window-size
    >
      <TresPerspectiveCamera ref="cameraRef" :position="[0, 2.5, 3.5]" />

      <TresMesh :position="[0, 0.5, 0]">
        <TresBoxGeometry :args="[2, 2, 2]" />
        <TresMeshBasicMaterial color="#ffffff" :wireframe="wireframe" />
      </TresMesh>

      <Suspense>
        <EffectComposerPmndrs>
          <SMAAPmndrs
            :debug="Number(debug)"
            :blendFunction="blendFunction"
            :opacity="opacity"
            :preset="preset"
            :predicationMode="predicationMode"
            :edgeDetectionMode="edgeDetectionMode"
          />
        </EffectComposerPmndrs>
      </Suspense>
    </TresCanvas>

    <div class="playground-smaa-divider"></div>
  </div>
</template>

<style scoped>
.playground-smaa-canvas-left {
  position: absolute;
  inset: 0;
  z-index: 1;
  clip-path: inset(0 50% 0 0);
  -webkit-clip-path: inset(0 50% 0 0);
}

.playground-smaa-canvas-right {
  position: absolute;
  inset: 0;
  z-index: 2;
  pointer-events: none;
  clip-path: inset(0 0 0 50%);
  -webkit-clip-path: inset(0 0 0 50%);
}

.playground-smaa-divider {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  width: 2px;
  background: red;
  z-index: 3;
  pointer-events: none;
}

.playground-smaa-infos {
  margin: 0 auto;
  width: calc(100% - 2rem);
  padding: 1rem;
  text-align: center;
  color: #fff;
  background: rgba(0, 0, 0, 0.65);
  z-index: 5;
  top: 0;
  left: 0;
}
</style>
