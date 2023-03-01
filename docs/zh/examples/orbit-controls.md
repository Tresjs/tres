# OrbitControls {#OrbitControls}

<StackBlitzEmbed projectId="tresjs-orbit-controls" />

[OrbitControls](https://threejs.org/docs/index.html?q=orbit#examples/en/controls/OrbitControls) 是一个相机控制器，它允许您围绕一个目标旋转。这是探索场景的好方法。

然而，它不在 ThreeJS 的核心包中。需要从 `three/examples/jsm/controls/OrbitControls` 导入。

由于 **TresJS** 只会自动将 Three 核心包中的内容自动注册为 Vue 组件供您使用，因此，上面的对象就会带来使用上的问题。

幸运的是，**TresJS** 提供了一种扩展组件的方法。您可以使用 [useCatalogue](/api/composables#usecatalog) 暴露出来的 `extend` 方法来扩展。

## 使用 OrbitControls {#Using OrbitControls}

首先从 `three/examples/jsm/controls/OrbitControls` 导入这个模块。

```js
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
```

接着使用 [useCatalogue](/api/composables#usecatalog) 暴露出来的 `extend` 方法扩展并注册组件。

```js
import { useCatalogue } from "@tresjs/core";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const { extend } = useCatalogue();

extend({ OrbitControls });
```

最后在场景中使用 `TresOrbitControls` 组件。

```vue
<template>
  <TresCanvas shadows alpha>
    <TresScene>
      <TresOrbitControls
        v-if="state.renderer"
        :args="[state.camera, state.renderer?.domElement]"
      />
    </TresScene>
  </TresCanvas>
</template>
```

[OrbitControls](https://threejs.org/docs/index.html?q=orbit#examples/en/controls/OrbitControls) 创建时需要参入相应的相机和渲染器，您可以将它们作为参数传入。

使用 [useThree](/api/composables#usethree) 组合式函数获取相机和渲染器。

```ts
import { useThree } from "@tresjs/core";

const { state } = useTres();
```

完整的代码:

```vue
<script setup lang="ts">
import { useCatalogue } from "@tresjs/core";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const { extend } = useCatalogue();
extend({ OrbitControls });

const { state } = useThree();
</script>
<template>
  <TresCanvas shadows alpha>
    <TresScene>
      <TresOrbitControls
        v-if="state.renderer"
        :args="[state.camera, state.renderer?.domElement]"
      />
      ...
    </TresScene>
  </TresCanvas>
</template>
```

## `cientos` 中的 OrbitControls

这是奇妙之旅的起点。✨

`cientos` 包提供了一个名为 `<OrbitControls />` 的组件，它包装了 [`three-stdlib`](https://github.com/pmndrs/three-stdlib) 模块中的 `OrbitControls`。

你不需要自己去扩展组件或者传入任何参数。挺酷的吧？💯

```vue
<template>
  <TresCanvas shadows alpha>
    <OrbitControls />
    <TresScene> ... </TresScene>
  </TresCanvas>
</template>
```
