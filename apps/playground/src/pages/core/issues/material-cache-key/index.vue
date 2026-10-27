<script setup lang="ts">
import { extend, TresCanvas } from '@tresjs/core'
import type { TresRendererSetupContext } from '@tresjs/core'
import { Float32BufferAttribute, SphereGeometry } from 'three'
import { MeshPhysicalNodeMaterial, WebGPURenderer } from 'three/webgpu'
import { useRoute, useRouter } from 'vue-router'

extend({ MeshPhysicalNodeMaterial })

type PropKey = 'transmission' | 'clearcoat' | 'iridescence' | 'sheen' | 'transparent' | 'flatShading' | 'vertexColors' | 'alphaTest'

const CASES: { key: PropKey, off: number | boolean, on: number | boolean, base: Record<string, unknown> }[] = [
  { key: 'transmission', off: 0, on: 1, base: { thickness: 0.5, roughness: 0.1 } },
  { key: 'clearcoat', off: 0, on: 1, base: { roughness: 0.9 } },
  { key: 'iridescence', off: 0, on: 1, base: { roughness: 0.2 } },
  { key: 'sheen', off: 0, on: 1, base: { roughness: 0.9, sheenColor: '#ff3fa0', sheenRoughness: 0.3 } },
  { key: 'transparent', off: false, on: true, base: { opacity: 0.3 } },
  { key: 'flatShading', off: false, on: true, base: {} },
  { key: 'vertexColors', off: false, on: true, base: {} },
  { key: 'alphaTest', off: 0, on: 0.5, base: { opacity: 0.3 } },
]

const route = useRoute()
const router = useRouter()
const rendererKind = computed(() => route.query.renderer === 'webgpu' ? 'webgpu' : 'webgl')
const setRenderer = (kind: 'webgl' | 'webgpu') => router.replace({ query: { ...route.query, renderer: kind } })

const createWebGPURenderer = (ctx: TresRendererSetupContext) =>
  new WebGPURenderer({ canvas: toValue(ctx.canvas), antialias: true })

const bumpNeedsUpdate = ref(false)
const enabled = reactive(Object.fromEntries(CASES.map(c => [c.key, false])) as Record<PropKey, boolean>)

const patched: Record<string, any> = {}
const fresh: Record<string, any> = {}

const geometry = new SphereGeometry(0.42, 20, 10)
const position = geometry.getAttribute('position')
const colors: number[] = []
for (let i = 0; i < position.count; i++) {
  colors.push(position.getY(i) > 0 ? 1 : 0.1, position.getX(i) > 0 ? 1 : 0.1, 0.2)
}
geometry.setAttribute('color', new Float32BufferAttribute(colors, 3))

const valueOf = (c: typeof CASES[number]) => enabled[c.key] ? c.on : c.off
const materialProps = (c: typeof CASES[number]) => ({ color: '#4f9dff', ...c.base, [c.key]: valueOf(c) })

async function toggle(key: PropKey) {
  enabled[key] = !enabled[key]
  if (bumpNeedsUpdate.value) {
    await nextTick()
    patched[key].needsUpdate = true
  }
}

const renderer = shallowRef<any>(null)
const lastRenderObject = new Map<any, any>()
const probe = ref<Record<string, { patched: string, fresh: string, verdict: string }>>({})
const backendLabel = ref('')

function onReady(ctx: any) {
  renderer.value = toValue(ctx.renderer.instance)
}

function wrapRenderObjects(r: any) {
  if (!r._objects || r._objects.__probed) { return }
  const original = r._objects.get.bind(r._objects)
  r._objects.get = (object: any, material: any, ...rest: any[]) => {
    const ro = original(object, material, ...rest)
    lastRenderObject.set(material, ro)
    return ro
  }
  r._objects.__probed = true
}

// A reused (stale) program or render object keeps the cache key it was built with, so it differs from the fresh material's key.
function programKey(r: any, material: any) {
  if (!material) { return '-' }
  if (r.isWebGPURenderer) {
    const ro = lastRenderObject.get(material)
    return ro ? String(ro.initialCacheKey) : '-'
  }
  return r.properties.get(material).currentProgram?.cacheKey ?? '-'
}

