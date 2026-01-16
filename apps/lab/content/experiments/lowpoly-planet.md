---
title: Low Poly Planet
author: alvarosabu
description: Low Poly Planet exported from Blender
thumbnail: /experiments/lowpoly-planet.png
tags: ['models', 'cientos', 'useGLTF',]
date: 2023-03-27
lastUpdated: 2023-03-27
---

This experiment features a **charming low-poly planet** complete with orbiting airplanes and floating clouds, creating a peaceful miniature world. The scene demonstrates model animation, atmospheric effects, and creative use of the Stars component for a cosmic backdrop.

### What You'll See

A whimsical space scene featuring:

- **Rotating Low-Poly Planet**: Multi-axis rotation creating dynamic planetary movement
- **Orbiting Airplane**: Small aircraft circling the planet in realistic orbital patterns  
- **Floating Clouds**: Multiple cloud instances creating atmospheric depth
- **5000 Starfield**: Procedural star field creating infinite cosmic depth
- **Dramatic Lighting**: Point and directional lights with cyan color accent
- **Shadow System**: Soft shadows adding depth and realism

### Technical Implementation

This experiment showcases several key 3D concepts:

- **Multi-Axis Rotation**: Planet rotates on X, Y, and Z axes with different speeds
- **Shadow Mapping**: PCF soft shadows with high-resolution shadow maps (2048x2048)
- **Model Animation**: useLoop composable for smooth, frame-rate independent animation
- **Atmospheric Lighting**: Strategic light placement with cyan (#1BFFEF) and purple (#484068) colors
- **Geometry Traversal**: Proper shadow receiving setup for complex models
- **Procedural Stars**: Cientos Stars component creating realistic starfield

### Visual Design

- **Low-Poly Aesthetic**: Clean geometric forms with minimal polygon counts
- **Space Theme**: Deep purple background (#11101B) evoking deep space
- **Color Harmony**: Cyan lighting against purple ambient creates striking contrast
- **Soft Shadows**: Realistic shadow softness enhancing the miniature world feel
- **Dynamic Movement**: Multiple rotation speeds creating engaging visual rhythm

### Animation Features

- **Planetary Rotation**: Realistic multi-axis rotation simulating planetary spin
- **Orbital Mechanics**: Airplane follows believable orbital path around planet
- **Cloud Movement**: Gentle floating motion adding atmospheric life
- **Smooth Performance**: Delta-time based animation ensuring consistent speed

### Key Technologies

- **GLTF Loading**: Efficient model loading from external CDN
- **Shadow Configuration**: Professional shadow setup with bias adjustment
- **Bounding Sphere Computation**: Optimized collision detection for orbital mechanics
- **Material Updates**: Runtime material modification for shadow receiving

This experiment creates a delightful miniature world that combines technical excellence with artistic charm, making it perfect for educational purposes or as inspiration for game development and interactive storytelling.


