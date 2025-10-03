<script setup lang="ts">
import { OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { TresLeches, useControls } from '@tresjs/leches'
import { NoToneMapping } from 'three'
import { BlendFunction, EdgeDetectionMode, PredicationMode, SMAAPreset } from 'postprocessing'
import { EffectComposerPmndrs, SMAAPmndrs } from '@tresjs/post-processing'
import type { PerspectiveCamera } from 'three'
import { ref } from 'vue'


const gl = {
  antialias: false,
  clearColor: '#FC7BAC',
  toneMapping: NoToneMapping,
}

const { blendFunction, debug, autoRotateSpeed, opacity, preset, wireframe, boxColor, predicationMode, edgeDetectionMode } = useControls({
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
    value: SMAAPreset.HIGH,
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
  boxColor: '#ffffff',
  wireframe: false,
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
})

const wrapperRef = ref<HTMLElement | undefined>(undefined)
const cameraRef = ref<PerspectiveCamera | null>(null)

const onChange = (e: { object: PerspectiveCamera }) => {
  if (!cameraRef.value) { return }

  cameraRef.value.position.copy(e.object.position)
  cameraRef.value.rotation.copy(e.object.rotation)
  cameraRef.value.zoom = e.object.zoom
  cameraRef.value.quaternion.copy(e.object.quaternion)
}
</script>

<template>
  <div ref="wrapperRef" class="aspect-16/9 relative h-full">
    <TresCanvas
      v-bind="gl"
      class="doc-smaa-canvas-left"
    >
      <TresPerspectiveCamera :position="[0, 2, 3.5]" />
      <OrbitControls :domElement="wrapperRef" auto-rotate :auto-rotate-speed="autoRotateSpeed" :target="[0, 0.25, 0]" @change="onChange" />

      <TresMesh :position="[0, .5, 0]">
        <TresBoxGeometry :args="[2, 2, 2]" />
        <TresMeshBasicMaterial :color="boxColor" :wireframe="wireframe" />
      </TresMesh>
    </TresCanvas>

    <div class="doc-smaa-divider"></div>

    <TresCanvas
      v-bind="gl"
      class="doc-smaa-canvas-right"
    >
      <TresPerspectiveCamera ref="cameraRef" :position="[0, 2, 3.5]" />

      <TresMesh :position="[0, .5, 0]">
        <TresBoxGeometry :args="[2, 2, 2]" />
        <TresMeshBasicMaterial :color="boxColor" :wireframe="wireframe" />
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

    <p class="doc-smaa-info doc-smaa-info-left text-xs font-semibold">⬅️ No SMAA</p>
    <p class="doc-smaa-info doc-smaa-info-right text-xs font-semibold">With SMAA ➡️</p>
  </div>

  <TresLeches :float="false" />
</template>

<style scoped>
.doc-smaa-canvas-left {
  position: absolute !important;
  inset: 0;
  z-index: 1;
  clip-path: inset(0 50% 0 0);
  -webkit-clip-path: inset(0 50% 0 0);
}

.doc-smaa-canvas-right {
  position: absolute !important;
  inset: 0;
  z-index: 2;
  pointer-events: none;
  clip-path: inset(0 0 0 50%);
  -webkit-clip-path: inset(0 0 0 50%);
}

.doc-smaa-divider {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  width: 2px;
  background: red;
  z-index: 3;
  pointer-events: none;
}

.doc-smaa-info {
  position: absolute;
  bottom: 0;
  padding: 0.45rem 0.75rem;
  margin: 0;
  text-align: center;
  color: #fff;
  z-index: 2;
  background: linear-gradient(90deg, #ff2277 0%, #fdb1c8 100%);
}

.doc-smaa-info-left {
  left: 0;
  border-radius: 0px 10px 0px 0px;
}

.doc-smaa-info-right {
  right: 0;
  border-radius: 10px 0px 0px 0px;
}
</style>
