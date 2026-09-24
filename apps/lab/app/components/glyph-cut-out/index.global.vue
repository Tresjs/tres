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

// Native page scroll drives the dive. The canvas is fixed (`window-size`), the spacer below gives the page height.
const PAGES = 4
const { y } = useWindowScroll()
const { height } = useWindowSize()
const progress = computed(() => {
  const max = height.value * (PAGES - 1)
  return max > 0 ? Math.min(1, Math.max(0, y.value / max)) : 0
})
</script>

<template>
  <TheLoadingScreen background="#0b0b0d" />
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
    scroll to dive · move the pointer for parallax
  </p>
  <p
    class="fixed left-5 bottom-12 z-10 font-mono text-xs tracking-widest text-white pointer-events-none select-none transition-opacity duration-700"
    :class="progress > 0.85 ? 'opacity-100' : 'opacity-0'"
  >
    SLUG · ANALYTIC COVERAGE · SHARP AT ANY ZOOM
  </p>
</template>
