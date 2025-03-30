<script setup lang="ts">
import { OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { TresLeches, useControls } from '@tresjs/leches'
import { NoToneMapping } from 'three'
import { BlendFunction } from 'postprocessing'
import { EffectComposerPmndrs, FXAAPmndrs } from '@tresjs/post-processing'
import type { PerspectiveCamera } from 'three'
import { ref } from 'vue'

import '@tresjs/leches/styles'

const gl = {
  antialias: false,
  clearColor: '#2e3440',
  toneMapping: NoToneMapping,
}

const { autoRotateSpeed, blendFunction, wireframe, boxColor, opacity, samples, minEdgeThreshold, maxEdgeThreshold, subpixelQuality } = useControls({
  blendFunction: {
    options: Object.keys(BlendFunction).map(key => ({
      text: key,
      value: BlendFunction[key as keyof typeof BlendFunction],
    })),
    value: BlendFunction.SRC,
  },
  samples: {
    value: 12,
    min: 0,
    max: 32,
    step: 1,
  },
  minEdgeThreshold: {
    value: 0.0312,
    min: 0,
    max: 1,
    step: 0.001,
  },
  maxEdgeThreshold: {
    value: 0.125,
    min: 0,
    max: 1,
    step: 0.001,
  },
  subpixelQuality: {
    value: 0.75,
    min: 0,
    max: 1,
    step: 0.01,
  },
  autoRotateSpeed: {
    value: 1,
    min: 0,
    max: 10,
    step: 0.1,
  },
  boxColor: '#ffffff',
  wireframe: false,
  opacity: {
    value: 1,
    min: 0,
    max: 1,
    step: 0.01,
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
      class="doc-fxaa-canvas-left"
    >
      <TresPerspectiveCamera :position="[0, 2, 3.5]" />
      <OrbitControls :domElement="wrapperRef" auto-rotate :auto-rotate-speed="autoRotateSpeed" :target="[0, 0.25, 0]" @change="onChange" />

      <TresMesh :position="[0, .5, 0]">
        <TresBoxGeometry :args="[2, 2, 2]" />
        <TresMeshBasicMaterial :color="boxColor" :wireframe="wireframe" />
      </TresMesh>
    </TresCanvas>

    <div class="doc-fxaa-divider"></div>

    <TresCanvas
      v-bind="gl"
      class="doc-fxaa-canvas-right"
    >
      <TresPerspectiveCamera ref="cameraRef" :position="[0, 2, 3.5]" />

      <TresMesh :position="[0, .5, 0]">
        <TresBoxGeometry :args="[2, 2, 2]" />
        <TresMeshBasicMaterial :color="boxColor" :wireframe="wireframe" />
      </TresMesh>

      <Suspense>
        <EffectComposerPmndrs>
          <FXAAPmndrs
            :blendFunction="Number(blendFunction)"
            :opacity="opacity"
            :samples="samples"
            :maxEdgeThreshold="maxEdgeThreshold"
            :minEdgeThreshold="minEdgeThreshold"
            :subpixelQuality="subpixelQuality"
          />
        </EffectComposerPmndrs>
      </Suspense>
    </TresCanvas>

    <p class="doc-fxaa-info doc-fxaa-info-left text-xs font-semibold">⬅️ No FXAA</p>
    <p class="doc-fxaa-info doc-fxaa-info-right text-xs font-semibold">With FXAA ➡️</p>
  </div>

  <TresLeches :float="false" />
</template>

<style scoped>
.doc-fxaa-canvas-left {
  position: absolute !important;
  inset: 0;
  z-index: 1;
  clip-path: inset(0 50% 0 0);
  -webkit-clip-path: inset(0 50% 0 0);
}

.doc-fxaa-canvas-right {
  position: absolute !important;
  inset: 0;
  z-index: 2;
  pointer-events: none;
  clip-path: inset(0 0 0 50%);
  -webkit-clip-path: inset(0 0 0 50%);
}

.doc-fxaa-divider {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  width: 2px;
  background: red;
  z-index: 3;
  pointer-events: none;
}

.doc-fxaa-info {
  position: absolute;
  bottom: 0;
  padding: 0.45rem 0.75rem;
  margin: 0;
  text-align: center;
  color: #fff;
  z-index: 2;
  background: linear-gradient(90deg, #7a95b1 0%, #517284 100%);
}

.doc-fxaa-info-left {
  left: 0;
  border-radius: 0px 10px 0px 0px;
}

.doc-fxaa-info-right {
  right: 0;
  border-radius: 10px 0px 0px 0px;
}
</style>
