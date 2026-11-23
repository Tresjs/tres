<script setup lang="ts">
import { TresCanvas } from '@tresjs/core/webgpu'
import { Environment, MeshPortalMaterial, OrbitControls } from '@tresjs/cientos/webgpu'
// WebGLRenderer cannot run node materials, so `renderer: webgl` shows the GLSL MeshPortalMaterial.
import { MeshPortalMaterial as GlslMeshPortalMaterial } from '@tresjs/cientos'
import { TresLeches, useControls } from '@tresjs/leches'
import { NoToneMapping } from 'three'
import { useBackendControl } from '@/composables/useBackendControl'
import { useRendererSwitch } from '@/composables/useRendererSwitch'
import MeshPortalMaterialScene from './MeshPortalMaterialScene.vue'

const uuid = 'webgpu-mesh-portal-material'
const onReady = useBackendControl(uuid)
const rendererFactory = useRendererSwitch(uuid)
const PortalMaterial = rendererFactory ? GlslMeshPortalMaterial : MeshPortalMaterial

const frames = [
  { x: -2.321, z: 0.389, rotationY: 0.4, preset: 'dawn', color: '#fbb03b' },
  { x: 0, z: 0, rotationY: 0, preset: 'night', color: '#7db4ff' },
  { x: 2.321, z: 0.389, rotationY: -0.4, preset: 'sunset', color: '#ff6b9d' },
] as const

const { focused, blend, worldUnits, resolution } = useControls({
  focused: { value: 1, min: 0, max: 2, step: 1 },
  blend: { value: 0, min: 0, max: 1, step: 0.01 },
  worldUnits: false,
  resolution: { value: 1024, min: 64, max: 2048, step: 64 },
}, { uuid })

const checks = [
  'Each plane is a window into its own scene: a spinning torus knot with its own environment background',
  'The world shows the studio environment around the planes, not the portal backgrounds',
  'Orbiting the camera gives parallax through each window, not a flat image',
  '`blend` cross-fades the focused portal over the whole screen. At 1 the screen shows only that portal',
  '`worldUnits` on moves the side portal contents to the world origin',
  '`resolution` makes the window sharper or blurrier',
  'Every control gives about the same result as `renderer: webgl` (the GLSL MeshPortalMaterial)',
  'No errors and no <MeshPortalMaterial> WebGPU warning in the console',
]
</script>

<template>
  <TresLeches :uuid="uuid">
    <ul class="list-disc pl-4 text-xs">
      <li v-for="check in checks" :key="check">{{ check }}</li>
    </ul>
  </TresLeches>
  <TresCanvas :renderer="rendererFactory" clear-color="#050505" :tone-mapping="NoToneMapping" @ready="onReady">
    <TresPerspectiveCamera :position="[0, 0, 7]" :fov="50" :look-at="[0, 0, 0]" />
    <OrbitControls />

    <Suspense>
      <Environment preset="studio" :background="true" :blur="0.5" />
    </Suspense>

    <TresMesh v-for="(f, i) in frames" :key="f.preset" :position="[f.x, 0, f.z]" :rotation="[0, f.rotationY, 0]">
      <TresPlaneGeometry :args="[2, 3]" />
      <!-- The blend takeover covers the whole screen, so only the focused portal blends. -->
      <component
        :is="PortalMaterial"
        :blend="focused === i ? blend : 0"
        :resolution="resolution"
        :world-units="worldUnits"
      >
        <MeshPortalMaterialScene :preset="f.preset" :color="f.color" />
      </component>
    </TresMesh>
  </TresCanvas>
</template>
