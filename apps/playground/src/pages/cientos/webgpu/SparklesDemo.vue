<script setup lang="ts">
import { TresCanvas } from '@tresjs/core/webgpu'
import { OrbitControls, Sparkles, Sphere } from '@tresjs/cientos/webgpu'
// WebGLRenderer cannot run node materials, so `renderer: webgl` shows the GLSL Sparkles.
import { Sparkles as GlslSparkles } from '@tresjs/cientos'
import { TresLeches, useControls } from '@tresjs/leches'
import { NoToneMapping } from 'three'
import { shallowRef } from 'vue'
import { useBackendControl } from '@/composables/useBackendControl'
import { useRendererSwitch } from '@/composables/useRendererSwitch'

const uuid = 'webgpu-sparkles'
const onReady = useBackendControl(uuid)
const rendererFactory = useRendererSwitch(uuid)
const SparklesComponent = rendererFactory ? GlslSparkles : Sparkles

const lightRef = shallowRef()
const { mix, threshold, size, alpha, lifetimeSec, color } = useControls({
  mix: { value: 0, min: 0, max: 1, step: 0.01 },
  threshold: { value: 0.5, min: 0, max: 1, step: 0.01 },
  size: { value: 1, min: 0, max: 4, step: 0.1 },
  alpha: { value: 1, min: 0, max: 1, step: 0.01 },
  lifetimeSec: { value: 0.4, min: 0.1, max: 3, step: 0.1 },
  color: { type: 'color', value: '#fbb03b' },
}, { uuid })

const onLoop = ({ elapsed }: { elapsed: number }) => {
  if (lightRef.value) {
    lightRef.value.position.x = Math.cos(elapsed) * 2.5
    lightRef.value.position.y = Math.sin(elapsed) * 2.5
    lightRef.value.position.z = Math.sin(lightRef.value.position.y * Math.PI * 0.25) * 2
  }
}

const checks = [
  'Sparkles appear on the sphere vertices that face the small white light, and follow it as it moves',
  'Each sparkle is a soft round dot, bigger near the camera, not a 1-pixel speck',
  'Sparkles rise from the surface and fade out, then wait before they come back',
  '`mix` moves color, size and offset from the light direction to the lifetime',
  '`threshold`, `size`, `alpha`, `lifetimeSec` and `color` change the sparkles at once (`color` after a short delay)',
  'The result matches `renderer: webgl` (the GLSL Sparkles)',
  'No errors and no <Sparkles> WebGPU warning in the console',
]
</script>

<template>
  <TresLeches :uuid="uuid">
    <ul class="list-disc pl-4 text-xs">
      <li v-for="check in checks" :key="check">{{ check }}</li>
    </ul>
  </TresLeches>
  <TresCanvas :renderer="rendererFactory" clear-color="#333" :tone-mapping="NoToneMapping" @ready="onReady" @loop="onLoop">
    <TresPerspectiveCamera :position="[0, 0, 4]" />
    <OrbitControls />
    <TresDirectionalLight ref="lightRef">
      <Sphere color="white" :scale="0.1" />
    </TresDirectionalLight>
    <Sphere :args="[0.5, 64, 64]">
      <TresMeshStandardMaterial color="#222" />
      <component
        :is="SparklesComponent"
        :directional-light="lightRef"
        :mix-alpha="mix"
        :mix-color="mix"
        :mix-offset="mix"
        :mix-size="mix"
        :mix-surface-distance="mix"
        :normal-threshold="threshold"
        :size="size"
        :alpha="alpha"
        :lifetime-sec="lifetimeSec"
        :noise-scale="100"
        :sequence-color="[[0.7, '#82dbc5'], [0.8, color]]"
        :sequence-surface-distance="[0.1, 1.0]"
        :sequence-alpha="[[0.0, 0.1], [0.2, 1.0], [0.9, 1.0]]"
        :sequence-offset="[[0.5, [0, 0, 0]], [0.6, [0, -1, 0]]]"
      />
    </Sphere>
    <TresAmbientLight :intensity="1" />
  </TresCanvas>
</template>
