<script setup lang="ts">
import { BackSide, Color, MeshBasicNodeMaterial, Vector3 } from 'three/webgpu'
import { Break, cameraPosition, Discard, exp, float, Fn, fract, If, Loop, max, min, modelWorldMatrixInverse, normalize, positionLocal, screenCoordinate, smoothstep, texture3D, time, uniform, varying, vec3, vec4 } from 'three/tsl'
import { FOG_NOISE_PERIOD, getFogNoiseTexture } from './fogNoiseTexture'

// Raymarch through the unit cube, standing in for Blender's Noise Texture -> Color Ramp -> Principled
// Volume. The noise is baked into a tiling 3D texture: two fetches per step, not eight noises.

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

const noise = getFogNoiseTexture({
  octaves: Math.max(1, Math.round(props.detail)),
  roughness: props.roughness,
  lacunarity: props.lacunarity,
})
const tint = uniform(new Color().setRGB(...props.color))
const boxScale = uniform(new Vector3(...props.scale))
const density = uniform(props.density)
const seed = props.seed
const noiseScale = props.noiseScale
const distortion = props.distortion
const rampLow = props.rampLow
const rampHigh = props.rampHigh
const driftSpeed = props.driftSpeed

// A JS number gives the march loop a constant bound.
const STEPS = Math.max(1, Math.round(props.steps))

watch(() => props.density, (value) => {
  density.value = value
})
watch(() => props.color, (value) => {
  tint.value.setRGB(...value)
})
watch(() => props.scale, (value) => {
  boxScale.value.set(...value)
})

const sampleNoise = (p: any) => texture3D(noise, p.div(FOG_NOISE_PERIOD))

const sampleDensity = (local: any) => {
  const p = local.div(noiseScale).add(vec3(seed * 17, time.mul(driftSpeed), seed * 3.7)).toVar()
  const warp = sampleNoise(p).gba.mul(2).sub(1).mul(distortion)
  const n = sampleNoise(p.add(warp)).r
  const ramped = smoothstep(rampLow, rampHigh, n)

  // Fade toward the faces so the bounds do not read as a hard cube.
  const edgeDist = vec3(0.5).sub(local.abs())
  const edgeFade = smoothstep(0, 0.18, min(min(edgeDist.x, edgeDist.y), edgeDist.z))

  return ramped.mul(edgeFade)
}

// The camera is brought into box space once per vertex, not per fragment.
const cameraLocal = varying(modelWorldMatrixInverse.mul(vec4(cameraPosition, 1)).xyz)

const transmittanceNode = Fn(() => {
  const rayDir = normalize(positionLocal.sub(cameraLocal)).toVar()

  // The mesh draws back faces, so the fragment is the exit point; entry is the front face
  // or the camera itself when it sits inside the box.
  const invDir = vec3(1).div(rayDir)
  const t0 = vec3(-0.5).sub(cameraLocal).mul(invDir)
  const t1 = vec3(0.5).sub(cameraLocal).mul(invDir)
  const tMin = min(t0, t1).toVar()
  const tMax = max(t0, t1).toVar()
  const tNear = max(max(max(tMin.x, tMin.y), tMin.z), 0).toVar()
  const tFar = min(min(tMax.x, tMax.y), tMax.z).toVar()
  If(tFar.lessThanEqual(tNear), () => {
    Discard()
  })

  const dt = tFar.sub(tNear).div(STEPS).toVar()
  // World-space step so a stretched box is not denser along its long axis.
  const stepWorld = rayDir.mul(boxScale).length().mul(dt).toVar()
  // Interleaved gradient noise offsets the first step so few steps do not band.
  const offset = fract(fract(screenCoordinate.x.mul(0.06711056).add(screenCoordinate.y.mul(0.00583715))).mul(52.9829189)).toVar()

  // Beer-Lambert: density is the extinction per world unit at full noise.
  const transmittance = float(1).toVar()
  Loop(STEPS, ({ i }: { i: any }) => {
    const t = tNear.add(float(i).add(offset).mul(dt))
    const d = sampleDensity(cameraLocal.add(rayDir.mul(t)))
    transmittance.mulAssign(exp(d.mul(density).mul(stepWorld).negate()))
    If(transmittance.lessThan(0.02), () => {
      Break()
    })
  })

  return float(1).sub(transmittance)
})()

// BackSide so the march also works with the camera inside the box. depthWrite off
// so overlapping boxes blend; renderOrder sorts them back to front by hand.
const material = new MeshBasicNodeMaterial({
  side: BackSide,
  transparent: true,
  depthWrite: false,
  fog: false,
})
material.colorNode = tint
material.opacityNode = transmittanceNode

onUnmounted(() => material.dispose())
</script>

<template>
  <TresMesh
    name="FogVolume"
    :position="position"
    :scale="scale"
    :render-order="renderOrder"
    :material="material"
  >
    <TresBoxGeometry :args="[1, 1, 1]" />
  </TresMesh>
</template>
