<script setup lang="ts">
import { TresCanvas } from '@tresjs/core/webgpu'
import { AnimatedSprite, OrbitControls } from '@tresjs/cientos/webgpu'
import { TresLeches, useControls } from '@tresjs/leches'
import { useBackendControl } from '@/composables/useBackendControl'

const uuid = 'webgpu-animated-sprite'
const onReady = useBackendControl(uuid)

const ASSETS_URL = 'https://raw.githubusercontent.com/andretchen0/tresjs_assets/'
  + '462ad0f669f78d2c5ed7007b5134b419f646efad/textures/animated-sprite/'

const { frame, animation, asSprite, flipX } = useControls({
  frame: '-',
  animation: { value: 'idle', options: ['idle', 'walk', 'blink'] },
  asSprite: false,
  flipX: false,
}, { uuid })

// AnimatedSprite changes texture offset and repeat every frame, on a plane or on a Sprite.
const checks = [
  'The character animates, with one frame at a time and no bleeding from nearby frames',
  'The `frame` control updates',
  '`asSprite` switches to a Sprite that always faces the camera',
  'The numbered grid on the left plays frames 0 to 15',
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
    <TresPerspectiveCamera :position="[0, 0, 8]" />
    <OrbitControls />
    <Suspense>
      <AnimatedSprite
        :image="`${ASSETS_URL}cientosTexture.png`"
        :atlas="`${ASSETS_URL}cientosAtlas.json`"
        :animation="animation"
        :as-sprite="asSprite"
        :flip-x="flipX"
        :fps="10"
        :scale="2"
        @frame="(frameName) => frame = frameName"
      />
    </Suspense>
    <Suspense>
      <AnimatedSprite
        :image="`${ASSETS_URL}textureWithoutAtlas.png`"
        :atlas="16"
        :animation="[0, 15]"
        :as-sprite="asSprite"
        :fps="10"
        :scale="2"
        :position="[-3, 0, 0]"
      />
    </Suspense>
    <TresGridHelper :args="[10, 10]" :rotation-x="Math.PI / 2" />
  </TresCanvas>
</template>
