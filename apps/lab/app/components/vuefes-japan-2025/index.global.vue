<script setup lang="ts">
import { WebGPURenderer } from 'three/webgpu'
import type { TresRendererSetupContext } from '@tresjs/core'
import { activeColorSetIndex, colorSets } from './color-sets'

const createWebGPURenderer = (ctx: TresRendererSetupContext) =>
  new WebGPURenderer({
    canvas: toValue(ctx.canvas),
    alpha: true,
    antialias: true,
  })

// Background tint and base text color cycle in lockstep with the cone/sphere
// palette index. Mirrors the original site's --color-sub / --color-base pair.
const stageBg = computed(() => colorSets[activeColorSetIndex.value]?.bg ?? '#fae8e4')
const stageBase = computed(() => colorSets[activeColorSetIndex.value]?.color1.getStyle() ?? '#007F62')
</script>

<template>
  <div
    class="vuefes-stage"
    :style="{
      '--vuefes-bg': stageBg,
      '--vuefes-base': stageBase,
    }"
  >
    <div class="vuefes-credit">
      <p>
        Port of the
        <a target="_blank" rel="noopener" href="https://vuefes.jp/2025/en">
          Vue Fes Japan 2025
        </a>
        main visual.
      </p>
    </div>
    <div class="vuefes-canvas-wrap">
      <TresCanvas
        :renderer="createWebGPURenderer"
        :dpr="[1, 2]"
        clear-color="#ffffff"
        :clear-alpha="0"
      >
        <VuefesJapan2025TheMainVisual />
        <TheScreenshot />
      </TresCanvas>
    </div>
  </div>
</template>

<style>
/* JetBrainsMono-Regular — same body font as the original Vue Fes Japan 2025 site.
   Hosted locally to avoid any cross-origin/runtime dependency on vuefes.jp. */
@font-face {
  font-family: 'JetBrainsMono';
  src: url('/experiments/vuefes-japan-2025/fonts/JetBrainsMono-Regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
</style>

<style scoped>
.vuefes-stage {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--vuefes-bg, #fae8e4);
  transition: background-color 600ms ease;
}

/* Grain overlay — tiled noise PNG tinted by the active bg color, blended via
   mix-blend-mode: overlay at 0.4 opacity. Mirrors the original .main-visual:before. */
.vuefes-stage::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  background: var(--vuefes-bg, #fae8e4) url('/experiments/vuefes-japan-2025/grain.png') repeat;
  mix-blend-mode: overlay;
  opacity: 0.4;
}

.vuefes-canvas-wrap {
  position: relative;
  z-index: 1;
  width: 100vw;
  height: 100vh;
}

/* Mirrors the original .main-visual-body [lang=en] body copy:
   JetBrainsMono-Regular at 1.25rem, base color, no link underline by default
   (hover-only underline like the original header anchors). */
.vuefes-credit {
  position: absolute;
  bottom: 24px;
  left: 24px;
  z-index: 5;
  margin: 0;
  font-family: 'JetBrainsMono', ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 1.25rem;
  line-height: 1.2;
  color: var(--vuefes-base, #007F62);
  transition: color 600ms ease;
}

.vuefes-credit p {
  margin: 0;
}

.vuefes-credit a {
  color: inherit;
  pointer-events: auto;
  text-decoration: none;
}

.vuefes-credit a:hover {
  text-decoration: underline;
}

@media (max-width: 1036px) {
  .vuefes-credit {
    bottom: 16px;
    left: 16px;
    font-size: 0.875rem;
  }
}
</style>
