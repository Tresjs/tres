# Text3D

[TextGeometry](https://threejs.org/docs/index.html?q=text#examples/en/geometries/TextGeometry) is one of the ways we can add 3D text in our scene.

<StackBlitzEmbed projectId="tresjs-text3d-cientos" />

However, it is not part of the core of ThreeJS. So to use it you would need to import it from the `three/examples/jsm/controls/TextGeometry` module.

This creates a problem because **TresJS** automatically creates a catalog of the core of Three so you can use them as components.

Fortunately, **TresJS** provides a way to extend the catalog of components. You can do it by using the `extend` method using the [useCatalogue](/api/composables#usecatalog) composable.

For more information about extending your TresJS catalog, refer to the [extending](/advanced/extending.md) section.

## Using TextGeometry

To use `TextGeometry` you need to import it from the `three/examples/jsm/geometries/TextGeometry` module.

```js
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
```

Then you need to extend the catalogue of components using the `extend` method of the [useCatalogue](/api/composables#usecatalog) composable.

```js
import { useCatalogue } from '@tresjs/core'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'

const { extend } = useCatalogue()

extend({ TextGeometry: TextGeometry })
```

[TextGeometry](https://threejs.org/docs/index.html?q=text#examples/en/geometries/TextGeometry) needs a only one required argument the font, you can see an example below.

```js
const fontPath = 'https://raw.githubusercontent.com/Tresjs/assets/main/fonts/FiraCodeRegular.json'

const loader = new FontLoader()

const font = await new Promise((resolve, reject) => {
  try {
    loader.load(fontPath, font => {
      resolve(font)
    })
  } catch (error) {
    reject(console.error('cientos', error))
  }
})
```

Now you can use the `TresTextGeometry` component inside a TresMesh in your scene

```vue
<template>
  <TresCanvas shadows alpha>
    <TresScene>
      <TresMesh>
        <TresTextGeometry :args="['TresJS', { font, ...fontOptions }]" center />
      </TresMesh>
    </TresScene>
  </TresCanvas>
</template>
```

then as in the example you can pass an object with the desired configurations.

```ts
const fontOptions = {
  size: 0.5,
  height: 0.2,
  curveSegments: 5,
  bevelEnabled: true,
  bevelThickness: 0.05,
  bevelSize: 0.02,
  bevelOffset: 0,
  bevelSegments: 4,
}
```

We can also pass a matcapTexture to add final details, using the TresMeshNormalMaterial inside the TresMesh

```ts
const matcapTexture = await useTexture(['https://raw.githubusercontent.com/Tresjs/assets/main/textures/matcaps/7.png'])

  <TresMesh>
    <TresTextGeometry :args="['TresJS', { font, ...fontOptions }]" center />
    <TresMeshNormalMaterial :matcap="matcapTexture" />
  </TresMesh>
```

So the final code would be something like this:

```vue
<script setup lang="ts">
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { useCatalogue, useTexture } from '/@/core'
const { extend } = useCatalogue()

extend({ TextGeometry: TextGeometry })

const fontPath = 'https://raw.githubusercontent.com/Tresjs/assets/main/fonts/FiraCodeRegular.json'

const fontOptions = {
  size: 0.5,
  height: 0.2,
  curveSegments: 5,
  bevelEnabled: true,
  bevelThickness: 0.05,
  bevelSize: 0.02,
  bevelOffset: 0,
  bevelSegments: 4,
}

const loader = new FontLoader()

const font = await new Promise((resolve, reject) => {
  try {
    loader.load(fontPath, font => {
      resolve(font)
    })
  } catch (error) {
    reject(console.error('cientos', error))
  }
})

const matcapTexture = await useTexture(['https://raw.githubusercontent.com/Tresjs/assets/main/textures/matcaps/7.png'])
</script>
<template>
  <TresMesh>
    <TresTextGeometry :args="['TresJS', { font, ...fontOptions }]" center />
    <TresMeshNormalMaterial :matcap="matcapTexture" />
  </TresMesh>
</template>
```

I know seems like a lot of work, but good news there is a much more simple way

## TextGeometry from `cientos`

The `cientos` package provides a component called `<Text3D />` that is a wrapper of the `TextGeometry` from the [`three-stdlib`](https://github.com/pmndrs/three-stdlib) module.

The nicest part? You don't need to extend the catalog and just pass the font argument.
It just works. 💯 (if not text is provided, the text will be TresJS)

```vue
<template>
  <TresCanvas shadows alpha>
    <TresScene>
      <Text3D :font="fontPath" />
    </TresScene>
  </TresCanvas>
</template>
```

We can pass the options as props

```html
<Text3D :font="fontPath" :text="my 3d text" :size="0.8" />
```

in case the options are not provided the default values are:

```js
size: 0.5,
height: 0.2,
curveSegments: 5,
bevelEnabled: true,
bevelThickness: 0.05,
bevelSize: 0.02,
bevelOffset: 0,
bevelSegments: 4,
```

By default text in ThreeJS starts at the mesh initial position, so it's [0,0,0] the text will start there but we can center it by just passing the flag "center"

```js
<Text3D :font="fontPath" :text="my 3d text" center  />
```
