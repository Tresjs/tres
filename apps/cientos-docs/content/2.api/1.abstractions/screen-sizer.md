---
title: ScreenSizer
description: Scale objects to screen space where 1 unit equals 1 pixel.
---

::SceneWrapper
  ::AbstractionsScreenSizer
  ::
::

Adds a `<TresObject3D />` wrapper that scales to "screen space". By default `1` THREE world unit will be translated to 1 screen pixel.

E.g. a BoxGeometry with a height, width, and depth of 100 each, will be scaled to 100 screen pixels in each dimension.

## Props

Inherits all props from `THREE.Object3D`.
