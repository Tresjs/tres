<script setup lang="ts">
import vertexShader from './shaders/fog-volume-vertex.glsl?raw'
import fragmentShader from './shaders/fog-volume-fragment.glsl?raw'
import { BackSide, Color, Uniform, Vector3 } from 'three'
import { FOG_NOISE_PERIOD, getFogNoiseTexture } from './fogNoiseTexture'

// Defaults are the Blender Noise Texture values. detail, roughness and lacunarity are
// baked into the shared 3D texture at mount (fogNoiseTexture.ts); later changes do nothing.
const props = withDefaults(defineProps<{
  position?: [number, number, number]
  scale?: [number, number, number]
  seed?: number
  noiseScale?: number
  // Blender blends fractionally between octave counts; the bake cannot, so this is rounded.
  detail?: number
  roughness?: number
  lacunarity?: number
  distortion?: number
  rampLow?: number
  rampHigh?: number
  color?: [number, number, number]
  // Relative strength tuned by eye, Blender's raymarch is much finer. 0.1..0.5 is the useful range.
  density?: number
  // Two texture fetches per step. The per-pixel jitter hides banding, so 6..12 reads fine.
  steps?: number
  driftSpeed?: number
  renderOrder?: number
}>(), {
  position: () => [0, 0, 0],
  scale: () => [1, 1, 1],
  seed: 0,
  noiseScale: 0.85,
  detail: 4.5,
  roughness: 0.68,
  lacunarity: 2.0,
  distortion: 0.45,
  rampLow: 0.43,
  rampHigh: 0.7,
  color: () => [0.21, 0.65, 0.92],
  density: 0.3,
  driftSpeed: 0.02,
  steps: 10,
  renderOrder: 0,
})

const uniforms = {
  uNoise: new Uniform(getFogNoiseTexture({
    octaves: Math.max(1, Math.round(props.detail)),
    roughness: props.roughness,
    lacunarity: props.lacunarity,
  })),
  uNoisePeriod: new Uniform(FOG_NOISE_PERIOD),
  uColor: new Uniform(new Color().setRGB(...props.color)),
  uScale: new Uniform(new Vector3(...props.scale)),
  uSeed: new Uniform(props.seed),
  uNoiseScale: new Uniform(props.noiseScale),
  uDistortion: new Uniform(props.distortion),
  uRampLow: new Uniform(props.rampLow),
  uRampHigh: new Uniform(props.rampHigh),
  uDensity: new Uniform(props.density),
  uDriftSpeed: new Uniform(props.driftSpeed),
  uTime: new Uniform(0),
}

// A GLSL for-loop needs a compile-time bound, so the step count is a define.
const defines = { STEPS: Math.max(1, Math.round(props.steps)) }

watch(() => props.density, (value) => {
  uniforms.uDensity.value = value
})
watch(() => props.color, (value) => {
  uniforms.uColor.value.setRGB(...value)
})
watch(() => props.scale, (value) => {
  uniforms.uScale.value.set(...value)
})

const { onBeforeRender } = useLoop()

onBeforeRender(({ elapsed }) => {
  uniforms.uTime.value = elapsed
})
</script>

<template>
  <TresMesh
    name="FogVolume"
    :position="position"
    :scale="scale"
    :render-order="renderOrder"
  >
    <TresBoxGeometry :args="[1, 1, 1]" />
    <!-- BackSide so the march also works with the camera inside the box. depthWrite off
         so overlapping boxes blend; renderOrder sorts them back to front by hand. -->
    <TresShaderMaterial
      :vertex-shader="vertexShader"
      :fragment-shader="fragmentShader"
      :uniforms="uniforms"
      :defines="defines"
      :side="BackSide"
      transparent
      :depth-write="false"
    />
  </TresMesh>
</template>
