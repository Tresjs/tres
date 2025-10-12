<!-- Github Luckystriike: https://github.com/luckystriike22/TresJsPlayground/ -->
<script lang="ts" setup>
import type { Mesh } from 'three';
import { Vector2, Color } from 'three'
import vertexShader from './shaders/vertex.glsl'
import fragmentShader from './shaders/fragment.glsl'

const props = defineProps<{
  analyser: AnalyserNode
  dataArray: Uint8Array
}>()

const { wireframe, colorStart, colorEnd, amplitude } = useControls({
  wireframe: true,
  colorStart: '#ff9900', // bright orange
  colorEnd: '#d7f250',
  amplitude: {
    value: 3,         // default value
    min: 0.1,           // minimum value
    max: 5,             // maximum value
    step: 0.01,         // step size for the slider
    label: 'Amplitude', // optional label
  },
})

// Helper to convert hex to array
function hexToRgbArray(hex: string): [number, number, number] {
  const color = new Color(hex)
  return [color.r, color.g, color.b]
}

// composables
const { onBeforeRender } = useLoop()

// refs
const blobRef = shallowRef<Mesh | null>(null)

onBeforeRender(({ elapsed }) => {
  if (blobRef.value && props.analyser && props.dataArray) {
    props.analyser?.getByteFrequencyData(props.dataArray)

    // calc average frequency
    let sum = 0
    for (let i = 0; i < props.dataArray?.length; i++) {
      sum += props.dataArray[i]
    }

    uniforms.value.u_frequency.value = sum > 0 ? sum / props.dataArray?.length : 0
    uniforms.value.u_time.value = elapsed
    blobRef.value.rotation.x += 0.01
  }
})

// shader
// set props to pass into the shader
const uniforms = ref({
  u_resolution: { type: 'V2', value: new Vector2(window.innerWidth, window.innerHeight) },
  u_time: { type: 'f', value: 0.0 },
  u_frequency: { type: 'f', value: 0.0 },
  u_amplitude: { type: 'f', value: amplitude.value },
  u_colorStart: { type: 'V3', value: hexToRgbArray(colorStart.value) },
  u_colorEnd: { type: 'V3', value: hexToRgbArray(colorEnd.value) },
})

// Watch for color changes and update uniforms
watch([colorStart, colorEnd], ([start, end]) => {
  uniforms.value.u_colorStart.value = hexToRgbArray(start)
  uniforms.value.u_colorEnd.value = hexToRgbArray(end)
})

// Watch for amplitude changes and update the uniform
watch(amplitude, (val) => {
  uniforms.value.u_amplitude.value = val
})
</script>

<template>
  <TresPerspectiveCamera :position="[13, 0, 0]" />
  <OrbitControls />
  <TresMesh ref="blobRef">
    <TresIcosahedronGeometry :args="[4, 80]" />
    <TresShaderMaterial :wireframe="wireframe" :uniforms="uniforms" :fragment-shader="fragmentShader"
      :vertex-shader="vertexShader" />
  </TresMesh>
  <TresDirectionalLight :position="[1, 1, 1]" />
  <TresAmbientLight :intensity="1" />
  <Suspense>
    <EffectComposerPmndrs>
      <VignettePmndrs :darkness="0.9" :offset="0.2" />
    </EffectComposerPmndrs>
  </Suspense>
</template>
