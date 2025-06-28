# 着色器

本指南将帮助你开始在 TresJS 中使用着色器。

我们将构建一个带有 blob 的简单场景。然后，我们将对 blob 进行动画处理，使其柔和地扭曲。

::: warning
_需要了解着色器工作原理的基本知识_
:::

<SandboxDemo url="https://play.tresjs.org/#eNqVVltv2zYU/iuE91BntSU7cYrBS4q0QTt0WNcgyfZSFxsjH9tMJVIjKdle4P++j9TFVJMU3oMDndvH71x4mIferSbzJs+jsqDetHdmEi1yywzZImcpl8vzWc+aWe/1TIosV9qyB2ZWPE3V+poWbMcWWmXsBaJf/By4ONRLLktuBqwwdE1yTvo3pfI24sLC5d7EidLd0E/6TthLJa1WqXnsLkhaZToRf1JilT5ufe1KE72YyZlMlDSW3aXqzpE9D5j3ZZGmR0BpnAopFkpnBl4PM8lYcSsymgK95GmBjxHbDbz+TZanwhbz0Chp3bDoj6LxgOHPURPwXtM/Bclk+0zA8WjATivv3Z5PSdrS5mbFUThw+nsma4awJMcBDeTQtbTnBZZFqjhydDn5nEuut0Iuq4jyj7JSKjFnGReyf1TVgDn7hGVqTumVMsIKJcHFyx+51WLDfvQu/by2Dtg4GrmyuuBOXLRlL9EAgHfVDmJPGeKwonnk9G2S0eZJzI3DTJT5BnPbxdw+g+kKFKRZCloHWTqxTbKDX1NZpn8F7rlW92gohH1lAsA6BqWGb+HqjV6jqU27F5ovM4x22PBcUyKMg89oLoosr9qI2EPbB4rvAXypUuUwfavQoIGLibZuTE/bjlV8KjYPTMn6toJteH/71Z2pzP3+A0NdLB8wSnluaM52R+z8dX28WLB+ffciP/ctr442yrglLXgaNXcw8t2qrCBQY7tQkNw5BmdxtaiwliBYQk8BAomxs/3uYUlKXA8Tlz722A/j8XjWc0tgrtaG8TRfcbYWEtLQiH+rcAB0N1DcqB3uFWmTuzaXdMkz0pxNm9HHAZ/HuPrV7wsOmi5UCe3k1H1zHwfRUZhK8MI31oT388J4NBpB6pz3kcyKaVrAXNfM+YdHopkTNBLn1XF15E2+Ik2/kMrI6i3O10vj/I8H7MT/HMPmrCbGDx/m17eDTcMdhNhQ9LQ7MwuHrsK5NB2FsfkMU4ybHH0fu1lPtbK8yXIIUqvo6gOLGcgj58cJX+G1eiLfMZz3vyeSdoe95UYkbd7tvEwmk+fYNmI1aFCcxcEU9ga96nUaZjyP7o2SeFv97M9qA8qA56ACnvXCx9AZZr2VtbmZxnEyl4jHJROljiTZWOZZHLpfnESn0SieC2Njp4b3rOcfng5w9Wz+H+wqAvCvQvha3T3Frol/zVH+A/Bb34tJhPGvkRtllAkXE2K7x/wQXOd3AcTTn8D3JZksLAP+P8EaO7i+gfvFGEsSiFgTtImybnVrP2wUjf10OHAV8D1oOA7nlIkDQBtXl/wkehWn4i6EbNYmZtIarPeFWH4zkYnKcpGS/pS769adTP//0q9eZ3VBLb9kRcnXJ/T3ZlNRvsKwkC5R7n0rcSfJVuZ3N7/TBt+tES9skdbNecZ4TUalheNYub0t5By0Az/P9oO/YHgeb827jSXpXtDHRO02J6/93GyDdtYqxRdfOO/v23H5nSrtMzuJTtqC7/4DVvHLxg==" />

## 设置场景（可选）

我们导入所需的所有模块，为了方便，我们可以使用 cientos 中的轨道控件，[点击此处查看方法](/zh/cookbook/orbit-controls)。

现在，我们将相机放在 `[11,11,11]` 位置。

最后，为了帮助我们确定位置，我们添加一个简单的平面，绕 X 轴旋转，单位为 `[10, 10]`。

