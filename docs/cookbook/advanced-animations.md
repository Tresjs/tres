---
title: Advanced Animations
description: How to use GSAP to animate your scene
author: dennissmuda
thumbnail: /recipes/advanced-animations.png
difficulty: 0
---

# Advanced Animations

In this guide, we are going to use GSAP to animate our scene instead of the `useRenderLoop` composable.

<StackBlitzEmbed project-id="tresjs-advanced-animations" />

## Use GSAP to trigger animations on 3D Objects

We don't have to rely on `useRenderLoop` or TresJS to handle our animations. We could also leverage GSAP's `to` function for example:

```ts
import gsap from 'gsap'

const objectRef = shallowRef(null)

watchEffect(() => {
  if (objectRef.value) {
    gsap.to(objectRef.value.position, {
      y: 2,
    })
  }
})
```

GSAP is a very popular animation library and you can find a lot of help and resources online, including [these demos on codepen](https://codepen.io/GreenSock).

Of course there are lots of alternatives out there, and you should feel free to reach for _your_ favorite animation library!
