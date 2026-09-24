<script setup lang="ts">
import type { RasterFormatMetadata } from '@pmndrs/glyph'
import { defineTextMaterial } from '@pmndrs/glyph/three'
import { Text } from '@pmndrs/glyph/vue'
import type { VueTextInstance } from '@pmndrs/glyph/vue'
import { useSlug } from '@pmndrs/glyph/vue/slug'
import { useLoop, useTres } from '@tresjs/core'
import { useEventListener } from '@vueuse/core'
import { float, Fn, mix, screenUV, sin, texture, time, uniform, vec2, vec3 } from 'three/tsl'
import type { PerspectiveCamera } from 'three/webgpu'
import { Vector2 } from 'three/webgpu'
import { useVideoTexture } from './useVideoTexture'

const props = defineProps<{
  /** Scroll progress in [0, 1]. 0 is the hero, 1 is the clip full bleed inside the O. */
  progress: number
}>()

// Drop your clip here. Muted H.264 MP4, 1920x1080 or smaller, a few seconds, seamless loop.
const VIDEO_SRC = '/video/cinematic.mp4'
const FONT_SRC = '/fonts/anton.font.glb'

const { sizes } = useTres()
const width = computed(() => sizes.width.value)
const height = computed(() => sizes.height.value)

// At this distance the camera shows exactly `height` world units at z = 0, so one unit is one CSS pixel.
const CAMERA_FOV = 45
const cameraDistance = computed(() => height.value / 2 / Math.tan((CAMERA_FOV / 2) * (Math.PI / 180)))

const { font } = useSlug(FONT_SRC)

// Anton advances about 3.8 em for "A WINDOW". The headline must fit the viewport width and leave air above and below.
const headline = computed(() => Math.min((width.value * 0.9) / 3.8, height.value * 0.3))
const caption = computed(() => headline.value * 0.3)
// Tight leading: Anton has almost no descenders, so lines can sit closer than 1 em.
const lineStep = computed(() => headline.value * 0.92)
const blockHeight = computed(() => lineStep.value * 2 + caption.value * 1.4)
const topY = computed(() => blockHeight.value / 2)
const lineTops = computed(() => [
  topY.value,
  topY.value - lineStep.value,
  topY.value - lineStep.value * 2 - caption.value * 0.25,
])

const { texture: clip, ready: clipReady, aspect: clipAspect } = useVideoTexture(VIDEO_SRC)

// Cover-fit the clip to the viewport, leave a margin for the parallax offset, and fade the fallback out once frames flow.
const coverScale = uniform(new Vector2(1, 1))
const parallax = uniform(new Vector2(0, 0))
const clipMix = uniform(0)
const PARALLAX_MARGIN = 0.94
watchEffect(() => {
  const screen = width.value / height.value
  coverScale.value.set(Math.min(1, screen / clipAspect.value), Math.min(1, clipAspect.value / screen))
})

// Stand-in when the clip is missing or blocked: a slow liquid so the letters never go flat.
const liquid = Fn(([uv]: [ReturnType<typeof screenUV.sub>]) => {
  const t = time
  const n = sin(uv.x.mul(6).add(t.mul(0.7)))
    .add(sin(uv.y.mul(5).sub(t.mul(0.9))))
    .add(sin(uv.x.add(uv.y).mul(8).add(t.mul(0.5))))
  const k = n.mul(0.1667).add(0.5)
  return vec3(
    k.pow(1.6).mul(0.8).add(0.15),
    sin(k.mul(3.1)).mul(0.45).add(0.12),
    float(1).sub(k).mul(0.6).add(0.35),
  )
})

// `createDefaultMaterial()` keeps the analytic Slug coverage in `opacityNode`; only the color becomes the clip.
const cutOut = defineTextMaterial((context) => {
  const material = context.createDefaultMaterial()
  if (context.kind !== 'glyph') { return material }
  const uv = screenUV.sub(0.5).mul(coverScale).mul(PARALLAX_MARGIN).add(0.5).add(parallax)
  // `screenUV` has its origin at the bottom, video rows upload top-down. Without the flip the clip is upside down.
  const clipUv = vec2(uv.x, float(1).sub(uv.y))
  material.colorNode = mix(liquid(uv), texture(clip, clipUv).rgb, clipMix)
  return material
})

// ---- Dive target: the stem of the I in "A WINDOW" ----
// The I is one solid stroke, so a frame that ends inside its ink shows only the clip. A round letter would land
// in its counter, which is background.
const MIDDLE_LINE = 'A WINDOW'
const TARGET_INDEX = MIDDLE_LINE.indexOf('I')
// `useTemplateRef` returns a readonly proxy; Three objects carry private fields and must stay raw.
const middle = shallowRef<VueTextInstance<RasterFormatMetadata> | null>(null)
const target = { x: 0, y: 0, zoom: 1, valid: false }
watch([width, height, () => middle.value?.instance], () => {
  target.valid = false
})

