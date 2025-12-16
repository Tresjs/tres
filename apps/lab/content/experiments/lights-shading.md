---
title: Lights Shading
author: alvarosabu
description: Custom shader implementation with multiple light types (ambient, directional, point) and specular reflections. Port from Bruno Simon's Three.js Journey.
thumbnail: /experiments/lights-shading.png
tags: [lights, shading, materials]
date: 2025-12-14
---

## Overview

This experiment demonstrates custom lighting and shading using GLSL shaders in TresJS. It implements multiple light types with real-time controls for all lighting parameters.

This is a port from [Bruno Simon's Three.js Journey](https://threejs-journey.com/) course, adapted to work with TresJS's declarative Vue-based API.

## Features

### Light Types

- **Ambient Light**: Uniform lighting applied to all surfaces (currently commented out in fragment shader)
- **Directional Light**: Simulates distant light sources (like the sun) with:
  - Diffuse shading based on surface normal
  - Specular highlights with configurable shininess
  - Visual helper (plane geometry) to show light position
- **Point Light**: Simulates omnidirectional light sources with:
  - Distance-based decay/attenuation
  - Diffuse and specular components
  - Visual helper (icosahedron) to show light position

### Implementation Details

- **Custom ShaderMaterial**: Uses custom vertex and fragment shaders for full lighting control
- **Modular Shader Code**: Light calculations separated into individual GLSL includes:
  - `ambient.glsl`: Ambient light calculation
  - `directional.glsl`: Directional light with specular reflection
  - `point.glsl`: Point light with distance decay
- **Interactive Controls**: Real-time adjustment via TresJS Leches GUI for:
  - Material base color
  - Light colors, intensities, and positions
  - Point light decay factor
- **Multiple Geometries**: Applied to:
  - Custom GLTF model (Blender cube)
  - Torus knot
  - Sphere
- **Smooth Animation**: All geometries rotate continuously using `useLoop`

### Technical Highlights

- **Phong Shading Model**: Implements diffuse and specular reflection
- **View-dependent Specular**: Specular highlights change based on camera position
- **Uniform Management**: Vue watchers sync UI controls with shader uniforms
- **Color Space Handling**: Proper tone mapping and color space conversion
