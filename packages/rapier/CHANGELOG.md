# 1.0.0 (2026-07-28)

### 🚀 Features

- **rapier:** make stepping frame-rate independent ([#1458](https://github.com/Tresjs/tres/pull/1458), [#1461](https://github.com/Tresjs/tres/issues/1461))
- **rapier:** full collider shapes support ([cafd039d](https://github.com/Tresjs/tres/commit/cafd039d))
- **rapier:** fixing the demo, adding props to rigidBody, improve the demo (with custom collider and without) ([e9bc2ee1](https://github.com/Tresjs/tres/commit/e9bc2ee1))
- **rapier:** contact force ([c1617773](https://github.com/Tresjs/tres/commit/c1617773))
- **rapier:** add solverGroups - add demo for solversGroups - add demo for collisionGroups ([827dee3e](https://github.com/Tresjs/tres/commit/827dee3e))
- **rapier:** collider collision support ([9c0c7422](https://github.com/Tresjs/tres/commit/9c0c7422))
- **pack-rapier:** colliders position & rotation enhancement ([275cb081](https://github.com/Tresjs/tres/commit/275cb081))
- **rapier:** refactor adn expose context ([782c7b0f](https://github.com/Tresjs/tres/commit/782c7b0f))

### 🩹 Fixes

- **rapier:** improves watchers sync ([#1457](https://github.com/Tresjs/tres/pull/1457))
- **rapier:** collision events & collider args resolution ([#1419](https://github.com/Tresjs/tres/pull/1419))
- **rapier:** remove unnecessary blank line in RigidBody.vue ([8bbf2ddb](https://github.com/Tresjs/tres/commit/8bbf2ddb))
- **rapier:** correct intersection source object ([f820ab4d](https://github.com/Tresjs/tres/commit/f820ab4d))
- **rapier:** fix automatic colliders reactive props ([b64877c8](https://github.com/Tresjs/tres/commit/b64877c8))
- **rapier:** custom colliders reactivity ([bfd2208f](https://github.com/Tresjs/tres/commit/bfd2208f))
- **rapier:** fix colliders for v5 ([ff7808bc](https://github.com/Tresjs/tres/commit/ff7808bc))

### ❤️ Thank You

- Alvaro Saburido @alvarosabu
- alvarosabu @alvarosabu
- Jaime Torrealba
- Nathan M.
- Nathan Mande

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
