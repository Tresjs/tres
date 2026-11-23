<script setup lang="ts">
import { TresCanvas } from '@tresjs/core/webgpu'
import { Environment, Lightformer, OrbitControls, Sphere } from '@tresjs/cientos/webgpu'
import { TresLeches, useControls } from '@tresjs/leches'
import { watch } from 'vue'
import { useBackendControl } from '@/composables/useBackendControl'
import { reloadWithQuery, useRendererSwitch } from '@/composables/useRendererSwitch'

const uuid = 'webgpu-environment'
const onReady = useBackendControl(uuid)
const rendererFactory = useRendererSwitch(uuid)

const initialMode = new URLSearchParams(location.search).get('mode') === 'preset' ? 'preset' : 'lightformers'

const { mode, preset, background, blur } = useControls({
  mode: { value: initialMode, options: ['lightformers', 'preset'] },
  preset: { value: 'sunset', options: ['sunset', 'studio', 'city', 'forest', 'hangar'] },
  background: true,
  blur: { value: 0, min: 0, max: 1, step: 0.01 },
}, { uuid })

// `mode` reloads the page instead of remounting: unmounting <Environment> with Lightformer
// children throws in EnvironmentScene.dispose() (it removes meshes while traversing).
watch(mode, value => reloadWithQuery('mode', value))

// Two code paths: a preset loads an HDR texture, and children render into a WebGLCubeRenderTarget.
// Lightformers are not drawn in the main scene. They show only in reflections and in the background.
const checks = [
  '`lightformers`: the background shows a red ring, a white strip (left) and a white panel (right). The spheres reflect them and a large panel from the right side',
  '`lightformers`: the result matches `renderer: webgl` (same shapes, same orientation)',
  '`preset`: the HDR shows as background and reflects on the spheres',
  '`blur` blurs the background',
  'No errors in the console',
]
</script>

<template>
  <TresLeches :uuid="uuid">
    <ul class="list-disc pl-4 text-xs">
      <li v-for="check in checks" :key="check">{{ check }}</li>
    </ul>
  </TresLeches>
  <TresCanvas
    :renderer="rendererFactory"
    clear-color="#82DBC5"
    @ready="onReady"
  >
    <TresPerspectiveCamera :position="[0, 0.5, 7]" />
    <OrbitControls />

    <Suspense v-if="initialMode === 'preset'">
      <Environment :preset="preset" :background="background" :blur="blur" />
    </Suspense>
    <Suspense v-else>
      <Environment :background="background" :blur="blur">
        <!-- Behind the spheres and small enough to read as shapes in the background. -->
        <Lightformer :intensity="2" color="red" form="ring" :position="[0, 1.5, -8]" :scale="[3, 3, 1]" />
        <Lightformer :intensity="4" :position="[-5, -0.5, -7]" :scale="[3, 0.4, 1]" />
        <Lightformer :intensity="2" :position="[5, 0.5, -7]" :scale="[2, 3, 1]" />
        <!-- Out of view: shows only as a reflection on the spheres. -->
        <Lightformer :intensity="2" :rotation-y="-Math.PI / 2" :position="[6, 1, 0]" :scale="[10, 5, 1]" />
      </Environment>
    </Suspense>

    <Sphere :args="[0.6, 64, 32]" :position="[-0.8, 0, 0]">
      <TresMeshStandardMaterial :metalness="1" :roughness="0" />
    </Sphere>
    <Sphere :args="[0.6, 64, 32]" :position="[0.8, 0, 0]">
      <TresMeshStandardMaterial :metalness="0.5" :roughness="0.4" color="#82DBC5" />
    </Sphere>
  </TresCanvas>
</template>
