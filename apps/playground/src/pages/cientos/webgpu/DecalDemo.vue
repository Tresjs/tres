<script setup lang="ts">
import { TresCanvas } from '@tresjs/core/webgpu'
import { Decal, OrbitControls, useTextures } from '@tresjs/cientos/webgpu'
import type { DecalJsonEntry } from '@tresjs/cientos/webgpu'
import { TresLeches } from '@tresjs/leches'
import { SRGBColorSpace } from 'three'
import { reactive, watch } from 'vue'
import { useBackendControl } from '@/composables/useBackendControl'

const uuid = 'webgpu-decal'
const onReady = useBackendControl(uuid)

const { textures } = useTextures(['/decal/tresjs-dark.png', '/decal/vue.png'])

watch(textures, (value) => {
  if (Array.isArray(value)) {
    value.forEach((texture) => { if (texture) { texture.colorSpace = SRGBColorSpace } })
  }
}, { immediate: true })

const layout = reactive<Record<string, DecalJsonEntry[]>>({
  box: [
    {
      id: 'webgpu-box',
      position: [0.05, 0.05, 1],
      orientation: [0, 0, 0],
      size: [1.54, 0.35, 1],
      zIndex: 0,
      map: 'tresjs-dark.png',
    },
  ],
  sphere: [
    {
      id: 'webgpu-sphere',
      position: [-3.49, 0.27, 0.81],
      orientation: [-0.33, 0.47, 0.12],
      size: [1.1, 1.1, 1],
      zIndex: 0,
      map: 'vue.png',
    },
  ],
})

const checks = [
  'The TresJS logo shows on the front of the box, with no z-fighting',
  'The Vue logo wraps around the sphere surface',
  'The `editable` decal on the box can be dragged',
  'Only the "`editable` is not for production" warning in the console',
]
</script>

<template>
  <TresLeches :uuid="uuid">
    <ul class="list-disc pl-4 text-xs">
      <li v-for="check in checks" :key="check">{{ check }}</li>
    </ul>
  </TresLeches>
  <TresCanvas clear-color="#F6B03B" @ready="onReady">
    <TresPerspectiveCamera :position="[0, 2, 8]" />
    <OrbitControls make-default />

    <TresMesh name="sphere" :position="[-4, 0, 0]">
      <TresSphereGeometry />
      <TresMeshStandardMaterial color="#f6f6f6" />
      <Decal v-model:data="layout.sphere" :map="textures" />
    </TresMesh>

    <TresMesh name="box" :scale="2">
      <TresBoxGeometry />
      <TresMeshStandardMaterial color="#f6f6f6" />
      <Decal v-model:data="layout.box" :map="textures" editable />
    </TresMesh>

    <TresAmbientLight :intensity="1" />
    <TresDirectionalLight :intensity="2" :position="[2, 4, 6]" />
  </TresCanvas>
</template>
