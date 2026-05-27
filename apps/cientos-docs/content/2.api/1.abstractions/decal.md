---
title: Decal
description: Project a texture onto a mesh's surface — with an optional in-canvas editor UI.
---

`<Decal>` projects a flat texture onto the surface of a parent mesh,
conforming to its geometry. Multiple decals can stack on the same mesh
with explicit z-layering, the JSON layout round-trips losslessly, and
the entry-by-entry shape stays human-readable.

- 🎨 Drop-in **editor UI** via `<DecalDebugUI>` — placement, rotate / scale / snap, tint, flip, layers, undo / redo, import / export.
- 🛠 **Programmatic API** via [`useDecalEditor()`](#programmatic-api-usedecaleditor) for custom panels and automation.
- 🖼️ **Texture palette** — pass an array of `Texture` to `:map`.
- 🧩 **Custom material** — override the default via the slot.
- 💾 **Lossless JSON** — `v-model:data` round-trips to plain JSON.
- ⚡ **BVH-accelerated** — auto-detected via [`useBVH`](/api/debug-performance/use-bvh); 10–100× faster on dense meshes.
- 📚 **Per-mesh stacking** — `zIndex` with automatic polygon-offset.

::SceneWrapper
  ::AbstractionsDecal
  ::
::

## Usage

The minimal setup is a `<Decal>` placed as a child of any `<TresMesh>`,
with a JSON list of stamped decals bound via `v-model:data` and one or
more textures via `:map`.

```vue
<script setup lang="ts">
import { Decal, OrbitControls, useTexture } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { reactive } from 'vue'

const { state: texture } = useTexture('/textures/logo.png')

const decals = reactive([
  {
    id: 'logo-1',
    position: [0, 0, 0.5],
    orientation: [0, 0, 0],
    size: [0.75, 0.17, 1],
    zIndex: 0,
    map: 'logo.png',
  },
])
</script>

<template>
  <TresCanvas>
    <TresPerspectiveCamera :position="[2, 2, 3]" />
    <OrbitControls />
    <TresMesh>
      <TresBoxGeometry />
      <TresMeshStandardMaterial color="white" />
      <Decal v-if="texture" v-model:data="decals" :map="texture" />
    </TresMesh>
  </TresCanvas>
</template>
```

::prose-note
The `v-model:data` array is the **single source of truth** — every
decal you can see lives in it. It serializes to plain JSON so you can
save / load it from a backend, localStorage, or a `.json` file.
::

## Multiple textures (palette)

Pass an array to `:map` to give users a palette of textures to pick
from. The array returned by [`useTextures`](/api/loaders/use-textures)
plugs in directly:

```vue
<script setup lang="ts">
import { Decal, useTextures } from '@tresjs/cientos'

const { textures } = useTextures([
  '/textures/logo.png',
  '/textures/badge.png',
  '/textures/sticker.png',
])
</script>

<template>
  <Decal v-model:data="decals" :map="textures" />
</template>
```

Each entry references its texture by `name` — `<Decal>` auto-fills
`texture.name` from the URL filename when missing, so JSON `map`
fields round-trip cleanly.

## Custom material

The default material is `MeshBasicMaterial`. Override it via the slot
to plug in any Three.js material — `MeshStandardMaterial`,
`MeshPhysicalMaterial`, or a custom shader.

```vue
<Decal v-model:data="decals" :map="texture">
  <TresMeshStandardMaterial :transparent="true" :polygon-offset="true" />
</Decal>
```

::prose-note
Keep `transparent: true` and `polygonOffset: true` on any custom
material, otherwise stacking and alpha handling won't work as expected.
Color / opacity tint from the editor only applies to materials
exposing `.color` and `.opacity` (`MeshBasicMaterial`,
`MeshStandardMaterial`, …) — bespoke shader materials are skipped
silently.
::

## Stacking decals (z-layering)

Each decal has a `zIndex` controlling its draw order on the parent
mesh. Higher = on top. The component handles z-fighting via
`polygonOffset` automatically — but if you stack many decals near
parallel surfaces and still see flicker, raise `layerGap`.

::SceneWrapper
  ::AbstractionsDecalStacking
  ::
::

```vue
<Decal
  v-model:data="decals"
  :map="textures"
  :layer-gap="0.002"
/>
```

zIndex stacks are **per-mesh** — two decals on different meshes never
compete for the same layer slot.

## Editable mode + `<DecalDebugUI>`

Add the `editable` prop to mount the interactive editor, then pair it
with `<DecalDebugUI>` — a full in-canvas editor that ships as a drop-in
HTML overlay sitting **outside** `<TresCanvas>`.

::prose-warning
`<DecalDebugUI>` needs its stylesheet — import it **once** at your app
entry. `<Decal>` itself is style-less, so this is only needed when you
mount `<DecalDebugUI>`.

```ts
// Vite / Vue — in main.ts
import '@tresjs/cientos/styles.css'
```

```ts
// Nuxt — in nuxt.config.ts
export default defineNuxtConfig({
  css: ['@tresjs/cientos/styles.css'],
})
```
::

::SceneWrapper
  ::AbstractionsDecalEditable
  ::
::

Three panels: a floating **handle** anchored to the editing decal, a
bottom **dock** (texture picker + edit tools), a right-side **layer
panel**.

- **Floating handle** (rotate + scale + snap + live `scale% · rotation° · L<n>` badge)
- **Color tint & opacity**
- **Mirror** (flip X / flip Y)
- **Layer controls** (`L+` / `L-`)
- **Visibility toggle**
- **Per-row remove**
- **Layer panel** (mesh-grouped, drag-to-reorder)
- **Texture picker** (drag or click-to-arm)
- **Mode badge** (placing / editing status)
- **Undo / Redo** buttons
- **Import / Export** buttons

```vue
<script setup lang="ts">
import { Decal, DecalDebugUI, OrbitControls, useTextures } from '@tresjs/cientos'
import type { DecalEditorSession, DecalJsonEntry } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { computed, reactive, shallowRef } from 'vue'

const { textures } = useTextures(['/textures/a.png', '/textures/b.png'])

const layout = reactive<Record<string, DecalJsonEntry[]>>({
  cube: [],
  sphere: [],
})

const decalRef = shallowRef<{ editor: DecalEditorSession } | null>(null)
const session = computed(() => decalRef.value?.editor ?? null)
</script>

<template>
  <DecalDebugUI :session="session" :textures="textures ?? []" :data="layout" />

  <TresCanvas>
    <TresPerspectiveCamera :position="[2, 2, 4]" />
    <OrbitControls />

    <TresMesh name="cube" :position="[-1.2, 0, 0]">
      <TresBoxGeometry />
      <TresMeshStandardMaterial color="white" />
      <Decal ref="decalRef" v-model:data="layout.cube" :map="textures" editable />
    </TresMesh>

    <TresMesh name="sphere" :position="[1.2, 0, 0]">
      <TresSphereGeometry :args="[0.7]" />
      <TresMeshStandardMaterial color="white" />
      <Decal v-model:data="layout.sphere" :map="textures" editable />
    </TresMesh>
  </TresCanvas>
</template>
```

### How the wiring works

- `v-model:data="layout.cube"` — each `<Decal>` owns one slice of the
  layout object. The slice's key matches the parent mesh's `name`.
- `ref="decalRef"` — grab a reference to any `<Decal>` in the canvas;
  the session is canvas-shared so it doesn't matter which.
- `session = decalRef.value?.editor` — the editor session powers
  `<DecalDebugUI>`. Pass it through.
- `:data="layout"` on `<DecalDebugUI>` — the full mesh-keyed layout, so
  the overlay can render the layer panel and route imports back to each
  Decal by name.

::prose-note
The overlay is full-viewport (`position: fixed; inset: 0`) by default.
When embedding inside a bounded stage (docs, modal, sidebar preview),
pass `contained` so the overlay positions itself absolutely against
the nearest positioned ancestor instead.
::

```vue
<div style="position: relative; height: 500px;">
  <DecalDebugUI contained ... />
  <TresCanvas>...</TresCanvas>
</div>
```

## Import / Export

The Export button in the dock auto-downloads the current layout as
`decal-layout-YYYY-MM-DD.json`. The Import button opens a file picker;
the loaded JSON is sanitised (unknown mesh keys and unknown texture
names are dropped with a warning) and routed back through each
`<Decal>` automatically — no extra host code needed.

```vue
<!-- Custom filename -->
<DecalDebugUI :export-filename="`${sceneName}.json`" ... />

<!-- Disable the built-in download — handle export yourself -->
<DecalDebugUI :export-filename="null" @export="postToBackend" ... />
```

## Targeting a loaded model (`.glb`)

A `<Decal>` can be a **direct child of `<primitive>`**. Auto-resolution
walks one step up the scene graph and only accepts a `Mesh` — so the
behaviour depends on what the `<primitive>` wraps.

### When `:object` is a `Mesh`

The decal auto-resolves the wrapped mesh as its target. This is the
simplest option for a single-mesh asset:

```vue
<script setup lang="ts">
import { Decal, useGLTF } from '@tresjs/cientos'

const { nodes } = useGLTF('/models/helmet.glb', { draco: true })
// nodes.Helmet is a Mesh in this asset.
</script>

<template>
  <primitive v-if="nodes?.Helmet" :object="nodes.Helmet">
    <Decal v-model:data="layout.helmet" :map="textures" editable />
  </primitive>
</template>
```

::prose-note
The resolved parent is the `<primitive>`'s retargeting proxy rather than
the raw object. This is transparent in practice — geometry, `matrixWorld`
and raycasting all forward to the wrapped object — so the decal projects
and follows transforms correctly.
::

### When `:object` is a `Group`

A named node in a `.glb` is often a `Group` containing several child
meshes (e.g. a ceramic body + a metallic interior). Auto-resolution
returns `null` in that case and the decal silently does nothing — pass
the actual target child via `:mesh`:

```vue
<script setup lang="ts">
import { Decal, useGLTF } from '@tresjs/cientos'
import { computed } from 'vue'
import type { Mesh } from 'three'

const { nodes } = useGLTF('/models/mug.glb', { draco: true })
// nodes.Mug is a Group — pick the child you want to decal.
const body = computed<Mesh | null>(
  () => (nodes.value?.Mug?.getObjectByName('Body') as Mesh) ?? null,
)
</script>

<template>
  <primitive v-if="nodes?.Mug" :object="nodes.Mug">
    <Decal v-model:data="layout.mug" :map="textures" :mesh="body" editable />
  </primitive>
</template>
```

### Targeting an extracted sub-mesh

Alternatively, **wrap a `<TresMesh>` around an extracted sub-mesh**. Reach
for this when you need to target one named sub-mesh of a larger model (and
keep its material): use
[`useGraph`](https://docs.tresjs.org/api/composables.html#usegraph) to
pull the sub-mesh, then build a regular `<TresMesh>` around its
`:geometry`:

```vue
<script setup lang="ts">
import { useGraph, useLoader } from '@tresjs/core'
import { Decal } from '@tresjs/cientos'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { computed } from 'vue'

const { state: model } = useLoader(GLTFLoader, '/models/helmet.glb')
const scene = computed(() => model.value?.scene)
const graph = useGraph(scene)
const nodes = computed(() => graph.value?.nodes)
</script>

<template>
  <TresMesh
    v-if="nodes?.Helmet.geometry"
    name="helmet"
    :geometry="nodes.Helmet.geometry"
  >
    <primitive :object="nodes.Helmet.material" attach="material" />
    <Decal v-model:data="layout.helmet" :map="textures" editable />
  </TresMesh>
</template>
```

The mesh's `geometry` and `material` come from the loaded model; the
`<Decal>` lives inside a regular `<TresMesh>` with a clean scene-graph
parent.

::prose-warning
A saved decal's `position` is stored in **world space**, so it is
re-projected onto the parent using the parent's transform **at load
time**. A persisted layout therefore only round-trips if the parent sits
at the same transform it had when the decal was authored. Parents under a
continuously- or randomly-animated wrapper (e.g. `<Levioso>`, which starts
at a random phase each reload) move out from under the saved point, so the
projection clips to nothing and the decal vanishes. Author and persist
decals on parents whose transform is deterministic at load time, or apply
the animation only after the layout has mounted.
::

## JSON schema

Each entry in the `data` array follows the `DecalJsonEntry` shape; the
layout passed to `<DecalDebugUI>` groups these by mesh name as
`DecalLayout = Record<string, DecalJsonEntry[]>`.

<details>
  <summary>Full schema</summary>

```ts
interface DecalJsonEntry {
  id: string // stable UUID
  position: [number, number, number] // target-mesh local space (raycast hit, baked into the parent's frame)
  orientation: [number, number, number] // Euler XYZ
  size: [number, number, number] // extents along X/Y; Z = projection depth
  zIndex: number // per-mesh layer order, ≥ 0
  map: string | null // matches a texture's .name
  flipX?: boolean // omitted when false
  flipY?: boolean // omitted when false
  color?: string // hex (e.g. '#ff6b35'), omitted when no tint
  opacity?: number // 0..1, omitted when 1
  visible?: boolean // omitted when true; false hides the decal
}

type DecalLayout = Record<string, DecalJsonEntry[]>
// { sphere: [...], cube: [...] }
```

</details>

## `<Decal>` props

| Prop              | Description                                                                                                                                                              | Default  |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------- |
| **data**          | Two-way list of stamped decals (use with `v-model:data`).                                                                                                                | `[]`     |
| **map**           | A single `Texture` or array of `Texture[]`. With multiple, the editor lets the user cycle through them as a palette.                                                     | `null`   |
| **mesh**          | Optional explicit target mesh (`Mesh` or `ShallowRef<Mesh>`). When omitted, the scene-graph parent of `<Decal>` is auto-resolved via a hidden anchor `<TresGroup>`. The decal mesh is imperatively parented to the target so it follows the target's runtime `position` / `rotation` / `scale` via the scene-graph hierarchy. | `null`   |
| **editable**      | When `true`, mounts the interactive editor (raycast, hover, click-to-place, drag-from-thumbnail). Required for `<DecalDebugUI>` interactions to work on this Decal.      | `false`  |
| **baseSize**      | Reference size used to derive each decal's size from the texture aspect ratio.                                                                                           | `1`      |
| **baseOffset**    | Distance along the surface normal (parent units) to avoid z-fighting between the decal and the host mesh.                                                                | `0.01`   |
| **layerGap**      | Extra offset added per `zIndex` step on top of `baseOffset`. Increase if stacked decals still flicker.                                                                   | `0.001`  |
| **cullThreshold** | Drops projected triangles whose face normal makes an angle steeper than `acos(threshold)` with the projector. Mitigates [#21187](https://github.com/mrdoob/three.js/issues/21187). Pass `0` to disable. | `0.2`    |
| **edgeColor**     | Color of the edge outline drawn around a decal while it is hovered (pointer or layer panel) in editable mode.                                                            | `#0000ff` |

## `<Decal>` events

| Event             | Payload                                       | Description                                                                              |
| ----------------- | --------------------------------------------- | ---------------------------------------------------------------------------------------- |
| `update:data`     | `DecalJsonEntry[]`                            | v-model partner — fires whenever the JSON list changes.                                  |
| `add`             | `DecalEntry`                                  | A new decal has been committed (create mode → confirm).                                  |
| `update`          | `DecalEntry`                                  | An existing decal has been committed (update mode → confirm).                            |
| `delete`          | `DecalEntry`                                  | A decal has been removed (delete button or `Del` / `Backspace`).                         |
| `select`          | `DecalEntry`                                  | Edition began on `entry` (panel click, 3D click, or programmatic).                       |
| `cancel`          | —                                             | Edition was aborted without commit (`Esc`, click-outside in create mode).                |
| `decalClick`      | `{ entry: DecalEntry, event: MouseEvent }`    | Fires on click of any stamped decal, even when `editable` is `false`.                    |

## `<Decal>` exposed (via `ref`)

The template ref resolves to `DecalImperativeApi` — import the type for
full autocompletion:

```ts
import type { DecalImperativeApi } from '@tresjs/cientos'

const decalRef = ref<DecalImperativeApi | null>(null)
```

| Property          | Type                                          | Description                                                                              |
| ----------------- | --------------------------------------------- | ---------------------------------------------------------------------------------------- |
| `editor`          | `DecalEditorSession`                          | The canvas-shared editor session. Pass it to `<DecalDebugUI :session>`.                  |
| `beginEditById`   | `(id: string) => boolean`                     | Programmatically start editing a specific decal. Returns `false` if the id is unknown.   |
| `commit`          | `() => void`                                  | Commit the in-flight edit (same as `Enter`).                                             |
| `cancel`          | `() => void`                                  | Abort the in-flight edit (same as `Esc`).                                                |
| `remove`          | `() => void`                                  | Delete the currently edited decal (same as `Del`).                                       |

## `<DecalDebugUI>` props

| Prop                | Description                                                                                                                                                              | Default                            |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------- |
| **session**         | `DecalEditorSession \| null` — obtained from any `<Decal>` ref via `decalRef.value?.editor`. Mandatory for the overlay to wire up the interactive logic.                  | `null`                             |
| **data**            | Mesh-name-keyed map of decal slices — `{ sphere: [...], cube: [...] }`. Each key matches a `<TresMesh name="...">` whose child `<Decal>` owns the slice.                  | `{}`                               |
| **textures**        | The full texture palette shown in the dock's picker.                                                                                                                     | `[]`                               |
| **theme**           | `'light'` or `'dark'` — overlay theme tokens.                                                                                                                            | `'light'`                          |
| **snapAngle**       | Rotation step (degrees) applied when the snap toggle is on. Snap-tick ring on the handle adapts automatically.                                                           | `15`                               |
| **exportFilename**  | Filename for the built-in JSON download. When omitted, defaults to `decal-layout-YYYY-MM-DD.json`. Pass `null` to skip the auto-download (the `@export` event still fires). | `decal-layout-YYYY-MM-DD.json`     |
| **contained**       | Scope the overlay to the nearest positioned ancestor instead of pinning it to the viewport. Useful for embedding the editor inside a docs page or a bounded host stage.   | `false`                            |

## `<DecalDebugUI>` events

| Event       | Payload         | Description                                                                                                                                  |
| ----------- | --------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `export`    | `DecalLayout`   | Fires after the user clicks Export. The download (if enabled) has already been triggered — use this for side effects (POST, analytics…).     |
| `import`    | `DecalLayout`   | Fires after the user picks a JSON file. The layout has been sanitised (unknown keys dropped) and already applied to the bound Decals.        |

## Caveats

- ✨ The overlay sits at `position: fixed; inset: 0; pointer-events: none` with
  individual panels opting back in. It sits **above** the canvas by default
  (`z-index: 1000000`) — adjust via host CSS if needed.

- 🎨 `<DecalDebugUI>` ships its own theme in a global stylesheet under the
  `.cientos-decal-ui` namespace, so host styles aren't affected. The CSS
  variables (`--accent`, `--dock-bg`, etc.) can be overridden by targeting
  the namespace.

- 🔶 Decals are **per-canvas** — if you have multiple `<TresCanvas>` in your
  app, each one has its own independent session. Pair each `<DecalDebugUI>`
  with the right `session` (from one of the Decals inside that canvas).

- 🧩 The parent mesh resolution defaults to the scene-graph parent. If your
  setup needs a different target (e.g. a mesh referenced from outside the
  Decal's parent slot), pass `:mesh="meshRef"`.

## Limitations

::prose-note
Decal vertices are baked into the **target mesh's local space** at
build time (the decal mesh is imperatively re-parented to the target,
so `position` / `rotation` / `scale` on the parent are followed via
the scene graph — no rebuild needed).

Runtime deformations that change vertex positions outside of a
transform are **not** followed:

- **`SkinnedMesh`** skinning is not applied — the decal stays in rest
  pose. See [three.js#7926](https://github.com/mrdoob/three.js/issues/7926).
- **`morphAttributes`** on the parent are ignored.
- Direct mutations of the parent's `geometry.attributes.position`
  (e.g. CPU wave displacement, GPGPU) — the projection is baked once.
- Decals near silhouettes can wrap around onto opposite faces (see
  [three.js#21187](https://github.com/mrdoob/three.js/issues/21187)) —
  mitigated by the `cullThreshold` prop, default `0.2`.

`<Decal>` warns once per parent mesh when it detects these conditions.
::

## Keyboard shortcuts

| Shortcut             | Action                                                |
| -------------------- | ----------------------------------------------------- |
| `Enter`              | Confirm the in-flight edit                            |
| `Esc`                | Cancel (revert updates, drop pending placements)      |
| `Del` / `⌫`          | Delete the edited decal (or cancel a create)          |
| `⌘Z` / `Ctrl+Z`      | Undo                                                  |
| `⇧⌘Z` / `Ctrl+⇧Z`    | Redo                                                  |
| Click outside        | Auto-commit an in-flight update; cancel a create      |

## Programmatic API (`useDecalEditor`)

Skip `<DecalDebugUI>` entirely or augment it with custom panels —
`useDecalEditor()` returns the same canvas-scoped session every Decal
shares. Call it from any component inside `<TresCanvas>` (after at
least one `<Decal>` has mounted).

```ts
import { useDecalEditor } from '@tresjs/cientos'

const session = useDecalEditor()
```

The session exposes reactive state (`editingEntry`, `editingMode`,
`canUndo`, `canRedo`, …), by-id mutators (`beginEditById`,
`setZIndexById`, `setVisibilityById`, `removeById`), batched updates
(`setMeshData`), commit / delete / cancel listeners, undo / redo, and
a `registerDecalEntry` hook for external entries. Helper utilities
(`ensureTextureNames`, `getTextureName`, `getTextureAspect`,
`invalidateDecalGeometry`) are exported alongside.

<details>
  <summary>Full API reference</summary>

#### Reactive state

```ts
session.editingEntry // ShallowRef<DecalEntry | null>
session.editingMode // Ref<'create' | 'update' | null>
session.lockedMeshUuid // Ref<string | null>
session.hoveredEntry // ShallowRef<DecalEntry | null>
session.canUndo // Ref<boolean>
session.canRedo // Ref<boolean>
```

#### Mutating decals by id

```ts
session.beginEditById(id) // start editing a placed decal
session.setZIndexById(id, newZ) // reorder one decal
session.setVisibilityById(id, false) // hide / show
session.removeById(id) // delete
```

When the targeted id matches the **currently editing** entry, mutations
land on the in-flight buffer (committed on `Enter`, reverted on `Esc`).
Otherwise they update `data` immediately and record history.

#### Batched mesh updates

```ts
session.setMeshData(meshName, nextEntries, { recordHistory: true })
```

A single emit avoids the stale-snapshot race that hits multiple
back-to-back `setZIndexById` calls in the same tick.

#### Listening to commits

```ts
const off = session.onCommit((entry, mode) => {
  console.log(mode, entry) // mode: 'create' | 'update'
})
session.onDelete((entry) => { /* … */ })
session.onCancel(() => { /* … */ })

// All return an unsubscribe function:
onBeforeUnmount(off)
```

#### Undo / redo

```ts
session.canUndo.value // Ref<boolean>
session.undo() // returns true if something was undone
session.redo()
```

History is per-canvas, capped at 100 operations, disabled mid-edit.

#### Power user — external entries

Plug a decal-like object that lives outside a `<Decal>` (custom data
source, server snapshot, fake entry for tests) by registering a
`DecalEntryActions` bundle so the `*ById` session methods route to it:

```ts
import type { DecalEntryActions } from '@tresjs/cientos'

session.registerDecalEntry('decal-7', {
  beginEdit: () => { /* … */ },
  setZIndex: (newZ) => { /* … */ },
  setVisibility: (visible) => { /* … */ },
  remove: () => { /* … */ },
} satisfies DecalEntryActions)
onBeforeUnmount(() => session.unregisterDecalEntry('decal-7'))
```

#### Helper utilities

| Helper                          | Use                                                                                |
| ------------------------------- | ---------------------------------------------------------------------------------- |
| `ensureTextureNames(textures)`  | Back-fills `texture.name` from `userData.name` or the filename in `image.src`.     |
| `getTextureName(texture)`       | Single-texture variant — returns a stable name or `null`.                          |
| `getTextureAspect(texture)`     | `{ x, y }` aspect ratio for custom-sized decals.                                   |
| `invalidateDecalGeometry(mesh)` | Force a rebuild on the next frame — call when the parent mesh moved or swapped.   |

</details>
