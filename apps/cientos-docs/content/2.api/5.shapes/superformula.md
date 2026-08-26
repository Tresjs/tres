---
title: Superformula
description: Produces a configurable 3D plot of the superformula.
---

::SceneControlsWrapper
  ::ShapesSuperFormula
  ::
::

The `cientos` package provides a `<Superformula />` component that produces a configurable [3D plot of the superformula](https://en.wikipedia.org/wiki/Superformula).

## Props

The `<Superformula />` 3D plot is the product of 2 2D superformulas, referred to as "A" and "B" in the props. See this [Wikipedia article about the superformula](https://en.wikipedia.org/wiki/Superformula) for more information about the function's arguments.

| Name | Description | Default |
| :--- | :---------- | :------ |
| **widthSegments** | Number of horizontal mesh segments | `32` |
| **heightSegments** | Number of vertical mesh segments | `32` |
| **numArmsA** | For A, number of radial arms/ripples | `4` |
| **expA** | A's 3 exponents | `[40, 1.3, 0.9]` |
| **numArmsB** | For B, number of radial arms/ripples | `4` |
| **expB** | B's 3 exponents | `[40, 1.3, 0.9]` |
| **color** | If no material is provided, a color for the default material | `'white'` |

## Slot

`<Superformula />` has a single slot for an optional material.
