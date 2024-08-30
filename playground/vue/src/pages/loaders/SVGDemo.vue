<script setup lang="ts">
import { TresCanvas, useRenderLoop } from '@tresjs/core'
import { OrbitControls, SVG } from '@tresjs/cientos'
import { NoToneMapping } from 'three'
import { shallowRef } from 'vue'

const svgTriangleString = `<svg width="404" height="80" viewBox="0 0 404 80" fill="none" 
xmlns="http://www.w3.org/2000/svg">
<path d="M44.5703 5.71662C46.124 3.12726 49.8767 3.12726 51.4303 5.71662L92.3655 73.942C93.9652 
76.6081 92.0447 80 88.9355 80H7.06507C3.95589 80 2.03544 76.6081 3.6351 73.942L44.5703 5.71662Z" 
fill="rgb(130,219,197)" stroke="rgb(130,219,197)" />
</svg>`

const svgSquareString = `<svg width="404" height="80" viewBox="0 0 404 80" 
fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="172" y="2.64999" width="74.7" height="74.7" rx="4" fill="rgb(79,79,79)" stroke="rgb(79,79,79)" />
</svg>`

const svgHeartURL = '/cientos.svg'

const { onLoop } = useRenderLoop()

const skipFillsA = shallowRef(false)
const skipFillsB = shallowRef(true)
const skipFillsC = shallowRef(false)

let cooldown = 0

onLoop(({ delta }) => {
  cooldown -= delta
  while (cooldown <= 0) {
    const skipFillsTmp = skipFillsA.value
    skipFillsA.value = skipFillsC.value
    skipFillsC.value = skipFillsB.value
    skipFillsB.value = skipFillsTmp
    cooldown += 1
  }
})

const gl = {
  clearColor: '#333',
  alpha: true,
  toneMapping: NoToneMapping,
}
</script>

<template>
  <TresCanvas
    v-bind="gl"
    render-mode="on-demand"
  >
    <TresPerspectiveCamera :position="[0, 2, 10]" />
    <TresGridHelper :args="[10, 10]" />
    <TresGroup
      :scale="0.01"
      :position="[-2.1, 1, 0]"
    >
      <Suspense>
        <SVG
          :src="svgTriangleString"
          :skip-fills="skipFillsA"
        />
      </Suspense>
      <Suspense>
        <SVG
          :src="svgSquareString"
          :skip-fills="skipFillsB"
        />
      </Suspense>
      <Suspense>
        <SVG
          :src="svgHeartURL"
          :skip-fills="skipFillsC"
          :position="[321.5, -4, 0]"
        />
      </Suspense>
      <Suspense>
        <SVG
          :src="svgHeartURL"
          :skip-fills="skipFillsC"
          :position="[321.5, -4, 0]"
        />
      </Suspense>
    </TresGroup>
    <TresAmbientLight />
    <TresDirectionalLight />
    <OrbitControls />
  </TresCanvas>
</template>
