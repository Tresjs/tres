<script setup lang="ts">
import { BasicShadowMap, SRGBColorSpace, NoToneMapping, Color } from 'three'

const gl = {
  clearColor: '#030303',
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}

const venomSnake = shallowRef<TresObject>()
const directionalLightRef = shallowRef<TresObject>()
const ambientLightRef = shallowRef<TresObject>()
const directionalLightHelperRef = shallowRef<TresObject>()

const ambientLightState = shallowReactive({
  color: '#ffffff',
  intensity: 0.25,
  enabled: true,
})

const directionalLightState = shallowReactive({
  color: '#ffffff',
  intensity: 0.5,
  position: [-8, 7, 2],
  enabled: true,
  helper: true,
})

watchEffect(async () => {
  if (venomSnake.value) {
    const { model } = venomSnake.value
    if (!model) return
    model.scale.set(0.02, 0.02, 0.02)
    model.position.set(0, 4, 0)
    model.traverse(child => {
      if (child.isMesh) {
        child.castShadow = true
        child.receiveShadow = true
      }
    })
  }
})

watch(directionalLightRef, light => {
  light.shadow.bias = -0.005
})

const pbrTexture = await useTexture({
  map: 'https://raw.githubusercontent.com/Tresjs/assets/main/textures/black-rock/Rock035_2K_Displacement.jpg',
  displacementMap:
    'https://raw.githubusercontent.com/Tresjs/assets/main/textures/black-rock/Rock035_2K_Displacement.jpg',
  roughnessMap: 'https://raw.githubusercontent.com/Tresjs/assets/main/textures/black-rock/Rock035_2K_Roughness.jpg',
  normalMap: 'https://raw.githubusercontent.com/Tresjs/assets/main/textures/black-rock/Rock035_2K_NormalGL.jpg',
  ambientOcclusion:
    'https://raw.githubusercontent.com/Tresjs/assets/main/textures/black-rock/Rock035_2K_AmbientOcclusion.jpg',
})

const { pane } = useTweakPane()

const ambientLightFolder = pane.addFolder({
  title: 'Ambient Light',
  expanded: true,
})

ambientLightFolder
  .addInput(ambientLightState, 'enabled', {
    label: 'Enabled',
  })
  .on('change', ({ value }) => {
    ambientLightRef.value.visible = value
  })

ambientLightFolder
  .addInput(ambientLightState, 'intensity', {
    label: 'Intensity',
    min: 0,
    max: 10,
    step: 0.1,
  })
  .on('change', ({ value }) => {
    ambientLightRef.value.intensity = value
  })

ambientLightFolder
  .addInput(ambientLightState, 'color', {
    label: 'Color',
  })
  .on('change', ({ value }) => {
    ambientLightRef.value.color = new Color(value)
  })

const directionalLightFolder = pane.addFolder({
  title: 'Directional Light',
  expanded: false,
})

directionalLightFolder
  .addInput(directionalLightState, 'enabled', {
    label: 'Enabled',
  })
  .on('change', ({ value }) => {
    directionalLightRef.value.visible = value
    directionalLightHelperRef.value.visible = value
  })

directionalLightFolder
  .addInput(directionalLightState, 'helper', {
    label: 'Helper',
  })
  .on('change', ({ value }) => {
    directionalLightHelperRef.value.visible = value
  })

directionalLightFolder
  .addInput(directionalLightState, 'intensity', {
    label: 'Intensity',
    min: 0,
    max: 10,
    step: 0.1,
  })
  .on('change', ({ value }) => {
    directionalLightRef.value.intensity = value
  })

directionalLightFolder
  .addInput(directionalLightState, 'color', {
    label: 'Color',
  })
  .on('change', ({ value }) => {
    directionalLightRef.value.color = new Color(value)
    directionalLightHelperRef.value.update()
  })
const axes = ['x', 'y', 'z']
directionalLightState.position.forEach((_, index) => {
  directionalLightFolder
    .addInput(directionalLightState.position, index, {
      label: `Position ${axes[index]}`,
      min: -10,
      max: 10,
      step: 0.01,
    })
    .on('change', ({ value }) => {
      directionalLightRef.value.position[axes[index]] = value
      directionalLightHelperRef.value.update()
    })
})
</script>

<template>
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[11, 11, 11]" :fov="45" :aspect="1" :near="0.1" :far="1000" />
    <OrbitControls />
    <TresGridHelper />
    <Suspense>
      <GLTFModel
        ref="venomSnake"
        path="https://raw.githubusercontent.com/Tresjs/assets/main/models/gltf/venom-snake-sculpt/scene.gltf"
        draco
      />
    </Suspense>

    <Plane :args="[10, 10, 500, 500]" receive-shadow>
      <TresMeshStandardMaterial v-bind="pbrTexture" :displacement-scale="0.6" />
    </Plane>
    <TresAmbientLight ref="ambientLightRef" :color="0xffffff" :intensity="0.25" />
    <TresDirectionalLight ref="directionalLightRef" v-bind="directionalLightState" cast-shadow />
    <TresDirectionalLightHelper
      v-if="directionalLightRef"
      ref="directionalLightHelperRef"
      :args="[directionalLightRef, 5]"
    />
    <TresAmbientLight :intensity="1" />
  </TresCanvas>
</template>
