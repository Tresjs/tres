<script setup lang="ts">
import { AnimatedSprite } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'

const ASSETS_URL = 'https://raw.githubusercontent.com/Tresjs/'
  + 'assets/main/textures/animated-sprite/'
</script>

<template>
  <TresCanvas clear-color="#FBB03B">
    <TresPerspectiveCamera :position="[0, 0, 15]" />
    <Suspense>
      <AnimatedSprite
        :image="`${ASSETS_URL}cientosTexture.png`"
        :atlas="`${ASSETS_URL}cientosAtlas.json`"
        animation="cientosIdle"
        :fps="15"
        :loop="true"
      />
    </Suspense>
  </TresCanvas>
</template>
