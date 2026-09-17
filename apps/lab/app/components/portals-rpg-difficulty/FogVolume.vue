<script setup lang="ts">
import vertexShader from './shaders/fog-volume-vertex.glsl?raw'
import fragmentShader from './shaders/fog-volume-fragment.glsl?raw'
import { BackSide, Color, Uniform, Vector3 } from 'three'
import { FOG_NOISE_PERIOD, getFogNoiseTexture } from './fogNoiseTexture'

// One fake-volumetric fog patch: a unit box the fragment shader raymarches,
// accumulating a noise field along the view ray. Every default is the matching
// value from the MAT_Blue_Mist_* materials in "Dungeon Battle.blend".
//
// detail, roughness and lacunarity are baked into a shared 3D noise texture at
// mount (fogNoiseTexture.ts); changing them afterwards has no effect.
const props = withDefaults(defineProps<{
  // Three.js space (Y-up), already converted from Blender.
  position?: [number, number, number]
  scale?: [number, number, number]
  // The Noise Texture "W" value. Only a seed, so the four boxes do not share a pattern.
  seed?: number
  // Noise Texture "Scale" (0.85 on all four materials).
  noiseScale?: number
  // Noise Texture "Detail" (4.5). Blender blends fractionally between octave
  // counts; the bake cannot, so this is rounded.
  detail?: number
  // Noise Texture "Roughness" (0.68): how much each octave's contribution shrinks.
  roughness?: number
  // Noise Texture "Lacunarity" (2.0): frequency multiplier per octave.
  lacunarity?: number
  // Noise Texture "Distortion" (0.45): domain-warp strength before sampling.
  distortion?: number
  // The Color Ramp's two stops (black at 0.43, white at 0.7).
  rampLow?: number
  rampHigh?: number
  // Principled Volume "Color", linear RGB.
  color?: [number, number, number]
  // Extinction per world unit where the noise is at full strength. Blender's
  // density has the same meaning but its raymarch is much finer, so treat this
  // as a relative strength tuned by eye. 0.1..0.5 is the useful range.
  density?: number
  // Raymarch samples per ray, two texture fetches each. The per-pixel jitter
  // hides banding, so 6..12 reads fine for soft mist.
  steps?: number
  // Blender's mist is a still frame. 0 matches it; a small value keeps it alive.
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

// A GLSL for-loop needs a compile-time bound, so the step count goes in as a
// define rather than a uniform.
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
    <!-- Back faces: the exit face is visible from outside and from inside the
         box, so the march also works with the camera in the mist. depthWrite
         off so overlapping boxes blend instead of clipping each other;
         renderOrder sorts them back to front by hand. -->
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
