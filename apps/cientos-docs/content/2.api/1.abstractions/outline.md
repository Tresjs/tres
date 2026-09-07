---
title: Outline
description: Create inverted-hull outlines using parent geometry.
---

::SceneControlsWrapper
  ::AbstractionsOutline
  ::
::

`<Outline />` creates an inverted-hull outline using its parent's geometry. Supported parents are `<TresMesh>` and `<TresSkinnedMesh>`.

## Props

| Props        | Description                                                        | Default |
|--------------|--------------------------------------------------------------------| ------- |
| color        | Outline color                                                      | `'black'` |
| screenspace  | Whether line thickness is independent of zoom                      | `false` |
| opacity      | Outline opacity                                                    | `1` |
| transparent  | Outline transparency                                               | `false` |
| thickness    | Outline thickness                                                  | `0.05` |
| angle        | Geometry crease angle (`0` is no crease).  See [BufferGeometryUtils.toCreasedNormals](https://threejs.org/docs/#examples/en/utils/BufferGeometryUtils.toCreasedNormals) | `Math.PI` |
