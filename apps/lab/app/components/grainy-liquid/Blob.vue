<script setup lang="ts">
import type { Mesh } from 'three'
import { Vector3, Color } from 'three'
import vertexShader from './shaders/vertex.glsl'
import fragmentShader from './shaders/fragment.glsl'

interface Props {
  colorA?: string
  colorB?: string
  colorC?: string
  speed?: number
  amplitude?: number
}

const props = withDefaults(defineProps<Props>(), {
  colorA: '#6366f1',
  colorB: '#ec4899',
  colorC: '#f1f5f9',
  speed: 0.8,
  amplitude: 0.15
})

const { onBeforeRender } = useLoop()

const blobRef = ref<Mesh | null>(null)

const controlsConfig = {
  amplitude: {
    value: props.amplitude,
    min: 0,
    max: 0.5,
    step: 0.01,
    label: 'Amplitude'
  },
  frequency: {
    value: 1.2,
    min: 0.1,
    max: 3,
    step: 0.1,
    label: 'Frequency'
  },
  speed: {
    value: props.speed,
    min: 0.1,
    max: 2,
    step: 0.1,
    label: 'Speed'
  },
  colorA: props.colorA,
  colorB: props.colorB,
  colorC: props.colorC,
  noiseScale: {
    value: 2.0,
    min: 0.5,
    max: 5,
    step: 0.1,
    label: 'Noise Scale'
  },
  grainIntensity: {
    value: 0.08,
    min: 0,
    max: 0.2,
    step: 0.01,
    label: 'Grain'
  },
  fresnelPower: {
    value: 2.0,
    min: 0.5,
    max: 5,
    step: 0.1,
    label: 'Fresnel'
  }
}

const { amplitude: amplitudeControl, frequency, speed: speedControl, colorA: colorAControl, colorB: colorBControl, colorC: colorCControl, noiseScale, grainIntensity, fresnelPower } = useControls(controlsConfig)

function hexToVector3(hex: string): Vector3 {
  const color = new Color(hex)
  return new Vector3(color.r, color.g, color.b)
}

const uniforms = ref({
  u_time: { value: 0.0 },
  u_amplitude: { value: amplitudeControl.value },
  u_frequency: { value: frequency.value },
  u_speed: { value: speedControl.value },
  u_colorA: { value: hexToVector3(colorAControl.value) },
  u_colorB: { value: hexToVector3(colorBControl.value) },
  u_colorC: { value: hexToVector3(colorCControl.value) },
  u_noiseScale: { value: noiseScale.value },
  u_grainIntensity: { value: grainIntensity.value },
  u_fresnelPower: { value: fresnelPower.value }
})

watch([amplitudeControl, frequency, speedControl, noiseScale, grainIntensity, fresnelPower], () => {
  uniforms.value.u_amplitude.value = amplitudeControl.value
  uniforms.value.u_frequency.value = frequency.value
  uniforms.value.u_speed.value = speedControl.value
  uniforms.value.u_noiseScale.value = noiseScale.value
  uniforms.value.u_grainIntensity.value = grainIntensity.value
  uniforms.value.u_fresnelPower.value = fresnelPower.value
})

watch([colorAControl, colorBControl, colorCControl], () => {
  uniforms.value.u_colorA.value = hexToVector3(colorAControl.value)
  uniforms.value.u_colorB.value = hexToVector3(colorBControl.value)
  uniforms.value.u_colorC.value = hexToVector3(colorCControl.value)
})

onBeforeRender(({ elapsed }) => {
  if (uniforms.value) {
    uniforms.value.u_time.value = elapsed
  }
  
  if (blobRef.value) {
    blobRef.value.rotation.y += 0.005
    blobRef.value.rotation.x += 0.002
  }
})
</script>

<template>
  <TresMesh ref="blobRef">
    <TresIcosahedronGeometry :args="[2, 64]" />
    <TresShaderMaterial 
      :uniforms="uniforms" 
      :vertex-shader="vertexShader"
      :fragment-shader="fragmentShader"
      :transparent="false"
      :side="0"
    />
  </TresMesh>
</template>