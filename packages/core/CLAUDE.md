# @tresjs/core

The core package implements a Vue custom renderer that translates Vue components into Three.js objects.

## Key Modules

- **nodeOps** ([src/core/nodeOps.ts](src/core/nodeOps.ts)): Vue renderer operations (createElement, patchProp, insert, remove)
- **catalogue** ([src/core/catalogue.ts](src/core/catalogue.ts)): Registry of Three.js objects that can be used as Vue components
- **TresCanvas** ([src/components/TresCanvas.vue](src/components/TresCanvas.vue)): Root component that creates the WebGL renderer and scene
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

Tests use Vitest with jsdom environment. Core renderer tests extensively cover nodeOps operations in [src/core/nodeOps.test.ts](src/core/nodeOps.test.ts).