```vue
<script setup lang="ts">
import { OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
</script>

<template>
  <TresCanvas
    clear-color="#111"
    window-size
  >
    <OrbitControls />
    <TresPerspectiveCamera :position="[11, 11, 11]" />

    <TresMesh :rotation="[-Math.PI / 2, 0, 0]">
      <TresPlaneGeometry :args="[10, 10]" />
      <TresMeshBasicMaterial color="#444" />
    </TresMesh>
  </TresCanvas>
</template>
```

## ShaderMaterial

如你所知，[ThreeJs](https://threejs.org/) 中的每个实例都可以在 **TresJs** 中使用，`ShaderMaterial` 也是如此，我们只需要添加 `Tres` 前缀即可使用它。

对于我们的 blob ，我们可以使用简单的 `SphereGeometry`，添加一些 `widthSegments` 和 `heightSegments` 来创建平滑效果，并将 blob 放在 Y 轴正方向的 4 个单位处

```vue
<TresMesh :position="[0, 4, 0]">
  <TresSphereGeometry :args="[2, 32, 32]" />
  <TresShaderMaterial />
</TresMesh>
```

`ShaderMaterial` 接受特殊属性，如 `uniforms` `vertexShader` 和 `fragmentShader`，因此我们可以在脚本部分创建它，并与我们的实例进行绑定。

对于此示例，我们的 uniforms 如下所示：

```ts
import { Vector2 } from 'three'

// ...
const uniforms = {
  uTime: { value: 0 },
  uAmplitude: { value: new Vector2(0.1, 0.1) },
  uFrequency: { value: new Vector2(20, 5) },
}
// ..
```

我们的片段着色器如下所示：

```ts
// ...
const fragmentShader = `
precision mediump float;
varying vec2 vUv;

void main() {
    gl_FragColor = vec4(1.0, vUv.y, 0.5, 1.0);
}
`
// ..
```

最后是我们的顶点着色器：

```ts
const vertexShader = `
uniform vec2 uAmplitude;
uniform vec2 uFrequency;
uniform float uTime;

varying vec2 vUv;

void main() {
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    modelPosition.y += sin(modelPosition.x * uFrequency.x - uTime) * uAmplitude.x;
    modelPosition.x += cos(modelPosition.y * uFrequency.y - uTime) * uAmplitude.y;

    vec4 viewPosition = viewMatrix * modelPosition;
    gl_Position = projectionMatrix * viewPosition;
    vUv = uv;
}
`
// ..
```

## 为 blob 添加动画

类似于我们在 [基本动画](/zh/cookbook/basic-animations) 示例中学习到的，我们首先使用 [模板引用](https://cn.vuejs.org/guide/essentials/template-refs.html) 引用 blob

```vue
<script setup lang="ts">
import { OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { shallowRef } from 'vue'

const blobRef = shallowRef(null)
// ...
</script>

<template>
  <TresCanvas
    clear-color="#111"
    window-size
  >
    <OrbitControls />
    <TresPerspectiveCamera :position="[11, 11, 11]" />
    <TresMesh
      ref="blobRef"
      :position="[0, 4, 0]"
    >
      <TresSphereGeometry :args="[2, 32, 32]" />
      <TresShaderMaterial />
    </TresMesh>
  </TresCanvas>
</template>
```
 获得引用后，我们可以使用 `onLoop` 回调为 `uTime` 添加动画。

 ```ts
import { TresCanvas, useRenderLoop } from '@tresjs/core'

 // ...
 const { onLoop } = useRenderLoop()

onLoop(({ elapsed }) => {
   if (blobRef.value) {
     blobRef.value.material.uniforms.uTime.value = elapsed
   }
})
 // ...
```

就这样，我们的基本着色器顺利运行。

## 使用 GLSL vite 插件（可选）

_此步骤完全是可选的，并且超出了 **TresJs** 团队的范围_

将着色器定义为内联形式并不总是最好的主意，但是如果你正在使用 [vite](https://vitejs.dev/)，你可以通过使用 [vite-plugin-glsl](https://www.npmjs.com/package/vite-plugin-glsl) 将你的 `GLSL` 文件放在另一个文件中（查看链接以获取官方文档）。

你可以拥有类似于这样的结构：

```
├── src/
│   ├── myTresJsComponent.vue
│   ├── shaders/
│       ├── vertexShader.glsl
│       ├── fragmentShader.glsl
```
