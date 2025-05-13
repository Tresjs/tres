<script setup lang="ts">
import { Box } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { TresLeches, useControls } from '@tresjs/leches'
import '@tresjs/leches/styles'

const { cameraType } = useControls({
  cameraType: {
    value: 'perspective',
    options: [{
      text: 'Perspective',
      value: 'perspective',
    }, {
      text: 'Orthographic',
      value: 'orthographic',
    }],
  },
})
</script>

<template>
  <TresLeches />
  <TresCanvas
    clear-color="#82DBC5"
  >
    <TresPerspectiveCamera
      v-if="cameraType === 'perspective'"
      :position="[8, 8, 8]"
      :fov="75"
      :near="0.1"
      :far="1000"
      :look-at="[0, 0, 0]"
    />
    <TresOrthographicCamera
      v-else
      :position="[8, 8, 8]"
      :near="0.1"
      :far="1000"
      :look-at="[0, 0, 0]"
    />
    <Box
      :position="[0, 1, 0]"
      :scale="[2, 2, 2]"
    >
      <TresMeshNormalMaterial color="teal" />
    </Box>
    <TresGridHelper />
    <TresAmbientLight :intensity="1" />
    <TresDirectionalLight
      :position="[3, 3, 3]"
      :intensity="1"
    />
  </TresCanvas>
</template>
