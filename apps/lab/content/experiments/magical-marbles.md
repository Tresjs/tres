---
title: Magical Marbles
author: damienmontastier
description: Magical Marbles Sphere
thumbnail: /experiments/magical-marbles.png
tags: ['magical', 'marbles', 'sphere', 'shaders', 'glsl', 'contact shadow']
date: 2024-02-28
updated: 2025-06-29
---

This experiment creates a **stunning interactive marble sphere** with sophisticated custom shaders and smooth color transitions. Inspired by the famous [Codrops tutorial](https://tympanus.net/codrops/2021/08/02/magical-marbles-in-three-js/), this implementation showcases advanced material techniques and interactive animations.

### What You'll See

An enchanting interactive experience featuring:

- **Procedural Marble Surface**: Custom vertex and fragment shaders creating realistic marble patterns
- **Color-Cycling Interaction**: Click to cycle through 5 beautiful color schemes
- **Dynamic Background**: Radial gradients that smoothly transition with marble colors
- **Contact Shadows**: Realistic ground shadows that adapt to current color scheme
- **Elastic Animations**: Smooth hover and click effects with elastic scaling
- **Post-Processing Pipeline**: Tone mapping and multisampling for enhanced visual quality

### Technical Implementation

This experiment demonstrates advanced shader and animation techniques:

- **CustomShaderMaterial**: Combines standard PBR features with custom shader logic
- **Displacement Mapping**: Height and displacement textures for surface detail
- **Real-Time Uniforms**: Live parameter adjustment affecting marble appearance
- **GSAP Animations**: Professional-grade animations for color transitions and scaling
- **Color Space Management**: HSL color manipulation for smooth gradients
- **Interactive Materials**: Cursor changes and visual feedback on hover

### Shader Parameters

Fully controllable marble characteristics:

- **Iterations**: 1-64 steps for noise complexity and detail level
- **Depth**: Surface displacement intensity for 3D marble veining
- **Smoothing**: Blend between sharp and soft pattern transitions
- **Displacement**: Overall surface deformation amount
- **Speed**: Animation timing for flowing marble patterns
- **Material Properties**: Roughness and metalness for realistic surface response

### Interactive Features

- **Click Cycling**: Smooth transitions between 5 predefined color schemes
- **Hover Effects**: Subtle scaling and cursor changes for user feedback
- **Auto-Rotation**: Gentle orbital movement showcasing the marble from all angles
- **Real-Time Controls**: Live parameter adjustment with immediate visual response
- **Background Sync**: Gradient backgrounds that match current marble colors

### Visual Design

- **Professional Gradients**: Carefully crafted radial backgrounds enhancing marble visibility
- **Contact Integration**: Ground shadows that respond to color changes
- **Elastic Feedback**: Satisfying bounce animations on interaction
- **HDR Environment**: Urban environment preset for realistic reflections

This experiment perfectly demonstrates how custom shaders can create captivating interactive materials, combining mathematical precision with artistic beauty to create an engaging user experience.

