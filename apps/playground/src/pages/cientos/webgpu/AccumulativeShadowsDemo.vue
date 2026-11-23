<script setup lang="ts">
import { TresCanvas } from '@tresjs/core/webgpu'
import { Box, Environment, Icosahedron, OrbitControls, Sphere } from '@tresjs/cientos/webgpu'
// AccumulativeShadows is left out of `/webgpu`, so this page imports it from the root entry to see
// how it behaves under WebGPURenderer.
import { AccumulativeShadows } from '@tresjs/cientos'
import { TresLeches, useControls } from '@tresjs/leches'
import { NoToneMapping } from 'three'
import BlenderCube from '@/components/BlenderCube.vue'
import { useBackendControl } from '@/composables/useBackendControl'

const uuid = 'webgpu-accumulative-shadows'
const onReady = useBackendControl(uuid)

const { frames, alphaTest, opacity, scale, enabled } = useControls({
  frames: { value: 100, min: 2, max: 200, step: 1 },
  alphaTest: { value: 0.75, min: 0, max: 1, step: 0.01 },
  opacity: { value: 1, min: 0, max: 2, step: 0.1 },
  scale: { value: 12, min: 1, max: 24, step: 1 },
  enabled: true,
}, { uuid })

// ProgressiveLightMap renders into two WebGLRenderTargets, patches a MeshLambertMaterial with
// onBeforeCompile, and the shadow plane uses a GLSL ShaderMaterial (SoftShadowMaterial).
const checks = [
  'The Blender cube model loads above the other objects (useGLTF)',
  'Soft orange shadows build up under all objects over about `frames` frames',
  'The ground plane is not black, white or missing',
  'The console shows one warning that names <AccumulativeShadows> and links to the WebGPU guide',
  'No errors in the console',
]
</script>

<template>
  <TresLeches :uuid="uuid">
    <ul class="list-disc pl-4 text-xs">
      <li v-for="check in checks" :key="check">{{ check }}</li>
    </ul>
  </TresLeches>
  <TresCanvas shadows clear-color="orange" :tone-mapping="NoToneMapping" @ready="onReady">
    <TresPerspectiveCamera :args="[50]" :position="[0, 0.6, 2]" :look-at="[0, 0.5, 0]" />
    <OrbitControls />
    <TresDirectionalLight :position="[5, 10, -10]" :intensity="3.14" />

    <Box :args="[0.4, 0.4, 0.4]" cast-shadow :position="[-0.5, 0.2, -0.3]">
      <TresMeshStandardMaterial color="orange" />
    </Box>
    <Icosahedron :args="[0.3]" cast-shadow :position="[0, 0.3, 0.4]">
      <TresMeshNormalMaterial />
    </Icosahedron>
    <Sphere :scale="0.2" :position="[0.5, 0.4, -0.3]" cast-shadow>
      <TresMeshStandardMaterial color="lightblue" />
    </Sphere>
    <!-- Loads a glTF with useGLTF, so the page also checks that loader on WebGPU. -->
    <BlenderCube :position="[0, 2, 0]" />

    <AccumulativeShadows
      v-if="enabled"
      :frames="frames"
      :alpha-test="alphaTest"
      :opacity="opacity"
      :scale="scale"
      color="orange"
      once
    />
    <Suspense>
      <Environment preset="city" />
    </Suspense>
  </TresCanvas>
</template>
