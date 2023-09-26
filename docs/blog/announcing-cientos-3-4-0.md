---
sidebar: false
---

# Announcing cientos v3.4.0 🎉

Cientos is here again with a new and exiting release 🎉.

- **Cientos v3.4.0**

<iframe src="https://giphy.com/embed/2XOL4zsm6V0nm" width="480" height="358" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/walking-2XOL4zsm6V0nm">via GIPHY</a></p>

## LensFlare

A new and completely original abstraction has arrived to Cientos ✨ Behold His Majesty `<LensFlare />`.

It's a wrapper of the Three.js [LensFlare](https://threejs.org/docs/#examples/en/objects/Lensflare) addon.

![](/blog/lensflare.gif)

While it could look intimidating at first, this component has a lot of flexibility, so check out all the different options [here](https://cientos.tresjs.org/guide/abstractions/lensflare.html)

We're going to say thanks to [andretchen0](https://github.com/andretchen0) for this incredible contribution.

## Sky

The `Sky` component allows you to create realistic outdoor scenes with the use of sky, which as the name implies creates sky gradients and more with just a few lines of code.

![](/blog/sky.gif)

This is  fancy wrapper of the addon [Sky](https://threejs.org/examples/?q=sky#webgl_shaders_sky).

```vue
<script setup lang="ts">
import { Sky } from '@tresjs/cientos'
</script>

<template>
  <TresCanvas>
    <TresPerspectiveCamera :position="[0, 100, 2000]" />
    <Sky />
  </TresCanvas>
</template>
```
Could it be simpler?

You can find the official docs [here](https://cientos.tresjs.org/guide/staging/sky.html)

Another one of [andretchen0](https://github.com/andretchen0) amazing contributions!

## SVG

![](/blog/svg.gif)

A classical one, the svg loader component has arrived in cientos this release, to bring the versatility of `svg` into a wrapper of the original [loader](https://threejs.org/docs/?q=svg#examples/en/loaders/SVGLoader) with basically one line of code (well two if you count the import 😅).

```html
<template>
  <TresCanvas>
    <Suspense>
      <SVG src="/favicon.svg" /> // you can pass a path or a inline svg
    </Suspense>
  </TresCanvas>
</template>
```
You can find the official docs [here](https://cientos.tresjs.org/guide/loaders/svg.html).

And yes, again big thanks to [andretchen0](https://github.com/andretchen0) 3 in a row!

## Stats-gl

![](/blog/stats-gl.png)


Another exciting one is the addition of Stats-gl which is like statsjs but with superpowers, originally developed by [RenaudRohlinger](https://github.com/RenaudRohlinger/stats-gl) is a powerful performance monitoring tool.

```vue
<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { StatsGl } from '@tresjs/cientos'
</script>

<template>
  <TresCanvas>
    <StatsGl /> // as simple as this
  </TresCanvas>
</template>
```

Big thanks to [notarun](https://github.com/notarun) for this contribution.

Official docs [here](https://cientos.tresjs.org/guide/misc/stats-gl.html).

## Fix camera as a param problem in controls

[damiankoper](https://github.com/damiankoper) discovered a bug when you tried to use the camera as a parameter.

Thanks to [damiankoper](https://github.com/damiankoper) for this useful contribution.

## New documentation full of examples

![](/blog/docs-examples.png)

In addition to all these amazing new features, we have been working internally to improve the UX, and now you can visit the [cientos](https://cientos.tresjs.org/) page and navigate through the components and see the inline examples right away.

## Internal organization of code (will be easier to contribute)

Also, we're constantly working on the DX: refactors, cleaning, and internal improvement. So now we have a clear structure, now it is easier than ever to contribute to the cientos package 😁.

Thanks for reading and happy 3D coding  😊.