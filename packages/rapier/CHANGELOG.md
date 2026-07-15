# Changelog

## 1.0.0-alpha.0 (2026-06-12)

First alpha release of `@tresjs/rapier` 🎉 — declarative physics for TresJS powered by [Rapier](https://rapier.rs/), using the official [@dimforge/rapier3d-compat](https://www.npmjs.com/package/@dimforge/rapier3d-compat) WASM bindings.

> [!WARNING]
> This package is in **alpha**. The API is not stable yet and breaking changes may land between releases without a major version bump. Install with `pnpm add @tresjs/rapier@alpha` and pin the exact version.

### 🚀 Features

- **rapier:** `<Physics>` provider with `RigidBody`, automatic and custom colliders, and joints
- **rapier:** full collider shapes support ([cafd039d](https://github.com/Tresjs/tres/commit/cafd039d))
- **rapier:** collider collision events support ([9c0c7422](https://github.com/Tresjs/tres/commit/9c0c7422))
- **rapier:** contact force events ([c1617773](https://github.com/Tresjs/tres/commit/c1617773))
- **rapier:** `collisionGroups` and `solverGroups` support ([827dee3e](https://github.com/Tresjs/tres/commit/827dee3e))
- **rapier:** colliders position & rotation enhancement ([275cb081](https://github.com/Tresjs/tres/commit/275cb081))
- **rapier:** expose rapier context via `useRapierContext` ([782c7b0f](https://github.com/Tresjs/tres/commit/782c7b0f))
- **rapier:** additional `RigidBody` props ([e9bc2ee1](https://github.com/Tresjs/tres/commit/e9bc2ee1))

### 🩹 Fixes

- **rapier:** bump `contactForceEventThreshold` default so events don't trigger at rest ([e2c552ef](https://github.com/Tresjs/tres/commit/e2c552ef))
- **rapier:** correct intersection source object ([f820ab4d](https://github.com/Tresjs/tres/commit/f820ab4d))
- **rapier:** automatic colliders reactive props ([b64877c8](https://github.com/Tresjs/tres/commit/b64877c8))
- **rapier:** custom colliders reactivity ([bfd2208f](https://github.com/Tresjs/tres/commit/bfd2208f))
- **rapier:** compatibility with `@tresjs/core` v5 ([ff7808bc](https://github.com/Tresjs/tres/commit/ff7808bc))

### ❤️ Thank You

- Alvaro Saburido @alvarosabu
- Jaime Torrealba @JaimeTorrealba
- Nathan Mande @Neosoulink
