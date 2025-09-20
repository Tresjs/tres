# useSVG

<DocsDemo>
  <SVGDemo />
</DocsDemo>

Load and display SVG elements in your **TresJS** scene. This guide covers both the `useSVG` composable for advanced use cases and the `SVG` component for simple declarative rendering.

## useSVG Composable

The `useSVG` composable provides direct access to processed SVG layers, giving you full control over the resulting geometries and materials.

### Usage

::: code-group
```vue{2,6} [TheModel.vue]
<script setup lang="ts">
import { useSVG } from '@tresjs/cientos'

const svgPath = './logo.svg'
const { state, layers, isLoading, dispose } = useSVG(svgPath, {
  skipFills: false,
  fillMaterial: { transparent: true, opacity: 0.8 }
})
</script>

<template>
  <TresGroup v-if="!isLoading">
    <TresMesh
      v-for="(layer, index) in layers"
      :key="`layer-${index}`"
      :geometry="layer.geometry"
      :render-order="index"
    >
      <TresMeshBasicMaterial v-bind="layer.material" />
    </TresMesh>
  </TresGroup>
</template>
```
```vue [app.vue]
<script setup lang="ts">
import { OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import TheModel from './TheModel.vue'
</script>

<template>
  <TresCanvas clear-color="#333">
    <TresPerspectiveCamera :position="[0, 2, 10]" />
    <OrbitControls />
    <TheModel />
    <TresAmbientLight />
    <TresDirectionalLight />
  </TresCanvas>
</template>
```

:::

The `useSVG` composable provides direct access to processed SVG layers, giving you full control over how they're rendered. This is particularly useful when you need to:

- Manually control layer rendering
- Apply custom animations to individual layers
- Access geometry data programmatically
- Implement complex material logic

### SVG Data Sources

The composable accepts both file paths and inline SVG strings:

```ts
import { useSVG } from '@tresjs/cientos'

// From file
const { layers } = useSVG('/path/to/file.svg')

// Inline SVG string
const svgString = `<svg viewBox="0 0 100 100">
  <circle cx="50" cy="50" r="40" fill="red" />
</svg>`
const { layers } = useSVG(svgString)
```

### Return Values

| Name         | Type          | Description                                    |
| :----------- | ------------- | ---------------------------------------------- |
| **state**    | `SVGResult`   | The loaded SVG state from SVGLoader           |
| **layers**   | `SVGLayer[]`  | Computed array of processed geometries and materials |
| **isLoading**| `boolean`     | Whether the SVG is currently loading          |
| **dispose**  | `() => void`  | Function to dispose of all geometries         |

### Options

| Name              | Type                                      | Default       | Description                          |
| :---------------- | ----------------------------------------- | ------------- | ------------------------------------ |
| **skipStrokes**   | `boolean`                                | `false`       | Whether to skip rendering strokes    |
| **skipFills**     | `boolean`                                | `false`       | Whether to skip rendering fills      |
| **fillMaterial**  | `MeshBasicMaterialParameters`            | `{}`          | Material properties for fill layers |
| **strokeMaterial**| `MeshBasicMaterialParameters`            | `{}`          | Material properties for stroke layers |
| **depth**         | `'renderOrder' \| 'flat' \| 'offsetZ' \| number` | `'renderOrder'` | How layers should be rendered in 3D space |

### Working with Layers

The `layers` computed property returns an array of processed SVG elements, each containing:

```ts
interface SVGLayer {
  geometry: BufferGeometry // Three.js geometry for the layer
  material: MeshBasicMaterialParameters // Material properties
  isStroke: boolean // Whether this layer is a stroke or fill
}
```

#### Accessing Individual Layers

```vue
<script setup lang="ts">
import { useSVG } from '@tresjs/cientos'

const { layers } = useSVG('/complex-icon.svg')

// Apply different materials based on layer type
const getFillColor = (layer: SVGLayer, index: number) => {
  return layer.isStroke ? '#000000' : `hsl(${index * 30}, 70%, 50%)`
}
</script>

<template>
  <TresGroup>
    <TresMesh
      v-for="(layer, index) in layers"
      :key="index"
      :geometry="layer.geometry"
    >
      <TresMeshBasicMaterial
        v-bind="layer.material"
        :color="getFillColor(layer, index)"
      />
    </TresMesh>
  </TresGroup>
</template>
```

