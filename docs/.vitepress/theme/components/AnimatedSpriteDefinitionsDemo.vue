<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { AnimatedSprite } from '@tresjs/cientos'

const ASSETS_URL = 'https://raw.githubusercontent.com/Tresjs/'
  + 'assets/main/textures/animated-sprite/'
</script>

<template>
  <TresCanvas clear-color="#666">
    <TresPerspectiveCamera :position="[0, 0, 15]" />
    <Suspense>
      <AnimatedSprite
        :image="`${ASSETS_URL}cientosTexture.png`"
        :atlas="`${ASSETS_URL}cientosAtlas.json`"
        animation="cientosIdle"
        :definitions="{
          cientosIdle: '0-5, 0(10), 1-2, 3(20), 4-5, 0-5(3)',
        }"
        :fps="15"
        :loop="true"
      />
    </Suspense>
  </TresCanvas>
</template>
