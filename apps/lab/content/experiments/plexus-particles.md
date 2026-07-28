---
title: Plexus Particles
author: alvarosabu
description: WebGPU/TSL VFX — mouse-spawned glowing particles linked to their nearest neighbors, with turbulence and bloom.
thumbnail: /experiments/plexus-particles.webp
tags: ['webgpu', 'tsl', 'shaders', 'particles', 'compute', 'vfx']
date: 2026-07-22
lastUpdated: 2026-07-22
---

A TresJS port of the three.js `webgpu_tsl_vfx_linkedparticles` example. Particles
spawn at the cursor, drift through a turbulence field, and draw luminous links to
their two nearest living neighbors. Runs entirely on the GPU via TSL compute
shaders, with additive blending and bloom.
