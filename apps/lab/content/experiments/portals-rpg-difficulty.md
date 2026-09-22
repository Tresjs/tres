---
title: Portals RPG Difficulty
author: alvarosabu
description: An RPG difficulty selector where each choice is a portal into its own world
thumbnail: /experiments/portals-rpg-difficulty.webp
tags: ['portals', 'meshPortalMaterial', 'rpg']
date: 2026-09-07
lastUpdated: 2026-09-22
---

This experiment is a demo of the latest **portals** features in TresJS. It is a difficulty selector for an RPG: three framed cards float in a medieval sky, and each frame is a `MeshPortalMaterial` that renders its own scene.

It is inspired by [this portals video from Wawa Sensei](https://www.youtube.com/watch?v=2W_VR92Pqgs) and [this React Three Fiber CodeSandbox demo](https://codesandbox.io/p/sandbox/9m4tpc), rebuilt with TresJS and cientos.

The theme comes from the [difficulty screen in Baldur's Gate 3](https://www.thegamer.com/baldurs-gate-3-best-difficulty/), where each mode is a painted portrait. This experiment recreates the spirit of those paintings as live 3D scenes, using [KayKit](https://kaylousberg.itch.io/) characters by Kay Lousberg, plus a few custom characters made by me.

![Baldur's Gate 3 Explorer difficulty portrait](https://static0.thegamerimages.com/wordpress/wp-content/uploads/2023/08/explorer.jpg?q=50&fit=crop&w=825&dpr=1.5)

### What You'll See

- **Explorer**: a narrative campfire scene with the party at rest
- **Balanced**: a dungeon full of skeletons, mist and volumetric fog
- **Tactician**: a demonic realm with lava, energy beams and a demon lord
- **Framed cards**: an `Html` card sits on each frame with a label and a short pitch
- **Pop-in animation**: the frames scale up with an elastic ease once the loading screen fades

### Technical Implementation

- **MeshPortalMaterial**: each card is a plane whose material renders a separate scene into a portal
- **Per-portal scenes**: every difficulty is a plain Vue component, so its meshes, lights, fog and animations live inside that portal only
- **useGLTF + useAnimations**: shared models with posed rigs, one mixer per rig
- **Html from cientos**: the card overlay uses `transform` mode with a distance factor that maps one world unit to 100 CSS px, so the card lands exactly on the 2 x 3 plane
- **Equirectangular sky**: a rotated panorama used as both background and environment of the main scene
- **Post-processing**: bloom from `@tresjs/post-processing` on top of the composed portals
- **GSAP timeline**: staggered elastic pop for the three frames
