<script setup lang="ts">
import { TresCanvas } from '@tresjs/core/webgpu'
import { Html, Levioso, OrbitControls } from '@tresjs/cientos/webgpu'
// WebGLRenderer cannot run node materials, so `renderer: webgl` shows the GLSL Html.
import { Html as GlslHtml } from '@tresjs/cientos'
import { TresLeches, useControls } from '@tresjs/leches'
import { CircleGeometry, NoToneMapping } from 'three'
import { ref, shallowRef } from 'vue'
import { useBackendControl } from '@/composables/useBackendControl'
import { useRendererSwitch } from '@/composables/useRendererSwitch'

const uuid = 'webgpu-html'
const onReady = useBackendControl(uuid)
// `occlude="blending"` cuts holes in the canvas, so the canvas needs an alpha channel.
const rendererFactory = useRendererSwitch(uuid, { alpha: true })
const HtmlComponent = rendererFactory ? GlslHtml : Html

const { transparentMaterial } = useControls({ transparentMaterial: false }, { uuid })

const circleGeometry = shallowRef(new CircleGeometry(0.9, 32))
const isOccluded = ref(false)

const checks = [
  'Each card marked "blending" hides behind the floating shapes, with a clean edge that follows the shape',
  'The "blending" cards show where nothing covers them: no black or colored rectangle in their place',
  'The "sprite" card turns to face the camera when you orbit, and its hole turns with it',
  'The "no transform" card keeps its size on screen when you zoom, and its hole keeps the same size',
  'The "circle" card shows only inside a circle',
  'The "raycast" card hides when the sphere passes in front, and the label below it says so',
  '`transparentMaterial` on: the "blending" cards disappear, because the plane cuts no hole in the canvas. Off: they come back',
  'Same result with `renderer: webgl` (the GLSL Html). No errors and no <Html> WebGPU warning in the console',
]
</script>

<template>
  <TresLeches :uuid="uuid">
    <ul class="list-disc pl-4 text-xs">
      <li v-for="check in checks" :key="check">{{ check }}</li>
    </ul>
  </TresLeches>
  <div class="html-webgpu-demo">
    <TresCanvas
      :renderer="rendererFactory"
      clear-color="#82DBC5"
      :clear-alpha="1"
      alpha
      :tone-mapping="NoToneMapping"
      @ready="onReady"
    >
      <TresPerspectiveCamera :position="[0, 1, 9]" />
      <OrbitControls make-default />

      <Levioso :speed="3" :float-factor="3" :range="[-1, 1]">
        <TresMesh :position="[-3, 1, 1]">
          <TresBoxGeometry />
          <TresMeshNormalMaterial />
        </TresMesh>
      </Levioso>
      <Levioso :speed="2" :float-factor="3" :range="[-1, 1]">
        <TresMesh :position="[0, 1, 1]">
          <TresTorusGeometry :args="[0.5, 0.2, 16, 64]" />
          <TresMeshNormalMaterial />
        </TresMesh>
      </Levioso>
      <Levioso :speed="4" :float-factor="3" :range="[-1, 1]">
        <TresMesh :position="[3, 1, 1]">
          <TresSphereGeometry :args="[0.5, 32, 32]" />
          <TresMeshNormalMaterial />
        </TresMesh>
      </Levioso>

      <component
        :is="HtmlComponent"
        transform
        center
        occlude="blending"
        :transparent-material="transparentMaterial"
        :position="[-3, 1, -1]"
      >
        <div class="card">blending</div>
      </component>

      <component
        :is="HtmlComponent"
        transform
        sprite
        center
        occlude="blending"
        :transparent-material="transparentMaterial"
        :position="[0, 1, -1]"
      >
        <div class="card">blending + sprite</div>
      </component>

      <component
        :is="HtmlComponent"
        center
        occlude="blending"
        :transparent-material="transparentMaterial"
        :position="[3, 1, -1]"
      >
        <div class="card">blending, no transform</div>
      </component>

      <component
        :is="HtmlComponent"
        transform
        center
        occlude="blending"
        :geometry="circleGeometry"
        :transparent-material="transparentMaterial"
        :position="[-1.5, -2, -1]"
      >
        <div class="card circle">circle</div>
      </component>

      <component
        :is="HtmlComponent"
        transform
        center
        occlude
        :position="[1.5, -2, -1]"
        @on-occlude="(occluded: boolean) => isOccluded = occluded"
      >
        <div class="card">raycast</div>
      </component>
      <component :is="HtmlComponent" center :position="[1.5, -2.8, -1]">
        <div class="label">{{ isOccluded ? 'raycast card: occluded' : 'raycast card: visible' }}</div>
      </component>

      <Levioso :speed="3" :float-factor="2" :range="[-0.5, 0.5]">
        <TresMesh :position="[1.5, -2, 1]">
          <TresSphereGeometry :args="[0.4, 32, 32]" />
          <TresMeshNormalMaterial />
        </TresMesh>
      </Levioso>
    </TresCanvas>
  </div>
</template>

<style scoped>
.html-webgpu-demo {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.card {
  padding: 12px 16px;
  background: #1b1c1e;
  color: #fff;
  font-family: sans-serif;
  font-size: 14px;
  white-space: nowrap;
}

.circle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 160px;
  height: 160px;
  padding: 0;
  border-radius: 50%;
  background: #f6b03b;
  color: #1b1c1e;
}

.label {
  padding: 2px 6px;
  background: #fff;
  font-family: sans-serif;
  font-size: 12px;
  white-space: nowrap;
}
</style>
