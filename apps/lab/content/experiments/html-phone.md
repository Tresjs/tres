---
title: Phone with HTML inside
author: alvarosabu
description: Using HTML abstraction to render a page inside a model
thumbnail: /experiments/html-phone.png
tags: ['html', 'gltf']
date: 2023-12-08
lastUpdated: 2023-12-08
---

This experiment demonstrates **HTML content integration** within 3D models, showcasing how to embed live web pages directly into 3D objects. Experience the "iTres" phone featuring a real iframe displaying the TresJS website within a realistic iPhone X model.

### What You'll See

An immersive product showcase featuring:

- **Realistic iPhone X Model**: High-quality 3D model with accurate proportions and materials
- **Live Web Content**: Embedded iframe displaying the actual TresJS website
- **Interactive Interface**: Floating view button to trigger camera animations
- **Product Marketing**: Apple-style hero section with elegant typography
- **Loading Experience**: Custom progress indicator with emoji animations
- **Professional Environment**: HDR lighting and contact shadows for realism

### Technical Implementation

This experiment demonstrates advanced HTML-3D integration:

- **Html Component**: TresJS Cientos component for embedding HTML in 3D space
- **Occlusion Handling**: Proper depth sorting with the phone's back panel
- **Transform Integration**: HTML elements that rotate and scale with the 3D model
- **Distance Scaling**: Automatic size adjustment based on camera distance
- **Material Customization**: Custom screen transparency and bottom tab styling
- **GSAP Animations**: Smooth camera transitions for cinematic reveals

### Interactive Features

- **Floating Levitation**: Gentle floating animation using Levioso component
- **View Toggle**: Button to trigger close-up camera movement
- **Responsive HTML**: Web content that adapts to 3D transformations
- **Loading States**: Progress tracking for model and texture loading
- **Professional UI**: Nuxt UI components for consistent design

### Visual Design

- **Apple Aesthetic**: SF Pro Display font matching Apple's design language
- **Hero Marketing**: Product presentation with pricing and features
- **Environmental Lighting**: City HDR preset for realistic reflections
- **Shadow Integration**: Contact shadows grounding the phone in space
- **Fade Transitions**: Smooth loading overlay animations

### Technical Highlights

- **GLTF Model Loading**: Efficient Draco-compressed model loading
- **HTML Positioning**: Precise placement of web content within screen bounds
- **Camera Controls**: Interactive camera movements with smooth easing
- **Performance Optimization**: Efficient rendering with proper occlusion culling

This experiment perfectly demonstrates the possibilities of combining traditional web content with 3D presentations, opening new avenues for product marketing, portfolio displays, and interactive experiences that bridge the gap between 2D and 3D interfaces.

