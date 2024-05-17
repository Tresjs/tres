<script setup lang="ts">
// eslint-disable-file vue/attribute-hyphenation
import { MathUtils, Vector3 } from 'three'
import { Sky as SkyImpl } from 'three/examples/jsm/objects/Sky'
import { computed, shallowRef } from 'vue'

export interface SkyProps {
  /**
   * Haziness
   * @param {number} turbidity
   */
  turbidity?: number
  /**
   * [Rayleigh scattering](https://en.wikipedia.org/wiki/Rayleigh_scattering)
   */
  rayleigh?: number
  /**
   * [Mie scattering](https://en.wikipedia.org/wiki/Mie_scattering) amount
   */
  mieCoefficient?: number
  /**
   * [Mie scattering](https://en.wikipedia.org/wiki/Mie_scattering) direction
   */
  mieDirectionalG?: number
  /**
   * Sun's elevation from the horizon, in degrees
   */
  elevation?: number
  /**
   * Sun's [azimuth angle](https://en.wikipedia.org/wiki/Solar_azimuth_angle), in degrees – its horizontal coordinate on the horizon
   */
  azimuth?: number
  /**
   * Sky box scale
   */
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

const skyRef = shallowRef<SkyImpl>()
const skyImpl = new SkyImpl()
const sunPosition = computed(() =>
  getSunPosition(props.azimuth, props.elevation),
)

function getSunPosition(azimuth: number, elevation: number) {
  const phi = MathUtils.degToRad(90 - elevation)
  const theta = MathUtils.degToRad(azimuth)
  return new Vector3().setFromSphericalCoords(1, phi, theta)
}

defineExpose({
  root: skyRef,
  sunPosition: sunPosition.value,
})
</script>

<template>
  <primitive
    ref="skyRef"
    :object="skyImpl"
    :material-uniforms-turbidity-value="props.turbidity"
    :material-uniforms-rayleigh-value="props.rayleigh"
    :material-uniforms-mieCoefficient-value="props.mieCoefficient"
    :material-uniforms-mieDirectionalG-value="props.mieDirectionalG"
    :material-uniforms-sunPosition-value="sunPosition"
    :scale="props.distance"
  />
</template>
