<script setup lang="ts">
import gsap from 'gsap'

import vertexShader from './shaders/vertex.glsl'
import fragmentShader from './shaders/fragment.glsl'
import { Color, AdditiveBlending, BufferAttribute } from 'three'

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
const randomnessArray = new Float32Array(parameters.count * 3)

for (let i = 0; i < parameters.count; i++) {
  const i3 = i * 3

  const radius = Math.random() * parameters.radius
  const branchAngle = ((i % parameters.branches) * Math.PI * 2) / parameters.branches

  positions[i3] = Math.cos(branchAngle) * radius // x
  positions[i3 + 1] = 0 // y
  positions[i3 + 2] = Math.sin(branchAngle) * radius // z

  const randomX = Math.random() ** parameters.randomnessPower * (Math.random() < 0.5 ? -1 : 1)
  const randomY = Math.random() ** parameters.randomnessPower * (Math.random() < 0.5 ? -1 : 1)
  const randomZ = Math.random() ** parameters.randomnessPower * (Math.random() < 0.5 ? -1 : 1)

  randomnessArray[i3] = randomX
  randomnessArray[i3 + 1] = randomY
  randomnessArray[i3 + 2] = randomZ

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
      const branchAngle = ((i % parameters.branches) * Math.PI * 2) / parameters.branches

      positions[i3] = Math.cos(branchAngle) * radius // x
      positions[i3 + 1] = 0 // y
      positions[i3 + 2] = Math.sin(branchAngle) * radius // z

      const randomX = Math.random() ** parameters.randomnessPower * (Math.random() < 0.5 ? -1 : 1)
      const randomY = Math.random() ** parameters.randomnessPower * (Math.random() < 0.5 ? -1 : 1)
      const randomZ = Math.random() ** parameters.randomnessPower * (Math.random() < 0.5 ? -1 : 1)

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

const { onBeforeRender } = useLoop()

onBeforeRender(({ elapsed }) => {
  if (bufferRef.value) {
    bufferRef.value.material.uniforms.uTime.value = elapsed
  }
})

const { count, size, radius, branches, spin, randomness, randomnessPower, insideColor, outsideColor } = useControls({

  count: {
    value: 30000,
    min: 0,
    max: 100000,
    step: 1,
  },
  size: {
    value: 20,
    min: 0.01,
    max: 40,
    step: 1,
  },
  radius: {
    value: 5,
    min: 0.1,
    max: 20,
    step: 0.01,
  },
  branches: {
    value: 5,
    min: 2,
    max: 10,
    step: 1,
  },
  spin: {
    value: 4,
    min: -5,
    max: 5,
    step: 0.01,
  },
  randomness: {
    value: 0.13,
    min: 0.1,
    max: 0.2,
    step: 0.01,
  },
  randomnessPower: {
    value: 7.5,
    min: 1,
    max: 10,
    step: 0.001,
  },
  insideColor: '#b5f28d',
  outsideColor: '#1b3984',
}, {
  uuid: 'galaxy-generator',
})

watch([count, size, radius, branches, spin, randomness, randomnessPower, insideColor, outsideColor], (state) => {
  state.forEach((value, index) => {
    parameters[Object.keys(parameters)[index] as string] = value
  })
  updateGalaxy()
})

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
  <TresPoints ref="bufferRef">
    <TresBufferGeometry :position="[positions, 3]" :a-scale="[scales, 1]" :color="[colors, 3]"
      :a-randomness="[randomnessArray, 3]" />
    <TresShaderMaterial v-bind="shader" />
  </TresPoints>
</template>