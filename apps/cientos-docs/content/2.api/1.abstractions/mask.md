---
title: Mask
description: Cut out areas of the screen using the stencil buffer.
---

::SceneControlsWrapper
  ::AbstractionsMask
  ::
::

`<Mask/>` uses the stencil buffer to cut out areas of the screen.

::prose-warning
To use `<Mask />` you *must* add `:stencil="true"` to your `<TresCanvas />`.

`<Mask />` relies on the [`stencil buffer`](https://threejs.org/docs/#api/en/renderers/WebGLRenderer). In recent versions of THREE.js, by default, the stencil buffer is not created.
::

## Props

| Prop           | Description                                                                                                                                                            | Default              |
| :------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- |
| **`id`**    | Id of the stencil buffer to use. Each mask must have a `number` id. Multiple masks can refer to the same id. | |
| **`colorWrite`** | Whether the colors of the mask's own material will leak through. | `false` |
| **`depthWrite`** | Whether the depth of the mask's own material will leak through. | `false` |

## useMask

Composable that returns the stencil configuration to apply a mask to a material. Use it with `v-bind` on materials that should be affected by the mask.

**Parameters:**
- `id` - The mask id to use (number or Ref)
- `inverse` - Whether to invert the mask (boolean or Ref), defaults to `false`

```vue
<TresMeshNormalMaterial v-bind="useMask(1)" />
```
