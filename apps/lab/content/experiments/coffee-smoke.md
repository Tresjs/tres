---
title: Coffee Smoke
author: alvarosabu
description: Realistic smoke simulation rising from a coffee mug using custom GLSL shaders and Perlin noise.
thumbnail: /experiments/coffee-smoke.png
tags: [particles, shader, smoke]
date: 2025-11-27
---

This experiment creates a **realistic smoke simulation** rising from a coffee mug, based on [Bruno Simon's excellent Three.js Journey course](https://threejs-journey.com/) and implemented in TresJS. The effect uses custom vertex shaders with Perlin noise to create natural-looking smoke with twisting motion and wind effects.

### What You'll See

An atmospheric coffee scene featuring:

- **Rising Smoke Particles**: Volumetric smoke effect using a single plane geometry
- **Twisting Motion**: Rotation-based distortion creating realistic smoke spirals
- **Wind Simulation**: Horizontal drift using multi-layered Perlin noise
- **Baked 3D Scene**: Coffee mug and table with pre-computed lighting
- **Shader-Based Animation**: Custom GLSL shaders for natural smoke movement

### Technical Implementation

This experiment demonstrates advanced shader techniques:

- **Custom Vertex Shader**: GLSL code handling position transformations
- **Perlin Noise Texture**: Used for both twist angle and wind offset calculations
- **2D Rotation Function**: Modular GLSL function for rotating smoke around vertical axis
- **Shader Includes**: Reusable shader chunks using `vite-plugin-glsl` preprocessing
- **Time-Based Animation**: Continuous movement driven by elapsed time uniforms
- **Vertical Scaling**: Transform origin manipulation for proper smoke rising effect

### Shader Features

- **Twist Effect**: Noise-driven rotation creating natural smoke spirals
- **Wind Offset**: Multi-channel Perlin noise for realistic horizontal drift
- **Power Curve**: `pow(uv.y, 3.0)` for stronger effects at smoke top
- **Texture Wrapping**: Repeating Perlin texture for continuous noise patterns
- **Double-Sided Rendering**: Visible from all angles for volumetric appearance

This experiment showcases how custom shaders and noise functions can create organic, natural-looking effects, making it perfect for learning about procedural animation and GLSL shader development.
