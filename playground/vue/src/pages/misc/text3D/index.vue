<script setup lang="ts">
import { OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { TresLeches, useControls } from '@tresjs/leches'
import Text3D from './Text3D.vue'

import '@tresjs/leches/styles'

const gl = {
  clearColor: '#82DBC5',
  shadows: true,
}

const { isVisible, text } = useControls({
  isVisible: true,
  text: 'TresJS',
})
</script>

<template>
  <TresLeches />
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[3, 3, 3]" />
    <OrbitControls />
    <Suspense>
      <Text3D v-if="isVisible" :text="text" />
    </Suspense>
    <TresAmbientLight :intensity="1" />
  </TresCanvas>
</template>
