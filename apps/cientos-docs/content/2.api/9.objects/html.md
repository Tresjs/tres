---
title: Html
description: Project HTML content to objects in your scene.
---

::SceneWrapper
  ::ObjectsHtml
  ::
::

This component allows you to project HTML content to any object in your scene. TresJS will automatically update the position of the HTML content to match the position of the object in the scene.

## Usage

```vue{2,13-18,23}
<script setup lang="ts">
import { Html, OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
</script>

<template>
  <TresCanvas clear-color="#82DBC5">
    <TresPerspectiveCamera :position="[2, 2, 5]" />
    <OrbitControls />
    <TresMesh :position="[1, 1, 1]">
      <TresBoxGeometry />
      <TresMeshNormalMaterial />
      <Html
        center
        transform
        :distance-factor="4"
        :position="[0, 0, 0.65]"
        :scale="[0.75, 0.75, 0.75]"
      >
        <h1 class="title">
          I'm a Box 📦
        </h1>
      </Html>
    </TresMesh>
    <TresGridHelper />
    <TresAmbientLight />
  </TresCanvas>
</template>
<style scoped>
.title {
  background-color: #1e1e1e;
  color: #ffffff;
  font-size: 0.75rem;
  padding: 0.25rem;
  border-radius: 0.375rem;
}
</style>

```

## Occlusion

By default, the HTML content will be visible through other objects in the scene. You can use the `occlude` prop to make the HTML content occlude other objects in the scene.

Html can hide behind geometry using the occlude prop.

```html
<html occlude></html>
```

You can also choose which objects should occlude the HTML content by passing an array of objects refs to the `occlude` prop.

```vue{2,19-21}
<script setup lang="ts">
import { Html } from '@tresjs/cientos'
import { shallowRef } from 'vue'

const boxRef = shallowRef()
const sphereRef = shallowRef()
</script>

<template>
  <TresCanvas>
    <TresMesh ref="boxRef">
      <TresBoxGeometry />
      <TresMeshNormalMaterial />
    </TresMesh>

    <TresMesh ref="sphereRef">
      <TresSphereGeometry />
      <TresMeshNormalMaterial />
      <Html :occlude="[boxRef, sphereRef]">
        <div>Occluded by box and sphere</div>
      </Html>
    </TresMesh>
  </TresCanvas>
</template>
```

## Using iframes

You can achieve pretty cool results with the `Html` component by using iframes. For example, you can use an iframe to display a YouTube video in your scene or a webpage with a 3D model.

## Props

| Prop                | Description                                                                                                               | Default                                  |
|---------------------|---------------------------------------------------------------------------------------------------------------------------|------------------------------------------|
| **as**              | Wrapping html element.                                                                                                    | `'div'`                                  |
| **wrapperClass**    | The className of the wrapping element.                                                                                    |                                          |
| **prepend**         | Project content behind the canvas.                                                                                        | `false`                                  |
| **center**          | Adds a -50%/-50% CSS transform. [Ignored in transform mode]                                                               | `false`                                  |
| **fullscreen**      | Aligns to the upper-left corner, fills the screen. [Ignored in transform mode]                                            | `false`                                  |
| **distanceFactor**  | Children will be scaled by this factor, and also by distance to a PerspectiveCamera / zoom by an OrthographicCamera.      |                                          |
| **zIndexRange**     | Z-order range.                                                                                                            | `[16777271, 0]`                          |
| **portal**          | Reference to target container.                                                                                            |                                          |
| **transform**       | If true, applies matrix3d transformations.                                                                                | `false`                                  |
| **sprite**          | Renders as sprite, but only in transform mode.                                                                            | `false`                                  |
| **calculatePosition** | Override default positioning function. [Ignored in transform mode]                                                      |                                          |
| **occlude**         | Can be `true`, `Ref<TresObject3D>[]`, `'raycast'`, or `'blending'`. True occludes the entire scene.                       |                                          |
| **geometry**         | Custom `geometry` to be use                                                                                              |                    `PlaneGeometry`       |
| **material**         | Custom shader `material` to be use                                                                                              |                                          |

## Events

| Event               | Description                                                                                                               |
|---------------------|---------------------------------------------------------------------------------------------------------------------------|
| onOcclude           | Called when the occlusion state changes.                                                                                  |
