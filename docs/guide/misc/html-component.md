# Html <Badge type="warning" text="^3.4.0" />

This component allows you to project HTML content to any object in your scene. TresJS will automatically update the position of the HTML content to match the position of the object in the scene.

<DocsDemo>
  <HtmlDemo />
</DocsDemo>

## Usage

```html
<TresMesh :position="[1, 1, 1]">
  <TresBoxGeometry />
  <TresMeshNormalMaterial />
  <Html
    center
    transform
    :distance-factor="4"
    :position="[0.5, 0, 0.65]"
    :scale="[0.75, 0.75, 0.75]"
  >
    <h1 class="bg-white text-xs p-1 rounded">
      I'm a Box 📦
    </h1>
  </Html>
</TresMesh>
```

## Occlusion

By default, the HTML content will be visible through other objects in the scene. You can use the `occlude` prop to make the HTML content occlude other objects in the scene.

Html can hide behind geometry using the occlude prop.

```
<Html occlude>
```

You can also choose which objects should occlude the HTML content by passing an array of objects refs to the `occlude` prop.

<DocsDemo>
  <HtmlOccludeDemo />
</DocsDemo>

```html
<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { OrbitControls, Html } from '@tresjs/cientos'

const sphereRef = ref(null)
</script>

<template>
  <TresCanvas v-bind="gl">
    <TresMesh :position="[1, 1, 1]">
      <TresBoxGeometry />
      <TresMeshNormalMaterial />
      <Html
        center
        transform
        :occlude="[sphereRef]"
        :distance-factor="4"
      >
        <h1 class="bg-white text-xs p-1 rounded">
          Box
        </h1>
      </Html>
    </TresMesh>
    <TresMesh
      ref="sphereRef"
      :position="[3, 1, 1]"
    >
      <TresSphereGeometry />
      <TresMeshNormalMaterial />
      <Html
        center
        transform
        :distance-factor="4"
      >
        <h1 class="bg-white text-xs p-1 rounded">
          Sphere
        </h1>
      </Html>
    </TresMesh>
  </TresCanvas>
</template>
```

## Using `iframes`

You can achieve pretty cool results with the `Html` component by using iframes. For example, you can use an iframe to display a YouTube video in your scene or a webpage with a 3D model.

<DocsDemo>
  <HtmlLaptopDemo />
</DocsDemo>

```html
<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { BasicShadowMap, SRGBColorSpace, NoToneMapping } from 'three'

import { OrbitControls, Html, useGLTF, Levioso, ContactShadows } from '@tresjs/cientos'

const gl = {
  clearColor: '#241a1a',
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}

const { nodes } 
  = await useGLTF('https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/macbook/model.gltf', 
    { draco: true },
  )
</script>

<template>
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[-5, 4, 3]" />
    <OrbitControls />
    <Levioso>
      <primitive :object="nodes.Macbook">
        <Html
          transform
          wrapper-class="webpage"
          :distance-factor="11"
          :position="[0, 10.5, -13.4]"
          occlude
          :rotation-x="-0.256"
        >
          <iframe
            class="rounded-lg w-[1024px] h-[670px]"
            src="https://tresjs.org"
            frameborder="0"
          />
        </Html>
      </primitive>
    </Levioso>
    <ContactShadows
      :blur="3.5"
      :resolution="512"
      :opacity="1"
    />
    <TresAmbientLight :intensity="1" />
    <TresDirectionalLight
      :intensity="2"
      :position="[2, 3, 0]"
      :cast-shadow="true"
      :shadow-camera-far="50"
      :shadow-camera-left="-10"
      :shadow-camera-right="10"
      :shadow-camera-top="10"
      :shadow-camera-bottom="-10"
    />
  </TresCanvas>
</template>
```

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
| onOcculde           | Called when the occlusion state changes.                                                                                  |

