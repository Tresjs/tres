<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { OrbitControls, SVG } from '@tresjs/cientos'

const svgURL = 'https://raw.githubusercontent.com/'
  + 'Tresjs/assets/main/svgs/cientos_heart.svg'
</script>

<template>
  <TresCanvas clear-color="#333">
    <OrbitControls />
    <Suspense>
      <SVG 
        :src="svgURL"
        :position="[-0.4, 1, 0]"
        :scale="0.01"
      />
    </Suspense>
    <TresGridHelper />
  </TresCanvas>
</template>