#### Custom Animation

```vue
<script setup lang="ts">
import { useSVG } from '@tresjs/cientos'
import { useRenderLoop } from '@tresjs/core'
import { ref } from 'vue'

const { layers } = useSVG('/animated-logo.svg')
const rotation = ref(0)

const { onLoop } = useRenderLoop()
onLoop(({ delta }) => {
  rotation.value += delta
})
</script>

<template>
  <TresGroup>
    <TresMesh
      v-for="(layer, index) in layers"
      :key="index"
      :geometry="layer.geometry"
      :rotation-z="rotation * (index + 1) * 0.1"
    >
      <TresMeshBasicMaterial v-bind="layer.material" />
    </TresMesh>
  </TresGroup>
</template>
```

### Depth Handling

The `depth` option controls how SVG layers are rendered in 3D space. It accepts the following values:

#### `'renderOrder'` (Default)

**Use case: Lone SVGs or applications that don't rely on stacked SVGs**

This is the default `depth` option.

This value sets the materials' `depthWrite` to `false` and increments the [mesh layers' `renderOrder`](https://threejs.org/docs/?q=mesh#api/en/core/Object3D.renderOrder). This makes the SVG layers render dependably regardless of perspective.

**Disadvantage**: Scene objects may render out of order.

SVG layers with higher `renderOrder` will be rendered after (i.e., sometimes "on top of") other objects in the scene graph with a lower `renderOrder`. Depending on their settings, those other objects may render behind the SVG, even if they are closer to the camera.

```ts
const { layers } = useSVG('/icon.svg', { depth: 'renderOrder' })
```

#### `'flat'`

**Use case: simple SVGs**

This option sets the [materials' `depthWrite`](https://threejs.org/docs/?q=mesh#api/en/materials/Material.depthWrite) to `false`.

**Disadvantage**: SVG layers may render out of order.

Overlapping layers in an SVG may be drawn out of order, depending on viewing perspective.

```ts
const { layers } = useSVG('/icon.svg', { depth: 'flat' })
```

#### `'offsetZ'`

**Use case: unscaled SVGs seen from the front**

When this value is passed, the result is a 3D "stack" of mesh layers. A small space is added between each mesh layer in the "stack".

**Disadvantage**: "Bottom" of the "stack" is visible; layers may z-fight.

When seen from behind, the "bottom" of the mesh layer "stack" is visible. The space between the layers may be noticeable depending on viewing perspective and scale. The layers may [z-fight](https://en.wikipedia.org/wiki/Z-fighting), particularly if the SVG is scaled down.

```ts
const { layers } = useSVG('/icon.svg', { depth: 'offsetZ' })
```

#### `number`

**Use case: SVGs seen from the front**

This is the same as `'offsetZ'` but allows you to specify how much space is added between each layer, in order to eliminate [z-fighting](https://en.wikipedia.org/wiki/Z-fighting). For most use cases, this should be a value greater than 0.025 and less than 1.

**Disadvantage**: "Bottom" of the "stack" is visible.

```ts
const { layers } = useSVG('/icon.svg', { depth: 0.1 })
```

### Memory Management

Always dispose of geometries when the component unmounts:

```vue
<script setup lang="ts">
import { useSVG } from '@tresjs/cientos'
import { onUnmounted } from 'vue'

const { dispose } = useSVG('/icon.svg')

onUnmounted(() => {
  dispose()
})
</script>
```

### Advanced Usage

#### Conditional Layer Rendering

```vue
<script setup lang="ts">
import { useSVG } from '@tresjs/cientos'
import { computed } from 'vue'

const showDetails = ref(true)
const { layers } = useSVG('/detailed-icon.svg')

const visibleLayers = computed(() =>
  showDetails.value
    ? layers.value
    : layers.value.filter(layer => !layer.isStroke)
)
</script>

<template>
  <TresGroup>
    <TresMesh
      v-for="(layer, index) in visibleLayers"
      :key="index"
      :geometry="layer.geometry"
    >
      <TresMeshBasicMaterial v-bind="layer.material" />
    </TresMesh>
  </TresGroup>
</template>
```

#### Material Customization per Layer

```vue
<script setup lang="ts">
import { useSVG } from '@tresjs/cientos'

const { layers } = useSVG('/logo.svg', {
  fillMaterial: {
    transparent: true,
    opacity: 0.9
  },
  strokeMaterial: {
    transparent: true,
    opacity: 1.0,
    color: '#000000'
  }
})
</script>

<template>
  <TresGroup>
    <TresMesh
      v-for="(layer, index) in layers"
      :key="index"
      :geometry="layer.geometry"
    >
      <TresMeshBasicMaterial
        v-bind="layer.material"
        :wireframe="layer.isStroke"
      />
    </TresMesh>
  </TresGroup>
</template>
```

## UseSVG Component

For simple, declarative SVG rendering without the need for programmatic control, you can use the `SVG` component:

```vue
<script setup lang="ts">
import { UseSVG } from '@tresjs/cientos'
</script>

<template>
  <TresGroup :scale="0.01" :position="[-2.1, 1, 0]">
    <UseSVG
      src="/path/to/logo.svg"
      :skip-fills="false"
      :fill-material="{ transparent: true, opacity: 0.8 }"
      depth="renderOrder"
    />
  </TresGroup>
</template>
```

### Props

| Prop                | Type                                             | Description                                                        | Default       |
| :------------------ | -------------------------------------------------| :----------------------------------------------------------------- | ------------- |
| **src**             | `string`                                         | Either a path to an SVG *or* an SVG string                         |               |
| **skipStrokes**     | `boolean`                                        | If `true`, the SVG strokes will not be rendered.                   | `false`       |
| **skipFills**       | `boolean`                                        | If `true`, the SVG fills will not be rendered.                     | `false`       |
| **strokeMaterial**  | `MeshBasicMaterialParameters`                    | Props to assign to the stroke materials of the resulting meshes.   | `undefined`   |
| **fillMaterial**    | `MeshBasicMaterialParameters`                    | Props to assign to the fill materials of the resulting meshes.     | `undefined`   |
| **strokeMeshProps** | `TresOptions`                                    | Props to assign to the resulting stroke meshes.                    | `undefined`   |
| **fillMeshProps**   | `TresOptions`                                    | Props to assign to the resulting fill meshes.                      | `undefined`   |
| **depth**           | `'renderOrder' \| 'flat' \| 'offsetZ' \| number` | Specify how SVG layers are to be rendered. ([See "Depth"](#depth-handling)) | `renderOrder` |

## Troubleshooting

::: warning
This is not a general-purpose SVG renderer. Many SVG features are unsupported.
:::

Here are some things to try if you run into problems:

### Error: "XML Parsing Error: unclosed token"

* In the SVG source, convert hex colors to rgb, e.g., convert `#ff0000` to `rgb(255, 0, 0)`.

### Parts of the SVG render in the wrong order or disappear, depending on viewing angle

* In your `useSVG` options, [change the `depth` option](#depth-handling).
* In the SVG source, use `fill="none"` rather than `fill-opacity="0"`.

### Parts of the SVG ["z-fight"](https://en.wikipedia.org/wiki/Z-fighting)

* In your `useSVG` options, [change the `depth` option](#depth-handling).
* Increase the distance between the SVG and other on-screen elements.

### The SVG is not visible

* If importing an SVG, make sure the path is correct – check the console for loading errors.
* Try scaling the SVG down, e.g., wrap it in a `TresGroup` with `:scale="0.01"`.
* Try moving the SVG up (+y), e.g., `:position="[0,2,0]"`.
* Check that `layers.length > 0` before rendering.

### Performance issues with many layers

* Use the `dispose()` function when components unmount to clean up geometries.
* Consider using `skipStrokes` or `skipFills` to reduce the number of rendered layers.
* For complex SVGs with many layers, consider simplifying the SVG source.

## When to Use `useSVG` vs `SVG` Component

**Use `useSVG` when you need:**
- Direct access to individual SVG layers
- Custom rendering logic
- Layer-specific animations
- Programmatic geometry manipulation
- Advanced material customization per layer

**Use the `SVG` component when you need:**
- Simple, declarative SVG rendering
- Quick prototyping
- Standard SVG display without custom logic
- Less code and setup
