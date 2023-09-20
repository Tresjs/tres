<script setup lang="ts">
import {
  Color,
  MeshBasicMaterial,
  MeshToonMaterial,
  MeshLambertMaterial,
  MeshMatcapMaterial,
  MeshNormalMaterial,
  MeshPhongMaterial,
  MeshPhysicalMaterial,
  MeshStandardMaterial,
  CubeTextureLoader,
} from 'three'

const materialState = shallowReactive({
  color: '#008080',
  metalness: 0.5,
  wireframe: false,
})

const cubeTextureLoader = new CubeTextureLoader()

const environmentMap = cubeTextureLoader.load([
  'https://raw.githubusercontent.com/Tresjs/assets/main/textures/environmentMap/px.jpg',
  'https://raw.githubusercontent.com/Tresjs/assets/main/textures/environmentMap/nx.jpg',
  'https://raw.githubusercontent.com/Tresjs/assets/main/textures/environmentMap/py.jpg',
  'https://raw.githubusercontent.com/Tresjs/assets/main/textures/environmentMap/ny.jpg',
  'https://raw.githubusercontent.com/Tresjs/assets/main/textures/environmentMap/pz.jpg',
  'https://raw.githubusercontent.com/Tresjs/assets/main/textures/environmentMap/nz.jpg',
])

const sphereRef = shallowRef()

// Tweakpane

const { pane } = useTweakPane()
pane
  .addInput(materialState, 'color', {
    label: 'Color',
  })
  .on('change', (ev: any) => {
    sphereRef.value.material.color = new Color(ev.value)
  })

pane
  .addInput(materialState, 'wireframe', {
    label: 'Wireframe',
  })
  .on('change', (ev: any) => {
    sphereRef.value.material.wireframe = ev.value
  })

const materialProps = ['metalness', 'roughness']

materialProps.forEach((element) => {
  pane
    .addBlade({
      view: 'slider',
      label: element,
      min: 0,
      max: 1,
      value: 0.5,
    })
    .on('change', (ev: any) => {
      materialState[element] = ev.value
      sphereRef.value.material[element] = ev.value
    })
})

pane
  .addBlade({
    view: 'list',
    label: 'Materials',
    options: [
      { text: 'MeshBasicMaterial', value: MeshBasicMaterial },
      { text: 'MeshToonMaterial', value: MeshToonMaterial },
      /*    { text: 'MeshDepthMaterial', value: MeshDepthMaterial },
      { text: 'MeshDistanceMaterial', value: MeshDistanceMaterial }, */
      { text: 'MeshLambertMaterial', value: MeshLambertMaterial },
      { text: 'MeshMatcapMaterial', value: MeshMatcapMaterial },
      { text: 'MeshNormalMaterial', value: MeshNormalMaterial },
      { text: 'MeshPhongMaterial', value: MeshPhongMaterial },
      { text: 'MeshPhysicalMaterial', value: MeshPhysicalMaterial },
      { text: 'MeshStandardMaterial', value: MeshStandardMaterial },
    ],
    value: MeshToonMaterial,
  })
  .on('change', (ev) => {
    sphereRef.value.material = new ev.value(materialState)

    if (ev.value === MeshStandardMaterial || ev.value === MeshPhysicalMaterial) {
      sphereRef.value.material.envMap = environmentMap
    }
  })
</script>

<template>
  <TresMesh
    ref="sphereRef"
    :position="[0, 1, 0]"
  >
    <TresSphereGeometry :args="[1, 32, 32]" />
    <TresMeshToonMaterial :color="materialState.color" />
  </TresMesh>
</template>
