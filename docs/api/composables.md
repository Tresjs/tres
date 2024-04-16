# Composables

Vue 3 [Composition API](https://vuejs.org/guide/extras/composition-api-faq.html#what-is-composition-api) allows you to create reusable logic that can be shared across components. It also allows you to create custom hooks that can be used in your components.

**TresJS** takes huge advantage of this API to create a set of composable functions that can be used to create animations, interact with the scene and more. It also allows you to create more complex scenes that might not be possible using just the Vue Components (Textures, Loaders, etc.).

The core of **TresJS** uses these composables internally, so you would be using the same API that the core uses. For instance, components that need to updated on the internal render loop use the `useRenderLoop` composable to register a callback that will be called every time the renderer updates the scene.

## useRenderLoop

The `useRenderLoop` composable is the core of **TresJS** animations. It allows you to register a callback that will be called on native refresh rate. This is the most important composable in **TresJS**.

```ts
const { onLoop, resume } = useRenderLoop()

onLoop(({ delta, elapsed, clock }) => {
  // I will run at every frame ~60FPS (depending of your monitor)
})
```

::: warning
Be mindful of the performance implications of using this composable. It will run at every frame, so if you have a lot of logic in your callback, it might impact the performance of your app. Specially if you are updating reactive states or references.
:::

The `onLoop` callback receives an object with the following properties based on the [THREE clock](https://threejs.org/docs/?q=clock#api/en/core/Clock):

- `delta`: The delta time between the current and the last frame. This is the time in seconds since the last frame.
- `elapsed`: The elapsed time since the start of the render loop.

This composable is based on `useRafFn` from [vueuse](https://vueuse.org/core/useRafFn/). Thanks to [@wheatjs](https://github.com/wheatjs) for the amazing contribution.

### Before and after render

You can also register a callback that will be called before and after the renderer updates the scene. This is useful if you add a profiler to measure the FPS for example.

```ts
const { onBeforeLoop, onAfterLoop } = useRenderLoop()

onBeforeLoop(({ delta, elapsed }) => {
  // I will run before the renderer updates the scene
  fps.begin()
})

onAfterLoop(({ delta, elapsed }) => {
  // I will run after the renderer updates the scene
  fps.end()
})
```

### Pause and resume

You can pause and resume the render loop using the exposed `pause` and `resume` methods.

```ts
const { pause, resume } = useRenderLoop()

// Pause the render loop
pause()

// Resume the render loop
resume()
```

Also you can get the active state of the render loop using the `isActive` property.

```ts
const { resume, isActive } = useRenderLoop()

console.log(isActive) // false

resume()

console.log(isActive) // true
```

## useLoader

The `useLoader` composable allows you to load assets using the [THREE.js loaders](https://threejs.org/docs/#manual/en/introduction/Loading-3D-models). It returns a promise with loaded asset.

```ts
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader'

const { scene } = await useLoader(THREE.GLTFLoader, 'path/to/asset.gltf')
```

Since the `useLoader` composable returns a promise, you can use it with `async/await` or `then/catch`. If you are using it on a component make sure you wrap it with a `Suspense` component. See [Suspense](https://vuejs.org/guide/built-ins/suspense.html#suspense) for more information.

```vue
<template>
  <Suspense>
    <TheComponentUsingLoader />
  </Suspense>
</template>
```

## useTexture

The `useTexture` composable allows you to load textures using the [THREE.js texture loader](https://threejs.org/docs/#api/en/loaders/TextureLoader). It returns a promise with the loaded texture(s).

```ts
const texture = await useTexture(['path/to/texture.png'])
```

**useTexture** also accepts an object with the following properties:

- `map`: a basic texture that is applied to the surface of an object
- `displacementMap`: a texture that is used to add bumps or indentations to the object's surface
- `normalMap`: a texture that is used to add surface detail to and variations in shading to the object
- `roughnessMap`: a texture that is used to add roughness or a matte finish to the object's surface
- `metalnessMap`: a texture that is used to add a metallic effect to the object's surface
- `aoMap`: a texture that is used to add ambient occlusion (shading in areas where light is blocked by other objects) to the object.
- `alphaMap`: a texture that is used to add alpha (the black part render as transparent) to the object. It's necessary to set :trasparent="true" on the material to use this map
- `matcap`: this textures encodes the material color and shading.

In that case it will return an object with the loaded textures.

```ts
const { map, displacementMap, normalMap, roughnessMap, metalnessMap, aoMap, alphaMap, matcap } = await useTexture({
  map: 'path/to/albedo.png',
  displacementMap: 'path/to/height.png',
  normalMap: 'path/to/normal.png',
  roughnessMap: 'path/to/roughness.png',
  metalnessMap: 'path/to/metalness.png',
  aoMap: 'path/to/ambien-occlusion.png',
  alphaMap: 'path/to/alpha.png',
  matcap: 'path/to/matcap.png',
})
```

Then you can bind the textures to the material.

```vue
<template>
  <TresCanvas>
    <TresMesh>
      <TresSphereGeometry />
      <TresMeshStandardMaterial
        :map="map"
        :displacement-map="displacementMap"
        :normal-map="normalMap"
        :roughness-map="roughnessMap"
        :metalness-map="metalnessMap"
        :ao-map="aoMap"
        :alpha-map="alphaMap"
      />
    </TresMesh>
  </TresCanvas>
</template>
```

Similar to above composable, the `useTexture` composable returns a promise, you can use it with `async/await` or `then/catch`. If you are using it on a component make sure you wrap it with a `Suspense` component.

## useSeek

The `useSeek` composable provides utilities to easily traverse and navigate through complex ThreeJS scenes and object children graphs. It exports 4 functions which allow you to find child objects based on specific properties.

```ts
const { seek, seekByName, seekAll, seekAllByName } = useSeek()
```

The seek function accepts three parameters:

- `parent`: A ThreeJS scene or Object3D.
- `property`: The property to be used in the search condition.
- `value`: The value of the property to match.

The `seek` and `seekByName` function traverses the object and returns the child object with the specified property and value. If no child with the given property and value is found, it returns null and logs a warning.

```ts
const carRef = ref(null)

watch(carRef, ({ model }) => {
  if (model) {
    const car = model.children[0]

    const body = seek(car, 'name', 'Octane_Octane_Body_0')
    body.color.set(new Color('blue'))
  }
})
```

Similarly, the `seekAll` and `seekAllByName` functions return an array of child objects whose property includes the given value. If no matches are found, then they return an empty array and a warning is logged.

```ts
const character = ref(null)

watch(character, ({ model }) => {
  if (model) {
    const bones = seekAll(character, type, 'Bone')
  }
})
```

## useTresContext
This composable aims to provide access to the state model which contains multiple useful properties.

```ts
const { camera, renderer, camera, cameras } = useTresContext()

```

::: warning
`useTresContext` can be only be used inside of a `TresCanvas` since `TresCanvas` acts as the provider for the context data. Use [the context exposed by TresCanvas](tres-canvas#exposed-public-properties) if you find yourself needing it in parent components of TresCanvas.
:::

```vue
<TresCanvas>
  <MyModel />
</TresCanvas>
```

```vue
// MyModel.vue

<script lang="ts" setup>
import { useTresContext } from '@tresjs/core'

const context = useTresContext()
</script>
```

### Properties of context
| Property | Description |
| --- | --- |
| **camera** | The currently active camera |
| **cameras** | The cameras that exist in the scene |
| **controls** | The controls of your scene |
| **deregisterCamera** | A method to deregister a camera. This is only required if you manually create a camera. Cameras in the template are deregistered automatically. |
| **extend** | Extends the component catalogue. See [extending](/advanced/extending) |
| **raycaster** | the global raycaster used for pointer events |
| **registerCamera** | a method to register a camera. This is only required if you manually create a camera. Cameras in the template are registered automatically. |
| **renderer** | the [WebGLRenderer](https://threejs.org/docs/#api/en/renderers/WebGLRenderer) of your scene |
| **scene** | the [scene](https://threejs.org/docs/?q=sce#api/en/scenes/Scene). |
| **setCameraActive** | a method to set a camera active |
| **sizes** | contains width, height and aspect ratio of your canvas |
| **invalidate** | a method to invalidate the render loop. This is only required if you set the `render-mode` prop to `on-demand`. |
| **advance** | a method to advance the render loop. This is only required if you set the `render-mode` prop to `manual`. |


