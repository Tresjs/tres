---
title: Wobble Material
description: Makes a geometry wobble and wave around with customizable speed and factor.
---

::SceneControlsWrapper
  ::MaterialsWobbleMaterial
  ::
::

The `cientos` package provides a `<MeshWobbleMaterial />` component that makes a geometry wobble and wave around.

## Props

| Prop            | Description                                                                               | Default     |
| :-------------- | :---------------------------------------------------------------------------------------- | ----------- |
| **speed** | how fast the wobble effect would be.                | `1`     |
| **factor**      | how strong the wobble effect will deform the geometry                                                                    | `1` |

 This material extends `THREE.MeshStandardMaterial` and accepts all the same props plus additional reflection-specific properties.
