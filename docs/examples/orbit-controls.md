# OrbitControls

<SandboxDemo url="https://play.tresjs.org/#eNqVVU1z2zYQ/Ss78nR0KEVSlp1JWaejWk7TdmInY+kW5gCRMAkbBDAAKFnj0X/PAhAlyvlydBJ23z7svl0snwYLTc3fSsWrlg6ywYUpNFMWDLWtAk5E9SYfWJMP/soFa5TUFp7gkhhWzGtSyvU1URHMb99dziSXeq5IQSO4kQspKLoUExVs4U7LBoa21pQO/+zxuKtnRKyI2YOmFm33JimkPsZ+0EtmZ1JYLbmJYEEf7eTq6zBGhZXGRSZJiIFiFwTLDWAUFSVmlYtcoMNYqDi8gadcABScEu3ryGB48vr06nJ2Poycx/haTQZWt9RbCFc1yeCOcBMMAYI1LzaKZs8lcgjZWtViCZ1O2XPdHMgehMuOdUT3Fsu6SEKHsB94sLRRnFiKJ4CLnp6r0ZKJEntXcd87wJ/3f6TaKFpYtqIz0lBNIFPSMMukQPSnswgmEfzxOR9A0oUdSX8wz1skEibcHfh9U7ojHDOnEYwjSJH5ALAYgL4ZZ8UD3AzhSpOq77/DS9FfW6tMliSarOOK2bpdtoZq11fsdlzIJnGVYfuJwbk1SUOYSFysSf5hmsxkSW9p1XKi43sjBdbWXbHPfafONTX1jdQN4deoqmaE7+tFRBIK7ARIningGa6YdupKQfh7VtX2KxFOIzhz8mbMpY+uDTrG8SmaCmLsKAzSQWZH+k6z8l/KFdU7O6ay7zUaLpLeIODR2A13f2vbcJybpSw3YcQboismMkhxkgAUKd1b6I41dQlnME7T37xhzUpb78/bXJzgKAain2ABlqR4qLRsRTkqwpM6SVN3D9LgDPsEB9EgvO9RQ5RvDW4gT5/vHLh4snChs/WXg3McJqMoBcaXlLOVjgW1iVBN0odPJ/F5nCYlMzZxZkTnA//ijojD+vgV7hCB9K/69Dvz8S12TcmDIuIlue+x07M4jcc75s4YN8zF9Lndcn0Jr8NNkfH8Neb7OzVNXwb8BuDLerG+Pfh0nHqBcenQx7g5VneHw8nWtPwF4hDwI2oEjkrasBeQdlBX/Fn8KuFs2ad0jDiaW5xJa3C13LHq2UTinlGMU/1Budd8PJmEc7n+39v2nwgfU9Pi4Rv2e/MYUv6Iw0L1CuU+tBLfKLXB/XZ+gyun52xk2fJdc77jvKVG8tblGGCX+AYx7R7OZ/uff2D4/Bfmrfsqmq6oo0Qtfs289VO3BfezFgyfvXAe79sx+4FKh8om8WQv+PYLbBTQQA==" />

[OrbitControls](https://threejs.org/docs/index.html?q=orbit#examples/en/controls/OrbitControls) is a camera controller that allows you to orbit around a target. It's a great way to explore your scene.

However, it is not part of the core of ThreeJS. So to use it you would need to import it from the `three/addons/controls/OrbitControls` module.

This creates a problem because **TresJS** automatically creates a catalog of the core of Three so you can use them as components.

Fortunately, **TresJS** provides a way to extend the catalog of components. You can do it by using the `extend` method from the core library.

For more information about extending your TresJS catalog, refer to the [extending](/advanced/extending.md) section.

## Using OrbitControls

To use `OrbitControls` you need to import it from the `three/addons/controls/OrbitControls` module.

```js
import { OrbitControls } from 'three/addons/controls/OrbitControls'
```

Then you need to extend the catalogue of components using the `extend` method.

```js
import { extend } from '@tresjs/core'
import { OrbitControls } from 'three/addons/controls/OrbitControls'

extend({ OrbitControls })
```

Now you can use the `TresOrbitControls` component in your scene.

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

Since [OrbitControls](https://threejs.org/docs/index.html?q=orbit#examples/en/controls/OrbitControls) needs a reference to the camera and the renderer, you need to pass them as arguments.

You can use the [useTres](/api/composables#usetres) composable to get the camera and the renderer.

```ts
import { useTres } from '@tresjs/core'

const { state } = useTres()
```

So the final code would be something like this:

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

## OrbitControls from `cientos`

Here is where the fancy part begins. ✨  
The `cientos` package provides a component called `<OrbitControls />` that is a wrapper of the `OrbitControls` from the [`three-stdlib`](https://github.com/pmndrs/three-stdlib) module.

The nicest part? You don't need to extend the catalog or pass any arguments.  
It just works. 💯

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
