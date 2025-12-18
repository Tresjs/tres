<script setup lang="ts">
import { Text3D, useSVG } from '@tresjs/cientos'
import { shallowRef, watch } from 'vue'

// SVG data for demo
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

// Demo state
const currentSVG = shallowRef(svgTriangleString)
const skipFills = shallowRef(false)

// Use the useSVG composable
const { state, isLoading, layers, dispose } = useSVG(currentSVG, {
  skipFills: skipFills.value,
  fillMaterial: { transparent: true, opacity: 0.8 },
  strokeMaterial: { transparent: true, opacity: 0.9 },
  depth: 'renderOrder',
})

// Animation logic - switch between SVGs
const SWITCH_INTERVAL = 3000 // 3 seconds

// Watch for reactive updates to skipFills
watch(skipFills, (_newValue) => {
  // Re-call useSVG with new options when skipFills changes
  // Note: In a real scenario you might want to make this more reactive
})

// Switch between different SVGs for demo
const switchSVG = () => {
  if (currentSVG.value === svgTriangleString) {
    currentSVG.value = svgSquareString
  }
  else {
    currentSVG.value = svgTriangleString
  }
  skipFills.value = !skipFills.value
}

// Auto-switch for demo
setInterval(switchSVG, SWITCH_INTERVAL)

defineExpose({
  state,
  layers,
  dispose,
})
</script>

<template>
  <TresGroup
    v-if="!isLoading && layers.length > 0"
    :scale="0.01"
    :position="[-1, 1, 0]"
  >
    <!-- Render the SVG layers manually using the composable -->
    <TresMesh
      v-for="(layer, index) in layers"
      :key="`layer-${index}`"
      :geometry="layer.geometry"
      :render-order="index"
    >
      <TresMeshBasicMaterial v-bind="layer.material" />
    </TresMesh>

    <!-- Info text -->
    <TresGroup :position="[0, -100, 0]">
      <Text3D
        text="useSVG Composable Demo"
        :size="20"
        :height="2"
        font="/fonts/helvetiker_regular.typeface.json"
      />
    </TresGroup>
  </TresGroup>
</template>
