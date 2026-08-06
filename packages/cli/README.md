# @tresjs/cli

> CLI for TresJS projects

## Installation

```bash
pnpm i @tresjs/cli
```

## Usage

```bash
tres --help
```

Or without installing:

```bash
npx @tresjs/cli --help
```

### `tres gltf <input>`

Turns a `.glb`/`.gltf` into a Vue component. Writes `<Model>.gen.vue` next to the
model, except for models under `public/` — that directory is copied verbatim and
never compiled, so those land in `src/models/` (or `app/models/` on Nuxt).

```bash
tres gltf public/models/robot.glb
# ✔ src/models/Robot.gen.vue
#   3 slots: Head, Body, Base
```

Every renderable node becomes a `<slot>` whose fallback is the generated markup, so
a consumer overrides one node from their own file:

```vue
<Robot>
  <template #Head="{ node }">
    <TresMesh :geometry="node.geometry" :material="hologram" @click="explode" />
  </template>
</Robot>
```

Re-run after an artist re-exports and the overrides survive, because they never
lived in the generated file.

The component declares the shape of the model it was generated from, so `node` above
is a `Mesh` rather than an `any`, and a mesh the artist renamed turns into a type error
at the override that used it. Animated models also get their clip names as a union:

```vue
<script setup lang="ts">
const robot = ref<InstanceType<typeof Robot>>()
// actions.Idle, not actions['Idle'] — and a typo is a compile error
onMounted(() => robot.value?.actions.Idle?.play())
</script>
```

| Flag | |
| --- | --- |
| `-o, --output <path>` | where to write (default `<Model>.gen.vue` beside the model) |
| `-u, --url <url>` | url the model is served from (default: inferred from `public/`) |
| `-s, --slots <mode>` | `named` (default), `all`, `none` |
| `--shadows` | add `cast-shadow` / `receive-shadow` |
| `-K, --keepgroups` | keep pass-through groups |
| `-k, --keepnames` | keep `name` attributes |
| `-r, --root <name>` | generate from a subtree |
| `-p, --precision <n>` | fractional digits on transforms (default 2) |
| `-m, --meta` | emit glTF extras as `:user-data` |
| `-c, --console` | print instead of writing |
| `-f, --force` | overwrite a file this tool did not generate |
| `-T, --transform` | optimize the model first (see below) |
| `-i, --instance` | batch repeated meshes into an `InstancedMesh` (see below) |
| `-I, --instanceall` | batch every eligible mesh, even the ones that appear once |
| `--resolution <px>` | max texture size when transforming (default 1024) |
| `--format <fmt>` | texture format when transforming: `webp` (default), `jpeg`, `png`, `avif` |
| `--simplify` | reduce geometry with meshoptimizer |
| `--ratio <n>` | target fraction of vertices to keep with `--simplify` |
| `--error <n>` | error ceiling with `--simplify`, as a fraction of mesh radius |
| `--keepmeshes` | do not merge meshes when transforming |
| `--keepmaterials` | do not batch materials when transforming |
| `--dry-run` | report what the parser sees, generate nothing |
| `--json` | dump the parsed model as JSON |

`--slots named` skips exporter noise like `Object_12` and `Sketchfab_model`. On
marketplace assets that can leave you with nothing to override, so it says so and
points at `--slots all`.

#### `--transform`

Runs the model through [glTF-Transform](https://github.com/donmccurdy/glTF-Transform)
(dedup, weld, texture compression, draco, and more) before generating. It writes a
**separate** `<Model>-transformed.glb` beside the source, never touching the original,
and points the generated `useGLTF()` at the optimized file. Typically 70–90% smaller:

```bash
tres gltf public/models/Robot.glb --transform
# ⚙ Robot.glb [755KB] › Robot-transformed.glb [40KB] (-95%)
#   the component targets the optimized file; useGLTF() now loads it
# ✔ src/models/Robot.gen.vue
```

The optimized output is draco-compressed, so the generated component gets
`useGLTF(url, { draco: true })` automatically.

Draco-compressed and unpacked (`.gltf` + `.bin`) models both work. Draco models get
`useGLTF(url, { draco: true })` automatically, since they render nothing without it.

#### `--instance` / `--instanceall`

Collapses meshes that share a geometry and material into one `InstancedMesh`. This
restructures the output into **two** files, because one SFC is one component:

```bash
tres gltf public/models/Robot.glb --instance
# ⚙ instancing needs deduplicated geometry, so --transform is on and --keepmeshes with it
# ✔ src/models/Robot.instances.gen.vue   ← owns the load and the batches
# ✔ src/models/Robot.gen.vue             ← renders <Instance> against them
```

The provider goes around every copy of the model. The model is loaded and parsed once,
and each copy costs the drawcalls of one:

```vue
<RobotInstances>
  <Robot />
  <Robot :position="[3, 0, 0]" />
  <Robot :position="[-3, 0, 0]" />
</RobotInstances>
```

`--instance` only batches a geometry two or more meshes share; `--instanceall` batches
every eligible mesh, which pays off when the whole model is rendered many times. Skinned
meshes and meshes with morph targets are never batched: an `InstancedMesh` has nowhere to
put per-mesh skeletons or morph influences.

**It turns `--transform` on.** Batching dedupes by geometry identity, and an unoptimized
export hands three.js one geometry object per node however identical they are, so
instancing without the pipeline finds nothing. `--keepmeshes` comes with it, since
`join()` would weld the repeats into a single mesh and leave nothing to batch.

Slots still work. A batched node's slot hands over the batch it belongs to, so an override
can stay in it or leave it:

```vue
<script setup>
import { Instance } from '@tresjs/cientos'
</script>

<template>
  <Robot>
    <!-- stays batched: `batch` is the key its InstancedMesh registered under -->
    <template #Screw="{ batch, position }">
      <Instance :name="batch" :position="position" color="red" @click="loosen" />
    </template>

    <!-- leaves the batch: the geometry and material are the batch's, drawn as its own mesh -->
    <template #Panel="{ geometry, material, position }">
      <TresMesh :geometry :material :position />
    </template>
  </Robot>
</template>
```

Pass `batch`, never the slot name: `--instance` keys a batch after the first mesh of its
bucket, so the two differ as soon as more than one mesh shares a geometry. An `<Instance>`
whose `name` matches no batch renders nothing, and says so.

Leaving the batch costs one drawcall for control. That is what the geometry and material
bindings are for, but it is not free.

`<primitive>` nodes (lights, cameras) cannot be shared between copies: an `Object3D` has
one parent, so a second `<Robot>` steals them from the first. The generator warns when a
model has any and suggests `--root`.

### Build

To build the package run:

```bash
pnpm run build
```

## License

[MIT](/LICENSE)
