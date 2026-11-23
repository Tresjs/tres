<script setup lang="ts">
import vertexShader from './shaders/sparks-vertex.glsl?raw'
import fragmentShader from './shaders/sparks-fragment.glsl?raw'
import type { Box3 } from 'three'
import { AdditiveBlending, Color, Uniform, Vector3 } from 'three'

const props = defineProps<{
  // Flame-mesh local space; sparks are its child, so no transform of their own.
  bounds: Box3
  animator: Vector3
  swell: Uniform<number>
  // Peak of animator.xz, to turn the sway into a flame-relative amplitude.
  swayAmplitude: number
}>()

const COUNT = 140

// Sparks come off the wood, not the flame tip, so they seed inside the footprint.
const SEED_RADIUS = 0.35
const SEED_HEIGHT = 0.08
// Multiples of the flame's size, so the effect survives a rescale of the model.
const RISE = 1.6
const SPREAD = 0.9
const SWAY = 0.6
// Scales travel only: the seed disk stays on the coals and spark size is its own knob.
const BOUNDS_SCALE = 3
const SPARK_SIZE = 0.09
// Lifetimes carry BOUNDS_SCALE too: speed is travel over lifetime, else the embers shoot.
const LIFE_MIN = 1.2
const LIFE_MAX = 2.6

const size = props.bounds.getSize(new Vector3())
const center = props.bounds.getCenter(new Vector3())
const flameRadius = Math.max(size.x, size.z) * 0.5

const positions = new Float32Array(COUNT * 3)
const seeds = new Float32Array(COUNT * 3)
const lives = new Float32Array(COUNT * 2)
const pointSizes = new Float32Array(COUNT)

for (let i = 0; i < COUNT; i++) {
  // sqrt keeps the disk evenly dense; without it the seeds clump in the middle.
  const radius = Math.sqrt(Math.random()) * flameRadius * SEED_RADIUS
  const angle = Math.random() * Math.PI * 2

  positions[i * 3 + 0] = center.x + Math.cos(angle) * radius
  positions[i * 3 + 1] = props.bounds.min.y + size.y * SEED_HEIGHT
  positions[i * 3 + 2] = center.z + Math.sin(angle) * radius

  seeds[i * 3 + 0] = 3 + Math.random() * 5
  seeds[i * 3 + 1] = Math.random()
  seeds[i * 3 + 2] = Math.random()

  // Birth offset spans a whole lifetime, so the stream never launches as one volley.
  const lifetime = (LIFE_MIN + Math.random() * (LIFE_MAX - LIFE_MIN)) * BOUNDS_SCALE
  lives[i * 2 + 0] = Math.random() * lifetime
  lives[i * 2 + 1] = lifetime

  pointSizes[i] = 0.5 + Math.random() * 0.5
}

const uniforms = {
  uTime: new Uniform(0),
  uPixelHeight: new Uniform(1),
  uSparkSize: new Uniform(size.y * SPARK_SIZE),
  uRise: new Uniform(size.y * RISE * BOUNDS_SCALE),
  uSpread: new Uniform(flameRadius * SPREAD * BOUNDS_SCALE),
  uSwayGain: new Uniform(flameRadius * SWAY * BOUNDS_SCALE / props.swayAmplitude),
  uAnimator: new Uniform(props.animator),
  uSwell: props.swell,
  uColorHot: new Uniform(new Color('#ffe6a8')),
  uColorMid: new Uniform(new Color('#ff9d2e')),
  uColorCool: new Uniform(new Color('#ff4d00')),
}

// Points are sized from a world size, which needs the canvas height in device pixels.
const { sizes: canvas } = useTres()

watchEffect(() => {
  uniforms.uPixelHeight.value = canvas.height.value * canvas.pixelRatio.value
})

const { onBeforeRender } = useLoop()

onBeforeRender(({ elapsed }) => {
  uniforms.uTime.value = elapsed
})
</script>

<template>
  <!-- The bounding sphere covers only the seed disk; the shader lifts sparks well above it. -->
  <TresPoints name="Sparks" :frustum-culled="false">
    <TresBufferGeometry
      :position="[positions, 3]"
      :a-seed="[seeds, 3]"
      :a-life="[lives, 2]"
      :a-size="[pointSizes, 1]"
    />
    <TresShaderMaterial
      :vertex-shader="vertexShader"
      :fragment-shader="fragmentShader"
      :uniforms="uniforms"
      :transparent="true"
      :depth-write="false"
      :blending="AdditiveBlending"
    />
  </TresPoints>
</template>
