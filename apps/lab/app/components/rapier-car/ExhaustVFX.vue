<script setup lang="ts">
import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  Mesh,
  type Object3D,
  Points,
  ShaderMaterial,
  Vector3,
} from 'three'
import { onUnmounted, shallowRef, watch } from 'vue'

const props = defineProps<{
  /** Exhaust mesh the flames spawn from (emitters derived from its bounds) */
  source?: Object3D | null
  /** Read every frame on purpose (plain object, not reactive): smoothed 0..1 glow + boost */
  state: { level: number, boost: number }
}>()

const MAX_PARTICLES = 700
const EMITTER_SPREAD = 0.28
const BUOYANCY = 2
const DRAG = 2.6

const positions = new Float32Array(MAX_PARTICLES * 3)
const velocities = new Float32Array(MAX_PARTICLES * 3)
const life = new Float32Array(MAX_PARTICLES)
const maxLife = new Float32Array(MAX_PARTICLES)
const aLife = new Float32Array(MAX_PARTICLES)
const aSize = new Float32Array(MAX_PARTICLES)
const aHeat = new Float32Array(MAX_PARTICLES)
const aSeed = new Float32Array(MAX_PARTICLES)

const geometry = new BufferGeometry()
geometry.setAttribute('position', new BufferAttribute(positions, 3))
geometry.setAttribute('aLife', new BufferAttribute(aLife, 1))
geometry.setAttribute('aSize', new BufferAttribute(aSize, 1))
geometry.setAttribute('aHeat', new BufferAttribute(aHeat, 1))
geometry.setAttribute('aSeed', new BufferAttribute(aSeed, 1))

const material = new ShaderMaterial({
  transparent: true,
  depthWrite: false,
  blending: AdditiveBlending,
  uniforms: {
    uPixelScale: { value: 400 },
    uTime: { value: 0 },
  },
  vertexShader: /* glsl */ `
    attribute float aLife;
    attribute float aSize;
    attribute float aHeat;
    attribute float aSeed;
    uniform float uPixelScale;
    varying float vLife;
    varying float vHeat;
    varying float vSeed;

    void main() {
      vLife = aLife;
      vHeat = aHeat;
      vSeed = aSeed;
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      // Flames swell a bit as they age, then the fragment erosion eats them
      float grow = 0.75 + 1.1 * (1.0 - aLife);
      gl_PointSize = aSize * grow * uPixelScale / max(0.1, -mvPosition.z);
      gl_Position = projectionMatrix * mvPosition;
    }
  `,
  fragmentShader: /* glsl */ `
    uniform float uTime;
    varying float vLife;
    varying float vHeat;
    varying float vSeed;

    float hash(vec2 p) {
      return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
    }

    float noise(vec2 p) {
      vec2 i = floor(p);
      vec2 f = fract(p);
      f = f * f * (3.0 - 2.0 * f);
      return mix(
        mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
        mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x),
        f.y
      );
    }

    float fbm(vec2 p) {
      return 0.55 * noise(p) + 0.3 * noise(p * 2.7) + 0.15 * noise(p * 5.3);
    }

    void main() {
      vec2 uv = gl_PointCoord - 0.5;
      // Per-particle rotation so sprites don't read as identical balls
      float angle = vSeed * 6.2831;
      float c = cos(angle);
      float s = sin(angle);
      uv = mat2(c, -s, s, c) * uv;

      float d = length(uv);
      float t = 1.0 - vLife;

      // Scrolling turbulence: ragged, licking flame edges instead of a round bubble
      float n = fbm(uv * 4.5 + vSeed * 37.0 + vec2(0.0, -uTime * 3.5));

      float shape = d + (n - 0.5) * 0.4;
      float mask = smoothstep(0.5, 0.18, shape);
      // Burn away raggedly with age (noise-thresholded dissolve)
      mask *= smoothstep(t - 0.35, t + 0.15, n * 0.7 + (0.5 - d));

      // White-hot core -> raging orange -> dark ember, shifted by distance from core
      vec3 color = mix(vec3(1.0, 0.97, 0.85), vec3(1.0, 0.45, 0.06), smoothstep(0.0, 0.4, t + d));
      color = mix(color, vec3(0.5, 0.1, 0.02), smoothstep(0.45, 1.0, t));
      // HDR push so hot/boost particles flare through the bloom
      color *= 1.0 + vHeat * 4.5;

      float alpha = mask * (0.55 + 0.45 * vHeat) * smoothstep(0.0, 0.08, vLife);
      if (alpha < 0.003) { discard; }
      gl_FragColor = vec4(color, alpha);
    }
  `,
})

const points = new Points(geometry, material)
points.frustumCulled = false
points.renderOrder = 10

const emitterOffsets = shallowRef<Vector3[]>([])
const emitterMesh = shallowRef<Mesh | null>(null)

