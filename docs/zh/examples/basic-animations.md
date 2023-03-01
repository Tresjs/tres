# 基础动画

This guide will help you get started with basic animations in TresJS.

本节展示 **TresJS** 的基础动画。

我们会创建一个简单的场景，场景中有一个绕着 Y 和 Z 轴不停旋转的立方体。

<StackBlitzEmbed projectId="tresjs-basic-animations" />

## useRenderLoop 函数

TresJS 动画的核心是 `useRenderLoop` 组合式函数。它允许您注册一个回答函数，并且在浏览器刷新的每一帧中调用该回调函数。

要查看详细的说明，请参考 [useRenderLoop](/api/composables#userenderloop) 文档。

```ts
const { onLoop, resume } = useRenderLoop();

resume();
onLoop(({ _delta, elapsed }) => {
  // I will run at every frame ~ 60FPS (depending of your monitor)
});
```

## 立方体 Ref

想要给立方体添加动画，首先需要获取立方体的实例。通过在 `TresMesh` 组件上添加 [模版引用](https://vuejs.org/guide/essentials/template-refs.html)，获取对应的立方体实例。

出于对性能的考虑，使用 [Shallow Ref](https://v3.vuejs.org/guide/reactivity-fundamentals.html#shallow-reactivity) 代替 Ref 存储实例。详见 [这里](../advanced/caveats.md#reactivity)。

```vue
<script setup lang="ts">
const boxRef: ShallowRef<TresInstance | null> = shallowRef(null);
</script>

<template>
  <TresMesh ref="boxRef" :scale="1" cast-shadow>
    <TresBoxGeometry :args="[1, 1, 1]" />
    <TresMeshStandardMaterial v-bind="pbrTexture" />
  </TresMesh>
</template>
```

## 给立方体添加动画

现在已经获取到立方体的实例，接着使用 `onLoop` 回调函数来让立方体旋转起来。

```ts
onLoop(({ _delta, elapsed }) => {
  if (boxRef.value) {
    boxRef.value.rotation.y += 0.01;
    boxRef.value.rotation.z = elapsed * 0.2;
  }
});
```

也可以使用 [THREE clock](https://threejs.org/docs/?q=clock#api/en/core/Clock) 内部的 `delta` 和 `elapsed` 为立方体创建动画。
