---
title: HTML
description: Allows you put DOM elements in your Tres.js scene.
---

This component allows you to project HTML content to any object in your scene. TresJS will automatically update the position of the HTML content to match the position of the object in the scene.

🚀 Works seamlessly with both **PerspectiveCamera** and **OrthographicCamera** — the active camera is automatically detected by the `<Html>` component.

::SceneWrapper
  ::ObjectsHtml
  ::
::

## Usage

```vue{2,13-18}
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
        <h1 class="title">I'm a Box 📦</h1>
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

Html can be hidden behind one or more objects in your scene using the `occlude` prop.

```vue
<Html occlude>
```

If `occlude`, then `<Html>` will be hidden by any objects that pass in front of its position.

::SceneWrapper
  ::ObjectsHtmlOcclusion
  ::
::

<details>
  <summary>Demo code</summary>

```html
<TresMesh :position="[0, 1, -2]">
  <TresBoxGeometry />
  <TresMeshNormalMaterial />
  <html center transform occlude :distance-factor="4" :position="[0, 0, 2]" :z-index-range="[28, 0]">
    <h1 class="bg-white dark:bg-dark text-xs p-1 rounded">Move camera</h1>
  </html>
</TresMesh>
```

</details>

You can also choose which object or objects should occlude the HTML content by passing either a single object ref or an array of object refs to the `occlude` prop:

### Single occluder
```vue
<Html occlude="[mesh]">
```

::SceneWrapper
  ::ObjectsHtmlSingleOccluder
  ::
::

<details>
  <summary>Demo code</summary>

```html
<TresMesh :position="[0, 1, 0]">
  <TresBoxGeometry />
  <TresMeshNormalMaterial />
  <html center transform :occlude="[sphereRef]" :distance-factor="4" :z-index-range="[28, 0]">
    <h1 class="bg-white dark:bg-dark text-xs p-1 rounded">Move camera</h1>
  </html>
</TresMesh>
```
</details>

### Multiple occluders
```vue
<Html occlude="[mesh1, mesh2, mesh3, ...]" />
```

OR

```vue
<Html occlude="meshesArray" />
```
In the demo below, a `v-for` loop generates multiple spheres around the cube.
All resulting **`Mesh`** instances are collected into an array and passed to the **`occlude`** prop, allowing each sphere to occlude the HTML content.

This demo also uses the **`on-occlude`** event, which is triggered whenever the occlusion state changes.
Here, the event updates a **reactive value** to control element styles — for example, toggling between *light* and *dark* themes.

::SceneWrapper
  ::ObjectsHtmlOccludeComplexDemo
  ::
::

<details>
  <summary>Demo code</summary>

```html
<TresMesh :position="[0, 1, 0]">
  <TresBoxGeometry />
  <TresMeshNormalMaterial />
  <html
    v-bind="htmlProps"
    :occlude="occluderRefs"
    :distance-factor="4"
    :z-index-range="[28, 0]"
    @on-occlude="(event: boolean) => isOccluded = event"
  >
    <h1 class="bg-white dark:bg-dark text-xs p-1 rounded">Move camera</h1>
  </html>
