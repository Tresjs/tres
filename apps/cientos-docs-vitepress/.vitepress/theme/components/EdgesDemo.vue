<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { Box, ContactShadows, Edges, OrbitControls } from '@tresjs/cientos'
import { MOUSE, TOUCH } from 'three'

const gl = {
  clearColor: '#f6f6f6',
  alpha: false,
}

const dataBoxes = [{
  color: '#82DBC5',
  edgeColor: '#505050',
}, {
  color: '#505050',
  edgeColor: 'white',
}, {
  color: '#F6B03B',
  edgeColor: '#505050',
}]
</script>

<template>
  <TresCanvas
    v-bind="gl"
  >
    <TresPerspectiveCamera :position="[0, 2, 5]" />
    <OrbitControls
      make-default
      auto-rotate
      :enableZoom="false"
      :auto-rotate-speed="1"
      :mouseButtons="{ LEFT: MOUSE.ROTATE, RIGHT: MOUSE.NONE }"
      :touches="{ ONE: TOUCH.ROTATE, TWO: TOUCH.NONE }"
    />

    <Box
      v-for="(x, index) in [-1.5, 0, 1.5]"
      :key="`docs-edges-demo-box-${index}`"
      :position="[x, 0, 0]"
    >
      <TresMeshBasicMaterial
        :color="dataBoxes[index].color"
      />
      <Edges :color="dataBoxes[index].edgeColor" />
    </Box>

    <ContactShadows
      :blur="2"
      :resolution="512"
      :opacity=".25"
      :position-y="-1"
    />
  </TresCanvas>
</template>
