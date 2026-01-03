---
title: Glass/Plastic Material
author: jaime-bboyjt
description: A realistic glass/plastic effect, play with it!
thumbnail: /experiments/glass-material.png
tags: ['materials']
date: 2023-04-10
lastUpdated: 2023-04-10
---

This experiment demonstrates **realistic glass and plastic rendering** using Three.js's advanced `MeshPhysicalMaterial`. Explore the properties of transparent materials with real-time controls for transmission, thickness, roughness, and environmental reflections.

### What You'll See

An interactive material showcase featuring:

- **High-Resolution Icosahedron**: 10-subdivision sphere showing detailed surface properties
- **HDR Environment Mapping**: Realistic reflections using high dynamic range textures
- **Background Plane**: Textured backdrop visible through the transparent material
- **Real-Time Controls**: Live adjustment of all material properties
- **Professional Lighting**: Directional and ambient lighting for optimal material display

### Technical Implementation

This experiment demonstrates advanced material techniques:

- **MeshPhysicalMaterial**: Industry-standard PBR material with transmission support
- **HDR Environment Maps**: Equirectangular reflection mapping for realistic lighting
- **Normal Mapping**: Surface detail enhancement using normal map textures
- **Transmission Rendering**: Realistic light transmission through transparent materials
- **Clearcoat Effects**: Surface coating simulation for enhanced realism

### Material Parameters

Fully controllable glass properties:

- **Transmission**: 0-1 range controlling material transparency and light transmission
- **Thickness**: Physical thickness affecting refraction and light behavior
- **Roughness**: Surface smoothness from mirror-like (0) to frosted (1)
- **Environment Intensity**: Reflection strength for environmental lighting
- **HDR Toggle**: Switch between HDR and standard environment mapping

### Rendering Features

- **Physically Accurate**: Based on real-world material properties
- **Performance Optimized**: Efficient rendering suitable for real-time applications
- **Grid Reference**: Helper grid for depth perception and scale reference
- **Interactive Controls**: Immediate visual feedback for parameter changes

### Visual Design

- **Clean Layout**: Minimal interface focusing attention on material properties
- **Professional Lighting**: Balanced illumination showcasing material characteristics
- **Background Integration**: Textured backdrop demonstrating transmission effects
- **Neutral Color Scheme**: Light gray background preventing color contamination

This experiment serves as an excellent reference for implementing realistic glass, plastic, and transparent materials in 3D applications, demonstrating the full capabilities of modern physically-based rendering techniques.

