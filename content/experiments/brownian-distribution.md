---
title: Basic Brownian distribution
author: [andretchen0, alvarosabu]
description: Basic scene with grouping/parenting and Brownian distribution of instances
thumbnail: /experiments/brownian-distribution.png
featured: true
tags: ['useLoop']
date: 2025-01-01
---


This experiment demonstrates **spatial object distribution** using a random walk algorithm inspired by [Brownian motion principles](https://en.wikipedia.org/wiki/Brownian_motion). Rather than animating particles in motion, this visualization shows how objects can be positioned in 3D space using statistical patterns derived from random walk algorithms.

### What You'll See

The scene features **2000 geometric objects** (spheres, cubes, and pyramids) distributed throughout 3D space following a Brownian distribution pattern. Each object:

- **Is positioned** using a random walk algorithm that simulates particle displacement patterns
- **Changes color on hover** from the theme color to bright yellow
- **Resets position** when moving outside the boundary constraints
- **Adapts to dark/light mode** with appropriate color schemes

### Central Animation

At the center of the chaos, three geometric shapes (pyramid, cube, sphere) perform a synchronized dance:

- **Vertical oscillation** using trigonometric functions
- **Dynamic scaling** that pulses with the animation
- **Phase-shifted timing** creating a wave-like effect

### Technical Implementation

The experiment showcases several advanced TresJS concepts:

- **Instanced Rendering**: Efficiently renders 2000 objects using `TresInstancedMesh`
- **Random Walk Distribution**: Implements spatial distribution using random walk patterns with boundary constraints
- **Interactive Materials**: Hover effects using pointer events
- **Loop Integration**: Smooth animations using `useLoop` composable
- **Dark Mode Support**: Reactive color schemes using `useDark`

### Key Features

- **Performance Optimized**: Uses Three.js instancing for smooth 60fps rendering
- **Interactive**: Hover over any particle to see it highlight
- **Responsive**: Adapts to different screen sizes and themes
- **Statistically Accurate**: Implements random walk distribution patterns based on Brownian motion statistics

This visualization serves as both an educational tool for understanding random distributions and a performance benchmark for TresJS's capability to handle large numbers of interactive objects.
