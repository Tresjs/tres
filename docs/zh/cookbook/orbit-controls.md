---
title: OrbitControls 轨道控制器
description: 如何使用 OrbitControls 轨道控制器与场景进行交互。
author: alvarosabu
thumbnail: /recipes/orbit-controls.png
difficulty: 1
---

# OrbitControls 轨道控制器

<SandboxDemo url="https://play.tresjs.org/#eNqVVU1z2zYQ/Ss78nR0KEVSlp1JWaejWk7TdmInY+kW5gCRMAkbBDAAKFnj0X/PAhAlyvlydBJ23z7svl0snwYLTc3fSsWrlg6ywYUpNFMWDLWtAk5E9SYfWJMP/soFa5TUFp7gkhhWzGtSyvU1URHMb99dziSXeq5IQSO4kQspKLoUExVs4U7LBoa21pQO/+zxuKtnRKyI2YOmFm33JimkPsZ+0EtmZ1JYLbmJYEEf7eTq6zBGhZXGRSZJiIFiFwTLDWAUFSVmlYtcoMNYqDi8gadcABScEu3ryGB48vr06nJ2Poycx/haTQZWt9RbCFc1yeCOcBMMAYI1LzaKZs8lcgjZWtViCZ1O2XPdHMgehMuOdUT3Fsu6SEKHsB94sLRRnFiKJ4CLnp6r0ZKJEntXcd87wJ/3f6TaKFpYtqIz0lBNIFPSMMukQPSnswgmEfzxOR9A0oUdSX8wz1skEibcHfh9U7ojHDOnEYwjSJH5ALAYgL4ZZ8UD3AzhSpOq77/DS9FfW6tMliSarOOK2bpdtoZq11fsdlzIJnGVYfuJwbk1SUOYSFysSf5hmsxkSW9p1XKi43sjBdbWXbHPfafONTX1jdQN4deoqmaE7+tFRBIK7ARIningGa6YdupKQfh7VtX2KxFOIzhz8mbMpY+uDTrG8SmaCmLsKAzSQWZH+k6z8l/KFdU7O6ay7zUaLpLeIODR2A13f2vbcJybpSw3YcQboismMkhxkgAUKd1b6I41dQlnME7T37xhzUpb78/bXJzgKAain2ABlqR4qLRsRTkqwpM6SVN3D9LgDPsEB9EgvO9RQ5RvDW4gT5/vHLh4snChs/WXg3McJqMoBcaXlLOVjgW1iVBN0odPJ/F5nCYlMzZxZkTnA//ijojD+vgV7hCB9K/69Dvz8S12TcmDIuIlue+x07M4jcc75s4YN8zF9Lndcn0Jr8NNkfH8Neb7OzVNXwb8BuDLerG+Pfh0nHqBcenQx7g5VneHw8nWtPwF4hDwI2oEjkrasBeQdlBX/Fn8KuFs2ad0jDiaW5xJa3C13LHq2UTinlGMU/1Budd8PJmEc7n+39v2nwgfU9Pi4Rv2e/MYUv6Iw0L1CuU+tBLfKLXB/XZ+gyun52xk2fJdc77jvKVG8tblGGCX+AYx7R7OZ/uff2D4/Bfmrfsqmq6oo0Qtfs289VO3BfezFgyfvXAe79sx+4FKh8om8WQv+PYLbBTQQA==" />


[轨道控制器（OrbitControls）](https://threejs.org/docs/index.html#examples/zh/controls/OrbitControls)是一种摄像机控制器，可让您围绕目标运行。这是探索场景的绝佳方式。

然而，它并不是 ThreeJS 的核心部分。因此，要使用它，您需要从 `three/addons/controls/OrbitControls` 模块导入它。

这会产生一个问题，因为 **TresJS** 仅会为 ThreeJS 核心对象自动创建组件目录，以便您可以将它们作为组件使用。

幸运的是，**TresJS** 提供了一种扩展组件目录的方法。您可以使用核心库中的 `extend` 方法来实现。

有关扩展您的 TresJS 目录的更多信息，请参考 [扩展](/zh/advanced/extending.md) 部分。

## 使用轨道控制器

要使用 `OrbitControls` 你需要从 `three/addons/controls/OrbitControls` 模块导入它。

```js
import { OrbitControls } from 'three/addons/controls/OrbitControls'
```

接下来，你需要使用 `extend` 方法扩展组件目录。

```js
import { extend } from '@tresjs/core'
import { OrbitControls } from 'three/addons/controls/OrbitControls'

extend({ OrbitControls })
```

现在，你可以在你的场景中使用 `TresOrbitControls` 组件了。

```vue
<template>
  <TresCanvas
    shadows
    alpha
  >
    <TresPerspectiveCamera :args="[45, 1, 0.1, 1000]" />
    <TresOrbitControls
      v-if="state.renderer"
      :args="[state.camera, state.renderer?.domElement]"
    />
  </TresCanvas>
</template>
```

由于 [轨道控制器（OrbitControls）](https://threejs.org/docs/index.html#examples/zh/controls/OrbitControls) 需要相机和渲染器的引用，因此你需要将它们作为参数传递。

你可以使用 [useTres](/zh/composables#usetres) 组合式函数获取相机和渲染器。

```ts
import { useTres } from '@tresjs/core'

const { state } = useTres()
```

因此，最终代码如下所示：

```vue
<script setup lang="ts">
import { extend, useTres } from '@tresjs/core'
import { OrbitControls } from 'three/addons/controls/OrbitControls'

extend({ OrbitControls })

const { state } = useTres()
</script>

<template>
  <TresCanvas
    shadows
    alpha
  >
    <TresPerspectiveCamera :args="[45, 1, 0.1, 1000]" />
    <TresOrbitControls
      v-if="state.renderer"
      :args="[state.camera, state.renderer?.domElement]"
    />
  </TresCanvas>
</template>
```

## 使用 `cientos` 的 OrbitControls

现在进入精彩的部分了！ ✨

`cientos` 包提供了一个名为 `<OrbitControls />` 的组件，它是 [`three-stdlib`](https://github.com/pmndrs/three-stdlib) 模块中 `OrbitControls` 的封装。

最棒的是？ 您不需要扩展目录或传递任何参数。

它直接可用！💯


```vue
<template>
  <TresCanvas
    shadows
    alpha
  >
    <TresPerspectiveCamera :args="[45, 1, 0.1, 1000]" />
    <OrbitControls />
  </TresCanvas>
</template>
```
