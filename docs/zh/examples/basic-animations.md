# Basic Animations

本指南将帮助您开始使用 TresJS 进行基本的动画。

我们将创建一个简单的场景，其中包含一个方块。然后，我们将方块添加动画，使其围绕 Y 和 Z 轴旋转。

<SandboxDemo url="https://play.tresjs.org/#eNqVVF1P2zAU/StW9kAZbVI+hTqKOjo0bRofYrwRHkxy2xoc27KdtlD1v+8mTloHBipSH5rjc889vh9eBLcazHelwmkOQS84MYlmyhIDNleEUzHux4E1cXAaC5YpqS1ZEDOhnMvZDYzIkoy0zMgWRm998yiF6pCKKTVtkhu4AZGC/iOlWkUMLFIeTZRI3Qy90g/MDqWwWnLzls5AWGmKiFgkUhhLHuS8sNL3fLVEzvm2x1kQKar0/aahlqO541ZrQVLglrYJcKoMpGS5TfqnZBELQtiItFyycEp5DtsOJpUDB4ZaWmqZFOEz2ek7NczwPu0FHdXJvpJuuFeyl7FYFs5OItcRrD9+WMgUpxbwi5CTdZFJwoHqTiK51NiwL8d7P86Gh3FQlCSVM0MoVxNKZkzgV8ewF6eAGs1qRxVciV+DNgoSy6YwpBloWp8S0lPSsMI/prvbbZO9Njm8jwOPMJJTPDtAFx5ISz3EdxuwQPcIdsMmPCrR3W63u4ZfWbwAMyEaRshz5cVL90xCObgkJKHGdlwZVpFV7Jmc/wSZgdXP6EyPTXWX4od38VJ5yS6lzii/wCZoRrlvJ6oprjvlp2sPAieR17ugHbhx72RUhY9GCly9cpbi6gA3rldPVxz4u1IcxMHEWmV6UZSkAuNxyNhUhwJsJFQW+fTBfngYdqOUGRsVMLLjoP1G2G3VZ7RdBMof+fIV3MxiZ0CfFBWbeF9xBwchjkOlXINhxooYX3uiYSPdgjdAxcNj9LsDJvPLgM8XPgob19ejD3a7ZYFxs2AeZs3qVjycPg3pJ4RdwEfSSOykkLENRGtqcfmD8Cji7MGXrB8bnElr8LEcsfGriUxkphgHfaWKfW9OZvng/i4xq3NY+UsmkDz9B380c2f5GocF9BTLvW4lriBYd3z+9xLm+H91mMk051Vz3jm8ASN5Xnh0tLNcpGjb45Vuf5ULxsT41pzPLQhTX6ph1D4rKNG7er9Xs+aA+7JwJb9sx/CDKq1vth/urwq+/AdyGHHw" />

## useRenderLoop

`useRenderLoop` 组合式函数构成了 TresJS 动画的核心。它允许您注册一个回调函数，该函数将在渲染器以浏览器的刷新率更新场景时每次调用。

要查看其工作原理的详细说明，请参考 [useRenderLoop](/api/composables#userenderloop)  文档。

```ts
const { onLoop } = useRenderLoop()

onLoop(({ delta, elapsed }) => {
  // 将在每一帧运行 ~ 60FPS（取决于您的显示器）
})
```

## 获取方块的引用

要为方块设置动画，我们需要获取它的引用。我们可以通过使用 [模板引用](https://cn.vuejs.org/guide/essentials/template-refs.html) 将 ref 属性传递给 `TresMesh` 组件来实现。这将返回 THREE 实例。

为了提高性能，我们将使用 [Shallow Ref](https://v3.vuejs.org/guide/reactivity-fundamentals.html#shallow-reactivity) 来存储引用，而不是常规引用。原因请参阅此处[here](../advanced/caveats.md#reactivity)

```vue
<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'

const boxRef: ShallowRef<TresInstance | null> = shallowRef(null)
</script>

<template>
  <TresCanvas>
    <TresMesh
      ref="boxRef"
      :scale="1"
    >
      <TresBoxGeometry :args="[1, 1, 1]" />
      <TresMeshNormalMaterial />
    </TresMesh>
  </TresCanvas>
</template>
```

## 使方块动起来

现在我们已经获得了方块的引用，就可以对其进行动画处理了。我们将使用 `onLoop` 回调更新立方体的旋转。

```ts
onLoop(({ delta, elapsed }) => {
  if (boxRef.value) {
    boxRef.value.rotation.y += delta
    boxRef.value.rotation.z = elapsed * 0.2
  }
})
```

你也可以使用内部[THREE clock](https://threejs.org/docs/?q=clock#api/en/core/Clock)的 `delta` 或 `elapsed` 来为立方体制作动画。

## 为什么不使用响应式系统？

你可能想知道为什么我们不使用响应式系统来为立方体制作动画。答案很简单，性能。

```vue
// This is a bad idea ❌
<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'

const boxRotation = reactive([0, 0, 0])

onLoop(({ delta, elapsed }) => {
  boxRotation[1] += delta
  boxRotation[2] = elapsed * 0.2
})
</script>
```

我们可能会忍不住使用响应式系统来为立方体制作动画。但这并不是一个好主意。

原因是 Vue 的响应式系统基于代理: https://vuejs.org/guide/extras/reactivity-in-depth.html#how-reactivity-works-in-vue，它并不适合用于每秒更新 60 次或更多的渲染循环中。

下面的嵌入页面展示了一个[代理 vs 普通对象的基准测试](https://measurethat.net/Benchmarks/Show/12503/0/object-vs-proxy-vs-proxy-setter) 。正如你所看到的，代理比普通对象慢 5 倍。

<EmbedExperiment src="https://measurethat.net/Embed?id=399142" />

你可以在 [注意事项](../advanced/caveats.md#reactivity) 部分了解更多关于这个方面的内容。
