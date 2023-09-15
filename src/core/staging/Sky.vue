<script setup lang="ts">
import { MathUtils, Vector3 } from 'three'
import { Sky as SkyImpl } from 'three/examples/jsm/objects/Sky'
import { computed } from 'vue'

export interface SkyProps {
  turbidity?: number
  rayleigh?: number
  mieCoefficient?: number
  mieDirectionalG?: number
  elevation?: number
  azimuth?: number
  distance?: number
}

const props = withDefaults(defineProps<SkyProps>(), {
  turbidity: 3.4,
  rayleigh: 3,
  mieCoefficient: 0.005,
  mieDirectionalG: 0.7,
  elevation: 0.6,
  azimuth: 180,
  distance: 450000,
})

const skyImpl = new SkyImpl()
const sunPosition = computed(() => getSunPosition(props.azimuth, props.elevation))

function getSunPosition(azimuth: number, elevation: number) {
  const phi = MathUtils.degToRad(90 - elevation)
  const theta = MathUtils.degToRad(azimuth)
  return new Vector3().setFromSphericalCoords(1, phi, theta)
}
</script>

<template>
  <primitive
    :object="skyImpl"
    :material-uniforms-turbidity-value="props.turbidity"
    :material-uniforms-rayleigh-value="props.rayleigh"
    :material-uniforms-mieCoefficient-value="props.mieCoefficient"
    :material-uniforms-mieDirectionalG-value="props.mieDirectionalG"
    :material-uniforms-sunPosition-value="sunPosition"
    :scale="props.distance"
  />
</template>