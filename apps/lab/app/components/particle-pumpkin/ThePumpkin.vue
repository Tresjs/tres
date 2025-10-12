<script setup lang="ts">
import {
  AmbientLight,
  Points,
  PointsMaterial,
  Vector3,
} from 'three'

import CustomShaderMaterial from 'three-custom-shader-material/vanilla'
import { patchShaders } from './glNosie'
import fragmentShader from './shaders/fragment.glsl?raw'
import vertexShader from './shaders/vertex.glsl?raw'

const context = useTresContext()

context.scene.value.add(new AmbientLight(0x404040))

const { nodes } = useGLTF('/models/particle-pumpkin/pumpkin.glb')

watch(nodes, (newNodes) => {
  console.log(newNodes)
})

// convert object3d to geometry
const pumpkin = computed(() => nodes.value.Pumpkin)

watch(pumpkin, (newPumpkin) => {
  newPumpkin.geometry?.scale(0.025, 0.025, 0.025)
})


const pointsParentGeometry = computed(() => pumpkin.value?.geometry?.clone())

const baseMaterial = new PointsMaterial({
  color: '#ffffff',
  size: 0.00625,
  sizeAttenuation: true,
})

// const customShader = new

const shaderMaterial = new CustomShaderMaterial({
  baseMaterial,
  vertexShader: patchShaders(vertexShader),
  fragmentShader: patchShaders(fragmentShader),
  uniforms: {
    uTime: { value: 0 },
    // get the window size
    uResolution: {
      value: new Vector3(window.innerWidth, window.innerHeight, 1),
    },
  },
})

const points = computed(() => new Points(pointsParentGeometry.value, shaderMaterial))

watch(points, (newPoints) => {
  context.scene.value.add(newPoints)
})


const { onBeforeRender } = useLoop()

onBeforeRender(({ elapsed }) => {
  if (points.value) {
    points.value.rotation.y += 0.005

    points.value.position.y = Math.sin(elapsed * 0.75) * 0.125
  }

  shaderMaterial.uniforms.uTime.value += 0.001
})
</script>

<template>
  <TresMesh :geometry="points.geometry" :material="points.material" />
</template>
