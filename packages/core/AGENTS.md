# @tresjs/core

The core package implements a Vue custom renderer that translates Vue components into Three.js objects.

## Key Modules

- **nodeOps** ([src/core/nodeOps.ts](src/core/nodeOps.ts)): Vue renderer operations (createElement, patchProp, insert, remove)
- **catalogue** ([src/core/catalogue.ts](src/core/catalogue.ts)): The Three.js classes that templates can use as Tres components
- **TresCanvas** ([src/components/TresCanvas.vue](src/components/TresCanvas.vue)): Root component that creates the renderer (WebGL by default, or the one the `renderer` prop returns) and the scene
- **WebGPU entry** ([src/webgpu/](src/webgpu/)): The `@tresjs/core/webgpu` entry. Its `TresCanvas` wraps the root one with a `WebGPURenderer` default. Importing the entry extends the catalogue with `three/webgpu` classes. Its `useTres` types the renderer as `WebGPURenderer`
- **Composables** ([src/composables/](src/composables/)): Context management, render loop, and hooks
- **Utils** ([src/utils/](src/utils/)): Normalization, type guards, object disposal, and primitive handling

## Component Pattern

Three.js objects are used as Vue components via a naming convention:
- Three.js class names prefixed with `Tres` (e.g., `<TresMesh>`, `<TresBoxGeometry>`)
- Props map to Three.js constructor args and object properties
- Special `<primitive>` component for existing Three.js object instances

## Template Compilation

When using @tresjs/core, Vue template compiler needs custom element configuration:
```js
compilerOptions: {
  isCustomElement: tag => tag.startsWith('Tres') && tag !== 'TresCanvas'
}
```

## Testing

Tests use Vitest with jsdom environment.
