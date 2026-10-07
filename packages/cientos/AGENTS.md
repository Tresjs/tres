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
