# 注意事项 😱

我们的目标是在 VueJS 中提供一种简单的使用 ThreeJS 的方式，并提供最佳的开发体验。所以，下面有一些需要注意的事项。

## ~~HMR and ThreeJS~~

:::info

**TresJS** v1.7.0 🎉 已修复该 bug，您现在可以使用 HMR，不需要刷新页面了 🥹。

:::

热模块替换（HMR）是一种功能，它允许您在不重新加载页面的情况下更新代码。它极大的提高了开发效率。**TresJS** 基于 [Vite](https://vitejs.dev/) 构建。然而，让它与 ThreeJS 正确配合起来确实有些棘手。

为什么呢？因为 Tres 采用声明式的方式构建场景。这意味着在 Vue 组件挂载后才创建实例并添加到场景中。困难之处在于需要找到将实例从场景中删除以及再次添加它的时机。

虽然实现了最简单的效果，但并不完美。这意味着有时您需要重新刷新页面才能正确看到更改，特别是当您使用 [模板引用](https://v3.vuejs.org/guide/component-template-refs.html)来引用一个实例的时候。

```vue
<script setup lang="ts">
const boxRef: Ref<TresInstance | null> = ref(null);

onLoop(({ _delta, elapsed }) => {
  if (boxRef.value) {
    boxRef.value.rotation.y += 0.01;
    boxRef.value.rotation.z = elapsed * 0.2;
  }
});
</script>

<template>
  <TresMesh ref="boxRef" :scale="1" cast-shadow>
    <TresBoxGeometry :args="[1, 1, 1]" />
    <TresMeshStandardMaterial color="teal" />
  </TresMesh>
</template>
```

您如果修改 `TresMeshStandardMaterial` 组件的 `color`，您能立即看到颜色的改变。但是，您会发现立方体的旋转动画并未生效。这是由于立方体实例被销毁并重新创建了。

:::tip
当您修改了代码却未看到变化时，通常情况下应该请刷新页面。
:::

话虽如此，我们正在致力于找到更好的解决方案 😁。如果您有任何解决方法，请告诉我们。

您可以参与我们的[关于 HMR 的讨论](https://github.com/Tresjs/tres/issues/23)

## 响应式

我们爱响应式 💚。这是 VueJS 最重要的特性之一。然而，在使用 ThreeJS 时，我们需要对此保持谨慎。

Vue 的响应式系统基于 [Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy)。Vue3 通过这种方式自动跟踪数据对象的变化，并在数据更改时更新相应的 DOM 元素。

由于在每一帧（60FPS）中会渲染场景并更新它，这意味着每秒会更新场景 60 次。如果更新的对象是响应式的，Vue 将尝试更新该对象同样多次。这不是个好主意 😅，会对性能造成影响。

下图是使用 Proxy 对象和普通对象 的 benchmark

<figure>
  <img src="/proxy-benchmark.png" alt="Proxy vs Plain" style="width:100%">
  <figcaption>Fig.1 - 每秒执行次数：普通对象 vs Proxy </figcaption>
</figure>

来源: [Proxy vs Plain Object](https://www.measurethat.net/Benchmarks/Show/12503/0/object-vs-proxy-vs-proxy-setter)

若您必须使用响应式，请使用 [shallowRef](https://vuejs.org/api/reactivity-advanced.html#shallowref)

不同于 `ref()`，

和 `ref()` 不同，浅层 ref 的内部值将会原样存储和暴露，并且不会被深层递归地转为响应式。只有对 .value 的访问是响应式的， 详见 [VueJS 官方文档](https://vuejs.org/api/reactivity-advanced.html#shallowref)。

### 示例

❌ 错误示例

```vue
<script setup lang="ts">
const position = reactive({ x: 0, y: 0, z: 0 });

onLoop(({ _delta, elapsed }) => {
  position.x = Math.sin(elapsed * 0.1) * 3;
});
</script>
<template>
  <TresMesh :position="position" cast-shadow>
    <TresBoxGeometry :args="[1, 1, 1]" />
    <TresMeshStandardMaterial color="teal" />
  </TresMesh>
</template>
```

✅ 正确示例

```vue
<script setup lang="ts">
const position = { x: 0, y: 0, z: 0 };
const boxRef: ShallowRef<TresInstance | null> = shallowRef(null);

onLoop(({ _delta, elapsed }) => {
  boxRef.value.position.x = Math.sin(elapsed * 0.1) * 3;
});
</script>
<template>
  <TresMesh ref="boxRef" :position="position" cast-shadow>
    <TresBoxGeometry :args="[1, 1, 1]" />
    <TresMeshStandardMaterial color="teal" />
  </TresMesh>
</template>
```
