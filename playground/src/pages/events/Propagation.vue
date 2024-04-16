<script setup lang="ts">
import { onUnmounted, ref } from 'vue'
import {
  TresCanvas,
} from '@tresjs/core'
import { BasicShadowMap, BoxGeometry, Mesh, MeshBasicMaterial, NoToneMapping, SRGBColorSpace } from 'three'
import { OrbitControls } from '@tresjs/cientos'
import '@tresjs/leches/styles'
import Box from '../../components/Box.vue'

// Create a box geometry and a basic material
const geometry = new BoxGeometry(1, 1, 1)
const material = new MeshBasicMaterial({ color: 0x00FF00 })

// Create a mesh with the geometry and material
const meshWithMaterial = new Mesh(geometry, material)

const gl = {
  clearColor: '#202020',
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}

const showBox = ref(true)

const intervalRef = setInterval(() => {
  // showBox.value = !showBox.value;
}, 1000)

onUnmounted(() => {
  clearInterval(intervalRef)
})
</script>

<template>
  <TresCanvas
    window-size
    v-bind="gl"
    @pointer-missed="event => console.log('pointer-missed', event)"
  >
    <TresPerspectiveCamera
      :position="[0, 0, 6]"
      :look-at="[0, 0, 0]"
    />
    <OrbitControls />

    <TresDirectionalLight
      :intensity="1"
      :position="[1, 1, 1]"
    />
    <TresAmbientLight :intensity="1" />
    <Box
      :position="[0, 1.5, 0]"
      name="A0"
    >
      <Box
        :position="[-0.66, -1, 0]"
        name="B0"
      >
        <Box
          :position="[-0.66, -1, 0]"
          name="C0"
        >
          <Box
            :position="[-0.66, -1, 0]"
            name="D0"
          />
          <Box
            :position="[0.66, -1, 0]"
            name="D1"
          />
        </Box>
        <Box
          :position="[0.66, -1, 0]"
          name="C1"
        >
          <Box
            :position="[0.66, -1, 0]"
            name="D2"
          />
        </Box>
      </Box>
      <Box
        :position="[0.66, -1, 0]"
        name="B1"
      >
        <Box
          :position="[0.66, -1, 0]"
          name="C2"
        >
          <Box
            v-if="showBox"
            :position="[0.66, -1, 0]"
            name="D3"
          />
        </Box>
      </Box>
    </Box>
    <Box
      :position="[0, 1.5, -3]"
      name="A0"
    >
      <Box
        :position="[-0.66, -1, 0]"
        name="B0"
      >
        <Box
          :position="[-0.66, -1, 0]"
          name="C0"
        >
          <Box
            :position="[-0.66, -1, 0]"
            name="D0"
          />
          <Box
            :position="[0.66, -1, 0]"
            name="D1"
          />
        </Box>
        <Box
          :position="[0.66, -1, 0]"
          name="C1"
        >
          <Box
            :position="[0.66, -1, 0]"
            name="D2"
          />
        </Box>
      </Box>
      <Box
        :position="[0.66, -1, 0]"
        name="B1"
      >
        <Box
          :position="[0.66, -1, 0]"
          name="C2"
        >
          <Box
            :position="[0.66, -1, 0]"
            name="D3"
          />
        </Box>
      </Box>
    </Box>
    <Box
      :position="[0, 1.5, -6]"
      name="A0"
    >
      <Box
        :position="[-0.66, -1, 0]"
        name="B0"
      >
        <Box
          :position="[-0.66, -1, 0]"
          name="C0"
        >
          <Box
            :position="[-0.66, -1, 0]"
            name="D0"
          />
          <Box
            :position="[0.66, -1, 0]"
            name="D1"
          />
        </Box>
        <Box
          :position="[0.66, -1, 0]"
          name="C1"
        >
          <Box
            :position="[0.66, -1, 0]"
            name="D2"
          />
        </Box>
      </Box>
      <Box
        :position="[0.66, -1, 0]"
        name="B1"
      >
        <Box
          :position="[0.66, -1, 0]"
          name="C2"
        >
          <Box
            :position="[0.66, -1, 0]"
            name="D3"
          />
        </Box>
      </Box>
    </Box>
  </TresCanvas>
</template>
