<script setup lang="ts">
import { reactive } from 'vue'
import { TresCanvas } from '@tresjs/core'
import { Box, OrbitControls, Sphere, StatsGl } from '@tresjs/cientos'

const hotspots = reactive([
  {
    position: [-2, 0, -2],
  },
  {
    position: [0, 0, -2],
  },
  {
    position: [2, 0, -2],
  },
])

const addHotspot = () => {
  const newHotspot = reactive({
    position: [-2, 0, 0],
  })
  hotspots.push(newHotspot)
}

const removeHotspot = () => {
  hotspots.pop()
}

const grow = (event) => {
  event.object.scale.set(1.5, 1.5, 1.5)
}

const shrink = (event) => {
  event.object.scale.set(1, 1, 1)
}
</script>

<template>
  <TresCanvas>
    <Suspense>
      <StatsGl />
    </Suspense>
    <OrbitControls />
    <TresPerspectiveCamera />
    <TresAmbientLight :args="['white', 0.5]" />
    <Box :position="[0, 0, 0]" :scale="[1, 1, 1]" @click="addHotspot" @context-menu="removeHotspot">
      <TresMeshNormalMaterial />
    </Box>
    <Sphere
      v-for="(hotspot, index) in hotspots"
      :key="index"
      :args="[0.5, 16, 16]"
      :position="hotspot.position"
      @click="console.log('click', index)"
      @pointer-enter="grow"
      @pointer-leave="shrink"
    >
      <TresMeshNormalMaterial />
    </Sphere>
  </TresCanvas>
</template>
