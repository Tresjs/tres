# Demo Audit Report

## Judgment Criteria

**DELETE** if:
- Code block is a simplified usage of what the interactive demo already shows
- The demo's "View Source" button already shows the full code
- The code block is essentially `import X` + `<X />` with minimal props, same scene as demo

**KEEP** if:
- `args: [...]` type documentation blocks (API docs)
- Code blocks demonstrating a concept different from what the demo shows
- Code blocks with meaningful explanatory context the demo can't convey
- Prop reference snippets (tiny, 1-5 lines showing a specific prop)
- Code blocks in sections that explain a different use case (e.g., GLTF targeting, Group targeting)

---

## cientos-docs: abstractions

### align.md — DELETED
- Demo: `Align.vue` — box with axes helper, interactive alignment controls
- Doc code: Same scene, same components, just without interactive controls
- Verdict: Simplified usage of the demo. Deleted.

### billboard.md — DELETED
- Demo: `Billboard.vue` — 25 billboards in a grid with interactive controls
- Doc code: Single billboard with same scene setup
- Verdict: Simplified usage of the demo. Deleted.

### camera-shake.md — DELETED
- Demo: `CameraShake.vue` — CameraShake + axes + box with interactive controls
- Doc code: Same CameraShake + axes + box, just without interactive controls
- Verdict: Simplified usage of the demo. Deleted. Prose note about OrbitControls compatibility kept.

### decal.md — PARTIALLY DELETED
- Demo: `Decal.vue` (GLTF mug with DecalDebugUI), `DecalEditable.vue` (editable decals), `DecalStacking.vue` (stacked decals)
- Doc code blocks:
  - Lines 30-61 (minimal Decal usage): **KEPT** — teaches minimal setup, different from demo (box vs GLTF mug)
  - Lines 75-89 (multiple textures): **KEPT** — different concept
  - Lines 101-105 (custom material): **KEPT** — different concept
  - Lines 128-134 (stacking layer-gap): **KEPT** — tiny prop reference
  - Lines 184-222 (DecalEditable full setup): **DELETED** — same as DecalEditable demo
  - Lines 243-248 (contained prop): **KEPT** — tiny prop reference
  - Lines 258-264 (export filename): **KEPT** — different concept
  - Lines 277-290 (GLTF targeting): **KEPT** — different concept
  - Lines 306-324 (Group targeting): **KEPT** — different concept
  - Lines 335-358 (sub-mesh targeting): **KEPT** — different concept
  - Lines 385-402 (JSON schema): **KEPT** — API reference
  - Line 437-441 (DecalImperativeApi): **KEPT** — API reference
  - Lines 530-534 (useDecalEditor): **KEPT** — API reference
  - Lines 549-619 (Full API reference): **KEPT** — API reference

### edges.md — DELETED
- Demo: `Edges.vue` — 3 boxes with interactive color control
- Doc code: Single box with Edges, same scene setup
- Verdict: Simplified usage of the demo. Deleted.

### fit.md — DELETED
- Demo: `Fit.vue` — 900 boxes at positions [x, y, 9999] with same geometry/material setup
- Doc code: Same 900-box grid, same scene setup, identical positions array
- Verdict: Simplified usage of the demo. Deleted. Only difference: demo has `pos as [number, number, number]` cast.

### merged.md — KEPT ALL
- Demo: `Merged.vue` — 49 robots (7x7 grid) with interactive row control via useControls
- Doc code blocks:
  - Lines 21-34 (Robot.vue): **KEPT** — teaches two-component architecture (separate Robot component using Instance batch)
  - Lines 38-57 (provider): **KEPT** — teaches provider pattern with useGLTF
  - Lines 69-73 (Instancing a whole glTF): **KEPT** — different concept (batching specific meshes across models)
- Verdict: All code blocks teach concepts the demo doesn't show. Kept all.

### instances.md — DELETED (main usage block)
- Demo: `Instances.vue` — 900 cubes with interactive picking
- Doc code blocks:
  - Lines 20-45 (main usage): **DELETED** — simplified 900-cube grid without interactive picking
  - Lines 56-58 (per-instance color): **KEPT** — tiny prop reference
  - Lines 65-67 (pointer events): **KEPT** — tiny prop reference
  - Lines 83-92 (nesting and transforms): **KEPT** — different concept
  - Lines 100-108 (animating instances): **KEPT** — different concept
  - Lines 125-127 (limit): **KEPT** — tiny prop reference

