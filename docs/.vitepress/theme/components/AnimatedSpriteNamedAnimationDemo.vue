<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { AnimatedSprite } from '@tresjs/cientos'
import { ref } from 'vue'

const ASSETS_URL = 'https://raw.githubusercontent.com/Tresjs/'
  + 'assets/main/textures/animated-sprite/'

const animations = ref(
  ['cientosIdle', 'cientosIdleToWalkTransition', 'cientosWalk'],
)
</script>

<template>
  <TresCanvas clear-color="#82DBC5">
    <TresPerspectiveCamera :position="[0, 0, 15]" />
    <Suspense>
      <AnimatedSprite
        :image="`${ASSETS_URL}cientosTexture.png`"
        :atlas="`${ASSETS_URL}cientosAtlas.json`"
        :animation="animations[0]"
        :fps="15"
        :loop="true"
        @click="() => { animations.push(animations.shift() as string) }"
      />
    </Suspense>
  </TresCanvas>
</template>
