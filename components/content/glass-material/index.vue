<script setup lang="ts">
import { BasicShadowMap, EquirectangularReflectionMapping, NoToneMapping, SRGBColorSpace } from 'three'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'

const gl = {
  clearColor: '#e4e4e4',
  shadows: true,
  alpha: true,
}

const { map, normalMap } = await useTexture({
  map: 'https://raw.githubusercontent.com/Tresjs/assets/main/textures/glass-effect/bg-texture.jpg',
  normalMap: 'https://raw.githubusercontent.com/Tresjs/assets/main/textures/glass-effect/normal-example.jpg',
})

const planeRef = shallowRef(null)

const hdrEquirect = await new RGBELoader().load(
  'https://raw.githubusercontent.com/Tresjs/assets/main/textures/glass-effect/glass-effect.hdr',
  () => {
    hdrEquirect.mapping = EquirectangularReflectionMapping
  },
)

const options = reactive({
  transmission: 1,
  thickness: 0.5,
  roughness: 0,
  envMap: hdrEquirect,
  clearcoatNormalMap: normalMap,
  envMapIntensity: 1.5,
})

const {transmission, thickness, roughness, envMapIntensity, useHDR} = useControls({
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
})

watch([transmission.value, thickness.value, roughness.value, envMapIntensity.value], (state) => {
  state.forEach((value, index) => {
    options[Object.keys(options)[index] as string] = value.value
  })
})

watch(useHDR.value, (value) => {
  options.envMap = value ? hdrEquirect : null
})
</script>

<template>
  <TresLeches/>
  <TresCanvas
    window-size
    v-bind="gl"
  >
    <TresPerspectiveCamera
      :position="[0, 0, 3]"
      :fov="45"
      :aspect="1"
      :near="0.1"
      :far="1000"
    />
    <OrbitControls />
    <TresGridHelper
      :args="[30, 30]"
      :position="[0, -2.5, 0]"
    />
    <TresMesh :position="[-0, 0, 0]">
      <TresIcosahedronGeometry :args="[1, 10]" />
      <TresMeshPhysicalMaterial 
        :transmission="options.transmission" 
        :thickness="options.thickness" 
        :roughness="options.roughness" 
        :env-map="options.envMap" 
        :env-map-intensity="options.envMapIntensity" 
        :clearcoat-normal-map="normalMap"
      />
    </TresMesh>
    <TresMesh
      ref="planeRef"
      :position="[0, 0, -1]"
    >
      <TresPlaneGeometry :args="[5, 5]" />
      <TresMeshBasicMaterial :map="map" />
    </TresMesh>
    <TresDirectionalLight
      :position="[0, 2, 4]"
      :intensity="0.5"
      cast-shadow
    />
    <TresAmbientLight :intensity="0.2" />
  </TresCanvas>
</template>
