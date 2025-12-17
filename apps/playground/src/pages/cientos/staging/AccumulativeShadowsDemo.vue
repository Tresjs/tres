<script setup lang="ts">
import { AccumulativeShadows, Box, Environment, Icosahedron, OrbitControls, Sphere } from '@tresjs/cientos'
import { NoToneMapping } from 'three'
import { TresCanvas } from '@tresjs/core'
import { TresLeches, useControls } from '@tresjs/leches'
import '@tresjs/leches/styles'

const c = useControls({
  frames: { value: 100, min: 2, max: 200, step: 1 },
  once: true,
  accumulate: true,
  limit: { value: 1000, min: 0, max: 10000, step: 10 },
  isLimitInfinite: false,
  blend: { value: 200, min: 2, max: 1000, step: 1 },
  alphaTest: { value: 0.75, min: 0, max: 1, step: 0.01 },
  colorBlend: { value: 2, min: 0, max: 5, step: 0.1 },
  opacity: { value: 2, min: 0, max: 2, step: 0.1 },
  resolution: { value: 2048, min: 16, max: 2048, step: 16 },
  scale: { value: 12, min: 1, max: 24, step: 1 },
  toneMapped: true,
  isOrange: true,
  enabled: true,
})

const x = shallowRef(0)

let intervalId: ReturnType<typeof setInterval>
let elapsed = 0
onMounted(() => {
  intervalId = setInterval(() => {
    elapsed += 1000 / 30
    x.value = Math.sin(elapsed * 0.001)
  }, 1000 / 30)
})

onUnmounted(() => {
  clearInterval(intervalId)
})
</script>

<template>
  <TresLeches />
  <TresCanvas :shadows="true" clear-color="orange" :tone-mapping="NoToneMapping">
    <TresPerspectiveCamera :args="[50]" :position="[0, 0.6, 2]" :look-at="[0, 0.5, 0]" name="mainCam" />

    <OrbitControls />
    <TresDirectionalLight :position="[5, 10, -10]" :intensity="3.14" />
    <Box
      :args="[0.4, 0.4, 0.4]"
      :cast-shadow="true"
      :position="[-0.5, 0.2, -0.3]"
    >
      <TresMeshStandardMaterial color="orange" />
    </Box>
    <Icosahedron
      :args="[0.3]"
      :cast-shadow="true"
      :position="[x, 0.3, 0.4]"
    >
      <TresMeshNormalMaterial />
    </Icosahedron>

    <Sphere
      :scale="0.2"
      :position="[0.5, 0.4, -0.3]"
      :cast-shadow="true"
    >
      <TresMeshStandardMaterial color="lightblue" />
    </Sphere>

    <AccumulativeShadows
      v-if="c.enabled.value.value"
      :accumulate="c.accumulate.value.value"
      :alpha-test="c.alphaTest.value.value"
      :blend="c.blend.value.value"
      :color="c.isOrange.value.value ? 'orange' : 'blue'"
      :color-blend="c.colorBlend.value.value"
      :frames="c.frames.value.value"
      :limit="c.limit.value.value"
      :once="c.once.value.value"
      :opacity="c.opacity.value.value"
      :resolution="c.resolution.value.value"
      :tone-mapped="c.toneMapped.value.value"
      :scale="c.scale.value.value"
    />
    <Suspense>
      <Environment preset="city" />
    </Suspense>
  </TresCanvas>
</template>
