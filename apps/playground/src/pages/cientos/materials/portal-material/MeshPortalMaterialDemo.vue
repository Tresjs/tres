<script setup lang="ts">
import { Environment, MeshPortalMaterial, OrbitControls } from '@tresjs/cientos'
import { useControls } from '@tresjs/leches'
import PortalScene from './PortalScene.vue'

const uuid = 'materials-mesh-portal'
useControls('fpsgraph', { uuid })

// Three portals, each a self-contained scene with its OWN environment preset.
// Distinct backgrounds across portals = proof the per-portal scene context works.
const frames = [
  { x: -2.3, preset: 'dawn', color: '#fbb03b' },
  { x: 0, preset: 'night', color: '#7db4ff' },
  { x: 2.3, preset: 'sunset', color: '#ff6b9d' },
]

const { focused, blend } = useControls({
  focused: { value: 1, min: 0, max: 2, step: 1 },
  blend: { value: 0, min: 0, max: 1, step: 0.01 },
}, { uuid })
</script>

<template>
  <TresPerspectiveCamera :position="[0, 0, 7]" :fov="50" :look-at="[0, 0, 0]" />
  <OrbitControls />

  <!-- The WORLD has its own environment (studio), clearly different from every
       portal. Orbit the camera to see each portal's contents track world-space. -->
  <Suspense>
    <Environment preset="studio" :background="true" :blur="0.5" />
  </Suspense>

  <TresMesh v-for="(f, i) in frames" :key="f.preset" :position="[f.x, 0, 0]">
    <TresPlaneGeometry :args="[2, 3]" />
    <!-- Only the focused portal reacts to the blend slider (the blend takeover is
         full-screen, so blending more than one at a time would conflict). -->
    <MeshPortalMaterial :blend="focused === i ? blend : 0" :resolution="2048">
      <PortalScene :preset="f.preset" :color="f.color" />
    </MeshPortalMaterial>
  </TresMesh>
</template>
