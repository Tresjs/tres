<script setup lang="ts">
import { OrbitControls, Text } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { NoToneMapping, SRGBColorSpace } from 'three'
import { ref } from 'vue'
import { useControls } from '@tresjs/leches'

const uuid = inject(`uuid`)

const gl = {
  clearColor: '#1a1a1a',
  alpha: false,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}

const reactiveText = ref('Hello TresJS — render crisp, scalable SDF text from real font files.')

const {
  fontSize,
  color,
  maxWidth,
  textAlign,
  anchorX,
  outlineWidth,
  outlineColor,
  strokeWidth,
} = useControls({
  fontSize: { value: 0.6, min: 0.1, max: 2, step: 0.05 },
  color: '#ffffff',
  maxWidth: { value: 6, min: 1, max: 12, step: 0.5 },
  textAlign: { value: 'center', options: ['left', 'center', 'right', 'justify'] },
  anchorX: { value: 'center', options: ['left', 'center', 'right'] },
  outlineWidth: { value: 0, min: 0, max: 0.1, step: 0.005 },
  outlineColor: '#000000',
  strokeWidth: { value: 0, min: 0, max: 0.05, step: 0.002 },
}, { uuid })
</script>

<template>
  <div class="bg-gray-100 flex justify-center absolute top-0 left-0 w-full h-full">
    <input
      v-model="reactiveText"
      class="p-2 m-2 rounded-md bg-white border text-red-500 border-gray-400"
    />
  </div>
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[0, 0, 6]" />
    <OrbitControls />
    <Text
      :text="reactiveText"
      :font-size="fontSize"
      :color="color"
      :max-width="maxWidth"
      :text-align="textAlign"
      :anchor-x="anchorX"
      anchor-y="middle"
      :outline-width="outlineWidth"
      :outline-color="outlineColor"
      :stroke-width="strokeWidth"
      stroke-color="#ff0000"
    />
    <TresAmbientLight :intensity="1" />
  </TresCanvas>
</template>
