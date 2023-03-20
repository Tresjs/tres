# Load Textures

> All textures used in this example are from [ambientcg](https://ambientcg.com/).

Three-dimensional (3D) textures are images that contain multiple layers of data, allowing them to represent volume or simulate three-dimensional structures. These textures are commonly used in 3D graphics and visual effects to enhance the realism and complexity of scenes and objects.

<StackBlitzEmbed projectId="tresjs-load-textures" />

There are two ways of loading 3D textures in TresJS:

## Using `useLoader`

The `useLoader` composable allows you to pass any type of Three.js loader and a URL to load the resource from. It returns a `Promise` with the loaded resource.

For a detailed explanation of how to use `useLoader`, check out the [useLoader](/api/composables#use-loader) documentation.

```ts
import { useLoader } from '@tresjs/core'
import { TextureLoader } from 'three/examples/jsm/loaders/TextureLoader'

const texture = useLoader(TextureLoader, '/Rock035_2K_Color.jpg')
```

Then you can pass the texture to a material:

```html
<Suspense>
  <TresCanvas>
    <TresMesh>
      <TresSphereGeometry :args="[1,32,32]" />
      <TresMeshStandardMaterial :map="texture" />
    </TresMesh>
  </TresCanvas>
</Suspense>
```

Notice in the example above that we are using the `Suspense` component to wrap the `TresCanvas` component. This is because `useLoader` returns a `Promise` and we need to wait for it to resolve before rendering the scene.

## Using `useTexture`

A more convenient way of loading textures is using the `useTexture` composable. It accepts both an array of URLs or a single object with the texture paths mapped.

To learn more about `useTexture`, check out the [useTexture](/api/composables#use-texture) documentation.

```ts
import { useTexture } from '@tresjs/core'

const pbrTexture = await useTexture({
  map: '/textures/black-rock/Rock035_2K_Displacement.jpg',
  displacementMap: '/textures/black-rock/Rock035_2K_Displacement.jpg',
  roughnessMap: '/textures/black-rock/Rock035_2K_Roughness.jpg',
  normalMap: '/textures/black-rock/Rock035_2K_NormalDX.jpg',
  ambientOcclusion: '/textures/black-rock/Rock035_2K_AmbientOcclusion.jpg',
})
```

Similar to the previous example, we can pass all the textures to a material via props:

```html
<Suspense>
  <TresCanvas>
    <TresMesh>
      <TresSphereGeometry :args="[1,32,32]" />
      <TresMeshStandardMaterial
        :map="pbrTexture.map"
        :displacementMap="pbrTexture.displacementMap"
        :roughnessMap="pbrTexture.roughnessMap"
        :normalMap="pbrTexture.normalMap"
        :ambientOcclusionMap="pbrTexture.ambientOcclusionMap"
      />
    </TresMesh>
  </TresCanvas>
</Suspense>
```
