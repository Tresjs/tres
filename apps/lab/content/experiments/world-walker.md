---
thumbnail: /experiments/world-walker.webp
title: World Walker
slug: world-walker
author: [jaime-bboyjt]
status: draft
date: 2026-07-09
featured: false
description: A third-person character controller walking across a heightfield terrain scattered with wind-blown vegetation, under the rain. Built with @tresjs/rapier physics and cientos' Precipitation and Sky.
tags: ['physics', 'rapier', 'controls', 'heightfield', 'shaders', 'glsl', 'vegetation']
lastUpdated: 2026-07-11
---

A third-person character controller demo using `@tresjs/rapier`. A rigged footman walks across a terrain generated from a displacement map, with the physics handled by a `HeightfieldCollider` built from the same heightmap.

### Controls

- Use <kbd>W</kbd> <kbd>A</kbd> <kbd>S</kbd> <kbd>D</kbd> to move the character.
- Drag with the mouse to orbit the camera around him.

### Technical Implementation

- **Heightfield terrain** — the displacement map is downsampled into a heights matrix that feeds a `HeightfieldCollider`, so the physics ground matches the displaced plane geometry.
- **Character body** — a `type="dynamic"` `RigidBody` with locked rotations and a `CapsuleCollider`; movement sets linear velocity while gravity keeps the character glued to the slopes.
- **Camera-relative movement** — WASD input (via `useMagicKeys`) is converted to a direction offset relative to the camera, and the model rotates smoothly toward the walk direction.
- **Animations** — `useAnimations` cross-fades between `Idle` and `SwordAndShieldRun` based on key presses.
- **Vegetation** — grass and clutter (bushes) are scattered across the terrain in chunks, sampled from the same heightmap sampler as the terrain so planting stays glued to the slopes and skips ground that's too steep. Each plant gets randomized width, height, stiffness, atlas variant, and a healthy/dry tint from a noise field. The billboards face the camera, sway from a stacked-sine wind in the vertex shader, and dissolve into a noise-gated fade at a distance, with per-chunk culling once past the fade range.
