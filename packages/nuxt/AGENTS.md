# @tresjs/nuxt

Official Nuxt module for TresJS.

## Key Features

- Auto-imports TresJS components and composables from the ecosystem
- `TresCanvas` is client-only by default (no need for `.client` suffix or `<ClientOnly />`)
- Auto-configures Vue compiler for TresJS components
- Built-in devtools extension for scene inspection and performance monitoring
- Optional GLSL shader support via `vite-plugin-glsl`

## Module Structure

- **[src/module.ts](src/module.ts)**: Main Nuxt module definition
- **[src/entries.ts](src/entries.ts)**: Picks the entry each package is auto-imported from, per renderer, and finds the components with no WebGPU version
- **[src/devtools.ts](src/devtools.ts)**: Nuxt devtools integration
- **[src/runtime/](src/runtime/)**: Runtime components and composables
  - `TresCanvasWebGPU.client.vue`: `TresCanvas` from `@tresjs/core/webgpu`, used with `renderer: 'webgpu'`
  - `webgpuStub.ts`: stand-in for a component with no WebGPU version. It throws a clear error when it mounts

## Configuration Options

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@tresjs/nuxt'],
  tres: {
    devtools: true,  // Enable devtools extension
    glsl: true,      // Enable GLSL shader imports
    renderer: 'webgl', // 'webgpu' auto-imports from the `/webgpu` entries (see src/entries.ts)
  },
})
```

## Auto-imports

The module auto-imports components from installed TresJS packages:
- `@tresjs/core`
- `@tresjs/cientos`
- `@tresjs/post-processing`

Install any of these packages and their components become available without explicit imports.

With `renderer: 'webgpu'`:
- A package with a `/webgpu` entry is auto-imported from that entry. Its components that have no WebGPU version become stubs that throw on mount.
- `@tresjs/post-processing` is not auto-imported until it ships a `/webgpu` entry (see `WEBGL_ONLY_PACKAGES`).
- Other packages without a `/webgpu` entry are auto-imported from their root entry.
