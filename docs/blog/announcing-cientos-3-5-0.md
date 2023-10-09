---
sidebar: false
---

# Announcing cientos v3.5.0 🎉

Cientos is here again with a new and exiting release 🎉.

- **Cientos v3.5.0**

<iframe src="https://giphy.com/embed/2XOL4zsm6V0nm" width="480" height="358" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/walking-2XOL4zsm6V0nm">via GIPHY</a></p>

## HTML component 🖥️

Let's start with a great one, the `HTML` component has finally arrived to **Cientos** and brings with it a huge amount of possibilities! Just look at this:

![](/blog/laptop html component.gif)

Please check the official [docs](https://cientos.tresjs.org/guide/misc/html-component.html)

This was provided by (Alvaro Saburido)[https://github.com/alvarosabu].

## FBO and useFBO 🪞

The FBO (or Frame Buffer Object) technique allows you to put a render into a texture. We provide this feature as a component or as a composable.

![](/blog/fbo.gif)

To learn more about this powerful component please check [this](https://cientos.tresjs.org/guide/abstractions/fbo.html)

Big thanks to (Francesco Michelini)[https://github.com/kekkorider]

## Line2 📉

We gave some love to the shape section in this release, bringing to you two new shapes componentes. The first one is `<Line2 />`, which allow you to create easy lines with just a few lines of code.

![](/blog/line2.gif)

For more info please check the [official documentation](https://cientos.tresjs.org/guide/shapes/line2.html). 

This component was done by [andretchen0](https://github.com/andretchen0) big thanks to him.

## CatmullRomCurve 💫

Similar to the previous one, the `<CatmullRomCurve3 />` provides smooth curves with almost no configuration.

![](/blog/CatmullRomCurve3.gif)

You can learn more [here](https://cientos.tresjs.org/guide/shapes/catmullromcurve3.html).

Another component made by [andretchen0](https://github.com/andretchen0) thanks.

## GlobalAudio 🔊

You can now add sound to your scene with just one component. `<GlobalAudio  />` has landed in **TresJs**. Simply import and use the `<GlobalAudio  />` component, give it music path and just like that you'll get sound.

```vue{3,9}
<script setup>
import { TresCanvas } from '@tresjs/core'
import { GlobalAudio } from '@tresjs/cientos'
</script>

<template>
  <TresCanvas>
    <TresPerspectiveCamera :position="[0, 0, 7.5]" />
    <GlobalAudio :src="exampleAudio" />
  </TresCanvas>
</template>
```
An abstraction of the three [Audio](https://threejs.org/docs/index.html?q=audio#api/en/audio/Audio) instance.

To learn more check this [here](https://cientos.tresjs.org/guide/abstractions/global-audio.html).

This component was made by [JaimeTorrealba](https://github.com/JaimeTorrealba).

## Directives

A new exiting one, **Cientos** has been experimenting with the original Vue [Directives](https://vuejs.org/guide/reusability/custom-directives.html#introduction). This idea was born in a session between the **TresJs** Core team members, we explored the possibility, and now we're happy to announce that not only is it possible, it's really handy.

So now we have 4 Directives and a new section in cientos for you guys:

### v-log

With v-log you can inspect your instance without the need to use template ref and watch... Just import the directive, and log what you need.

```
<script setup lang="ts">
import { OrbitControls, Sphere, vLog } from '@tresjs/cientos'
</script>
<template>
    <TresCanvas >
    <TresPerspectiveCamera :position="[0, 2, 5]" />
    <Sphere
      ref="sphereRef"
      :scale="0.5"
      v-log:material  <!-- will print just the material 🎉 -->
    />
    <OrbitControls v-log />
  </TresCanvas>
</template>
```

Check [here](https://cientos.tresjs.org/guide/directives/v-log.html) for more info.

### v-light-helper

Also for debug purposes, `v-light-helper` aims to add the current helper for the light, this way you don't have to worry about any reference or bloated code, just import and use it with a light, and you'll get the right helper.

```vue{2,8,11,14,17}
<script setup lang="ts">
import { OrbitControls, Sphere, vLightHelper } from '@tresjs/cientos'
</script>
<template>
    <TresCanvas >
      <TresPerspectiveCamera :position="[0, 2, 5]" />
      <TresDirectionalLight
        v-light-helper
      />
      <TresPointLight
        v-light-helper
      />
      <TresSpotLight
        v-light-helper
      />
      <TresHemisphereLight
        v-light-helper
      />
  </TresCanvas>
</template>
```

Visit the [official documentation](https://cientos.tresjs.org/guide/directives/v-light-helper.html) to learn more.


### v-always-look-at

With the `v-always-look-at` as the name suggest you can force the element to always look at a point (even if this is in movement).

```
<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { Box, vAlwaysLookAt } from '@tresjs/cientos'
</script>
<template>
    <TresCanvas >
      <TresPerspectiveCamera :position="[0, 2, 5]" />
      <Box
        v-always-look-at="new Vector3(0, 0, 0)"
      />
  </TresCanvas>
</template>
```

Learn more [here](https://cientos.tresjs.org/guide/directives/v-always-look-at.html)

### v-distance-to

Have you ever tried to measure the distance between objects in threejs? Well now it's easier than ever. Just use the `v-distance-to` and you'll get the exact distance. Example:

```
    <Sphere
      ref="sphere1Ref"
      :position="[-2, slider, 0]"
      :scale="0.5"
    />
    <Sphere
      v-distance-to="sphere1Ref"
      :position="[2, 0, 0]"
      :scale="0.5"
    />
```
Learn more about these directives [here](https://cientos.tresjs.org/guide/directives/v-distance-to.html)

Thanks for reading and happy 3D coding  😊