watch(() => props.source, (source) => {
  emitterOffsets.value = []
  emitterMesh.value = null
  if (!source) { return }

  let mesh: Mesh | null = null
  source.traverse((child) => {
    if (!mesh && child instanceof Mesh) { mesh = child as Mesh }
  })
  if (!mesh) { return }

  const typedMesh = mesh as Mesh
  const geo = typedMesh.geometry
  if (!geo.boundingBox) { geo.computeBoundingBox() }
  const box = geo.boundingBox
  if (!box) { return }

  // Two exhaust tips, symmetric around the rear panel center, just behind it (+Z = car rear)
  const centerY = (box.min.y + box.max.y) / 2
  const xOffset = (box.max.x - box.min.x) * EMITTER_SPREAD
  const centerX = (box.min.x + box.max.x) / 2
  const z = box.max.z + 0.06
  emitterMesh.value = typedMesh
  emitterOffsets.value = [
    new Vector3(centerX - xOffset, centerY, z),
    new Vector3(centerX + xOffset, centerY, z),
  ]
}, { immediate: true })

const spawnPos = new Vector3()
const prevSpawnPos: Vector3[] = [new Vector3(), new Vector3()]
const backward = new Vector3()
let prevInitialized = false
let spawnDebt = 0
let cursor = 0
let emitterToggle = 0

function spawnParticle(level: number, boost: number, pathT: number) {
  const emitters = emitterOffsets.value
  const mesh = emitterMesh.value
  if (!mesh || emitters.length === 0) { return }

  const index = cursor
  cursor = (cursor + 1) % MAX_PARTICLES
  emitterToggle = (emitterToggle + 1) % emitters.length

  spawnPos.copy(emitters[emitterToggle]!).applyMatrix4(mesh.matrixWorld)
  // Spread spawns along the path travelled this frame so trails don't turn into dots at speed
  spawnPos.lerp(prevSpawnPos[emitterToggle]!, pathT)

  backward.set(0, 0, 1).transformDirection(mesh.matrixWorld)
  // Fast, tight jet: coherent cone reads as a flame stream, wide jitter reads as bubbles
  const expel = 4 + 4 * level + 14 * boost
  const cone = expel * 0.09

  const i3 = index * 3
  positions[i3] = spawnPos.x + (Math.random() - 0.5) * 0.08
  positions[i3 + 1] = spawnPos.y + (Math.random() - 0.5) * 0.08
  positions[i3 + 2] = spawnPos.z + (Math.random() - 0.5) * 0.08
  velocities[i3] = backward.x * expel + (Math.random() - 0.5) * cone
  velocities[i3 + 1] = backward.y * expel + 0.4 + Math.random() * 0.6
  velocities[i3 + 2] = backward.z * expel + (Math.random() - 0.5) * cone

  maxLife[index] = 0.3 + Math.random() * 0.25 + boost * 0.2
  life[index] = maxLife[index]!
  aSize[index] = 0.3 + 0.25 * level + 0.3 * boost + Math.random() * 0.12
  aHeat[index] = Math.min(1, 0.35 + 0.6 * level + boost + Math.random() * 0.15)
  aSeed[index] = Math.random()
}

const { onBeforeRender } = useLoop()
const { sizes } = useTresContext()

onBeforeRender(({ delta, elapsed }) => {
  const dt = Math.min(delta, 1 / 30)
  const { level, boost } = props.state
  material.uniforms.uPixelScale!.value = sizes.height.value * 0.5
  material.uniforms.uTime!.value = elapsed

  // Age + integrate the pool
  for (let i = 0; i < MAX_PARTICLES; i++) {
    if (life[i]! <= 0) {
      aLife[i] = 0
      continue
    }
    life[i]! -= dt
    const i3 = i * 3
    velocities[i3]! *= 1 - DRAG * dt
    velocities[i3 + 1]! += BUOYANCY * dt
    velocities[i3 + 2]! *= 1 - DRAG * dt
    positions[i3]! += velocities[i3]! * dt
    positions[i3 + 1]! += velocities[i3 + 1]! * dt
    positions[i3 + 2]! += velocities[i3 + 2]! * dt
    aLife[i] = Math.max(0, life[i]! / maxLife[i]!)
  }

  const mesh = emitterMesh.value
  const emitters = emitterOffsets.value
  if (mesh && emitters.length > 0) {
    mesh.updateWorldMatrix(true, false)

    if (!prevInitialized) {
      emitters.forEach((offset, index) => {
        prevSpawnPos[index]!.copy(offset).applyMatrix4(mesh.matrixWorld)
      })
      prevInitialized = true
    }

    // Idle puffs -> steady stream at speed -> inferno on boost
    const rate = 10 + 260 * level + 380 * boost
    spawnDebt += rate * dt
    const count = Math.floor(spawnDebt)
    spawnDebt -= count
    for (let n = 0; n < count; n++) {
      spawnParticle(level, boost, count > 1 ? n / count : 0)
    }

    emitters.forEach((offset, index) => {
      prevSpawnPos[index]!.copy(offset).applyMatrix4(mesh.matrixWorld)
    })
  }

  geometry.attributes.position!.needsUpdate = true
  geometry.attributes.aLife!.needsUpdate = true
  geometry.attributes.aSize!.needsUpdate = true
  geometry.attributes.aHeat!.needsUpdate = true
  geometry.attributes.aSeed!.needsUpdate = true
})

onUnmounted(() => {
  geometry.dispose()
  material.dispose()
})
</script>

<template>
  <primitive :object="points" />
</template>
