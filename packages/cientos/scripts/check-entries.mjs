// Runs after `tsdown` and fails the build when the entries break their contract:
// 1. The root entry must not reach `three/webgpu`, `three/tsl` or `@tresjs/core/webgpu`
//    (peer range is `three >=0.133`).
// 2. Every root export is either in `/webgpu` or in WEBGL_ONLY. A new component must be put in
//    one of them on purpose, so `/webgpu` never ships a component that renders wrong.
// 3. Every name in WEBGL_ONLY calls useWebGPUSupportWarning, so a user who imports it from the
//    root entry onto a WebGPU canvas is told why it does not render.
import { readdirSync, readFileSync } from 'node:fs'
import { dirname, join } from 'pathe'
import { fileURLToPath } from 'node:url'
import { importGraph, report, WEBGPU_ONLY } from '../../../tools/guards/entry-graph.mjs'

// Root exports that `/webgpu` leaves out because they write GLSL or call WebGL-only renderer APIs.
// A TSL port exports its component from `src/webgpu.ts` and removes the name here.
const WEBGL_ONLY = new Set([
  // GLSL `ShaderMaterial` / `onBeforeCompile` (Tier 1)
  'CustomShaderMaterial',
  'Grid',
  'HolographicMaterial',
  'Html',
  'Image',
  'MeshDiscardMaterial',
  'MeshGlassMaterial',
  'MeshWobbleMaterial',
  'Outline',
  'PointMaterial',
  'Sparkles',
  // `LineMaterial` from three-stdlib is a GLSL `ShaderMaterial`
  'CatmullRomCurve3',
  'CubicBezierLine',
  'Line2',
  'QuadraticBezierLine',
  // GLSL `ShaderMaterial` / `onBeforeCompile` that reads or writes a render target (Tier 2).
  // The render target alone is fine: WebGPURenderer renders into `WebGLRenderTarget`.
  'AccumulativeShadows',
  'ContactShadows',
  'MeshPortalMaterial',
  'MeshReflectionMaterial',
  'MeshTransmissionMaterial',
  // three-stdlib GLSL objects and WebGL-only renderer APIs (Tier 3)
  'BakeShadows',
  'Lensflare',
  'Ocean',
  'Reflector',
  'Refractor',
  'Sky',
  'SoftShadows',
  'Stage',
])

const dist = join(dirname(fileURLToPath(import.meta.url)), '../dist')
const src = join(dirname(fileURLToPath(import.meta.url)), '../src')
const FORBIDDEN_IN_ROOT = [...WEBGPU_ONLY, '@tresjs/core/webgpu']

// Rolldown ends an entry with one `export { local as Name, ... }` statement.
const exportedNames = (file) => {
  const code = readFileSync(join(dist, file), 'utf8')
  const names = [...code.matchAll(/\bexport\s*\{([^}]*)\}/g)]
    .flatMap(([, list]) => list.split(','))
    .map(item => item.trim().split(/\s+as\s+/).pop())
    .filter(Boolean)
  return new Set(names)
}

const errors = []
const root = importGraph(dist, 'trescientos.js')

for (const specifier of FORBIDDEN_IN_ROOT) {
  if (root.packages.has(specifier)) {
    errors.push(`dist/trescientos.js reaches "${specifier}". The root entry must work on three versions without WebGPU.`)
  }
}

const rootExports = exportedNames('trescientos.js')
const webgpuExports = exportedNames('webgpu.js')

if (!rootExports.has('OrbitControls') || !webgpuExports.has('OrbitControls')) {
  errors.push('Could not read the exports of dist/trescientos.js or dist/webgpu.js. The check reads the wrong files or the output format changed.')
}

for (const name of rootExports) {
  if (!webgpuExports.has(name) && !WEBGL_ONLY.has(name)) {
    errors.push(`"${name}" is exported from the root entry but not from /webgpu. Export it from src/webgpu.ts, or add it to WEBGL_ONLY if it does not work under WebGPURenderer.`)
  }
}

for (const name of WEBGL_ONLY) {
  if (webgpuExports.has(name)) {
    errors.push(`"${name}" is exported from /webgpu but is still in WEBGL_ONLY. Remove it from the list.`)
  }
  else if (!rootExports.has(name)) {
    errors.push(`"${name}" is in WEBGL_ONLY but the root entry does not export it. Remove it from the list.`)
  }
}

// A source scan, because the bundle may rename the helper. A ported component keeps its call in the
// root entry (that version is still GLSL), so names outside WEBGL_ONLY are allowed.
const warnedNames = new Set(
  readdirSync(src, { recursive: true })
    .filter(file => /\.(?:vue|ts)$/.test(file))
    .flatMap(file => [...readFileSync(join(src, file), 'utf8').matchAll(/useWebGPUSupportWarning\(\s*'(\w+)'/g)].map(([, name]) => name)),
)

for (const name of WEBGL_ONLY) {
  if (!warnedNames.has(name)) {
    errors.push(`"${name}" is in WEBGL_ONLY but does not call useWebGPUSupportWarning('${name}', ...). Add the call to its setup.`)
  }
}

for (const name of warnedNames) {
  if (!rootExports.has(name)) {
    errors.push(`useWebGPUSupportWarning('${name}', ...) names a component that the root entry does not export.`)
  }
}

report('check-entries', errors, `root entry has no WebGPU imports, /webgpu exports ${webgpuExports.size} names and leaves out ${WEBGL_ONLY.size}, all with a WebGPU warning`)
