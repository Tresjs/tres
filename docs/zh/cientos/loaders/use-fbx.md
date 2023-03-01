# useFBX

一个组合式函数，让您可以轻松地将 glTF 模型加载到 **TresJS** 场景中。

## 用法

```ts
import { useFBX } from "@tresjs/cientos";

const model = await useFBX("/models/AkuAku.fbx");
```

Then is as straightforward as adding the scene to your scene:

```html{4}
<Suspense>
  <TresCanvas shadows alpha>
    <TresScene>
      <TresMesh v-bind="scene" />
    </TresScene>
  </TresCanvas>
</Suspense>
```
