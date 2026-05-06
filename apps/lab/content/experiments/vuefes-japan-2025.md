---
title: Vue Fes Japan 2025
author: alvarosabu
description: Port of the Vue Fes Japan 2025 main visual — a suminagashi (Japanese ink-marbling) hero with a V silhouette and a Hinomaru circle.
thumbnail: /experiments/vuefes-japan-2025.png
tags: ['vuefes', 'shaders', 'glsl', 'suminagashi', 'marbling', 'fbm', 'flow-field']
date: 2026-05-06
lastUpdated: 2026-05-06
---

A 1:1 TresJS port of the [Vue Fes Japan 2025](https://vuefes.jp/2025/en) hero animation.

The original is a Three.js r178 scene combining a V-shaped cone (Vue) with a sphere (the Japanese flag's Hinomaru), masked and animated with a custom suminagashi shader — Japanese ink-marbling rendered with FBM noise stacked through warped flow fields. The shader cycles through four color palettes every 15 seconds.

### What's going on

- **The V**: a `ConeGeometry` flipped upside down, fragment-discarded along its tail to carve the Vue silhouette.
- **The Hinomaru**: a `SphereGeometry` whose surface is filled with a flowing ink pattern. Surface UVs come from spherical coordinates (`theta`, `phi`) so the marbling wraps continuously.
- **Suminagashi**: layered FBM noise + flow-field warping + soft-light blend with a noise texture overlay.
- **Color cycling**: four palette structs in the shader; an integer `uActiveColorSet` switches between them every 15s.

### Credits

Original design and Three.js implementation by the [Vue Fes Japan 2025](https://vuefes.jp/2025/en) team. Ported to TresJS for educational and showcase purposes.
