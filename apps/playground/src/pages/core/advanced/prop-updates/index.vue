<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { BoxGeometry, Euler, Vector3 } from 'three'
import { useRoute } from 'vue-router'

type Mode = 'arrays' | 'objects' | 'numbers'

const COLUMNS = 50
const ROWS = 40
const COUNT = COLUMNS * ROWS
const WARMUP_FRAMES = 30
const PROPS_PER_MESH: Record<Mode, number> = { arrays: 2, objects: 2, numbers: 3 }

const route = useRoute()
const mode = ref<Mode>((route.query.mode as Mode) ?? 'arrays')
const frames = ref(Number(route.query.frames ?? 300))
const frame = shallowRef(0)
const running = ref(false)
const result = ref<{ mode: Mode, frames: number, median: number, mean: number, p95: number } | null>(null)

const geometry = new BoxGeometry(0.8, 0.8, 0.8)
const basePositions = Array.from({ length: COUNT }, (_, i) => [(i % COLUMNS) - COLUMNS / 2, Math.floor(i / COLUMNS) - ROWS / 2, 0])
const ZERO = [0, 0, 0]
// Two prebuilt sets, so `objects` mode patches with an existing object each frame and allocates nothing.
const vectorSets = [0, 1].map(set => basePositions.map(([x, y]) => new Vector3(x, y, set * 0.5)))
const eulerSets = [0, 1].map(set => basePositions.map((_, i) => new Euler(0, i * 0.1 + set, 0)))

const position = (i: number) => {
  if (mode.value === 'arrays') { return [basePositions[i][0], basePositions[i][1], Math.sin(frame.value * 0.05 + i) * 0.5] }
  if (mode.value === 'objects') { return vectorSets[frame.value % 2][i] }
  return basePositions[i]
}
const rotation = (i: number) => {
  if (mode.value === 'arrays') { return [0, frame.value * 0.02 + i, 0] }
  if (mode.value === 'objects') { return eulerSets[frame.value % 2][i] }
  return ZERO
}
const scale = (i: number) => mode.value === 'numbers' ? 0.6 + Math.abs(Math.sin(frame.value * 0.05 + i)) * 0.4 : 1
const opacity = (i: number) => mode.value === 'numbers' ? 0.4 + Math.abs(Math.cos(frame.value * 0.05 + i)) * 0.6 : 1
const color = (i: number) => mode.value === 'numbers' ? (frame.value + i) % 2 ? 0xFF2266 : 0x22CCFF : 0x22CCFF

const percentile = (sorted: number[], p: number) => sorted[Math.min(sorted.length - 1, Math.floor(sorted.length * p))]

const run = async () => {
  if (running.value) { return }
  running.value = true
  result.value = null
  const samples: number[] = []
  for (let f = 0; f < WARMUP_FRAMES + frames.value; f++) {
    await new Promise(requestAnimationFrame)
    const start = performance.now()
    frame.value++
    await nextTick()
    if (f >= WARMUP_FRAMES) { samples.push(performance.now() - start) }
  }
  const sorted = [...samples].sort((a, b) => a - b)
  const round = (ms: number) => Math.round(ms * 1000) / 1000
  result.value = {
    mode: mode.value,
    frames: samples.length,
    median: round(percentile(sorted, 0.5)),
    mean: round(samples.reduce((sum, ms) => sum + ms, 0) / samples.length),
    p95: round(percentile(sorted, 0.95)),
  }
  running.value = false
}

onMounted(() => {
  if (route.query.run !== undefined) { setTimeout(run, 1000) }
})
</script>

<template>
  <div class="absolute top-4 left-4 z-10 flex flex-col gap-2 p-3 bg-white/90 rounded text-sm max-w-xs">
    <p>
      {{ COUNT }} meshes. Each frame, Vue patches {{ PROPS_PER_MESH[mode] }} props on every mesh
      ({{ COUNT * PROPS_PER_MESH[mode] }} patches). The result is the time from the state change until Vue has applied all patches.
    </p>
    <label class="flex gap-2 items-center">
      Mode
      <select v-model="mode" data-test="mode" class="border rounded px-1" :disabled="running">
        <option value="arrays">arrays (position, rotation)</option>
        <option value="objects">objects (Vector3, Euler)</option>
        <option value="numbers">numbers (scale, opacity, color)</option>
      </select>
    </label>
    <label class="flex gap-2 items-center">
      Frames
      <input v-model.number="frames" type="number" min="10" class="border rounded px-1 w-20" :disabled="running" />
    </label>
    <button class="px-3 py-1 bg-black text-white rounded disabled:opacity-50" data-test="run" :disabled="running" @click="run">
      {{ running ? 'Running…' : 'Run' }}
    </button>
    <pre v-if="result" data-test="result">{{ JSON.stringify(result, null, 1) }}</pre>
  </div>

  <TresCanvas clear-color="#111111">
    <TresPerspectiveCamera :position="[0, 0, 45]" :look-at="[0, 0, 0]" />
    <TresMesh
      v-for="(_, i) in COUNT"
      :key="i"
      :geometry="geometry"
      :position="position(i)"
      :rotation="rotation(i)"
      :scale="scale(i)"
    >
      <TresMeshBasicMaterial :color="color(i)" :opacity="opacity(i)" transparent />
    </TresMesh>
  </TresCanvas>
</template>
