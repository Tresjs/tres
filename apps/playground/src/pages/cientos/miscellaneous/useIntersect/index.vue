<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import TheExperience from './TheExperience.vue'

const r = shallowRef({ off: () => {} })
const txt = shallowRef('')
const ry = shallowRef(0)

let elapsed = 0
let intervalId: ReturnType<typeof setInterval>

function update() {
  elapsed += 1000 / 30
  ry.value = elapsed * 0.001
}
onMounted(() => { intervalId = setInterval(update, 1000 / 30) })
onUnmounted(() => clearInterval(intervalId))
</script>

<template>
  <div class="overlay-info">
    <h1><code>useIntersect</code></h1>
    <h2>Setup</h2>
    <p>The camera rotates, sending a torus around the screen.</p>
    <p>The torus' ref has been sent to <code>useIntersect</code>.</p>
    <h2>Intersect status</h2>
    <p>{{ txt }}</p>
    <h2><code>off</code></h2>
    <p>Hitting this button should stop <code>useIntersect</code> updates.</p>
    <button @pointerdown="r.off()">Off</button>
  </div>
  <TresCanvas clear-color="#333">
    <TresPerspectiveCamera :rotation-y="ry" />
    <TheExperience ref="r" @intersect="(b) => txt = b" />
  </TresCanvas>
</template>

<style scoped>
.overlay-info {
  position: fixed;
  top: 0;
  left: 0;
  margin: 10px;
  padding: 16px;
  max-width: 400px;
  z-index: 1000;
  font-family:
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    'Noto Sans',
    sans-serif,
    'Apple Color Emoji',
    'Segoe UI Emoji',
    'Segoe UI Symbol',
    'Noto Color Emoji';
  font-size: small;
  background-color: white;
  border-radius: 6px;
  overflow: auto;
}
</style>
