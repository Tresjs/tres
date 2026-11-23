<script setup lang="ts">
import type { Box3, UniformNode } from 'three/webgpu'
import { AdditiveBlending, Color, InstancedBufferAttribute, Sprite, SpriteNodeMaterial, Vector3 } from 'three/webgpu'
import { usePointScale } from './tsl/usePointScale'
import { cos, dot, float, floor, Fn, fract, instancedBufferAttribute, length, mix, sin, smoothstep, time, uniform, uv, varying, vec2, vec3, vec4 } from 'three/tsl'

const props = defineProps<{
  // Flame-mesh local space; sparks are its child, so no transform of their own.
  bounds: Box3
  animator: Vector3
  swell: UniformNode<number>
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

const sparkSize = uniform(size.y * SPARK_SIZE)
const rise = uniform(size.y * RISE * BOUNDS_SCALE)
const spread = uniform(flameRadius * SPREAD * BOUNDS_SCALE)
const swayGain = uniform(flameRadius * SWAY * BOUNDS_SCALE / props.swayAmplitude)
const animator = uniform(props.animator)
const colorHot = uniform(new Color('#ffe6a8'))
const colorMid = uniform(new Color('#ff9d2e'))
const colorCool = uniform(new Color('#ff4d00'))

const aPosition = instancedBufferAttribute(new InstancedBufferAttribute(positions, 3))
// x: wobble frequency, y and z: hash seeds for the per-cycle drift
const aSeed = instancedBufferAttribute(new InstancedBufferAttribute(seeds, 3))
// x: birth offset, y: lifetime in seconds
const aLife = instancedBufferAttribute(new InstancedBufferAttribute(lives, 2))
const aSize = instancedBufferAttribute(new InstancedBufferAttribute(pointSizes, 1))

const hash21 = Fn(([p]: any[]) => {
  const q = fract(vec3(p.x, p.y, p.x).mul(0.1031)).toVar()
  q.addAssign(dot(q, q.yzx.add(33.33)))
  return fract(q.x.add(q.y).mul(q.z))
}).setLayout({ name: 'sparkHash21', type: 'float', inputs: [{ name: 'p', type: 'vec2' }] })

const life = time.add(aLife.x).div(aLife.y)
const t = fract(life).toVar()
const cycle = floor(life)

// Keyed on the cycle, not time: a spark holds one path per rise, and the paths do not repeat.
const r1 = hash21(vec2(aSeed.y, cycle)).toVar()
const r2 = hash21(vec2(aSeed.z, cycle.add(7.3)))

// t*t is buoyancy; the linear term keeps sparks moving as they leave the coals.
const lift = rise.mul(t.mul(0.35).add(t.mul(t).mul(0.65))).mul(r1.mul(0.6).add(0.7))
const wobble = aSeed.x.mul(t).add(aSeed.y.mul(6.2831))
const driftX = spread.mul(t).mul(sin(wobble).mul(0.6).add(r1.sub(0.5).mul(1.4)))
const driftZ = spread.mul(t).mul(cos(wobble.mul(1.13)).mul(0.6).add(r2.sub(0.5).mul(1.4)))
// Same sway vector the fire light rides, so sparks never lean against the flame.
const sway = animator.xz.mul(swayGain).mul(t)

const material = new SpriteNodeMaterial({
  transparent: true,
  depthWrite: false,
  blending: AdditiveBlending,
  fog: false,
})
material.positionNode = aPosition.add(vec3(driftX.add(sway.x), lift, driftZ.add(sway.y)))
material.scaleNode = aSize.mul(sparkSize).mul(usePointScale()).mul(float(1).sub(t.mul(0.55))).mul(props.swell.mul(0.3).add(0.85))

const age = varying(t)
// The falloff must end inside 0.5 (the sprite corner) or the ember shows a square.
const shape = smoothstep(0.5, 0.12, length(uv().sub(0.5)))
const tint = mix(mix(colorHot, colorMid, smoothstep(0, 0.35, age)), colorCool, smoothstep(0.35, 0.85, age))
// The birth ramp hides the pop-in at the seed point, where every cycle restarts.
const fade = float(1).sub(smoothstep(0.55, 1, age)).mul(smoothstep(0, 0.06, age))
material.colorNode = vec4(tint, shape.mul(fade).mul(props.swell.mul(0.4).add(0.8)))

const sparks = new Sprite(material)
sparks.name = 'Sparks'
sparks.count = COUNT
// The sprite bounds are one quad at the origin; the shader spreads sparks well beyond it.
sparks.frustumCulled = false

onUnmounted(() => material.dispose())
</script>

<template>
  <primitive :object="sparks" />
</template>
