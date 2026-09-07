---
title: GradientTexture
description: Create gradient textures for materials.
---

::SceneWrapper
  ::ObjectsGradientTexture
  ::
::

`<GradientTexture />` creates a gradient in a THREE.Texture and attaches it to its parent THREE.Material's `map` by default.

## Props

| Prop             | Description                                          | Default       |
| :--------------- | :--------------------------------------------------- | ------------- |
| `stops`          | A `number[]` of values between `0` and `1` representing the color positions in the gradient. `stops.length` should match `color.length`.              |            |
| `colors` | A `THREE.ColorRepresentation[]` representing the colors in the gradient.                          |            |
| `attach`    | Where the component should be attached within its parent. | `'map'`           |
| `height`    | Height of the canvas used to draw the gradient. | `1024` |
| `width`     | Width of the canvas used to draw the gradient.  | `16`   |
| `type`      | `'linear' \| 'radial'` Type of gradient to draw. | `'linear'` |
| `innerCircleRadius`     | Radius of the inner circle of a radial gradient.  | `0`   |
| `outerCircleRadius`     | Radius of the outer circle of a radial gradient.  | `'auto'`   |
