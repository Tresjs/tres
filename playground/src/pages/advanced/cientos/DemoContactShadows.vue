<script setup lang="ts">
import { useControls } from '@tresjs/leches'

import { Box, Icosahedron, Plane } from '@tresjs/cientos'
import { useLoop } from '@tresjs/core'
import ContactShadows from './ContactShadowsLocal.vue'

const boxRef = shallowRef()
const icoRef = shallowRef()

const state = reactive({
  blur: 3.5,
  opacity: 1,
  resolution: 512,
  color: '#0000ff',
  helper: true,
})

const { blur, opacity, resolution, color, helper } = useControls({
  blur: {
    value: state.blur,
    step: 0.1,
    min: 0,
    max: 10,
  },
  opacity: {
    value: state.opacity,
    step: 0.1,
    min: 0,
    max: 1,
  },
  resolution: {
    value: state.resolution,
    step: 1,
    min: 0,
    max: 1024,
  },
  color: {
    type: 'color',
    value: state.color,
  },
  helper: state.helper,
})

/* watch([blur, opacity, resolution, color, helper], () => {
  state.blur = blur
  state.opacity = opacity
  state.resolution = resolution
  state.color = color
  state.helper = helper
}) */

const { onBeforeRender } = useLoop()

onBeforeRender(() => {
  if (boxRef.value) {
    boxRef.value.value.rotation.y += 0.02
    boxRef.value.value.rotation.x += 0.01
  }
  if (icoRef.value) {
    icoRef.value.value.rotation.y += 0.02
    icoRef.value.value.rotation.x += 0.01
  }
})
</script>

<template>
  <Box
    ref="boxRef"
    :args="[0.4, 0.4, 0.4]"
    :position="[0, 1, 0]"
  >
    <TresMeshNormalMaterial />
  </Box>
  <Icosahedron
    ref="icoRef"
    :args="[0.3]"
    :position="[1, 1, 1]"
  >
    <TresMeshNormalMaterial />
  </Icosahedron>

  <Plane
    :args="[10, 10, 10]"
    :position="[0, -0.02, 0]"
  >
    <TresMeshBasicMaterial color="#ffffff" />
  </Plane>
  <ContactShadows
    :blur="state.blur"
    :resolution="state.resolution"
    :opacity="state.opacity"
    :color="state.color"
    :helper="state.helper"
  />
</template>
