---
title: Galaxy Generator 🪐
author: alvarosabu
description: Animated galaxy from ThreeJS Journey done with TresJS
thumbnail: /experiments/galaxy-generator.png
tags: ['particles', 'shaders', 'glsl']
date: 2023-04-25
---

This experiment demonstrates **procedural galaxy generation** using particle systems and custom shaders, based on [Bruno Simon's amazing Three.js Journey tutorial](https://threejs-journey.com/) and ported to TresJS. Create stunning spiral galaxies with **30,000 animated stars** that respond to real-time parameter adjustments, showcasing advanced particle rendering techniques.

### What You'll See

An interactive cosmic experience featuring:

- **30,000 Particle Stars**: Each star individually positioned using mathematical spiral algorithms
- **Spiral Galaxy Structure**: Configurable number of arms creating realistic galactic formations
- **Color Gradients**: Smooth transitions from bright green centers to deep blue edges
- **Animated Rotation**: Time-based spinning effects creating living, breathing galaxies
- **Real-Time Controls**: Interactive parameters for instant galaxy customization

### Technical Implementation

This experiment showcases advanced particle and shader techniques:

- **Custom Vertex Shader**: GLSL shaders handling individual particle transformations
- **Fragment Shader**: Per-pixel coloring with smooth gradients and transparency
- **BufferGeometry**: Efficient particle positioning using typed arrays
- **Additive Blending**: Realistic star glow effects through blend modes
- **Procedural Distribution**: Mathematical algorithms for spiral arm placement
- **Real-Time Generation**: Live galaxy regeneration based on parameter changes

### Galaxy Parameters

Fully customizable galaxy characteristics:

- **Particle Count**: 0 to 100,000 stars for performance vs. detail balance
- **Galaxy Radius**: Size control from compact to sprawling formations
- **Spiral Arms**: 2 to 10 arms for varied galactic structures  
- **Spin Factor**: Rotation intensity affecting arm curvature
- **Randomness**: Controlled chaos for natural, organic distributions
- **Color Scheme**: Interior and exterior color customization

### Shader Features

- **Time-Based Animation**: Continuous rotation and movement effects
- **Size Variation**: Realistic star size distribution using random scaling
- **Depth Sorting**: Proper transparency rendering without artifacts
- **Performance Optimization**: GPU-accelerated rendering for smooth 60fps

### Visual Design

- **Cosmic Atmosphere**: Deep space black background for maximum contrast
- **Elegant Typography**: Sacramento cursive font for artistic presentation
- **Smooth Animations**: GSAP-powered title animations for polished experience
- **Interactive Controls**: Live parameter adjustment with immediate visual feedback

This experiment perfectly demonstrates how mathematical algorithms combined with modern GPU shaders can create breathtaking cosmic visualizations, making it an excellent learning tool for both particle systems and procedural generation techniques.

