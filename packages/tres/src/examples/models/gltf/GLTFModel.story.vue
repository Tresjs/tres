<script setup lang="ts">
import { OrbitControls, GLTFModel } from '@tresjs/cientos'
</script>
<template>
  <Story title="models/GLTF/GLTFModel">
    <Variant title="playground">
      <Suspense>
        <TresCanvas clear-color="#82DBC5" shadows alpha>
          <TresPerspectiveCamera :position="[11, 11, 11]" />
          <OrbitControls />
          <TresScene>
            <TresAmbientLight :intensity="0.5" />
            <GLTFModel path="/models/AkuAku.gltf" />
            <TresDirectionalLight :position="[-4, 8, 4]" :intensity="1.5" cast-shadow />
          </TresScene>
        </TresCanvas>
      </Suspense>
    </Variant>
  </Story>
</template>
