---
title: Gelatinous Cube
author: alvarosabu
description: A translucent gelatinous cube rendered with MeshTransmissionMaterial. Play with transmission, thickness, chromatic aberration and more.
thumbnail: /experiments/gelatinous-cube.webp
tags: ['materials']
date: 2026-06-19
lastUpdated: 2026-06-19
---

This experiment ports pmndrs/drei's classic **Gelatinous Cube** to TresJS, using cientos' `MeshTransmissionMaterial` to render a believable translucent, gel-like cube with a skeleton and weapons frozen inside.

### What You'll See

- **Translucent gel cube**: `MeshTransmissionMaterial` driving refraction, thickness, chromatic aberration and clearcoat.
- **Frozen contents**: skeleton, arrows and bubbles suspended inside the cube, visible through the transmission.
- **Accumulative soft shadows**: progressive contact shadows tinted to match the gel.
- **HDR environment**: a `sunset` preset providing reflections and a soft background.
- **Live controls**: a Leches panel exposing every transmission parameter in real time.

### Technical Implementation

- **MeshTransmissionMaterial** (cientos): FBO-based transmission with chromatic aberration, anisotropic blur, distortion and clearcoat.
- **AccumulativeShadows + RandomizedLights** (cientos): soft, progressively accumulated shadows.
- **Environment** (cientos): `sunset` preset used as both reflections and blurred background.
- **useGLTF** with draco decompression for the optimized model.

### Credits

Ported from drcmda's original [react-three-fiber demo](https://github.com/drcmda/meshtransmissionmaterial). Model "Gelatinous Cube" by [glenatron](https://sketchfab.com/3d-models/gelatinous-cube-e08385238f4d4b59b012233a9fbdca21), licensed under CC-BY-NC-4.0.
