<script setup lang="ts">
/* import { useTexture } from '@tresjs/core' */
import { OrbitControls, Text3D } from '@tresjs/cientos'

/* const matcapTexture = await useTexture(['https://raw.githubusercontent.com/Tresjs/assets/main/textures/matcaps/7.png'])
 */
</script>

<template>
  <Suspense>
    <TresCanvas
      clear-color="#82DBC5"
      shadows
      alpha
      window-size
      power-preference="high-performance"
      preserve-drawing-buffer
      physically-correct-lights
    >
      <OrbitControls />
      <TresPerspectiveCamera :position="[5, 5, 5]" :fov="45" :aspect="1" :near="0.1" :far="1000" />
      <TresScene>
        <Text3D font="https://raw.githubusercontent.com/Tresjs/assets/main/fonts/FiraCodeRegular.json">
          TresJS
          <TresMeshNormalMaterial />
        </Text3D>
        <TresAxesHelper :args="[1]" />
        <TresDirectionalLight :position="[0, 2, 4]" :intensity="2" cast-shadow />
      </TresScene>
    </TresCanvas>
  </Suspense>
</template>
