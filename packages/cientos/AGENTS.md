# @tresjs/cientos

Collection of helpers and abstractions for TresJS.

## Organization

Components organized in [src/core/](src/core/) by category:

- **abstractions**: High-level 3D components
- **controls**: Camera controls (OrbitControls, etc.)
- **loaders**: Asset loaders (GLTF, FBX, etc.)
- **materials**: Custom materials and shaders
- **shapes**: Geometry helpers
- **staging**: Scene helpers (Environment, ContactShadows, etc.)
- **misc**: Utilities like Stats, DevTools

## WebGPU entry

[src/webgpu.ts](src/webgpu.ts) is the `@tresjs/cientos/webgpu` entry. It exports only the components that work under `WebGPURenderer`, with the same names and props as the root entry.

- A new component goes in `src/webgpu.ts` or in `WEBGL_ONLY` in [scripts/check-entries.mjs](scripts/check-entries.mjs). The build fails until it is in one of them.
- A component in `WEBGL_ONLY` calls `useWebGPUSupportWarning('Name', reason)` ([src/utils/useWebGPUSupportWarning.ts](src/utils/useWebGPUSupportWarning.ts)) in its setup. The build fails without it.
- A TSL port exports its component from `src/webgpu.ts` and removes the name from `WEBGL_ONLY`.
- Code that the root entry reaches must not import `three/webgpu`, `three/tsl` or `@tresjs/core/webgpu`. The build fails if it does.

### TSL port pattern

`Grid` ([src/core/shapes/Grid/](src/core/shapes/Grid/)) is the reference port. A port is one shared shell and two materials. Only the material changes between the entries:

```
Grid/
  props.ts             shared: props type, defaults, material accessor interface
  useGrid.ts           shared: everything outside the shader
  GridMaterial.ts      GLSL material, root entry
  GridNodeMaterial.ts  TSL material, /webgpu entry
  index.vue            shell + GLSL material
  webgpu.vue           shell + TSL material
```

1. **Folder.** Move the component into a folder named after it. The GLSL SFC becomes `index.vue`.
2. **Shared props.** Put the props type, the defaults and the material accessor interface in `props.ts`. Both SFCs call `withDefaults(defineProps<Props>(), defaults)` with it. Both materials take their start values from the defaults.
3. **Shared shell.** Put the mesh ref, the props for the material tag and any per-frame logic in a `use<Name>.ts` composable. It reads the material through the accessor interface, so it works with either material. Skip this step when the component is the material itself, such as `MeshWobbleMaterial`.
4. **GLSL material.** Move the GLSL material to `<Name>Material.ts`, without changes to the shader.
5. **TSL material.** Write `<Name>NodeMaterial.ts` and do the same math as the GLSL. Keep each uniform in a `uniform()` node. Expose it with the GLSL uniform name, as a getter and setter. Give a `Color` or a vector only a getter that returns the uniform object, because Tres calls `.set()` on a `Color`. Store bools as `0`/`1` floats, because WGSL does not allow `bool` in a uniform buffer. A GLSL `if` on such a uniform can become `mix` or `mul`. Match the fog of the GLSL version. A `ShaderMaterial` base has fog off, so set `fog = false`. A patched built-in material, such as `MeshStandardMaterial` with `onBeforeCompile`, has fog on, so keep the NodeMaterial default.
6. **Component.** Write `webgpu.vue` with the same shell as `index.vue` and the TSL material tag. Do not call `useWebGPUSupportWarning` in it. If the template drops a GLSL-only prop, add a comment that says why.
7. **Entry.** Export it from [src/webgpu.ts](src/webgpu.ts) under the same name (`export { default as Name } from './core/.../Name/webgpu.vue'`) and remove the name from `WEBGL_ONLY`.
8. **GLSL warning.** Keep the `useWebGPUSupportWarning` call in `index.vue`. End its reason with `Import <Name> from @tresjs/cientos/webgpu instead`.
9. **Playground.** Add a page in `apps/playground/src/pages/cientos/webgpu/` with `useRendererSwitch`. For `renderer: webgl`, show the GLSL component from the root entry, because `WebGLRenderer` cannot run node materials. Set `NoToneMapping`: `WebGPURenderer` tone-maps the whole frame, and `WebGLRenderer` tone-maps each material.
10. **Docs.** Remove the name from the "not exported yet" table in the cientos docs WebGPU guide. Add the name to the list of ported components.

Only `webgpu.vue` and `<Name>NodeMaterial.ts` import `three/webgpu` or `three/tsl`. Only `src/webgpu.ts` imports `webgpu.vue`. If the root entry reaches one of these files, `check-entries.mjs` fails the build.

Expect small differences on transparent pixels. `WebGPURenderer` blends in a linear half-float target. A GLSL material blends in sRGB on the canvas. Thus thin anti-aliased lines look a little brighter under WebGPU.
