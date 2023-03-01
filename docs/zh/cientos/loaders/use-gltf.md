# useGLTF

一个组合式函数，让您可以轻松地将 glTF 模型加载到 **TresJS** 场景中。

## 用法

```ts
import { useGLTF } from "@tresjs/cientos";

const { scene } = await useGLTF("/models/AkuAku.gltf");
```

将数据直接添加到场景中:

```html{4}
<Suspense>
  <TresCanvas shadows alpha>
    <TresScene>
      <TresMesh v-bind="scene" />
    </TresScene>
  </TresCanvas>
</Suspense>
```

使用 `useGLTF` 的好处是你可以传递 `draco` 属性以启用对模型的 [Draco 压缩](https://threejs.org/docs/index.html?q=drac#examples/en/loaders/DRACOLoader)。这将减小模型的大小并提高性能。

```ts
import { useGLTF } from "@tresjs/cientos";

const { scene } = await useGLTF("/models/AkuAku.gltf", { draco: true });
```

## Options

| Name            | Type      | Default     | Description                          |
| :-------------- | --------- | ----------- | ------------------------------------ |
| **draco**       | `boolean` | `false`     | Whether to enable Draco compression. |
| **decoderPath** | `string`  | `undefined` | Local path to the Draco decoder.     |
