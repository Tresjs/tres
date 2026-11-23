<script setup lang="ts">
import { AdditiveBlending, CanvasTexture, Color, InstancedBufferAttribute, Sprite, SpriteNodeMaterial, Vector2 } from 'three/webgpu'
import { usePointScale } from './tsl/usePointScale'
import { cos, float, fract, instancedBufferAttribute, length, min, mix, select, sin, smoothstep, step, texture, time, uniform, uv, varying, vec2, vec3, vec4 } from 'three/tsl'

const props = withDefaults(defineProps<{
  opacity?: number
}>(), { opacity: 1 })

const COUNT = 10
const BEAT = 0.45
const LIFETIME = 4.5
const RISE = 2.4
const TURNS = 1.25
const RADIUS_START = 1.2
const RADIUS_END = 0.6
const RADIUS_JITTER = 0.3
const TURBULENCE = 0.08
const TRAIL_GHOSTS = 7
const TRAIL_SECONDS = 0.55
const GLYPH_GHOSTS = 2
const FADE_START = 0.55
const GLOW = 0.6
const NOTE_SIZE = 0.6

const GLYPHS = ['♪', '♫', '♩', '♬']
const CELL = 128

function makeAtlas() {
  const canvas = document.createElement('canvas')
  canvas.width = CELL * GLYPHS.length
  canvas.height = CELL
  const ctx = canvas.getContext('2d')!
  ctx.fillStyle = '#fff'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.font = `${CELL * 0.62}px "Apple Symbols", "Segoe UI Symbol", "Noto Sans Symbols 2", serif`
  GLYPHS.forEach((glyph, i) => {
    ctx.fillText(glyph, CELL * (i + 0.5), CELL * 0.54)
  })
  const atlasTexture = new CanvasTexture(canvas)
  atlasTexture.premultiplyAlpha = false
  return atlasTexture
}

const STRIDE = TRAIL_GHOSTS + 1
const VERTICES = COUNT * STRIDE

const positions = new Float32Array(VERTICES * 3)
const seeds = new Float32Array(VERTICES * 3)
const lives = new Float32Array(VERTICES * 2)
const turbs = new Float32Array(VERTICES * 2)
const trails = new Float32Array(VERTICES * 3)
const glyphs = new Float32Array(VERTICES)
const pointSizes = new Float32Array(VERTICES)

for (let i = 0; i < COUNT; i++) {
  const phase = Math.random() * Math.PI * 2
  const dir = Math.random() < 0.5 ? -1 : 1
  const radiusOffset = Math.random() * 2 - 1
  const birth = i * BEAT + (Math.random() - 0.5) * BEAT * 0.3
  const turbX = 2.5 + Math.random() * 3
  const turbY = 2 + Math.random() * 3
  const glyph = Math.floor(Math.random() * GLYPHS.length)
  const size = 0.8 + Math.random() * 0.4

  for (let k = 0; k < STRIDE; k++) {
    const v = i * STRIDE + k
    seeds[v * 3 + 0] = phase
    seeds[v * 3 + 1] = dir
    seeds[v * 3 + 2] = radiusOffset
    lives[v * 2 + 0] = birth
    lives[v * 2 + 1] = LIFETIME
    turbs[v * 2 + 0] = turbX
    turbs[v * 2 + 1] = turbY
    trails[v * 3 + 0] = k / TRAIL_GHOSTS
    trails[v * 3 + 1] = (1 - k / (TRAIL_GHOSTS + 1)) ** 2.2
    trails[v * 3 + 2] = k < GLYPH_GHOSTS ? 1 : 0
    glyphs[v] = glyph
    pointSizes[v] = size
  }
}

const noteSize = uniform(NOTE_SIZE)
const rise = uniform(RISE)
const turns = uniform(TURNS)
const radius = uniform(new Vector2(RADIUS_START, RADIUS_END))
const radiusJitter = uniform(RADIUS_JITTER)
const turbulence = uniform(TURBULENCE)
const trail = uniform(TRAIL_SECONDS)
const atlas = makeAtlas()
const fadeStart = uniform(FADE_START)
const glow = uniform(GLOW)
const opacity = uniform(props.opacity)
const colorYoung = uniform(new Color('#ffe2a8'))
const colorMid = uniform(new Color('#ffb347'))
const colorOld = uniform(new Color('#ff6e2b'))

