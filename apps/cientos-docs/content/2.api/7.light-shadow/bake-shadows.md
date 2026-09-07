---
title: Bake Shadows
description: Bakes shadows in the first frame for performance optimization.
---

::SceneWrapper
  ::LightShadowBakeShadows
  ::
::

**Cientos** provides a component called `BakeShadows`. Basically this component set the renderer.shadowMap.autoUpdate to `false`, so the shadows are casted just in the first frame which is really great for performance, the downside of this method is that the shadows will not be updated.

## Basic usage

::prose-warning
You have to set the shadows in the TresCanvas (renderer), your light sources and objects to receive and cast accordantly as you normally would do.
::
