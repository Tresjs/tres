# TresJS Playground

Development sandbox for testing `@tresjs/core` and `@tresjs/cientos` features.

## Purpose

- Test new features and bug fixes during development
- Prototype examples before adding to documentation
- Quick experimentation with TresJS APIs

## Tech Stack

- Vite + Vue 3
- Vue Router for multi-page demos
- Auto-imports via `unplugin-auto-import`
- Tweakpane for runtime controls
- GLSL shader support via `vite-plugin-glsl`

## Code Style

This is a **testing environment** - code quality standards are relaxed:
- Experiment freely without strict conventions
- Quick prototypes are encouraged
- No need for production-ready code

## Development

```bash
# Start dev server with network access
pnpm --filter playground dev
```

Dev server runs with `--host` flag for testing on mobile devices.
