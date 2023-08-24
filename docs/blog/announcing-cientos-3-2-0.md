---
sidebar: false
---

# Announcing cientos v3.2.0 🎉

There is a lot going on in the TresJs Ecosystem.

But for now let's hijack this space to announce what's happening in your favorite helper library for creating 3D experience with TresJs, the Cientos package! 😊

- **Cientos v3.2.0**

<iframe src="https://giphy.com/embed/vmon3eAOp1WfK" width="480" height="357" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/celebration-excited-loki-vmon3eAOp1WfK">via GIPHY</a></p>

## Remove TweakPane from cientos 😱

Ok ok, not really, we haven't dropped TweakPane from Cientos yet.

In Cientos, we're constantly working to improve your development experience, and we have found that the tweakPane EssentialsPlugin was taking up HALF of the Cientos bundle size, so we have taken the decision to drop it from Cientos and add it as a peerDependency.

This will mean that you have to manually instal it to use useTweakPane().

So, as you may find in the logs, this package will be deprecated soon in the future

The good news is that we're working on a built-in solution... ok no more spoilers 😊

## GlassMaterial 🍷

¡We've something shiny here!

A new fancy material only available in Cientos that emulates glass.

As you should expect, it couldn't be easier to use:

```html
<MeshGlassMaterial ref="glassMaterialRef" />
```

This material is an adaptation of the MeshPhysicalMaterial so you can tweak the properties to achieve incredible results in the same way

More info [here](https://cientos.tresjs.org/guide/materials/glass-material.html)

## UseVideoTexture 🎞️

Yes!! the new loader allows you to easily use a video as a texture.

```js
import { useVideoTexture } from '@tresjs/cientos'
import exampleVideo from '/myVideoPath'

const texture = ref()
texture.value = await useVideoTexture(exampleVideo) // you can pass options too
```

And in the component:

```html
...
<Sphere :position="[0, 2, 0]">
  <TresMeshBasicMaterial :map="texture" />
</Sphere>
...
```

For more information, you can check the official doc [useVideoTexture](https://cientos.tresjs.org/guide/loaders/use-video-texture.html)

## Camera-controls 🎥

Since the last version of Cientos was released, you have been able to use the famous Camera-controls library, made by [yomotsu](https://github.com/yomotsu).

In case you don't know what I'm talking about, the CameraControls is a camera controller similar to OrbitControls yet it supports smooth transitions and more features.

As always in Cientos we like to make things easy for you and so we created an abstraction that you can use like this:

```html
<template>
  <TresCanvas shadows alpha>
    <TresPerspectiveCamera :args="[45, 1, 0.1, 1000]" />
    <CameraControls />
  </TresCanvas>
</template>
```

The number of tweaks you can do here is out of this world, check it out[here](https://cientos.tresjs.org/guide/controls/camera-controls.html)

### Big thanks to [notarun](https://github.com/notarun) ✨

for this amazing contribution.

## New Event isLocked in (PointerLockControls)

A new event has been added to the PointerLockControls, now you can effortlessly know if the PointerLock event is active or not. Simply add a couple of lines of code:

```js
const isActive = (state: boolean) => console.log(state)
```

```html
...
<PointerLockControls @is-lock="state => isActive(state)" />
...
```

---

We hope you like this new release. We are working hard to bring you the best possible experience when using TresJS.

- Cientos https://github.com/Tresjs/cientos/releases
