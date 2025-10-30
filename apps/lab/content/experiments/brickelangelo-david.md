---
title: Brickelangelo David
author: alvarosabu
description: Bricks ThreeJS Journey challenge
thumbnail: /experiments/brickelangelo-david.png
tags: ['cientos', 'MeshSurfaceSampler']
date: 2023-08-21
---

This experiment recreates the iconic **David sculpture by Michelangelo** using **75,000 LEGO brick instances**, demonstrating advanced surface sampling techniques and instanced rendering capabilities. Based on challenges from [Bruno Simon's Three.js Journey course](https://threejs-journey.com/), this artistic tribute combines classical art with modern procedural generation.

### What You'll See

The scene features a **magnificent LEGO brick reconstruction** of David's sculpture:

- **75,000 Individual Bricks**: Each positioned using surface sampling algorithms
- **Mouse-Controlled Rotation**: Interactive rotation following cursor movement
- **Dramatic Lighting**: Spotlight that follows mouse cursor for dynamic illumination
- **Cinematic Camera Movement**: Smooth GSAP-powered camera animation revealing the sculpture
- **Loading Experience**: Custom progress indicator with elegant typography

### Technical Implementation

This experiment showcases several advanced 3D techniques:

- **MeshSurfaceSampler**: Distributes brick instances across the David model's surface using UV weighting
- **Instanced Rendering**: Efficiently renders 75,000 bricks using `InstancedMesh` for optimal performance
- **Grid Alignment**: Bricks snap to a 3D grid system for authentic LEGO brick placement
- **Interactive Lighting**: Spotlight dynamically follows mouse position using `useMouse` composable
- **GSAP Animation**: Smooth camera movements with easing for cinematic reveal
- **Progress Loading**: Real-time loading feedback using `useProgress`

### Artistic Features

- **Custom Typography**: Elegant serif font styling reminiscent of classical art presentations
- **Hidden Cursor**: Custom cursor design for immersive experience
- **Black Background**: Dramatic contrast highlighting the sculpture
- **Surface Alignment**: Bricks follow the natural curves and details of the original sculpture

### Key Technologies

- **Surface Sampling**: Mathematically accurate distribution respecting model geometry
- **Performance Optimization**: Single draw call for thousands of objects
- **Interactive Experience**: Real-time lighting and rotation based on user input
- **Classical Aesthetics**: Typography and presentation honoring the original masterpiece

This experiment serves as both a technical demonstration of advanced TresJS capabilities and an artistic homage to one of history's greatest sculptures, bridging classical art with modern digital techniques.