function locateTarget() {
  const instance = middle.value?.instance
  if (instance === undefined) { return }
  const layout = instance.glyphs()
  let index = -1
  for (let i = 0; i < layout.glyphCount; i++) {
    if (layout.clusters[i] === TARGET_INDEX) {
      index = i
      break
    }
  }
  if (index < 0) { return }
  const inkW = layout.glyphInkWidths[index]!
  const inkH = layout.glyphInkHeights[index]!
  // Paragraph space is origin top-left, +Y down; the paragraph's top-left sits at the Text position.
  target.x = -width.value / 2 + layout.glyphInkX[index]! + inkW / 2
  target.y = lineTops.value[1]! - layout.glyphInkY[index]! - inkH / 2
  // Finish with the whole viewport inside the stem, with a little slack for the parallax and the smoothing.
  target.zoom = Math.max(width.value / (inkW * 0.8), height.value / (inkH * 0.9))
  target.valid = true
}

// ---- Per-frame: smooth scroll, dolly the camera, ease the parallax ----
const camera = shallowRef<PerspectiveCamera | null>(null)
const smoothProgress = ref(0)
const pointer = new Vector2()
useEventListener(window, 'pointermove', (event: PointerEvent) => {
  pointer.set((event.clientX / window.innerWidth) * 2 - 1, (event.clientY / window.innerHeight) * 2 - 1)
})

const smoothstep = (edge0: number, edge1: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - edge0) / (edge1 - edge0)))
  return t * t * (3 - 2 * t)
}

const { onBeforeRender } = useLoop()
onBeforeRender(({ delta }) => {
  const k = 1 - Math.exp(-delta * 6)
  smoothProgress.value += (props.progress - smoothProgress.value) * k
  clipMix.value += ((clipReady.value ? 1 : 0) - clipMix.value) * k
  // Parallax is in clip UV space: a small shift reads as depth, a large one exposes the margin.
  parallax.value.x += (pointer.x * 0.02 - parallax.value.x) * k
  parallax.value.y += (pointer.y * 0.02 - parallax.value.y) * k

  if (!target.valid) { locateTarget() }
  const cam = camera.value
  if (!cam) { return }
  // Hold the hero for the first stretch, then dive. Zoom is exponential so the perceived speed stays constant
  // over a 50x range, and the camera center follows the classic zoom-about-point so the stem never leaves the frame.
  const ease = smoothstep(0.08, 0.8, smoothProgress.value)
  const zoom = target.valid ? target.zoom ** ease : 1
  const follow = 1 - 1 / zoom
  const distance = cameraDistance.value / zoom
  cam.position.set(target.x * follow, target.y * follow, distance)
  cam.near = Math.max(0.1, distance * 0.1)
  cam.far = cameraDistance.value * 2
  cam.updateProjectionMatrix()
})
</script>

<template>
  <TresPerspectiveCamera
    ref="camera"
    :fov="CAMERA_FOV"
    :near="1"
    :far="cameraDistance * 2"
    :position="[0, 0, cameraDistance]"
  />
  <template v-if="font !== undefined">
    <Text
      :font="font"
      :material="cutOut"
      :constraints="{ width: { mode: 'exact',
                               size: width } }"
      :layout="{ align: 'center',
                 wrap: 'none' }"
      :position="[-width / 2, lineTops[0], 0]"
      :text-style="{ color: '#ffffff',
                     fontSize: headline,
                     lineHeight: 1 }"
    >
      TYPE IS
    </Text>
    <Text
      ref="middle"
      :font="font"
      :material="cutOut"
      :constraints="{ width: { mode: 'exact',
                               size: width } }"
      :layout="{ align: 'center',
                 wrap: 'none' }"
      :position="[-width / 2, lineTops[1], 0]"
      :text-style="{ color: '#ffffff',
                     fontSize: headline,
                     lineHeight: 1 }"
    >
      {{ MIDDLE_LINE }}
    </Text>
    <Text
      :font="font"
      :material="cutOut"
      :constraints="{ width: { mode: 'exact',
                               size: width } }"
      :layout="{ align: 'center',
                 wrap: 'none' }"
      :position="[-width / 2, lineTops[2], 0]"
      :text-style="{ color: '#ffffff',
                     fontSize: caption,
                     lineHeight: 1,
                     letterSpacing: caption * 0.04 }"
    >
      TRESJS × GLYPH
    </Text>
  </template>
</template>
