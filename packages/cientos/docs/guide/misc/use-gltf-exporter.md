# useGLTFExporter

[GLTFExporter](https://threejs.org/docs/index.html?q=expo#examples/en/exporters/GLTFExporter) is an addon in threeJs that allows you to download any object3D in a [GLTF](https://www.khronos.org/gltf) format. **TresJS** provides a composable that simplifies this process with just a few lines of code.

## Basic usage

```vue{3,6,10,20}
<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { useGLTFExporter } from '@tresjs/cientos'
import { shallowRef } from 'vue'

const boxRef = shallowRef()

// the second argument – options – is not required
const downloadBox = () => {
  useGLTFExporter(boxRef.value, { fileName: 'cube', binary: true })
}
</script>
<template>
  <TresCanvas clear-color="#82DBC5" window-size >
    <TresPerspectiveCamera :position="[0, 2, 5]" />
    <TresMesh
      ref="boxRef"
      :position-z="30"
      :scale="10"
      @click="downloadBox"
    >
      <TresBoxGeometry :args="[1, 1, 1]" />
      <TresMeshStandardMaterial :color="0x00ff00" />
    </TresMesh>
    <TresDirectionalLight :position="[0, 10, 10]" />
  </TresCanvas>
</template>

```

### Download the scene: a quick tip

In the previous example, if we want to download the whole scene, we can easily do it by just accessing the `parent` property.
```ts{3}
...
const downloadBox = () => {
  useGLTFExporter(boxRef.value.parent) // As the parent is the current scene
}
...
```
_This may vary in your scene please first check what is in your `parent` property_

Otherwise, you can access your scene using the [useTresContext](https://docs.tresjs.org/api/composables.html#usetrescontext)

## Arguments

| Name         | Type       | Default     | Description                                          |
| :----------- | ---------- | ----------- | ---------------------------------------------------- |
| **Selector** | `Object3D` | Required    | The object to download. Could be an array of objects |
| **Options**  | `Options`  | `undefined` | Description below                                    |

## Options

| Name                        | Type                   | Default       | Description                                                                 |
| :-------------------------- | ---------------------- | ------------- | --------------------------------------------------------------------------- |
| **trs**                     | `bool`                 | `false`       | Export position, rotation and scale instead of matrix per node              |
| **onlyVisible**             | `bool`                 | `true`        | Export only visible objects                                                 |
| **binary**                  | `bool`                 | `false`       | Export in binary (.glb) format, returning an ArrayBuffer                    |
| **maxTextureSize**          | `number`               | `Infinity`    | Restricts the image maximum size (both width and height) to the given value |
| **animations**              | `Array<AnimationClip>` | `undefined`   | List of animations to be included in the export                             |
| **includeCustomExtensions** | `bool`                 | `Infinity`    | Export custom glTF extensions defined on an object's                        |
| **fileName**                | `string`               | `Object name` | name of the generated fil                                                   |