### levioso.md — DELETED
- Demo: `Levioso.vue` — feather GLTF with interactive float controls
- Doc code: Box instead of feather, no interactive controls
- Verdict: Simplified usage of the demo. Deleted.

### mask.md — DELETED
- Demo: `Mask.vue` — ring + circle mask with interactive colorWrite control
- Doc code: Same ring + circle mask, just without interactive controls
- Verdict: Simplified usage of the demo. Deleted. `useMask` example kept (prop reference).

### merged.md — KEPT ALL
- Demo: `Merged.vue` — 49 robots with interactive row control
- Doc code blocks:
  - Lines 21-34 (Robot.vue): **KEPT** — teaches two-component architecture
  - Lines 38-57 (provider): **KEPT** — teaches provider pattern
  - Lines 69-73 (Instancing a whole glTF): **KEPT** — different concept
- Verdict: All code blocks teach concepts the demo doesn't show. Kept all.

### outline.md — DELETED
- Demo: `Outline.vue` — box + sphere with interactive outline controls
- Doc code: Same box + sphere, hardcoded values instead of interactive controls
- Verdict: Simplified usage of the demo. Deleted.

### sampler.md — DELETED (main usage block)
- Demo: `Sampler.vue` — torus with interactive count control
- Doc code blocks:
  - Lines 15-40 (main usage): **DELETED** — simplified torus without interactive controls
  - Lines 56-90 (useSurfaceSampler): **KEPT** — different concept (imperative API)

### screen-sizer.md — DELETED
- Demo: `ScreenSizer.vue` — 100x100x100 box with screen sizing
- Doc code: Identical to demo
- Verdict: Identical to demo. Deleted.

### screen-space.md — DELETED
- Demo: `ScreenSpace.vue` — 5 tori at different positions with interactive controls
- Doc code: Single torus, same scene setup
- Verdict: Simplified usage of the demo. Deleted.

## cientos-docs: controls

### camera-controls.md — DELETED
- Demo: `CameraControls.vue` — Box with full interactive camera props
- Doc code: Same box+toon scene, hardcoded values
- Verdict: Simplified usage. Deleted. User input config + events snippets kept (different concepts).

### keyboard-controls.md — DELETED
- Demo: `KeyboardControls.vue` — Box with moveSpeed control
- Doc code: Same Box scene, no interactive controls
- Verdict: Simplified usage. Deleted. Events snippet kept.

### map-controls.md — DELETED
- Demo: `MapControls.vue` — Box with full interactive controls props
- Doc code: Same box+toon scene, hardcoded values
- Verdict: Simplified usage. Deleted.

### orbit-controls.md — DELETED
- Demo: `OrbitControls.vue` — Box with full interactive controls props
- Doc code: Same box+toon scene, hardcoded values
- Verdict: Simplified usage. Deleted. Events snippet kept.

### pointer-lock-controls.md — DELETED
- Demo: `PointerLockControls.vue` — Box with polar angle/speed controls
- Doc code: Same Box scene, no interactive controls
- Verdict: Simplified usage. Deleted. Events snippet kept.

### transform-controls.md — DELETED
- Demo: `TransformControls.vue` — box with mode/space/size/axis toggles
- Doc code: Same boxRef pattern, hardcoded values
- Verdict: Simplified usage. Deleted. Three mode snippets (translate/rotate/scale) kept as prop references.

## cientos-docs: loaders

### 1.use-gltf.md — KEPT ALL
- Demo uses `GLTFModel` component; page teaches `useGLTF` composable. Different APIs. All blocks teach distinct concepts (draco, generics, CLI).

### 2.gltf-model.md — DELETED (usage group)
- Demo: `gltf.vue` — GLTFModel with blender-cube
- Doc code-group: same demo split into two files. Deleted. Model reference section kept (different concept).

### 3.use-fbx.md — KEPT ALL
- Demo uses `FBXModel` component; page teaches `useFBX` composable. Different APIs.

### 4.fbx-model.md — DELETED (usage group)
- Same pattern as gltf-model.md. Deleted. Model reference section kept.

