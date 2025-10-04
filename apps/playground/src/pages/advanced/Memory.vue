<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { TresLeches, useControls } from '@tresjs/leches'

import { BasicShadowMap, NoToneMapping, SRGBColorSpace } from 'three'

const gl = {
  clearColor: '#fff',
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}

const { isVisible } = useControls({
  isVisible: true,
})

/* const mesh = new Mesh(
  new BoxGeometry(),
  new MeshToonMaterial({ color: 0x00ff00 }),
)
 */

onUnmounted(() => {
  // dispose(mesh)
})
</script>

<template>
  <RouterLink to="/basic">
    Go to another page
  </RouterLink>
  <TresLeches />
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera
      :position="[3, 3, 3]"
      :look-at="[0, 0, 0]"
    />
    <TresGroup v-if="isVisible">
      <TresMesh :position="[0, 0, 0]">
        <TresBoxGeometry />
        <TresMeshToonMaterial :color="0x00FF00" />
      </TresMesh>
    </TresGroup>
    <!--  <Suspense> -->
    <!--    <BlenderC -->ube v-if="isVisible" />
    <!--  </Suspense> -->
    <!-- <TresMesh :position="[0,0,0]" v-if="isVisible">
      <TresBoxGeometry />
      <TresMeshToonMaterial :color="0x00ff00" />
    </TresMesh> -->
    <!--     <TresGridHelper /> -->
    <!-- <TresGroup v-if="isVisible">
      <TresMesh :position="[0,0,0]" >
        <TresBoxGeometry />
        <TresMeshToonMaterial :color="0x00ff00" />
      </TresMesh>
    </TresGroup> -->

    <TresAmbientLight :intensity="1" />
  </TresCanvas>
</template>
