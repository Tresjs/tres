# useGLTF

<DocsDemo>
  <UseGLTFDemo />
</DocsDemo>

A composable that allows you to easily load glTF models into your **TresJS** scene.

## Usage

<<< @/.vitepress/theme/components/UseGLTFDemo.vue{3,7,14-16}

An advantage of using `useGLTF`is that you can pass a `draco` prop to enable [Draco compression](https://threejs.org/docs/index.html?q=drac#examples/en/loaders/DRACOLoader) for the model. This will reduce the size of the model and improve performance.

```ts
import { useGLTF } from '@tresjs/cientos'

const { scene } = await useGLTF('/models/AkuAku.gltf', { draco: true })
```

## Options

| Name            | Type      | Default     | Description                          |
| :-------------- | --------- | ----------- | ------------------------------------ |
| **draco**       | `boolean` | `false`     | Whether to enable Draco compression. |
| **decoderPath** | `string`  | `undefined` | Local path to the Draco decoder.     |
