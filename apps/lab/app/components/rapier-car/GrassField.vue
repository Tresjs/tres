<script setup lang="ts">
import {
  Color,
  DoubleSide,
  Float32BufferAttribute,
  InstancedBufferAttribute,
  InstancedBufferGeometry,
  Mesh,
  ShaderMaterial,
  SRGBColorSpace,
  Uniform,
  Vector2,
  Vector3,
  Sphere,
} from 'three'
import { ImprovedNoise } from 'three/examples/jsm/math/ImprovedNoise'
import { onUnmounted, watch } from 'vue'
import fragmentShader from './shaders/grass/fragment.glsl'
import vertexShader from './shaders/grass/vertex.glsl'
import type { TrampleMap } from './trample'

type ArrayVec2 = [number, number]

const props = withDefaults(defineProps<{
  size?: number
  subdivisions?: number
  roadHalfWidth?: number
  roadLength?: number
  bladeWidth?: number
  bladeHeight?: number
  bladeHeightRandomness?: number
  shadowIntensity?: number
  /** Multiplies the splat color; stands in for scene lighting on this unlit material */
  tint?: string
  diffuseUrl?: string
  windStrength?: number
  windFrequency?: number
  windSpeed?: number
  windDirection?: ArrayVec2
  trample?: TrampleMap | null
}>(), {
  size: 100,
  subdivisions: 600,
  roadHalfWidth: 5,
  roadLength: 80,
  bladeWidth: 0.1,
  bladeHeight: 0.6,
  bladeHeightRandomness: 0.6,
  shadowIntensity: 0.5,
  tint: '#ffffff',
  diffuseUrl: '/textures/grass-splat.webp',
  windStrength: 0.12,
  windFrequency: 0.35,
  windSpeed: 1.6,
  windDirection: () => [1, 0.35],
  trample: null,
})

// Blade template: 5 vertices / 3 triangles, tapering to a tip
const BLADE_POSITIONS = new Float32Array([
  -1, 0, 0,
  1, 0, 0,
  -0.5, 0.7, 0,
  0.5, 0.7, 0,
  0, 1, 0,
])
const BLADE_TIPNESS = new Float32Array([0, 0, 0.7, 0.7, 1])
const BLADE_INDICES = [0, 1, 2, 1, 3, 2, 2, 3, 4]

const noise = new ImprovedNoise()

function buildGeometry() {
  const { size, subdivisions, roadHalfWidth, roadLength } = props
  const half = size / 2
  const cell = size / subdivisions
  const roadHalfLength = roadLength / 2
  const roadMargin = roadHalfWidth + props.bladeWidth

  const anchors: number[] = []
  const randoms: number[] = []
  const yaws: number[] = []
  const heightNoises: number[] = []
  const colorNoises: number[] = []

  for (let ix = 0; ix < subdivisions; ix++) {
    for (let iz = 0; iz < subdivisions; iz++) {
      const x = -half + (ix + Math.random()) * cell
      const z = -half + (iz + Math.random()) * cell

      // Skip the central road strip
      if (Math.abs(x) < roadMargin && Math.abs(z) < roadHalfLength) { continue }

      anchors.push(x, z)
      randoms.push(Math.random())
      yaws.push(Math.random() * Math.PI * 2)

      const h = noise.noise(x * 0.15, z * 0.15, 0)
      heightNoises.push(0.5 + (h * 0.5 + 0.5))

      const c = noise.noise(x * 0.08 + 100, z * 0.08 + 100, 50)
      colorNoises.push(Math.min(1, Math.max(0, c * 0.5 + 0.5)))
    }
  }

  const bladeCount = randoms.length

  const geometry = new InstancedBufferGeometry()
  geometry.instanceCount = bladeCount
  geometry.setAttribute('position', new Float32BufferAttribute(BLADE_POSITIONS, 3))
  geometry.setAttribute('tipness', new Float32BufferAttribute(BLADE_TIPNESS, 1))
  geometry.setIndex(BLADE_INDICES)
  geometry.setAttribute('anchor', new InstancedBufferAttribute(new Float32Array(anchors), 2))
  geometry.setAttribute('random', new InstancedBufferAttribute(new Float32Array(randoms), 1))
  geometry.setAttribute('yaw', new InstancedBufferAttribute(new Float32Array(yaws), 1))
  geometry.setAttribute('heightNoise', new InstancedBufferAttribute(new Float32Array(heightNoises), 1))
  geometry.setAttribute('colorNoise', new InstancedBufferAttribute(new Float32Array(colorNoises), 1))

  // Instanced bounding sphere is unreliable; keep it generous and skip culling
  geometry.boundingSphere = new Sphere(new Vector3(0, 0, 0), half * 1.5)

  return { geometry, bladeCount }
}

const { geometry, bladeCount } = buildGeometry()

const material = new ShaderMaterial({
  vertexShader,
  fragmentShader,
  side: DoubleSide,
  defines: props.trample ? { USE_TRAMPLE: '' } : {},
  uniforms: {
    uTime: new Uniform(0),
    uBladeWidth: new Uniform(props.bladeWidth),
    uBladeHeight: new Uniform(props.bladeHeight),
    uBladeHeightRandomness: new Uniform(props.bladeHeightRandomness),
    uShadowIntensity: new Uniform(props.shadowIntensity),
    uTint: new Uniform(new Color(props.tint)),
    uFieldSize: new Uniform(props.size),
    uDiffuse: new Uniform(null),
    uWindStrength: new Uniform(props.windStrength),
    uWindFrequency: new Uniform(props.windFrequency),
    uWindSpeed: new Uniform(props.windSpeed),
    uWindDirection: new Uniform(new Vector2(...props.windDirection).normalize()),
    ...(props.trample
      ? {
          uTrampleMap: new Uniform(props.trample.texture),
          uTrampleOrigin: new Uniform(new Vector2(props.trample.originX, props.trample.originZ)),
          uTrampleSize: new Uniform(props.trample.size),
        }
      : {}),
  },
})

// Ground splat map drives the per-blade base color (sampled at the anchor UV)
const { state: diffuse, isLoading } = useTexture(props.diffuseUrl)

watch(diffuse, (texture) => {
  if (!texture) { return }
  texture.colorSpace = SRGBColorSpace
  material.uniforms.uDiffuse.value = texture
})

const grassMesh = new Mesh(geometry, material)
grassMesh.frustumCulled = false

if (import.meta.dev) {
  console.log(`[GrassField] ${bladeCount} blades`)
}

const { onBeforeRender } = useLoop()
onBeforeRender(({ elapsed }) => {
  material.uniforms.uTime.value = elapsed
})

onUnmounted(() => {
  geometry.dispose()
  material.dispose()
})
</script>

<template>
  <primitive v-if="!isLoading" :object="grassMesh" />
</template>
