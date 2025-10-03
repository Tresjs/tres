# @tresjs/nuxt

Official Nuxt module for TresJS - enables 3D scene development in Nuxt applications.

## Key Features

- Auto-imports TresJS components and composables from the ecosystem
- `TresCanvas` is client-only by default (no need for `.client` suffix or `<ClientOnly />`)
- Auto-configures Vue compiler for TresJS components
- Built-in devtools extension for scene inspection and performance monitoring
- Optional GLSL shader support via `vite-plugin-glsl`

## Module Structure

- **[src/module.ts](src/module.ts)**: Main Nuxt module definition
- **[src/devtools.ts](src/devtools.ts)**: Nuxt devtools integration
- **[src/runtime/](src/runtime/)**: Runtime components and composables

## Configuration Options

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@tresjs/nuxt'],
  tres: {
    devtools: true,  // Enable devtools extension
    glsl: true,      // Enable GLSL shader imports
  },
})
```

## Auto-imports

The module auto-imports components from installed TresJS packages:
- `@tresjs/core`
- `@tresjs/cientos`
- `@tresjs/post-processing`

Install any of these packages and their components become available without explicit imports.