let timer: ReturnType<typeof setInterval> | undefined
onMounted(() => {
  timer = setInterval(() => {
    const r = renderer.value
    if (!r) { return }
    if (r.isWebGPURenderer) {
      wrapRenderObjects(r)
      backendLabel.value = r.backend?.isWebGPUBackend ? 'WebGPURenderer (WebGPU backend)' : 'WebGPURenderer (WebGL2 fallback)'
    }
    else {
      backendLabel.value = 'WebGLRenderer'
    }
    const next: typeof probe.value = {}
    for (const c of CASES) {
      const p = programKey(r, patched[c.key])
      const f = programKey(r, fresh[c.key])
      // A toggle remounts the fresh material, which has no key until its first render.
      const verdict = p === '-' || f === '-' ? 'pending' : p === f ? 'ok' : 'STALE'
      next[c.key] = { patched: p, fresh: f, verdict }
    }
    probe.value = next
  }, 300)
})
onUnmounted(() => clearInterval(timer))
</script>

<template>
  <div class="panel">
    <div class="row">
      <button :class="{ active: rendererKind === 'webgl' }" @click="setRenderer('webgl')">WebGL</button>
      <button :class="{ active: rendererKind === 'webgpu' }" @click="setRenderer('webgpu')">WebGPU</button>
      <span>{{ backendLabel }}</span>
    </div>
    <label class="row">
      <input v-model="bumpNeedsUpdate" type="checkbox" data-test="bump" />
      set material.needsUpdate = true after each patch
    </label>
    <table>
      <thead>
        <tr><th>prop</th><th>value</th><th>verdict</th></tr>
      </thead>
      <tbody>
        <tr v-for="c in CASES" :key="c.key">
          <td><button :data-test="`toggle-${c.key}`" @click="toggle(c.key)">{{ c.key }}</button></td>
          <td>{{ valueOf(c) }}</td>
          <td :data-test="`verdict-${c.key}`" :class="probe[c.key]?.verdict">{{ probe[c.key]?.verdict }}</td>
        </tr>
      </tbody>
    </table>
    <p>Top row: patched in place. Bottom row: new material per value.</p>
    <p>WebGL: keep transmission at 0. Its extra pass re-checks opaque programs and hides the flatShading / vertexColors bug.</p>
  </div>

  <TresCanvas
    :key="rendererKind"
    :renderer="rendererKind === 'webgpu' ? createWebGPURenderer : undefined"
    clear-color="#202028"
    @ready="onReady"
  >
    <TresPerspectiveCamera :position="[0, 1.6, 9]" :look-at="[0, 1.6, 0]" :fov="45" />
    <TresAmbientLight :intensity="0.6" />
    <TresDirectionalLight :position="[3, 4, 5]" :intensity="2.5" />
    <TresMesh :position="[0, 0, -1.5]">
      <TresPlaneGeometry :args="[12, 1.2]" />
      <TresMeshBasicMaterial color="#ffd400" />
    </TresMesh>

    <template v-for="(c, i) in CASES" :key="c.key">
      <TresMesh :position="[(i - 3.5) * 1.1, 0.6, 0]" :geometry="geometry">
        <TresMeshPhysicalNodeMaterial
          v-if="rendererKind === 'webgpu'"
          :ref="(el: any) => { patched[c.key] = el }"
          v-bind="materialProps(c)"
        />
        <TresMeshPhysicalMaterial
          v-else
          :ref="(el: any) => { patched[c.key] = el }"
          v-bind="materialProps(c)"
        />
      </TresMesh>
      <TresMesh :position="[(i - 3.5) * 1.1, -0.6, 0]" :geometry="geometry">
        <TresMeshPhysicalNodeMaterial
          v-if="rendererKind === 'webgpu'"
          :key="`${c.key}-${enabled[c.key]}`"
          :ref="(el: any) => { fresh[c.key] = el }"
          v-bind="materialProps(c)"
        />
        <TresMeshPhysicalMaterial
          v-else
          :key="`${c.key}-${enabled[c.key]}`"
          :ref="(el: any) => { fresh[c.key] = el }"
          v-bind="materialProps(c)"
        />
      </TresMesh>
    </template>
  </TresCanvas>
</template>

<style scoped>
.panel {
  position: absolute;
  top: 8px;
  left: 8px;
  z-index: 10;
  padding: 8px;
  background: rgba(0, 0, 0, 0.7);
  color: #fff;
  font: 12px monospace;
}
.row {
  display: flex;
  gap: 8px;
  align-items: center;
  margin-bottom: 6px;
}
button.active {
  font-weight: bold;
  outline: 2px solid #4f9dff;
}
td.STALE {
  color: #ff5050;
  font-weight: bold;
}
td.pending {
  color: #999;
}
td.ok {
  color: #50ff80;
}
</style>