### 5.use-texture.md — DELETED (main usage)
- Doc code was simplified version of demo sphere+texture scene. Deleted. Component Usage section (`UseTexture` with v-slot) kept as different concept.

### 6.use-textures.md — DELETED (PBR example)
- PBR Textures Example block was essentially identical to demo source. Deleted. Minimal multi-texture usage kept (teaches basic API).

### 7.use-svg.md — KEPT ALL
- Comprehensive API docs for `useSVG` composable; demo uses `UseSVG` component. Depth handling, memory management, advanced patterns all teach distinct concepts.

### use-progress.md — KEPT ALL (no demo on page)
- Loading-bar pattern genuinely useful, no demo exists to duplicate.

## cientos-docs: materials

### custom-shader-material.md — DELETED
- Doc code referenced undefined shader variables and duplicated demo's torus-knot scene in simplified form. Deleted.

### glass-material.md — DELETED (first block)
- Torus + glass material block was simplified demo usage. Deleted. Material-replacement-on-existing-mesh block kept (different concept).

### holographic-material.md — DELETED
- Sphere + HolographicMaterial block was simplified demo usage (demo has Box + full controls). Deleted.

### mesh-discard-material.md — KEPT ALL
- No demo component exists; usage block is the only example.

### mesh-portal-material.md — DELETED
- Same plane + portal + torus knot scene as demo with hardcoded blend. Deleted. Background/environment section kept (different concept).

### mesh-reflection-material.md — DELETED
- Identical floor reflection scene as demo, hardcoded values. Deleted.

### mesh-transmission-material.md — DELETED
- Same torus knot + environment scene as demo, hardcoded props. Deleted.

### point-material.md — DELETED
- Identical points + icosahedron scene as demo. Deleted.

### wobble-material.md — DELETED
- Identical torus + wobble scene as demo, hardcoded values. Deleted.

## cientos-docs: shapes

### box/circle/cone/cylinder/dodecahedron/icosahedron/octahedron/plane/ring/rounded-box/rounded-plane/sphere/tetrahedron/torus/torus-knot — KEPT ALL
- All follow same template: args API reference + tiny 2-line snippet teaching shorthand and custom-material-slot patterns. Prop references, not demo duplicates.

### catmullromcurve3.md — DELETED
- Identical curve scene as demo (line-width 3 vs 6 trivial). Deleted.

### grid.md — DELETED
- Identical grid scene as demo with hardcoded prop values. Deleted.

### line2.md — DELETED (main usage)
- Simplified variant of demo triangle scene. Deleted. Points type-conversion section kept (genuinely educational).

### quadratic-bezier-line.md — KEPT
- Doc teaches `mid` control point + `segments` which demo doesn't use. Vector3 usage differs.

### cubic-bezier-line.md — KEPT
- Same reasoning as quadratic-bezier-line (midA/midB + segments).

### screen-quad.md — DELETED
- Nearly identical to demo. Deleted.

### superformula.md — DELETED
- Simplified variant of demo scene. Deleted.

### tube.md — KEPT
- Teaches CubicBezierCurve3 path construction (the key concept for Tube) plus shorthand + slot patterns.

## cientos-docs: debug-performance

### helper.md — DELETED
- Same BoxHelper scene as demo (box vs sphere trivial). Deleted.

### lod.md — KEPT
- Demo is complex 100-object animated scene; doc block teaches simple 3-level pattern with explanatory comments.

### use-bvh.md — KEPT ALL
- Comprehensive API docs for composable options (debug, reactive enabled, split strategies). All distinct concepts.

### stats-gl.md / stats.md — KEPT ALL
- No demo components exist; usage snippets are the only examples.

## cientos-docs: light-shadow

### accumulative-shadows.md — DELETED
- Identical torus knot shadow scene as demo, hardcoded values. Deleted.

### bake-shadows.md — DELETED
- Identical to demo source. Deleted.

### circle-shadow.md — DELETED
- Identical box + CircleShadow scene as demo, hardcoded values. Deleted.

### contact-shadows.md — DELETED
- Identical Levioso + TorusKnot + ContactShadows scene as demo. Deleted.

