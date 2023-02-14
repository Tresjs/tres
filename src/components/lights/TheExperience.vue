<script setup lang="ts">
import { shallowReactive, shallowRef, watch } from 'vue'
import { useTexture, TresInstance } from '@tresjs/core'
import { OrbitControls, Plane, GLTFModel, useTweakPane } from '@tresjs/cientos'
import { BasicShadowMap, Color, NoToneMapping, sRGBEncoding } from 'three'

const state = shallowReactive({
  clearColor: '#030303',
  shadows: true,
  alpha: false,
  physicallyCorrectLights: true,
  shadowMapType: BasicShadowMap,
  outputEncoding: sRGBEncoding,
  toneMapping: NoToneMapping,
})

const venomSnake = shallowRef<TresInstance>()
const directionalLightRef = shallowRef<TresInstance>()
const ambientLightRef = shallowRef<TresInstance>()
const directionalLightHelperRef = shallowRef<TresInstance>()

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

watch(venomSnake, ({ getModel }) => {
  const model = getModel()
  model.scale.set(0.02, 0.02, 0.02)
  model.position.set(0, 4, 0)

  model.traverse(child => {
    if (child.isMesh) {
      child.castShadow = true
      child.receiveShadow = true
    }
  })
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

const rendererFolder = pane.addFolder({
  title: 'Renderer',
  expanded: true,
})

rendererFolder.addInput(state, 'physicallyCorrectLights', {
  label: 'Physically Correct Lights',
})

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
    max: 1,
    step: 0.01,
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
    max: 1,
    step: 0.01,
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
  <TresCanvas v-bind="state">
    <OrbitControls />
    <TresPerspectiveCamera :position="[11, 11, 11]" :fov="45" :aspect="1" :near="0.1" :far="1000" />
    <TresScene>
      <GLTFModel
        ref="venomSnake"
        path="https://raw.githubusercontent.com/Tresjs/assets/main/models/gltf/venom-snake-sculpt/scene.gltf"
        draco
      />

      <Plane :args="[10, 10, 500, 500]" receive-shadow>
        <TresMeshStandardMaterial v-bind="pbrTexture" displacement-scale="0.6" />
      </Plane>
      <TresAmbientLight ref="ambientLightRef" :color="0xffffff" :intensity="0.25" />
      <TresDirectionalLight ref="directionalLightRef" v-bind="directionalLightState" cast-shadow />
      <TresDirectionalLightHelper
        v-if="directionalLightRef"
        ref="directionalLightHelperRef"
        :args="[directionalLightRef, 5]"
      />
    </TresScene>
  </TresCanvas>
</template>
