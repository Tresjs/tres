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
| `--dry-run` | report what the parser sees, generate nothing |
| `--json` | dump the parsed model as JSON |

`--slots named` skips exporter noise like `Object_12` and `Sketchfab_model`. On
marketplace assets that can leave you with nothing to override, so it says so and
points at `--slots all`.

Draco-compressed and unpacked (`.gltf` + `.bin`) models both work. Draco models get
`useGLTF(url, { draco: true })` automatically, since they render nothing without it.

### Build

To build the package run:

```bash
pnpm run build
```

## License

[MIT](/LICENSE)
