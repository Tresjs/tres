---
title: Glyph Cut Out
author: alvarosabu
description: Bold Slug text from pmndrs glyph used as a window into a video, with a scroll-driven dive into a single letter
thumbnail: /experiments/glyph-cut-out.webp
tags: ['glyph', 'typography', 'webgpu', 'tsl', 'video']
date: 2026-09-24
lastUpdated: 2026-09-24
---

Three lines of a heavy display font fill the viewport. The video only exists inside the letters. Scroll, and the camera dives into the I until its stem becomes the frame and the clip goes full bleed.

The text is rendered by [pmndrs glyph](https://github.com/pmndrs/glyph), the typography engine that recently got a TresJS adapter. This experiment uses its **Slug** technique: glyph coverage is integrated analytically from the font outlines, so a single letter can fill the screen and its edge stays sharp. No atlas, no texels, no blur.

### What You'll See

- **Hero**: `TYPE IS / A WINDOW / TRESJS × GLYPH` set in Anton, masked over a looping clip
- **Parallax**: moving the pointer shifts the video sample, so the letters read as a window with depth
- **Dive**: scrolling dollies the camera into the I of `WINDOW` until the clip fills the frame
- **Fallback**: if the clip cannot play, a procedural TSL liquid takes its place inside the letters

### Technical Implementation

- **`defineTextMaterial`**: glyph hands the material factory a `createDefaultMaterial()` whose `opacityNode` already carries the analytic coverage. Only `colorNode` is replaced with a `screenUV` sample of the `VideoTexture`
- **Cover fit**: the sample is scaled by the viewport and video aspect ratios, so the clip always covers the screen
- **Dive target**: `Text.glyphs()` returns per-glyph ink boxes. The I is located by its cluster index and its ink center becomes the camera target. A round letter would land in its counter, which is background
- **Camera**: placed so one world unit equals one CSS pixel at `z = 0`, then dollied toward the target on scroll with an exponential zoom, so the perceived speed stays constant across a 50x range
- **Font**: Anton baked with the glyph CLI into a single `.font.glb` with Slug and MSDF data, subset to Latin plus `×`
