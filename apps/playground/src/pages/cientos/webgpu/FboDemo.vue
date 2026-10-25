<script setup lang="ts">
import { TresCanvas } from '@tresjs/core/webgpu'
import { OrbitControls } from '@tresjs/cientos/webgpu'
import { TresLeches, useControls } from '@tresjs/leches'
import { useBackendControl } from '@/composables/useBackendControl'
import { useRendererSwitch } from '@/composables/useRendererSwitch'
import FboScene from './FboScene.vue'

const uuid = 'webgpu-fbo'
const onReady = useBackendControl(uuid)
const rendererFactory = useRendererSwitch(uuid)

// `samples: 1` stalls WebGPURenderer (three r186) with no error, and every WebGPU page after it in
// the same tab runs at about 1 fps. 0 and 4 work. It is an option here so the stall can be reproduced.
const { depth, samples } = useControls({
  depth: false,
  samples: { value: 0, options: [0, 4, 1] },
}, { uuid })

// useFBO creates a WebGLRenderTarget (with a DepthTexture when `depth` is on). FboScene renders
// the scene into it with setRenderTarget/render, the same calls as useFBO's autoRender.
const checks = [
  'The orange box shows the scene from the camera as its texture: the torus, the capsule and the grid',
  'The texture updates as the torus and the capsule rotate',
  '`depth` and `samples: 4` do not break the texture',
  'Known issue: `samples: 1` stalls WebGPU with no error (three r186). Reload the browser tab after trying it',
  'The result matches `renderer: webgl`',
  'No errors in the console',
]
</script>

<template>
  <TresLeches :uuid="uuid">
    <ul class="list-disc pl-4 text-xs">
      <li v-for="check in checks" :key="check">{{ check }}</li>
    </ul>
  </TresLeches>
  <TresCanvas :renderer="rendererFactory" clear-color="#82DBC5" @ready="onReady">
    <TresPerspectiveCamera :position="[0, 0.5, 5]" />
    <OrbitControls />
    <!-- useFBO reads `depth` and `settings` only when it creates the target, so remount on change. -->
    <FboScene :key="`${depth}-${samples}`" :depth="depth" :samples="samples" />
  </TresCanvas>
</template>
