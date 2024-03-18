<!-- eslint-disable no-console -->
<script lang="ts" setup>
import { TresCanvas } from '@tresjs/core'
import { OrbitControls } from '@tresjs/cientos'

const log = (text: string) => {
  console.log(text)
}

const boxOneBlocksPointerEvents = ref(false)
</script>

<template>
  <div>
    <TresCanvas window-size>
      <TresPerspectiveCamera :look-at="[0, 4, 0]" />
      <TresMesh
        :position="[0, 1, 0]"
        :blocks-pointer-events="boxOneBlocksPointerEvents"
      >
        <TresBoxGeometry :args="[1, 1, 1]" />
        <TresMeshNormalMaterial />
      </TresMesh>
      <TresMesh
        :position="[-2, 0, -2]"
        name="box 2"
        @click="log('box 2')"
      >
        <TresBoxGeometry :args="[1, 1, 1]" />
        <TresMeshNormalMaterial />
      </TresMesh>
      <OrbitControls />
      <TresGridHelper />
      <TresAmbientLight :intensity="1" />
    </TresCanvas>
    <input
      v-model="boxOneBlocksPointerEvents"
      type="checkbox"
      style="position: fixed; top:10px; left: 10px;"
    />
  </div>
</template>
