<script setup lang="ts">
import type { WebGLRenderer } from 'three'
import { TresCanvas } from '@tresjs/core'
import { shallowRef } from 'vue'

const rendererRef = shallowRef<WebGLRenderer | null>(null)
const minDpr = 1
const maxDpr = 3
const currDprRef = shallowRef(-1)
const dpr = shallowRef<number | [number, number]>([minDpr, maxDpr])

const onReady = ({ renderer }) => {
  rendererRef.value = renderer.instance
}

const isRendererDprClamped = (renderer: WebGLRenderer) => {
  const dpr = renderer.getPixelRatio()
  currDprRef.value = dpr
  return (dpr >= minDpr && dpr <= maxDpr)
}

const intervalId = setInterval(() => {
  if (rendererRef.value) {
    isRendererDprClamped(rendererRef.value)
  }
}, 1000)

onUnmounted(() => clearInterval(intervalId))
</script>

<template>
  <TresCanvas :dpr="dpr" @ready="onReady">
    <TresPerspectiveCamera />

    <TresMesh>
      <TresSphereGeometry />
      <TresMeshNormalMaterial />
    </TresMesh>

    <TresGridHelper />
  </TresCanvas>

  <OverlayInfo>
    <h1><code>&lt;TresCanvas :dpr="[min, max]" /&gt;</code></h1>
    <h2>Setup</h2>
    <p>The TresCanvas <code>:dpr</code> prop is set to [{{ minDpr }}, {{ maxDpr }}]</p>
    <p>This clamps the possible range for the renderer's DPR setting. (TresCanvas also accepts a numerical value for <code>:dpr</code>. That is not tested in this page.)</p>
    <h2>Try it</h2>
    <p>Zooming in and out in the browser <a href="https://developer.mozilla.org/en-US/docs/Web/API/Window/devicePixelRatio">triggers a change to the window's <code>devicePixelRatio</code>.</a> In turn, this should set the renderer's DPR. It should remain within the range specified by the <code>:dpr</code> prop.</p>
    <h2>Test</h2>
    <p>Renderer DPR: <span>{{ currDprRef }}</span></p>
    <p
      v-if="(!rendererRef || isRendererDprClamped(rendererRef))"
      :style="{ color: 'green' }"
    >
      ✅ DPR is clamped.
    </p>
    <p v-else :style="{ color: 'red' }">
      ❌ DPR is not properly clamped.
    </p>
  </OverlayInfo>
</template>
