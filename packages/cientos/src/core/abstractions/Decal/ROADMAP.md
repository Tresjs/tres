# Roadmap — scaling features for `<Decal>`

Sketches for features the component does **not** ship today but would
make sense to add when projects start hitting decal-count or
performance walls. Each entry covers the use case, the rough approach,
and the trade-offs.

## 1. Geometry batching

Merge every `DecalItem`'s `BufferGeometry` (same material) into one
`BufferGeometry`, render in a single draw call.

- **Useful from:** ~100 decals on the same mesh.
- **Cost:** O(total vertices) re-merge on every edit. Mitigate via lazy
  batching — keep the entry being edited as its own un-merged mesh, merge
  only on `commit()` / initial scene load.
- **Friction:** hover edges (`EdgesGeometry`) and per-decal material slot
  need their own path; `polygonOffsetFactor` becomes per-batch.

## 2. Texture atlas + unified material

Pack every decal texture into a single atlas (e.g. `CanvasTexture`) and
drive per-decal UV offsets from the atlas mapping. All decals share one
material — the prerequisite for [batching](#1-geometry-batching) to
actually collapse draw calls.

- **Cost:** atlas re-pack on add/remove. Use a free-rect allocator for
  incremental updates.
- **Friction:** single set of sampling parameters (`magFilter`,
  `colorSpace`, `anisotropy`) for all decals. JSON gains a `uvRect`.

## 3. Baked-texture export

Render every committed decal into the parent mesh's UV space (offscreen
target), composite onto a copy of the host material's base map. Ship
that single baked texture in production — zero decal geometry, zero
extra draw call.

- **Win:** the runtime sees a normal mesh with a normal material; no
  `<Decal>` overhead. Massive scale-out for many decals.
- **Cost:** offline / one-shot pipeline (run at editor commit, or via a
  CLI). Needs a UV-2-aware unwrap on the parent (or a second UV channel
  reserved for decals). Re-bake on any decal edit.
- **Friction:** loses the ability to edit / reorder at runtime — bakes
  are immutable until the next bake. Padding to avoid bleeding seams.

## 4. GLB / `<primitive>` ergonomics

Today, attaching a `<Decal>` to a sub-mesh of a loaded `.glb` means
extracting it manually:

```vue
<TresMesh :geometry="nodes.Helmet.geometry">
  <primitive :object="nodes.Helmet.material" attach="material" />
  <Decal v-model:data="layout.helmet" :map="textures" editable />
</TresMesh>
```

`<primitive :object>` itself can't accept Vue children, so we can't drop
a `<Decal>` directly inside the loaded model. For models with many named
nodes this gets verbose fast.

- **Direction A — codegen** à la
  [`pmndrs/gltfjsx`](https://github.com/pmndrs/gltfjsx) /
  [`gltf.pmnd.rs`](https://gltf.pmnd.rs/): a CLI that parses a `.glb` and
  emits a typed Vue wrapper component exposing each named node as a
  `ref`. The host then writes
  `<MyModel><Decal :mesh="model.Helmet" ... /></MyModel>`.
  Most ergonomic, requires a build step.
- **Direction B — discoverable prop** on `<Decal>`, e.g.
  `<Decal :inside="modelRef" name="Helmet" />` that walks `modelRef`'s
  scene graph for a child named `Helmet` and uses it as the target.
  Zero codegen, slightly magic, fails silently if the name typo'd
  (mitigated with a `console.warn`).
- **Direction C — provide-based bridge**: the loaded model component
  provides a `Map<name, MeshRef>` via `provide()`; Decals inject and
  pick by name. Works inside Vue's component tree, no runtime traversal,
  but requires every model wrapper to opt in.

Right now the host uses `useGraph` + explicit refs — fine for a few
named meshes, painful past ~10. Direction A is the canonical answer
across the pmndrs ecosystem; direction B is the cheap "good enough"
alternative if a full codegen tool feels too heavy for cientos.

## 5. Shader-based realtime decals

Project in the fragment shader (sample parent surface from a decal-local
UV computed per pixel). Hinted at by the
[three.js#21187 mar-2026 update][three-21187] —
`dot(projectorDir, normal).lessThan(0.2).discard()`.

- **Win:** works on skinned / morph meshes (no baked geometry).
- **Cost:** custom material or `onBeforeCompile` chunk per host material;
  brittle across three.js versions. WebGPU/TSL makes this much cleaner —
  wait for a stable TresJS WebGPU renderer.
- **Friction:** anti-aliasing along the projector silhouette stays hard
  (the `cullThreshold` issue, just at pixel granularity).

[three-21187]: https://github.com/mrdoob/three.js/issues/21187
