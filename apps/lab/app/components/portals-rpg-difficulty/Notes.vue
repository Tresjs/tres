<script setup lang="ts">
import vertexShader from './shaders/notes-vertex.glsl?raw'
import fragmentShader from './shaders/notes-fragment.glsl?raw'
import { AdditiveBlending, CanvasTexture, Color, Uniform, Vector2 } from 'three'

const props = withDefaults(defineProps<{
  // Master alpha over the whole stream, on top of the per-note fade.
  opacity?: number
}>(), { opacity: 1 })

// Musical notes rising off the bard's lute in a corkscrew. Values are the ones
// settled on in .claude/reference/bard-notes-companion.html, which runs the same math.
const COUNT = 10
// One note per beat, with a little slop so it reads as a rhythm, not a metronome.
const BEAT = 0.45
const LIFETIME = 4.5
const RISE = 2.4
const TURNS = 1.25
const RADIUS_START = 1.2
const RADIUS_END = 0.6
const RADIUS_JITTER = 0.3
const TURBULENCE = 0.08
// Ghost points behind each head. They shrink and dim toward the tail so the trail
// tapers along the helix instead of pointing straight down.
const TRAIL_GHOSTS = 7
const TRAIL_SECONDS = 0.55
// Only the head and the first ghosts draw the glyph; the rest are halo only.
const GLYPH_GHOSTS = 2
const FADE_START = 0.55
const GLOW = 0.6
// World diameter of the sprite. The glyph fills the middle 60%, the rest is halo.
const NOTE_SIZE = 0.6

const GLYPHS = ['♪', '♫', '♩', '♬']
const CELL = 128

// Drawn once at mount: the notes are text, and a canvas is the cheapest way to get
// crisp glyphs with an alpha channel into a point sprite.
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
  const texture = new CanvasTexture(canvas)
  texture.premultiplyAlpha = false
  return texture
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

const uniforms = {
  uTime: new Uniform(0),
  uPixelHeight: new Uniform(1),
  uNoteSize: new Uniform(NOTE_SIZE),
  uRise: new Uniform(RISE),
  uTurns: new Uniform(TURNS),
  uRadius: new Uniform(new Vector2(RADIUS_START, RADIUS_END)),
  uRadiusJitter: new Uniform(RADIUS_JITTER),
  uTurbulence: new Uniform(TURBULENCE),
  uTrail: new Uniform(TRAIL_SECONDS),
  uAtlas: new Uniform(makeAtlas()),
  uAtlasCells: new Uniform(GLYPHS.length),
  uFadeStart: new Uniform(FADE_START),
  uGlow: new Uniform(GLOW),
  uOpacity: new Uniform(props.opacity),
  // Same family as the fire, so the notes sit in the same light as the sparks.
  uColorYoung: new Uniform(new Color('#ffe2a8')),
  uColorMid: new Uniform(new Color('#ffb347')),
  uColorOld: new Uniform(new Color('#ff6e2b')),
}

// The vertex shader sizes points from a world size, which needs the canvas height
// in device pixels to land on a pixel count.
const { sizes: canvas } = useTres()

watchEffect(() => {
  uniforms.uPixelHeight.value = canvas.height.value * canvas.pixelRatio.value
})

watch(() => props.opacity, (value) => {
  uniforms.uOpacity.value = value
})

const { onBeforeRender } = useLoop()

onBeforeRender(({ elapsed }) => {
  uniforms.uTime.value = elapsed
})

onUnmounted(() => {
  uniforms.uAtlas.value.dispose()
})
</script>

<template>
  <!-- frustumCulled: every vertex sits on the origin, so the bounding sphere is a
  point, but the shader lifts notes a full rise above it. -->
  <TresPoints name="Notes" :frustum-culled="false">
    <TresBufferGeometry
      :position="[positions, 3]"
      :a-seed="[seeds, 3]"
      :a-life="[lives, 2]"
      :a-turb="[turbs, 2]"
      :a-trail="[trails, 3]"
      :a-glyph="[glyphs, 1]"
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