const instanced = (array: Float32Array, itemSize: number) => instancedBufferAttribute(new InstancedBufferAttribute(array, itemSize))

const aPosition = instanced(positions, 3)
// x: phase, y: orbit direction (±1), z: radius offset in -1..1
const aSeed = instanced(seeds, 3)
// x: birth offset, y: lifetime in seconds
const aLife = instanced(lives, 2)
// x and y: turbulence frequencies
const aTurb = instanced(turbs, 2)
// x: 0 = head, 1 = tail; y: brightness falloff; z: 1 when the ghost still carries the glyph
const aTrail = instanced(trails, 3)
const aGlyph = instanced(glyphs, 1)
const aSize = instanced(pointSizes, 1)

// The trail is in seconds; dividing by the lifetime turns it into a life fraction like t.
const t = fract(time.add(aLife.x).div(aLife.y)).sub(aTrail.x.mul(trail).div(aLife.y)).toVar()

const y = rise.mul(t.mul(1.3).sub(t.mul(t).mul(0.3)))
const angle = aSeed.x.add(aSeed.y.mul(turns).mul(6.2831).mul(t)).toVar()
const r = mix(radius.x, radius.y, t)
  .mul(aSeed.z.mul(radiusJitter).add(1))
  .mul(sin(t.mul(6.2831).add(aSeed.x)).mul(0.12).add(1))

const offsetX = cos(angle).mul(r).add(turbulence.mul(t).mul(sin(t.mul(aTurb.x).mul(3.1416).add(aSeed.x))))
const offsetZ = sin(angle).mul(r).add(turbulence.mul(t).mul(cos(t.mul(aTurb.y).mul(3.1416).add(aSeed.x.mul(1.7)))))

const swell = sin(min(1, t.mul(1.15)).mul(3.1416)).mul(0.5).add(0.7)
const taper = mix(1, aTrail.y.mul(0.45).add(0.55), step(0.001, aTrail.x))

const material = new SpriteNodeMaterial({
  transparent: true,
  depthWrite: false,
  blending: AdditiveBlending,
  fog: false,
})
material.positionNode = aPosition.add(vec3(offsetX, y, offsetZ))
// noteSize is a world diameter.
material.scaleNode = aSize.mul(noteSize).mul(usePointScale()).mul(swell).mul(taper)

const age = varying(t)
// A ghost not yet born this cycle would poke out below the flame tip.
const fall = varying(select(t.lessThan(0), float(0), aTrail.y))

// Sprite UVs are y-up like the canvas texture, so no flip is needed here.
const atlasUv = vec2(varying(aGlyph).add(uv().x).div(GLYPHS.length), uv().y)
const glyph = texture(atlas, atlasUv).a.mul(varying(aTrail.z))

// Must end inside 0.5 (the sprite corner) or it shows a square. Far ghosts are halo only.
const halo = smoothstep(0.5, 0.05, length(uv().sub(0.5))).mul(glow.mul(0.35))

const tint = mix(mix(colorYoung, colorMid, smoothstep(0, 0.4, age)), colorOld, smoothstep(0.4, 0.95, age))

// The birth ramp hides the pop-in at the flame tip, where every cycle restarts.
const fade = smoothstep(0, 0.08, age).mul(float(1).sub(smoothstep(fadeStart, 1, age))).mul(fall)

material.colorNode = vec4(tint, glyph.add(halo).mul(fade).mul(opacity))

const notes = new Sprite(material)
notes.name = 'Notes'
notes.count = VERTICES
// Every instance sits on the origin, so the bounds are a point the shader lifts notes out of.
notes.frustumCulled = false

watch(() => props.opacity, (value) => {
  opacity.value = value
})

onUnmounted(() => {
  atlas.dispose()
  material.dispose()
})
</script>

<template>
  <primitive :object="notes" />
</template>
