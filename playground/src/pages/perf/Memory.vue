<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { BasicShadowMap, SRGBColorSpace, NoToneMapping } from 'three'
import { StatsGl } from '@tresjs/cientos'

import { TresLeches, useControls } from '@tresjs/leches'
import '@tresjs/leches/styles'

const gl = {
  clearColor: '#82DBC5',
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
const boxRef = ref(null)
</script>

<template>
  <TresLeches />
  <TresCanvas v-bind="gl">
    <StatsGl />
    <TresPerspectiveCamera
      :position="[3, 3, 3]"
      :look-at="[0, 0, 0]"
    />
    <!--  <TresGroup  v-if="isVisible">
      <TresMesh ref="boxRef" :position="[0,0,0]">
        <TresBoxGeometry />
        <TresMeshToonMaterial :color="0x00ff00" />
      </TresMesh>
    </TresGroup> -->
    <Suspense>
      <BlenderCube v-if="isVisible" />
    </Suspense>
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