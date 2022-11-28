<script setup lang="ts">
import { OrbitControls } from '@tresjs/cientos'
import AkuAku from './AkuAkuCientos.vue'
</script>
<template>
  <Story title="models/GLTF/useGLTF">
    <Variant title="playground">
      <Suspense>
        <TresCanvas clear-color="#82DBC5" shadows alpha>
          <TresPerspectiveCamera :position="[11, 11, 11]" />
          <OrbitControls />
          <TresScene>
            <AkuAku />
            <TresDirectionalLight :position="[-4, 8, 4]" :intensity="1.5" cast-shadow />
          </TresScene>
        </TresCanvas>
      </Suspense>
    </Variant>
  </Story>
</template>
