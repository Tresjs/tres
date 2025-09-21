---
thumbnail: /dancing-blob.png
title: Dancing blob
slug: dancing-blob
author: [luckystriike, alvarosabu]
status: published
date: 2024-09-01
featured: true
description: A sphere dancing to the sound of your microphone. This demo utilizes your microphone, so please ensure that you allow access.
tags: ['basic', 'audio', 'shaders']
---

This experiment creates a **mesmerizing audio-reactive blob** that responds to your microphone input in real-time. Using custom shaders and Web Audio API, the sphere morphs and dances to the sound of your voice or ambient audio.

### What You'll See

An immersive audio-visual experience featuring:

- **Morphing Icosahedron**: High-resolution sphere (80 subdivisions) that deforms based on audio input
- **Real-Time Audio Analysis**: FFT analysis of microphone input driving visual effects
- **Custom Shader Materials**: Perlin noise-based vertex displacement with gradient coloring
- **Dynamic Typography**: Large-scale background text creating depth and atmosphere
- **Permission Handling**: Seamless microphone access request with elegant UI modal

### Technical Implementation

This experiment demonstrates advanced audio-visual techniques:

- **Web Audio API**: Real-time microphone stream analysis using `AnalyserNode`
- **FFT Processing**: Frequency domain analysis converting audio to visual parameters
- **Custom Vertex Shader**: Perlin noise displacement based on audio amplitude
- **Fragment Shader**: Gradient coloring from bright orange to lime green
- **VueUse Integration**: `useUserMedia` and `usePermission` for seamless audio access
- **Reactive Controls**: Real-time adjustment of wireframe, colors, and amplitude
- **Post-Processing Effects**: Vignette effect for cinematic presentation

### Audio Features

- **Frequency Analysis**: 2048-point FFT for detailed audio spectrum analysis
- **Average Amplitude**: Real-time calculation of audio energy levels
- **Responsive Displacement**: Vertex positions react proportionally to audio intensity
- **Smooth Animation**: Continuous rotation combined with audio-driven morphing

### Visual Design

- **Gradient Shading**: Smooth color transitions from orange (#ff9900) to lime (#d7f250)
- **Typography Integration**: Anton and JetBrains Mono fonts for industrial aesthetic
- **Dark Theme**: Deep blue background (#0c1a30) for optimal contrast
- **Professional Layout**: Strategic text placement with proper z-indexing

### Key Technologies

- **Custom GLSL Shaders**: Hand-written vertex and fragment shaders for performance
- **Perlin Noise**: Mathematical noise functions for organic displacement patterns
- **Audio Context**: Modern Web Audio API for low-latency audio processing
- **Permission Management**: Robust handling of browser microphone permissions

This experiment showcases the power of combining audio processing with real-time 3D graphics, creating an engaging interactive experience that bridges digital art and music visualization.

