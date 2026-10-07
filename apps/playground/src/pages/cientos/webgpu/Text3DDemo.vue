<script setup lang="ts">
import { TresCanvas } from '@tresjs/core/webgpu'
import { OrbitControls, Text3D } from '@tresjs/cientos/webgpu'
import { TresLeches, useControls } from '@tresjs/leches'
import { useBackendControl } from '@/composables/useBackendControl'

const uuid = 'webgpu-text-3d'
const onReady = useBackendControl(uuid)

const { text } = useControls({ text: 'You can edit me' }, { uuid })

const fontPath = 'https://raw.githubusercontent.com/Tresjs/assets/main/fonts/FiraCodeRegular.json'

const checks = [
  'The 3D text shows, centered on the grid',
  'Editing the `text` control updates the text',
  'No errors in the console',
]
</script>

<template>
  <TresLeches :uuid="uuid">
    <ul class="list-disc pl-4 text-xs">
      <li v-for="check in checks" :key="check">{{ check }}</li>
    </ul>
  </TresLeches>
  <TresCanvas clear-color="#82DBC5" @ready="onReady">
    <TresPerspectiveCamera :position="[0, 0.5, 5]" />
    <OrbitControls />
    <Suspense>
      <Text3D :text="text" :size="0.3" :font="fontPath" center need-updates>
        <TresMeshNormalMaterial />
      </Text3D>
    </Suspense>
    <TresGridHelper :args="[10, 10]" />
  </TresCanvas>
</template>
