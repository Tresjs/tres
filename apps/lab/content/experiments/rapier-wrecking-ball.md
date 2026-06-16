---
thumbnail: /rapier-wrecking-ball.webp
title: Rapier Wrecking Ball
slug: rapier-wrecking-ball
author: [jaime-bboyjt, alvarosabu]
status: draft
date: 2026-05-22
featured: false
description: A physics-driven wrecking ball suspended from an anchor point by a spherical joint, swinging to demolish a destructible wall of stacked boxes. Built with @tresjs/rapier.
tags: ['physics', 'rapier', 'joints']
lastUpdated: 2026-05-24
---

A wrecking ball demo using `@tresjs/rapier` and a `SphericalJoint` to simulate a pendulum. The heavy ball is attached to a fixed anchor point and swings through a wall of stacked boxes.

### What You'll See

A dark metallic sphere hanging from a chain, swinging like a pendulum and smashing through a wall of stacked boxes. Gravity and collision responses are handled entirely by Rapier's physics engine.

### Technical Implementation

- **Fixed anchor** — a `type="fixed"` `RigidBody` acts as the immovable pivot point.
- **SphericalJoint** — connects the anchor to the ball, allowing free rotation while constraining the distance (ball-and-socket).
- **Dynamic ball** — a `type="dynamic"` `RigidBody` with configurable mass that swings as a pendulum.
- **Chain visual** — an `InstancedMesh` of cylinder segments updated every frame via `onBeforeRender`, alternating rotation to mimic chain links.
- **Destructible wall** — a configurable grid of independent `type="dynamic"` rigid bodies with adjustable mass that react to collisions.

### Key Features

- `SphericalJoint` for pendulum-style constraints
- `InstancedMesh` chain updated in real-time via `onBeforeRender`
- Configurable grid size, ball size, ball mass, and box mass via GUI controls
- Physics-driven rigid body stacking and destruction
