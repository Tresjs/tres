<script setup lang="ts">
import { AnimatedSprite } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { TresLeches, useControls } from '@tresjs/leches'

const ASSETS_URL = 'https://raw.githubusercontent.com/Tresjs/'
  + 'assets/main/textures/animated-sprite/'

const { fps, paused, loop, flipX, animation } = useControls({
  fps: { value: 15, min: 1, max: 60, step: 1 },
  paused: false,
  loop: true,
  flipX: false,
  animation: { value: 'cientosIdle', options: ['cientosIdle', 'cientosWalk'] },
})
</script>

<template>
  <div class="aspect-video">
    <TresCanvas clear-color="#FBB03B">
      <TresPerspectiveCamera :position="[0, 0, 15]" />
      <Suspense>
        <AnimatedSprite
          :image="`${ASSETS_URL}cientosTexture.png`"
          :atlas="`${ASSETS_URL}cientosAtlas.json`"
          :animation="animation"
          :fps="fps"
          :paused="paused"
          :loop="loop"
          :flip-x="flipX"
        />
      </Suspense>
    </TresCanvas>
  </div>
  <TresLeches :float="false" />
</template>
