---
title: Haunted House
author: jaime-bboyjt
description: The classical threejs-journey haunted house, done with TresJs
thumbnail: /experiments/haunted-house.png
tags: ['PointLight', 'fog', 'useTexture', 'threejs-journey']
date: 2023-04-10
lastUpdated: 2023-04-10
---

This experiment recreates the iconic **haunted house scene** from [Bruno Simon's Three.js Journey course](https://threejs-journey.com/), adapted for TresJS. Experience a spooky atmospheric scene complete with floating ghosts, textured materials, dynamic lighting, and eerie fog effects that create the perfect Halloween ambiance.

### What You'll See

A spine-chilling haunted scene featuring:

- **Detailed Haunted House**: Multi-textured building with brick walls, wooden door, and cone roof
- **Floating Ghosts**: Three colorful point lights that orbit the house in ethereal patterns
- **Graveyard Environment**: 50 randomly positioned tombstones scattered around the scene
- **Atmospheric Fog**: Dense fog effects limiting visibility and creating mystery
- **Textured Terrain**: Grass floor with normal maps, roughness, and ambient occlusion
- **Dynamic Lighting**: Multiple light sources casting realistic shadows
- **Spooky Vegetation**: Bushes strategically placed around the house for atmosphere

### Technical Implementation

This experiment demonstrates comprehensive 3D scene creation techniques:

- **Advanced Texturing**: Multiple texture maps (diffuse, normal, roughness, AO) for realistic materials
- **Texture Loading**: `useTextures` composable for efficient multi-texture loading with error handling
- **Procedural Generation**: Algorithmic placement of 50 graves using polar coordinates
- **Animation System**: `useLoop` composable driving ghost movement with trigonometric patterns
- **Shadow Mapping**: PCF soft shadows with optimized shadow camera settings
- **Material Configuration**: Proper UV2 attribute setup for ambient occlusion maps
- **Atmospheric Effects**: Fog system creating depth and limiting draw distance

### Scene Components

#### **Building Architecture**
- **Brick Walls**: 4x2.5x4 box geometry with realistic brick texturing
- **Wooden Door**: Displacement-mapped door with alpha transparency and detailed textures
- **Cone Roof**: 4-sided pyramid roof with reddish-brown material
- **Door Light**: Warm orange point light illuminating the entrance

#### **Ghost Animation System**
- **Ghost 1**: Magenta light orbiting at 4-unit radius with vertical bobbing
- **Ghost 2**: Cyan light following 5-unit circular path with complex Y movement
- **Ghost 3**: Orange light with variable radius (7 + oscillation) creating unpredictable patterns

#### **Environmental Details**
- **Graveyard**: 50 procedurally placed tombstones with random rotations
- **Bushes**: 4 spherical bushes of varying sizes around the house
- **Grass Floor**: 20x20 plane with 8x8 texture repetition for seamless tiling
- **Lighting Setup**: Ambient + directional + point lights for atmospheric illumination

### Visual Design

- **Horror Atmosphere**: Dark purple-gray background (#262837) creating ominous mood
- **Realistic Materials**: PBR workflow with proper metalness, roughness, and normal mapping
- **Color Palette**: Muted earth tones contrasted with vibrant ghost light colors
- **Depth Effects**: Fog system preventing pop-in and adding atmospheric depth
- **Shadow Play**: Strategic shadow casting enhancing the spooky atmosphere

### Performance Features

- **Optimized Textures**: Efficient texture loading with 256x256 shadow maps
- **Instanced Graves**: Reused geometry and materials for tombstone generation
- **Culling Optimization**: Fog limiting draw distance for better performance
- **Memory Management**: Proper texture wrapping and repeat settings

This experiment perfectly captures the essence of classic horror aesthetics while demonstrating advanced TresJS techniques for creating immersive, atmospheric 3D environments. It serves as an excellent reference for texture mapping, procedural generation, and atmospheric lighting in web-based 3D applications.