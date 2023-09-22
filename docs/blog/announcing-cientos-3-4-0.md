---
sidebar: false
---

# Announcing cientos v3.4.0 🎉

Cientos is here again with a new and exiting release 🎉.

 😊 

- **Cientos v3.4.0**

<iframe src="https://giphy.com/embed/2XOL4zsm6V0nm" width="480" height="358" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/walking-2XOL4zsm6V0nm">via GIPHY</a></p>

## lensFlare

A new and completely original abstraction, has arrived to Cientos ✨ Behold His Majesty lensFlare

Is a wrapper of the addon [lensFlare](https://threejs.org/docs/#examples/en/objects/Lensflare)

![](/blog/lensflare.gif)

Could be intimidating at first but this component has a lot of flexibility, check it out[here](https://cientos.tresjs.org/guide/abstractions/lensflare.html)

We're going to say thanks [andretchen0](https://github.com/andretchen0) for this incredible contribution.

## SKY

You can now create realistic outdoor scenes with the use of sky, which as the names implies it create sky gradients and more with just a few lines of code

![](/blog/sky.gif)

This is  fancy wrapper of the addon [Sky](https://threejs.org/examples/?q=sky#webgl_shaders_sky)

```
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
Could be more simple?

You can find the official docs [here](https://cientos.tresjs.org/guide/staging/sky.html)

Another one of [andretchen0](https://github.com/andretchen0) amazing contribution!

## SVG

![](/blog/svg.gif)

A classical one, the svg loader component has arrived in cientos this release, a wrapper of the original [loader](https://threejs.org/docs/?q=svg#examples/en/loaders/SVGLoader) with basically one line of code (well two if you count the import 😅)

```
<template>
  <TresCanvas>
    <Suspense>
      <SVG src="/favicon.svg" /> // you can pass a path or a inline svg
    </Suspense>
  </TresCanvas>
</template>
```
You can find the official docs [here](https://cientos.tresjs.org/guide/loaders/svg.html)

And yes, again big thanks to [andretchen0](https://github.com/andretchen0) 3 in a row!

## Stats-gl

![](/blog/stats-gl.png)


Another exiting one is the addition of Stats-gl which is like statsjs but with superpowers, original developed for [RenaudRohlinger](https://github.com/RenaudRohlinger/stats-gl) is a powerful performance monitoring tool

```
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

Big thanks to [notarun](https://github.com/notarun) for this amazing contribution.

Official doc [here](https://cientos.tresjs.org/guide/misc/stats-gl.html)

## Fix camera as a param problem in controls

[damiankoper](https://github.com/damiankoper) discover a bug when you tried to use the camera as a parameter

Thanks to [damiankoper](https://github.com/damiankoper) for this useful contribution

## new documentation full of examples

In addition to all this amazing new features, we have working internally to improve the UX, and now you can visit the [cientos](https://cientos.tresjs.org/) page and navigate through the components and see right away the inline examples.

## internal organization of code (will be ease to contribute)

Also we're constantly working in the DX, in refactors, cleaning and internal improvement, so now we have a clear path which also get transform on a easy and intuitive package, so now is easier to contribute to cientos pkg than ever 😁.

Thanks for reading and happy 3D coding