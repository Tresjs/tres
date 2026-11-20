<script setup lang="ts">
import { TresCanvas } from '@tresjs/core/webgpu'
import { ContactShadows, OrbitControls } from '@tresjs/cientos/webgpu'
// WebGLRenderer cannot run node materials, so `renderer: webgl` shows the GLSL ContactShadows.
import { ContactShadows as GlslContactShadows } from '@tresjs/cientos'
import { TresLeches, useControls } from '@tresjs/leches'
import type { Mesh } from 'three'
import { NoToneMapping } from 'three'
import { onUnmounted, shallowRef } from 'vue'
import { useBackendControl } from '@/composables/useBackendControl'
import { useRendererSwitch } from '@/composables/useRendererSwitch'

const uuid = 'webgpu-contact-shadows'
const onReady = useBackendControl(uuid)
const rendererFactory = useRendererSwitch(uuid)
const ShadowsComponent = rendererFactory ? GlslContactShadows : ContactShadows

const {
  width,
  height,
  scale,
  far,
  blur,
  smooth,
  opacity,
  resolution,
  freeze,
  color,
  tint,
  depthWrite,
  animate,
} = useControls({
  width: { value: 1, min: 0.1, max: 10, step: 0.1 },
  height: { value: 1, min: 0.1, max: 10, step: 0.1 },
  scale: { value: 10, min: 0.1, max: 30, step: 0.1 },
  far: { value: 10, min: 0.1, max: 30, step: 0.1 },
  blur: { value: 3.5, min: 0, max: 10, step: 0.1 },
  smooth: true,
  opacity: { value: 1, min: 0, max: 1, step: 0.05 },
  resolution: { value: 512, min: 16, max: 1024, step: 16 },
  freeze: false,
  color: { type: 'color', value: '#000000' },
  tint: { type: 'color', value: '#000000' },
  depthWrite: false,
  animate: true,
}, { uuid })

const meshes = [shallowRef<Mesh>(), shallowRef<Mesh>(), shallowRef<Mesh>()]
const [boxRef, icoRef, torusRef] = meshes
const ring = (i: number) => [Math.cos((i / 3) * 2 * Math.PI) * 0.5, 0.5, Math.sin((i / 3) * 2 * Math.PI) * 0.5] as const

const intervalId = setInterval(() => {
  if (!animate.value) { return }
  for (const mesh of meshes) {
    if (!mesh.value) { continue }
    mesh.value.rotation.x += 0.01
    mesh.value.rotation.z += 0.01
  }
}, 20)
onUnmounted(() => clearInterval(intervalId))

const checks = [
  'Three soft shadows on the light grey floor under the box, the icosahedron and the torus knot',
  'The shadows follow the objects while they spin. A shadow is darker where the object is closer to the floor',
  '`blur` softens the edges. `smooth: false` shows the blocky artifacts of a single blur pass',
  '`color` changes the shadow color. `tint` changes the color at the core of the shadow',
  '`width`, `height` and `scale` resize the shadow plane. `far` sets how high an object still casts a shadow',
  '`resolution` makes the shadows sharper or blockier with no errors',
  '`freeze` sets `frames: 1`: the shadows stop following the objects',
  'The result matches `renderer: webgl` (the GLSL ContactShadows). Soft edges are a little different under WebGPU, which blends in linear color space',
  'No errors and no <ContactShadows> WebGPU warning in the console',
]
</script>

<template>
  <TresLeches :uuid="uuid">
    <ul class="list-disc pl-4 text-xs">
      <li v-for="check in checks" :key="check">{{ check }}</li>
    </ul>
  </TresLeches>
  <TresCanvas :renderer="rendererFactory" clear-color="#cccccc" :tone-mapping="NoToneMapping" @ready="onReady">
    <TresPerspectiveCamera :position="[1.5, 2.5, 3]" :fov="45" />
    <OrbitControls />

    <TresMesh ref="boxRef" :position="ring(0)">
      <TresBoxGeometry :args="[0.4, 0.4, 0.4]" />
      <TresMeshNormalMaterial />
    </TresMesh>
    <TresMesh ref="icoRef" :position="ring(1)">
      <TresIcosahedronGeometry :args="[0.3]" />
      <TresMeshNormalMaterial />
    </TresMesh>
    <TresMesh ref="torusRef" :position="ring(2)">
      <TresTorusKnotGeometry :args="[0.4, 0.05, 256, 24, 1, 3]" />
      <TresMeshNormalMaterial />
    </TresMesh>

    <component
      :is="ShadowsComponent"
      :width="width"
      :height="height"
      :scale="scale"
      :far="far"
      :blur="blur"
      :smooth="smooth"
      :opacity="opacity"
      :resolution="resolution"
      :frames="freeze ? 1 : Infinity"
      :color="color"
      :tint="tint"
      :depth-write="depthWrite"
      :position-y="0.0001"
    />
  </TresCanvas>
</template>