</TresMesh>
```
</details>

### Blending Occlusion

`<Html>` can hide behind geometry as if it was part of the 3D scene using this mode. It can be enabled by using "blending" as the occlude prop.

```vue
<Html occlude="blending">
```

The **demo below ⬇️** *(left black example)* shows a **basic usage example**.

::SceneWrapper
  ::ObjectsHtmlOccludeBlendingDemo
  ::
::

<details>
  <summary>Demo code</summary>

```vue{2,32,34-39,62-72,63-72,74-84,86-96,98-108}
<script setup lang="ts">
import { Html, Levioso, OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { shallowRef } from 'vue'
import { CircleGeometry, MeshStandardMaterial } from 'three'

const gl = {
  clearColor: '#82DBC5',
  clearAlpha: 1,
  shadows: true,
  alpha: true,
}

const targetDirectionLightRef = shallowRef(null)

const geometries = [
  {
    component: 'TresBoxGeometry',
    args: [1, 1, 1],
  },
  {
    component: 'TresSphereGeometry',
    args: [0.7, 32, 32],
  },
  {
    component: 'TresTorusGeometry',
    args: [0.5, 0.2, 16, 100],
    bind: { castShadow: true, receiveShadow: true },
  },
]

const customGeometry = shallowRef(new CircleGeometry(1.25, 32))

const customMaterial = shallowRef(new MeshStandardMaterial({
  color: 'red',
  side: 2,
  opacity: 1,
  transparent: true,
}))
</script>

<template>
  <div class="html-demo-wrapper aspect-video">
    <TresCanvas v-bind="gl">
      <TresPerspectiveCamera :position="[0, 1.5, 7.5]" />
      <OrbitControls />

      <Levioso
        v-for="(geometry, index) in geometries"
        :key="`html-occlude-blending-demo-${index}`"
        :speed="3"
        :float-factor="3.5"
        :rotation-factor="1"
        :range="[-0.35, 0.35]"
      >
        <TresMesh :position="[index * 3.5 - 3.5, 1, 0]" v-bind="geometry.bind">
          <component :is="geometry.component" :args="geometry.args" />
          <TresMeshNormalMaterial />
        </TresMesh>
      </Levioso>

      <Html
        center
        transform
        occlude="blending"
        :position="[-4, .75, -2]"
        :z-index-range="[28, 0]"
      >
        <div class="text-center text-s p-2 bg-[#1B1C1E] text-light">
          BASIC 💛 <br />
          <em>occlude=blending</em>
        </div>
      </Html>

      <Html
        center
        transform
        occlude="blending"
        :position="[0, .85, -2]"
        :geometry="customGeometry"
        :z-index-range="[28, 0]"
      >
        <div class="text-xs p-8 text-center bg-[#F6B03B] text-dark">
          CUSTOM <br /> <strong>CIRCLE <br /> GEOMETRY</strong>
        </div>
      </Html>

      <Html
        ref="targetDirectionLightRef"
        center
        transform
        occlude="blending"
        :position="[4, .5, -2]"
        :material="customMaterial"
        receive-shadow
        :z-index-range="[28, 0]"
      >
        <div style="width: 100px; height: auto; aspect-ratio: 250/250;"></div>
      </Html>

      <Html
        center
        transform
        occlude="blending"
        :position="[4, 2.5, -2]"
        :z-index-range="[28, 0]"
      >
        <div class="text-center text-xs p-2 text-dark bg-[#FF0000]">
          <strong>HTML + Custom material </strong> <br />
          <em>+ receive-shadow </em> ⬇️
        </div>
      </Html>

      <TresDirectionalLight
        v-if="targetDirectionLightRef?.instance"
        :target="targetDirectionLightRef?.instance"
        :shadow-normalBias="0.075"
        :position="[5, 0, 5]"
        :intensity="2"
        cast-shadow
      />

      <TresGridHelper :position-y="-1" />
      <TresAmbientLight :intensity="1" />
    </TresCanvas>
  </div>
</template>

<style scoped>
.html-demo-wrapper {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  background-color: #82dbc5;
}
</style>

```
</details>

## Custom Geometry

By default, when using `occlude="blending"`, occlusion works correctly only with **rectangular HTML elements** (using a `PlaneGeometry`).
For *non-rectangular content*, you can use the **`geometry`** prop to provide a matching custom geometry.

In the **demo above ⬆️** *(middle yellow example)*, a [`CircleGeometry`](https://threejs.org/docs/#api/en/geometries/CircleGeometry) is used as a **custom geometry**.

::prose-list
- The `geometry` prop only defines the **occlusion shape** in 3D and does not modify your HTML content.
- You can provide any [`BufferGeometry`](https://threejs.org/docs/#api/en/core/BufferGeometry), for example to simulate **CSS-like styles** such as `border-radius` using a rounded rectangle or squircle geometry (see [`RoundedRectangle / Squircle geometry`](https://discourse.threejs.org/t/roundedrectangle-squircle/28645) for example).
::

#### Custom Material

You can also assign material properties to the HTML content using the `material` prop.
In the **demo above ⬆️** *(right red example)*, a **custom material** is used with shadow.

::prose-note
The `material` prop is only available when `occlude="blending"` is **enabled**.
::
::prose-note
Enable shadows using the **`castShadow`** and **`receiveShadow`** props.
Shadows are supported **only** when using a **custom material**. By default, shadows do **not** work with *`MeshBasicMaterial`* or *`ShaderMaterial`*. <br />
::

## Using `<Transition>`
The native Vue [`<Transition>`](https://vuejs.org/guide/built-ins/transition) component works seamlessly with `<Html>`.
This means you can **animate** how your projected HTML content *enters* and *leaves* the scene, exactly as you would in a regular Vue application.

::prose-note
All **standard interactions** are supported just like on a regular HTML element — **hover effects**, **events**, and *any kind of DOM interaction* are fully possible.
::

::SceneControlsWrapper
  ::ObjectsHtmlTransitionDemo
  ::
::

<details>
  <summary>Demo code</summary>

```vue{2,73-92}
<script setup lang="ts">
import { Html, Levioso, OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { ref } from 'vue'

const gl = {
  clearColor: '#82DBC5',
  clearAlpha: 0,
  shadows: true,
  alpha: true,
  antialias: true,
}

const rootRef = ref<HTMLElement>()

const bgColor = ref('#F6B03B')

const geometries = [
  {
    component: 'TresBoxGeometry',
    args: [1, 1, 1],
  },
  {
    component: 'TresSphereGeometry',
    args: [0.7, 32, 32],
  },
  {
    component: 'TresTorusGeometry',
    args: [0.5, 0.2, 16, 100],
  },
  {
    component: 'TresConeGeometry',
    args: [0.7, 1.4, 32],
  },
]

const getRandomBackgroundColor = (): string => {
  const colors = ['#F6B03B', '#82DBC5', '#FF5733', '#33FF57', '#3357FF', '#F333FF', '#33FFF5']
  const idx = Math.floor(Math.random() * colors.length)
  return colors[idx] ?? '#F6B03B'
}

const updateBackgroundColor = () => {
  bgColor.value = getRandomBackgroundColor()
}
</script>

<template>
  <div ref="rootRef" class="html-demo-wrapper">
    <TresCanvas v-bind="gl" class="!pointer-events-none">
      <TresPerspectiveCamera :position="[0, 1.5, 7.5]" />
      <OrbitControls :dom-element="rootRef" />

      <Levioso
        v-for="(geometry, index) in geometries"
        :key="`html-occlude-blending-demo-${index}`"
        :speed="3"
        :float-factor="3.5"
        :rotation-factor="1"
        :range="[-0.4, 0.4]"
      >
        <TresMesh :position="[(index - (geometries.length - 1) / 2) * 2, 1, 0]">
          <component :is="geometry.component" :args="geometry.args" />
          <TresMeshNormalMaterial />
        </TresMesh>
      </Levioso>

      <Html
        center
        transform
        occlude="blending"
        :position="[0, .75, -2]"
        :scale="1.15"
        :z-index-range="[28, 0]"
      >
        <Transition name="transition-basic">
          <h1
            v-if="showTransition"
            :style="{ backgroundColor: bgColor }"
            class="html-demo-transition-heading will-change-transform transition-transform,background-color cursor-pointer duration-500 text-center p-2 text-light shadow-lg"
            @click="updateBackgroundColor"
          >
            <strong>TRANSITION + </strong><br />
            <em>occlude=blending 💛</em>
          </h1>
        </Transition>
      </Html>

      <TresGridHelper :position-y="-1.25" />
      <TresAmbientLight :intensity="1" />
    </TresCanvas>
  </div>
</template>

<style scoped>
.html-demo-wrapper {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  background-color: #82dbc5;
}

.html-demo-transition-heading:hover {
  transform: scale(1.05);
}

.transition-basic-enter-from,
.transition-basic-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

.transition-basic-enter-active,
.transition-basic-leave-active {
  transition: all 0.5s ease;
}

.transition-basic-enter-to,
.transition-basic-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
```
</details>

### Using `iframes`

You can achieve pretty cool results with the `Html` component by using iframes. For example, you can use an iframe to display a YouTube video in your scene or a webpage with a 3D model.

::SceneWrapper
  ::ObjectsHtmlIframeDemo
  ::
::

<details>
  <summary>Demo code</summary>

```html
<html
  transform
  center
  :cast-shadow="true"
  :receive-shadow="true"
  occlude="blending"
  :z-index-range="[28, 0]"
  :position-y="2.5"
  :portal="portalRef"
  :style="{ userSelect: 'none' }"
>
  <iframe class="w-[700px] h-[500px]" src="https://tresjs.org" frameborder="0" :width="700" :height="500"></iframe>
</html>
```
</details>

:::info
The demos use `:z-index-range="[28, 0]"` simply to ensure the HTML elements stay below the documentation header (which uses `z-index: 30`).
**This value is for the docs only — you can ignore it or adjust it as needed.**
:::

## Props

| Prop                | Description                                                                                                               | Default                                  |
|---------------------|---------------------------------------------------------------------------------------------------------------------------|------------------------------------------|
| **as**              | Wrapping *HTML element*.                                                                                                    | `'div'`                                  |
| **wrapperClass**    | The `className` of the wrapping element. element.                                                                                    |                                          |
| **prepend**         | Projects content *behind* the canvas.                                                                                        | `false`                                  |
| **center**          | Adds a `transform: translate(-50%, -50%)`. <br>➡️ *Ignored in **transform** mode.*                                                               | `false`                                  |
| **fullscreen**      | Aligns to the upper-left corner and fills the screen. <br>➡️ *Ignored in **transform** mode.*                                            | `false`                                  |
| **distanceFactor**  | Children are scaled by this factor and also by distance to a `PerspectiveCamera`, or zoom when using an `OrthographicCamera`.      |                                          |
| **zIndexRange**     | Defines the *Z-order range*.                                                                                                            | `[16777271, 0]`                          |
| **portal**          | Reference to a target container (for rendering into a different DOM node). container.                                                                                            |                                          |
| **transform**       | If `true`, applies `matrix3d` transformations — the element appears as if it is inside the 3D scene.                                                                                | `false`                                  |
| **sprite**          | Renders as a *sprite*. <br>➡️ *Only in **transform** mode.*                                                                            | `false`                                  |
| **calculatePosition** | Callback function to override the default positioning logic. <br>**Type:** `(object: Object3D, camera: Camera, size: { width: number; height: number }) => [number, number, number]` <br>Receives the related 3D object, the active camera, and the current viewport size, and must return `[x, y, z]` pixel coordinates for placing the HTML element. <br>➡️ *Ignored in **transform** mode.*                                                     |    [Default `calculatePosition`](https://github.com/Tresjs/cientos/blob/main/src/core/misc/html/utils.ts#L9-L19)                                      |
| **occlude**         | Enables occlusion. Possible values: <br>- `true` → Occlusion against *all* scene objects <br> - `Ref<TresObject3D>[]` → Occlusion is enabled only against the specified objects. <br>- `'blending'` → Uses a *blending-based* occlusion method (CSS-like depth blending).                      |                                          |
| **geometry**         | Custom `geometry` to be used.                                                                                              |                    [`PlaneGeometry`](https://threejs.org/docs/?q=geometry#api/en/geometries/PlaneGeometry)       |
| **material** | **Custom shader _material_ used for the occlusion mesh.** <br> **Only applies when `occlude="blending"` is enabled** (an occlusion mesh is created). <br> _Ignored in raycast occlusion modes (`true`, object refs)._ | |
| **transparentMaterial** | **Enables _transparent_ rendering for the occlusion material.** <br> **Only applies when `occlude="blending"` creates an occlusion mesh.** <br> _Ignored in raycast occlusion modes (`true`, object refs)._ | `false` |

## Events

| Event               | Description                                                                                                               |
|---------------------|---------------------------------------------------------------------------------------------------------------------------|
| onOcclude           | Called when the occlusion state changes.                                                                                  |

## Exposed properties
| Property          | Type                        | Description                                                                 |
|-------------------|-----------------------------|-----------------------------------------------------------------------------|
| **instance**      | `Ref<TresObject3D \| null>` | Reference to the root **`<TresGroup>`** used by `<Html>`. |
| **isVisible**     | `Ref<boolean>`              | Reactive value that indicates whether the HTML content is **currently visible** or **occluded**. |
| **occlusionMesh** | `Ref<TresObject3D \| null>` | Reference to the **occlusion mesh** created when `occlude="blending"` is **enabled**. Used internally for geometry-based occlusion. |

## Caveats

- ✨ When using **`<Html occlude>`**, if the `<Html>` component is **overlapping** or **inside a 3D object**, it will be considered **occluded** and therefore **hidden**. To avoid this, **adjust the position** of the `<Html>` component in your scene.

- 🎨 When using **`<Html occlude="blending">`**, the HTML content is no longer **selectable** because it is rendered **behind the canvas**. This is required to achieve the blending effect.

- ⚙️ When using a **custom material** with occlusion in `blending` mode, there are a few important requirements to ensure the HTML content renders correctly ⬇️

  <details>
    <summary>See more information</summary>

  1. If you provide your own material, it must be **transparent** (`transparent: true`) with an **opacity < 1**.
  2. If you are not providing a custom material, enable **`transparentMaterial`** so the internal shader becomes transparent.
  3. The occlusion mesh requires a **fully transparent canvas background**; otherwise, thin borders or halo artifacts may appear.
  4. To compensate for the transparent canvas, you may **reapply your previous clear-color as a CSS background** on the `html`, `body`, or a wrapper `div`.
  </details>

- 🔶 When using **`transparentMaterial`**, overlapping `<Html>` elements (especially multiple `occlude="blending"` instances) may cause **z-index or depth-order artifacts**.
  This happens because the occlusion mesh uses transparency in the WebGL layer while the DOM element uses CSS stacking order.

- 🔵 To avoid thin border artifacts when using `occlude="blending"`, make sure your `<TresCanvas>` is fully transparent:
  ```vue
  <TresCanvas :alpha="true" :clearAlpha="0" />
  ```

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