### lensflare.md — KEPT ALL
- Tiny 8-line PointLight+Lensflare mounting pattern kept; rest of doc teaches seed/seedProps/precedence API. Demo is a richer animated scene.

### randomized-lights.md — DELETED
- Identical AccumulativeShadows+RandomizedLights+box scene as demo. Deleted.

### soft-shadows.md — DELETED
- Identical TorusKnot+Plane+SoftShadows scene as demo, hardcoded values. Deleted.

## cientos-docs: staging

### 1.environment.md — DELETED (main usage block)
- Full-canvas usage was simplified demo duplicate; trimmed to a minimal `files` array snippet. Kept .hdr variant, texture ref, presets, quality, rotation (all distinct concepts).

### 2.use-environment.md — KEPT ALL
- Teaches composable API; demo uses component. Different API surface.

### 3.lightformer.md — KEPT
- Tiny 10-line slot-usage pattern is the core concept of the page.

### backdrop.md — KEPT ALL
- Minimal mounting pattern + custom material/props pattern; demo is much richer.

### ocean.md — KEPT ALL
- Minimal Suspense mounting pattern + custom geometry pattern.

### precipitation.md — KEPT ALL
- Four distinct effect recipes (snow/rain/storm/beam) with specific prop combos.

### sky.md — DELETED
- Identical scene as demo with hardcoded values. Deleted.

### smoke.md — KEPT
- Minimal Suspense-wrapped mounting pattern referenced by the prose warning above it.

### sparkles.md — KEPT ALL
- No demo exists (tag commented out); sequences/mixes blocks teach distinct gradient API concepts.

### stage.md — DELETED
- Identical to demo source including props. Deleted.

### stars.md — KEPT
- Minimal no-props mounting pattern explicitly described by prose ("without passing any props").

## cientos-docs: objects

### animated-sprite.md — DELETED
- Simplified variant of demo (same image/atlas/animation). Deleted. Rich atlas/definitions docs kept.

### cube-camera.md — KEPT
- Demo is animated 3-sphere scene; doc teaches minimal single-sphere pattern.

### fbo.md — DELETED (component usage)
- Identical to demo source. Deleted. useFBO composable section kept (different API).

### gradient-texture.md — DELETED
- Same plane+gradient pattern as demo, different colors only. Deleted.

### html.md — DELETED (main usage)
- Identical to demo source including style block. Deleted. Collapsed `<details>` demo-code references kept.

### image.md — DELETED (main usage)
- Simplified variant of demo. Deleted. Caveats colorSpace section kept.

### marching-cubes.md — DELETED
- Identical to demo source, hardcoded values. Deleted.

### reflector.md — KEPT ALL
- Minimal mounting pattern + genuinely different custom shader content.

### refractor.md — KEPT ALL
- Minimal pattern teaching "place objects behind" concept + custom shader content.

### text-3d.md — KEPT ALL
- Three distinct patterns: prop vs slot vs reactive needUpdates.

## cientos-docs: miscellaneous

### bounds.md — DELETED
- Identical to demo source. Deleted. lookAt method signatures kept.

### mouse-parallax.md — DELETED
- Identical TorusKnot scene as demo, hardcoded values. Deleted.

### positional-audio.md — KEPT ALL
- Minimal Box+dispose pattern vs complex gsap demo; play/pause/stop exposed-API examples teach different content.

### use-intersect.md / use-gltf-exporter.md / use-animations.md — KEPT ALL
- No demos on these pages; snippets are the primary teaching material.

### global-audio.md — KEPT ALL
- No demo component exists; usage block is the only example.

## cientos-docs: loaders (remaining)

### 1.use-gltf.md — KEPT ALL
- Demo uses `GLTFModel` component; page teaches `useGLTF` composable. Different APIs. All blocks teach distinct concepts (draco, generics, CLI, node/material access, typing).

### 3.use-fbx.md — KEPT ALL
- Demo uses `FBXModel` component; page teaches `useFBX` composable. Different APIs.

### 6.use-textures.md — KEPT (main usage)
- Remaining usage block teaches basic `useTextures` composable API (load multiple textures, apply to material props). Demo is complex PBR texture application on GLTF model with `useGLTF`, `watch` effects, 5 textures, Environment. Different concept. PBR example was deleted (identical to demo).

