<script setup lang="ts">
import { OrbitControls, SVG } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'

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
