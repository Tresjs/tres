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
at the override that used it. Animated models get their clip names as a union and hand
the bound `actions` to `@ready`, which fires once the clips are loaded and the actions
bound (`isReady` exposes the same as a value):

```vue
<template>
  <!-- actions.Idle, not actions['Idle'], and a typo is a compile error -->
  <Robot @ready="({ actions }) => actions.Idle?.play()" />
</template>
```

| Flag | |
| --- | --- |
| `-o, --output <path>` | file, or a directory to write `<Model>.gen.vue` into (default: beside the model) |
| `-u, --url <url>` | url the model is served from (default: inferred from `public/`) |
| `-a, --animations <path>` | take clips from another glb, merged with the model's own; repeatable |
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
| `-P, --physics <engine>` | generate colliders from node name suffixes: `rapier` (see below) |
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

`-o` takes either a file or a directory, and anything not ending in `.vue` is a directory
(missing ones are created). Paths are relative to where you run the command, so
`-o /src/models` is the filesystem root rather than your project, which it will tell you:

```bash
tres gltf public/models/Dummy.glb -o src/models
# ✔ src/models/Dummy.gen.vue
```

#### `--animations`

Mixamo, KayKit and Quaternius ship the mesh in one file and the clips in others.
Pass each clip file and they are merged into one array, model first, with
`ActionName` unioned across all of them:

```bash
tres gltf public/models/Dummy.glb \
  -a public/models/Idle.glb -a public/models/Running_A.glb
```

Both files are parsed, so the CLI also checks each clip's track targets against the
model's node names — the one animation failure that is silent at runtime.

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

#### `--physics rapier`

Reads collision off the node names, so an artist authors physics in Blender and nobody
edits the generated file. The vocabulary is
[Godot's](https://docs.godotengine.org/en/stable/tutorials/assets_pipeline/importing_3d_scenes/node_type_customization.html),
so a level already named for its importer works unchanged:

```bash
tres gltf public/models/level.glb --physics rapier
# ✔ src/models/Level.gen.vue
```

| Suffix | Body | Shape | Mesh |
| --- | --- | --- | --- |
| `-col` | fixed | trimesh | drawn |
| `-colonly` | fixed | trimesh | hidden |
| `-convcol` | fixed | convex hull | drawn |
| `-convcolonly` | fixed | convex hull | hidden |
| `-rigid` | dynamic | convex hull | drawn |
| `-rb-<type>` | `fixed`, `dynamic`, `kinematic`, `kinematicVelocity` | per body | drawn |
| `-sensor` | fixed, `sensor` | convex hull | hidden |

`only` in the name is what hides the mesh, so a collision proxy never draws and a
collidable prop still does. Append a shape to override the default:
`Crate-rigid-cuboid`, `Ramp-colonly-hull`. Shapes are `cuboid`, `ball`, `capsule`,
`cone`, `cylinder`, `hull` and `trimesh`. Separators can be `-`, `_` or `$`, matching is
case-insensitive, and a Blender duplicate counter is read through: `Can-rigid.001` is a
body like its original.

Suffix meshes, not groups. A body reads the geometry off its own direct children, so a
group has nothing to give it — suffix the meshes inside instead, and each becomes its own
body. A suffix on a group is reported and generates nothing.

```vue
<RigidBody type="fixed" collider="convexHull">
  <TresMesh :geometry="nodes['Floor-convcol'].geometry" :material="materials.prototype" />
</RigidBody>

<RigidBody type="fixed" collider="convexHull">
  <TresMesh :geometry="nodes['Stairs_Collision-convcolonly'].geometry" :visible="false" />
</RigidBody>
```

Nothing is sized at generate time. `RigidBody` derives its colliders from the geometry of
its own mesh children when the model loads, so a re-export that reshapes a mesh reshapes
its collider, and the numbers can never drift from the ones rapier would have picked.
`:position` and `:rotation` sit on the body, which rapier seeds the simulation from;
`:scale` stays on the mesh, where rapier reads it to size the collider.

The component never renders its own `<Physics>`, since one world holds many models:

```vue
<Physics>
  <Level />
</Physics>
```

A suffix that nearly parses is reported rather than dropped, because a level with no
collision and no explanation is the worst outcome available:

```
! Barrel-rb-dynmic: "-rb-dynmic" reads like a collider suffix, but "dynmic" is not a
  body type (fixed, static, dynamic, kinematic, kinematicvelocity). Nothing was generated for it.
```

Two things rapier cannot express, both warned about: bodies do not nest (a proxy inside
another body simulates independently and drifts from it), and a body under a transformed
ancestor is placed as if that transform were not there, because rapier simulates in world
space. Apply transforms on export.

Combines with `--instance`: a batched body keeps one draw call for the visuals and gets an
invisible proxy mesh so it still has a geometry to collide with. Batched visuals trail
physics by one frame, since the provider packs its matrices before the bodies write their
poses.

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
      <Instance :batch :position="position" color="red" @click="loosen" />
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
whose `batch` matches nothing renders nothing, and says so.

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
