<script setup lang="ts">
import { MathUtils, Vector3 } from 'three'
import { Sky as SkyImpl } from 'three/examples/jsm/objects/Sky'
import { watch } from 'vue'

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
  azimuth: 0,
  distance: 450000,
})

const skyImpl = new SkyImpl()
{
  const uniforms = skyImpl.material.uniforms
  uniforms.sunPosition.value = getSunPosition(props.azimuth, props.elevation)
  uniforms.mieCoefficient.value = props.mieCoefficient
  uniforms.mieDirectionalG.value = props.mieDirectionalG
  watch(() => [props.azimuth, props.elevation],
    () => getSunPosition(props.azimuth, props.elevation, uniforms.sunPosition.value))
  watch(() => [props.mieCoefficient], () => skyImpl.material.uniforms.mieCoefficient.value = props.mieCoefficient)
  watch(() => [props.mieDirectionalG], () => skyImpl.material.uniforms.mieDirectionalG.value = props.mieDirectionalG)
}

function getSunPosition(azimuth: number, elevation: number, v?: Vector3) {
  if (!v) {
    v = new Vector3(0, 0, 0)
  }
  const phi = MathUtils.degToRad(90 - elevation)
  const theta = MathUtils.degToRad(azimuth)
  return v.setFromSphericalCoords(1, phi, theta)
}
</script>

<template>
  <primitive
    :object="skyImpl"
    :material-uniforms-turbidity-value="props.turbidity"
    :material-uniforms-rayleigh-value="props.rayleigh"
    :scale="props.distance"
  />
</template>