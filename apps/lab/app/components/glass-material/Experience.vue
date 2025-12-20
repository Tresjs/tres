<script setup lang="ts">
import { EquirectangularReflectionMapping } from 'three'
import { RGBELoader } from 'three-stdlib'

const { transmission, thickness, roughness, envMapIntensity, useHDR } = useControls({
  transmission: {
    value: 1,
    min: 0,
    max: 1,
    step: 0.01,
  },
  thickness: {
    value: 0.5,
    min: 0,
    max: 1,
    step: 0.01,
  },
  roughness: {
    value: 0,
    min: 0,
    max: 1,
    step: 0.01,
  },
  envMapIntensity: {
    value: 1.5,
    min: 0,
    max: 3,
    step: 0.1,
  },
  useHDR: true,
},{
  uuid: 'glass-material-experiment',
})

const { state: map } = useTexture('https://raw.githubusercontent.com/Tresjs/assets/main/textures/glass-effect/bg-texture.jpg')
const { state: normalMap } = useTexture('https://raw.githubusercontent.com/Tresjs/assets/main/textures/glass-effect/normal-example.jpg')
const { state: hdrEquirect } = useLoader(RGBELoader, 'https://raw.githubusercontent.com/Tresjs/assets/main/textures/glass-effect/glass-effect.hdr')


watch(hdrEquirect, (value) => {
  if (value) {
    value.mapping = EquirectangularReflectionMapping
  }
})

const envMap = computed(() => {
  return useHDR?.value ? hdrEquirect.value : null
})

</script>
<template>
  <TresPerspectiveCamera :position="[0, 0, 3]" :fov="45" :aspect="1" :near="0.1" :far="1000" />
  <OrbitControls />
  <TresGridHelper :args="[30, 30]" :position="[0, -2.5, 0]" />
  <TresMesh>
    <TresIcosahedronGeometry :args="[1, 10]" />
    <TresMeshPhysicalMaterial v-if="normalMap" :transmission="transmission" :thickness="thickness"
      :roughness="roughness" :env-map="envMap" :env-map-intensity="envMapIntensity" :clearcoat-normal-map="normalMap" />
  </TresMesh>
  <Suspense>
    <TresMesh :position="[0, 0, -1]">
      <TresPlaneGeometry :args="[5, 5]" />
      <TresMeshBasicMaterial v-if="map" :map="map" />
    </TresMesh>
  </Suspense>
  <TresDirectionalLight :position="[0, 2, 4]" :intensity="0.5" cast-shadow />
  <TresAmbientLight :intensity="0.2" />
</template>