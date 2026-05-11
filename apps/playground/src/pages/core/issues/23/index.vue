<!--
  HMR regression scene — issue #23
  https://github.com/Tresjs/tres/issues/23

  Manual verification steps:
  1. Navigate to /issues/23-hmr-disposal. Confirm scene.children.length reads
     the expected number (ground, box, model group, lights, camera, controls target).
  2. Edit THIS template: add <TresMesh><TresSphereGeometry /><TresMeshStandardMaterial /></TresMesh>.
     Save. Counter should become N+1. No duplicate box or GLTF.
  3. Edit THIS template: remove the sphere. Counter back to N.
  4. Rotate with OrbitControls, then edit THIS template again. Controls target
     should survive (primitive/reference state preservation).
  5. Edit Model.vue script (e.g. change scale). No duplicates.
  6. Open devtools → inspect scene.children → confirm no orphaned Three.js objects.
-->

<script setup lang="ts">
import { OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { computed, ref } from 'vue'
import Model from './Model.vue'

const canvasRef = ref()
const childCount = computed(() => canvasRef.value?.context?.scene?.value?.children?.length ?? 0)
</script>

<template>
  <div style="position: fixed; top: 1rem; left: 1rem; z-index: 10; font-family: monospace; background: #000a; color: #fff; padding: 0.5rem 0.75rem; border-radius: 4px;">
    scene.children.length: {{ childCount }}
  </div>
  <TresCanvas ref="canvasRef" window-size clear-color="#1a1a1a">
    <TresPerspectiveCamera :position="[3, 3, 5]" :look-at="[0, 0, 0]" />
    <OrbitControls />
    <TresAmbientLight :intensity="1" />
    <TresDirectionalLight :position="[5, 5, 5]" :intensity="2" />

    <TresMesh :position="[0, -1, 0]" :rotation="[-Math.PI / 2, 0, 0]">
      <TresPlaneGeometry :args="[10, 10]" />
      <TresMeshStandardMaterial color="#444" />
    </TresMesh>

    <TresMesh :position="[-1.5, 0, 0]">
      <TresBoxGeometry />
      <TresMeshStandardMaterial color="#e56b6f" />
    </TresMesh>

    <Suspense>
      <Model />
    </Suspense>
  </TresCanvas>
</template>
