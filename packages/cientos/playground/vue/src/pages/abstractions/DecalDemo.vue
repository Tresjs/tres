<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { Box, Decal,DecalDebugUI, OrbitControls } from '@tresjs/cientos'
import { TresLeches, useControls } from '@tresjs/leches'
import { useTexture } from '@tresjs/cientos'
import { SRGBColorSpace } from 'three'

const gl = {
  clearColor: '#F6B03B',
}

const { enabled, edgeColor, edgeThreshold } = useControls({
  enabled: { value: true, type: 'boolean', label: 'Enabled' },
  edgeColor: { value: '#292929', type: 'color', label: 'Color' },
  edgeThreshold: {
    label: 'Threshold Angle',
    value: 15,
    min: 1,
    max: 100,
    step: 1,
  },
})

const { state: texture } = useTexture('/decal/tresjs-dark.png')
const { state: textureVue } = useTexture('/decal/vue.png')

watch(texture, () => {
  if(!texture.value?.image) return

  texture.value.colorSpace = SRGBColorSpace
})

</script>

<template>
  <TresLeches />

  <DecalDebugUI  />

  <TresCanvas
    v-bind="gl"
  >
    <TresPerspectiveCamera
      :position="[0, 2, 8]"
    />

    <OrbitControls
      make-default
    />

    <TresGridHelper
      :args="[10, 10]"
      :position-y="-.5"
    />

    <TresMesh :scale="2" :position-x="-2">
      <TresBoxGeometry />
      <TresMeshBasicMaterial color="#f6f6f6" />
      <Decal
        :map="textureVue"
        debug
      >
      </Decal>
    </TresMesh>

    <TresMesh :scale="2" :position-x="2">
      <TresBoxGeometry />
      <TresMeshBasicMaterial color="#f6f6f6" />
      <Decal
        :map="texture"
        debug
      >
      </Decal>
    </TresMesh>

  </TresCanvas>
</template>