### 7.use-svg.md — KEPT ALL
- Comprehensive API docs for `useSVG` composable; demo uses `UseSVG` component. Depth handling, memory management, advanced patterns all teach distinct concepts.

### use-progress.md — KEPT ALL (no demo on page)
- Loading-bar pattern genuinely useful, no demo exists to duplicate.

## cientos-docs: shapes (remaining)

### box/circle/cone/cylinder/dodecahedron/icosahedron/octahedron/plane/ring/rounded-box/rounded-plane/sphere/tetrahedron/torus/torus-knot — KEPT ALL
- All follow same template: args API reference + tiny 2-line snippet teaching shorthand and custom-material-slot patterns. Prop references, not demo duplicates.

### quadratic-bezier-line.md — KEPT
- Doc teaches `mid` control point + `segments` which demo doesn't use. Vector3 usage differs (doc uses `new Vector3()`, demo uses array shorthand).

### cubic-bezier-line.md — KEPT
- Same reasoning as quadratic-bezier-line (midA/midB + segments). Vector3 usage differs.

### tube.md — KEPT
- Teaches CubicBezierCurve3 path construction (the key concept for Tube) plus shorthand + slot patterns. Demo adds useControls for interactive adjustment.

## cientos-docs: debug-performance (remaining)

### lod.md — KEPT
- Demo is complex 100-object animated scene with animated camera; doc block teaches simple 3-level pattern with explanatory comments.

### use-bvh.md — KEPT ALL
- Comprehensive API docs for composable options (debug, reactive enabled, split strategies). All distinct concepts.

### stats-gl.md / stats.md — KEPT ALL
- No demo components exist; usage snippets are the only examples.

## cientos-docs: light-shadow (remaining)

### lensflare.md — KEPT ALL
- Tiny 8-line PointLight+Lensflare mounting pattern kept; rest of doc teaches seed/seedProps/precedence API. Demo is a richer animated scene with useControls, moving light, 3 tori.

## cientos-docs: staging (remaining)

### 2.use-environment.md — KEPT ALL
- Teaches composable API; demo uses `Environment` component. Different API surface.

### 3.lightformer.md — KEPT
- Tiny 10-line slot-usage pattern is the core concept of the page. Demo is much richer (2 Lightformers, useControls, Sphere).

### backdrop.md — KEPT ALL
- Minimal mounting pattern + custom material/props pattern; demo is much richer (GLTFModel, useControls, custom camera, 2 directional lights).

### ocean.md — KEPT ALL
- Minimal Suspense mounting pattern + custom geometry pattern. Demo adds Sky, useControls for all params, box mesh.

### precipitation.md — KEPT ALL
- Four distinct effect recipes (snow/rain/storm/beam) with specific prop combos. Demo has useControls for all params but doesn't show the distinct recipes.

### smoke.md — KEPT
- Minimal Suspense-wrapped mounting pattern referenced by the prose warning above it. Demo has useControls for all params.

### sparkles.md — KEPT ALL
- No demo exists (tag commented out); sequences/mixes blocks teach distinct gradient API concepts.

### stars.md — KEPT
- Minimal no-props mounting pattern explicitly described by prose ("without passing any props"). Demo has useControls for all params.

## cientos-docs: objects (remaining)

### cube-camera.md — KEPT
- Demo is animated 3-sphere scene with moving camera-target sphere, useControls for frames; doc teaches minimal single-sphere pattern.

### reflector.md — KEPT ALL
- Minimal mounting pattern + genuinely different custom shader content. Basic usage shows minimal pattern; custom shader teaches shader API.

### refractor.md — KEPT ALL
- Minimal pattern teaching "place objects behind" concept + custom shader content. Demo has useControls, Stars, 2 wobbling meshes behind.

### text-3d.md — KEPT ALL
- No demo component exists. Three distinct patterns: prop vs slot vs reactive needUpdates.

## cientos-docs: miscellaneous (remaining)

### global-audio.md — KEPT ALL
- No demo component exists; usage block is the only example.

### positional-audio.md — KEPT ALL
- Minimal Box+dispose pattern vs complex gsap demo with ping-pong GLTF, animated ball, useControls for all params, ready button, play/pause UI; play/pause/stop exposed-API examples teach different content.
