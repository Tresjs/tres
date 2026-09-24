<script setup lang="ts">
import type { TresRendererSetupContext } from '@tresjs/core'
import { NoToneMapping } from 'three'
import { WebGPURenderer } from 'three/webgpu'
import { useWindowScroll, useWindowSize } from '@vueuse/core'

// glyph only supports WebGPURenderer (with its own WebGL2 fallback), never the classic WebGLRenderer.
const createRenderer = (ctx: TresRendererSetupContext) => {
  const renderer = new WebGPURenderer({
    canvas: toValue(ctx.canvas),
    antialias: true,
  })
  // The video is already display-referred; tone mapping would dull it inside the letters.
  renderer.toneMapping = NoToneMapping
  return renderer
}

// The leches panel is a tuning aid: keep it out of the production build, the tuned values are the defaults.
const isDev = import.meta.dev

// Native page scroll drives the dive. The canvas is fixed (`window-size`), the spacer below gives the page height.
const PAGES = 4
const { y } = useWindowScroll()
const { height } = useWindowSize()
const rawProgress = computed(() => {
  const max = height.value * (PAGES - 1)
  return max > 0 ? y.value / max : 0
})
const progress = computed(() => Math.min(1, Math.max(0, rawProgress.value)))
// The full-bleed caption belongs to the canvas; hide it once the storyboard scrolls over the clip.
const showCaption = computed(() => progress.value > 0.85 && rawProgress.value < 1.12)

const FRAMES = [
  {
    src: '/experiments/glyph-cut-out/storyboard-hero.jpg',
    title: '1. Hero.',
    text: 'Three lines of Anton fill the viewport and the clip only exists inside the letters. Around the pointer the edges shed grain that drifts away and rises.',
  },
  {
    src: '/experiments/glyph-cut-out/storyboard-dive.jpg',
    title: '2. Dive.',
    text: 'Scroll pushes the camera into the I of WINDOW. Slug integrates coverage from the outlines, so the edge stays analytic at 50x, no atlas, no texels, no blur.',
  },
  {
    src: '/experiments/glyph-cut-out/storyboard-bleed.jpg',
    title: '3. Full bleed.',
    text: 'The stem of the I becomes the frame and the clip is the page. Scroll back and the letters reassemble around it.',
  },
]

const NOTES = [
  {
    title: 'Material',
    text: 'defineTextMaterial hands over createDefaultMaterial(), whose opacity already carries the glyph coverage. Only colorNode changes: a cover-fit screenUV sample of the VideoTexture.',
  },
  {
    title: 'Technique',
    text: 'Slug for the whole piece. Coverage is computed analytically from the font outlines, so one letter can fill the screen and its edge stays razor sharp.',
  },
  {
    title: 'Grain',
    text: 'A RenderPipeline pass takes one stochastic sample per pixel from a point between the pixel and the cursor. Letters composite over the dust, so interiors stay solid and only the edges crumble.',
  },
  {
    title: 'Font',
    text: 'Anton, baked with the glyph CLI into one .font.glb with Slug and MSDF data, subset to Latin plus the multiplication sign.',
  },
]
</script>

<template>
  <TheLoadingScreen background="#0b0b0d" />
  <TresLeches v-if="isDev" uuid="glyph-cut-out" />
  <TresCanvas
    :renderer="createRenderer"
    clear-color="#0b0b0d"
    render-mode="always"
    window-size
  >
    <GlyphCutOutTheCutOut :progress="progress" />
    <TheScreenshot />
  </TresCanvas>
  <div :style="{ height: `${PAGES * 100}vh` }" aria-hidden="true"></div>
  <p
    class="fixed left-5 bottom-5 z-10 font-mono text-xs text-white/50 pointer-events-none select-none transition-opacity duration-500"
    :class="progress > 0.05 ? 'opacity-0' : 'opacity-100'"
  >
    scroll to dive · move the pointer to dissolve the letters
  </p>
  <p
    class="fixed left-5 bottom-12 z-10 font-mono text-xs tracking-widest text-white pointer-events-none select-none transition-opacity duration-700"
    :class="showCaption ? 'opacity-100' : 'opacity-0'"
  >
    SLUG · ANALYTIC COVERAGE · SHARP AT ANY ZOOM
  </p>
  <!-- Solid background so the section covers the fixed canvas once the dive is over. -->
  <section class="relative z-[5] bg-[#0b0b0d] px-4 pt-16 pb-28 text-[#f2f2f0] sm:px-6">
    <div class="mx-auto max-w-6xl">
      <h2 class="mb-6 font-mono text-xs uppercase tracking-[0.18em] text-white/50">Storyboard</h2>
      <div class="grid gap-4 sm:grid-cols-3">
        <figure v-for="frame in FRAMES" :key="frame.src" class="min-w-0">
          <img
            :src="frame.src"
            :alt="`${frame.title} ${frame.text}`"
            class="aspect-video w-full rounded-md bg-black object-cover"
            loading="lazy"
            width="1280"
            height="720"
          />
          <figcaption class="mt-3 text-sm leading-relaxed text-white/60">
            <b class="font-semibold text-white">{{ frame.title }}</b> {{ frame.text }}
          </figcaption>
        </figure>
      </div>

      <div class="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div v-for="note in NOTES" :key="note.title" class="rounded-md border border-white/10 p-4 text-sm leading-relaxed text-white/60">
          <b class="mb-1 block font-semibold text-white">{{ note.title }}</b>{{ note.text }}
        </div>
      </div>

      <div class="mt-20 flex flex-col items-center gap-7 border-t border-white/10 pt-14 text-center">
        <p class="font-mono text-xs uppercase tracking-[0.18em] text-white/50">A collaboration between</p>
        <div class="flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
          <a href="https://tresjs.org" target="_blank" rel="noopener" class="opacity-90 transition-opacity hover:opacity-100">
            <img src="/logos/tres_logo_white.svg" alt="TresJS" class="h-6 w-auto" width="157" height="25" />
          </a>
          <span class="select-none text-2xl text-white/30" aria-hidden="true">×</span>
          <a href="https://github.com/pmndrs" target="_blank" rel="noopener" class="flex items-center gap-3 opacity-90 transition-opacity hover:opacity-100">
            <img src="/logos/pmndrs.svg" alt="Poimandres" class="size-9" width="36" height="36" />
            <span class="font-mono text-lg tracking-wide text-white">pmndrs</span>
          </a>
        </div>
        <p class="max-w-xl text-sm leading-relaxed text-white/60">
          <a href="https://github.com/pmndrs/glyph" target="_blank" rel="noopener" class="text-white underline decoration-white/30 underline-offset-4 hover:decoration-white">glyph</a>
          is the Poimandres typography engine for web graphics. Its TresJS adapter renders the same retained Three text
          objects the React adapter uses, inside a regular <code class="font-mono text-white/80">&lt;TresCanvas&gt;</code>.
        </p>
      </div>
    </div>
  </section>
</template>
