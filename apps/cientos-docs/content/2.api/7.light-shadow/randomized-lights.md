---
title: Randomized Lights
description: Creates multiple lights and jiggles them for softer shadows.
---

::SceneWrapper
  ::LightShadowRandomizedLights
  ::
::

`<RandomizedLights />` internally creates multiple lights and jiggles them. You would normally add it as a child of `<AccumulativeShadows />`.

It is based on this [Drei component](http://drei.docs.pmnd.rs/staging/randomized-light).

## Props

| Prop | Description | Default |
| - | - | - |
| `count` | Number of lights | `8`|
| `radius` | Radius of the jiggle, higher values make softer light | `1` |
| `intensity` | Light intensity | `Math.PI` |
| `ambient` | "Ambient occlusion" to directional light ratio, lower values mean less AO | `0.5` |
| `castShadow` | If the lights cast shadows | `true` |
| `bias` | Default shadow bias | `0` |
| `mapSize` | Size of the lights' shadow map | `512` |
| `size` | Size of the lights' shadow camera frustum | `10` |
| `near` | Lights' shadow camera near value | `0.5` |
| `far` | Lights' shadow camera far value | `500` |
| `position` | Position | `[5, 5, -10]` |
