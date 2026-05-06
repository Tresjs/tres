<script setup lang="ts">
const gl = {
  alpha: true,
  antialias: true,
  clearAlpha: 0,
  powerPreference: 'high-performance' as const,
}
</script>

<template>
  <div class="vuefes-stage">
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
      <TresCanvas v-bind="gl" :dpr="[1, 2]">
        <VuefesJapan2025TheMainVisual />
        <TheScreenshot />
      </TresCanvas>
    </div>
  </div>
</template>

<style scoped>
.vuefes-stage {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
}

.vuefes-canvas-wrap {
  width: min(90vw, 1300px);
  aspect-ratio: 650 / 320;
}

.vuefes-credit {
  position: absolute;
  bottom: 32px;
  left: 48px;
  z-index: 5;
  font-size: 14px;
  color: #555;
}

.vuefes-credit a {
  color: #1f6c4f;
  pointer-events: auto;
}

.vuefes-credit a:hover {
  color: #0f3a2a;
}
</style>
