<script setup lang="ts">
import { TresCanvas, useRenderLoop } from '@tresjs/core'
import { BasicShadowMap, sRGBEncoding, NoToneMapping, Color, AdditiveBlending, BufferAttribute } from 'three'
import gsap from 'gsap'

import { OrbitControls, useTweakPane } from '@tresjs/cientos'

import vertexShader from './shaders/vertex.glsl'
import fragmentShader from './shaders/fragment.glsl'

const gl = {
  clearColor: 'black',
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputEncoding: sRGBEncoding,
  toneMapping: NoToneMapping,
}

const parameters = {
  count: 30000,
  size: 20,
  radius: 5,
  branches: 5,
  spin: 4,
  randomness: 0.13,
  randomnessPower: 7.5,
  insideColor: '#b5f28d',
  outsideColor: '#1b3984',
}

const colorInside = new Color(parameters.insideColor)
const colorOutside = new Color(parameters.outsideColor)

const positions = new Float32Array(parameters.count * 3)
const colors = new Float32Array(parameters.count * 3)
const scales = new Float32Array(parameters.count)
const randomness = new Float32Array(parameters.count * 3)

for (let i = 0; i < parameters.count; i++) {
  const i3 = i * 3

  const radius = Math.random() * parameters.radius
  /*  const spinAngle = radius * parameters.spin */
  const spinAngle = 0
  const branchAngle = ((i % parameters.branches) * Math.PI * 2) / parameters.branches

  positions[i3] = Math.cos(branchAngle) * radius // x
  positions[i3 + 1] = 0 // y
  positions[i3 + 2] = Math.sin(branchAngle) * radius // z

  const randomX = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? -1 : 1)
  const randomY = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? -1 : 1)
  const randomZ = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? -1 : 1)

  randomness[i3] = randomX
  randomness[i3 + 1] = randomY
  randomness[i3 + 2] = randomZ

  const mixedColor = colorInside.clone()
  mixedColor.lerp(colorOutside, radius / parameters.radius)

  colors[i3 + 0] = mixedColor.r // R
  colors[i3 + 1] = mixedColor.g // G
  colors[i3 + 2] = mixedColor.b // B

  scales[i] = Math.random()
}

const shader = {
  transparent: true,
  depthWrite: false,
  blending: AdditiveBlending,
  vertexColors: true,
  vertexShader,
  fragmentShader,
  uniforms: {
    uTime: { value: 0 },
    uSize: {
      value: parameters.size,
    },
  },
}

function updateGalaxy() {
  if (bufferRef.value) {
    const colorInside = new Color(parameters.insideColor)
    const colorOutside = new Color(parameters.outsideColor)

    const positions = new Float32Array(parameters.count * 3)
    const colors = new Float32Array(parameters.count * 3)
    const scales = new Float32Array(parameters.count)
    const randomness = new Float32Array(parameters.count * 3)
    for (let i = 0; i < parameters.count; i++) {
      const i3 = i * 3

      const radius = Math.random() * parameters.radius
      /*  const spinAngle = radius * parameters.spin */
      const spinAngle = 0
      const branchAngle = ((i % parameters.branches) * Math.PI * 2) / parameters.branches

      positions[i3] = Math.cos(branchAngle) * radius // x
      positions[i3 + 1] = 0 // y
      positions[i3 + 2] = Math.sin(branchAngle) * radius // z

      const randomX = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? -1 : 1)
      const randomY = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? -1 : 1)
      const randomZ = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? -1 : 1)

      randomness[i3] = randomX
      randomness[i3 + 1] = randomY
      randomness[i3 + 2] = randomZ

      const mixedColor = colorInside.clone()
      mixedColor.lerp(colorOutside, radius / parameters.radius)

      colors[i3 + 0] = mixedColor.r // R
      colors[i3 + 1] = mixedColor.g // G
      colors[i3 + 2] = mixedColor.b // B

      scales[i] = Math.random()
    }
    bufferRef.value.geometry.setAttribute('position', new BufferAttribute(positions, 3))
    bufferRef.value.geometry.setAttribute('aRandomness', new BufferAttribute(randomness, 3))
    bufferRef.value.geometry.setAttribute('color', new BufferAttribute(colors, 3))
    bufferRef.value.geometry.setAttribute('aScale', new BufferAttribute(scales, 1))
  }
}

const bufferRef = ref(null)

const { onLoop } = useRenderLoop()

onLoop(({ elapsed }) => {
  if (bufferRef.value) {
    bufferRef.value.material.uniforms.uTime.value = elapsed
  }
})

const { pane } = useTweakPane()

pane
  .addInput(parameters, 'count', {
    min: 0,
    max: 100000,
  })
  .on('change', updateGalaxy)
pane
  .addInput(parameters, 'size', {
    min: 0.01,
    max: 40,
    step: 1,
  })
  .on('change', updateGalaxy)
pane
  .addInput(parameters, 'radius', {
    min: 0.1,
    max: 20,
    step: 0.01,
  })
  .on('change', updateGalaxy)
pane
  .addInput(parameters, 'branches', {
    min: 2,
    max: 10,
    step: 1,
  })
  .on('change', updateGalaxy)
pane
  .addInput(parameters, 'spin', {
    min: -5,
    max: 5,
    step: 0.01,
  })
  .on('change', updateGalaxy)
pane
  .addInput(parameters, 'randomness', {
    min: 0.1,
    max: 0.2,
    step: 0.01,
  })
  .on('change', updateGalaxy)
pane.addInput(parameters, 'randomnessPower', { min: 1, max: 10, step: 0.001 }).on('change', updateGalaxy)
pane.addInput(parameters, 'insideColor').on('change', updateGalaxy)
pane.addInput(parameters, 'outsideColor').on('change', updateGalaxy)

onMounted(() => {
  gsap.to('.title', {
    delay: 0.5,
    opacity: 1,
    y: 2,
    display: 'block',
    duration: 0.5,
    ease: 'expo.out',
  })
})
</script>

<template>
  <h1
    class="title font-title text-6xl text-white fixed top-8 transform w-full text-center display-none opacity-0 z-10 pointer-events-none"
  >
    TresJS Galaxy generator 🪐
  </h1>
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[3, 3, 3]" />
    <TresPoints ref="bufferRef">
      <TresBufferGeometry
        :position="[positions, 3]"
        :a-scale="[scales, 1]"
        :color="[colors, 3]"
        :a-randomness="[randomness, 3]"
      />
      <TresShaderMaterial v-bind="shader" />
    </TresPoints>
    <OrbitControls />
  </TresCanvas>
</template>
