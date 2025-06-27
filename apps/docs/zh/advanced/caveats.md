# 注意事项 😱

我们的目标是提供一种在 VueJS 中使用 ThreeJS 的简单方法，并尽可能提供最佳的开发人员体验。但是，您仍有一些注意事项应该了解。

## ~~HMR 和 ThreeJS~~

:::info

这一问题已在 **TresJS** v1.7.0 🎉 中得到修复。现在您可以使用 HMR 而无需重新加载页面。

:::

热模块替换（HMR）是一项无需重新加载页面即可更新代码的功能。这是一项伟大的功能，能大大加快开发速度。**TresJS**使用[Vite](https://vitejs.dev/)。然而，要让它在 ThreeJS 中正常工作确实非常棘手。

为什么呢？因为 Tres 是以声明的方式构建场景的。这意味着它创建了实例，并在安装组件时将其添加到场景中。复杂之处在于何时从场景中移除实例，何时再次添加。

虽然实现了最低限度的处置工作流程，但它并不完美。这意味着有时您必须重新加载页面才能正确看到变化，特别是当您使用 [模板引用](https://cn.vuejs.org/guide/essentials/template-refs.html) 访问实例时。

```vue
<script setup lang="ts">
const boxRef: Ref<TresInstance | null> = ref(null)

onLoop(({ _delta, elapsed }) => {
  if (boxRef.value) {
    boxRef.value.rotation.y += 0.01
    boxRef.value.rotation.z = elapsed * 0.2
  }
})
</script>

<template>
  <TresMesh ref="boxRef" :scale="1" cast-shadow>
    <TresBoxGeometry :args="[1, 1, 1]" />
    <TresMeshStandardMaterial color="teal" />
  </TresMesh>
</template>
```

如果对 `TresMeshStandardMaterial` 组件的 `color` 进行更改，你会发现更改被应用了，但旋转却失效了。这是因为该实例已被弃置并重新创建。

:::tip
因此，**根据经验**，每当您没有看到所做的更改时，您应该重新加载页面。
:::

尽管如此，我们仍在努力寻找更好的解决方案😁。如果您有任何解决方法，请让我们知道。

您可以在 [HMR 处理讨论](https://github.com/Tresjs/tres/issues/23) 中关注讨论。

## 响应性

我们都喜欢响应性💚。它是 VueJS 最强大的功能之一。不过，在使用 ThreeJS 时，我们需要注意这一点。

Vue 的反应性基于 [Proxy](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy)。这使得 Vue 3 可以自动跟踪数据对象的变化，并在数据发生变化时更新相应的 DOM 元素。

由于我们正在渲染一个场景并在每一帧中更新（60FPS），这意味着我们每秒要更新场景 60 次。如果要更新的对象是反应式的，Vue 就会尝试更新该对象这么多次。这不是一个好主意😅，会对性能造成损害。

下面是使用 Proxy 对象和普通对象的区别基准。

<figure>
  <img src="/proxy-benchmark.png" alt="Proxy vs Plain" style="width:100%">
  <figcaption>图 1 - 计划对象与代理的每秒执行次数。 </figcaption>
</figure>

来源：[Proxy vs Plain Object](https://www.measurethat.net/Benchmarks/Show/12503/0/object-vs-proxy-vs-proxy-setter)

如果您不得不使用反应性，请使用 [shallowRef](https://cn.vuejs.org/api/reactivity-advanced.html#shallowref)

和 ref() 不同，浅层 ref 的内部值将会原样存储和暴露，并且不会被深层递归地转为响应式。只有对 .value 的访问是响应式的。来源 [VueJS 文档](https://cn.vuejs.org/api/reactivity-advanced.html#shallowref)

### 范例

❌ 错误的

```vue
<script setup lang="ts">
const position = reactive({ x: 0, y: 0, z: 0 })

onLoop(({ _delta, elapsed }) => {
  position.x = Math.sin(elapsed * 0.1) * 3
})
</script>

<template>
  <TresMesh :position="position" cast-shadow>
    <TresBoxGeometry :args="[1, 1, 1]" />
    <TresMeshStandardMaterial color="teal" />
  </TresMesh>
</template>
```

✅ 正确的

```vue
<script setup lang="ts">
const position = { x: 0, y: 0, z: 0 }
const boxRef: ShallowRef<TresInstance | null> = shallowRef(null)

onLoop(({ _delta, elapsed }) => {
  boxRef.value.position.x = Math.sin(elapsed * 0.1) * 3
})
</script>

<template>
  <TresMesh ref="boxRef" :position="position" cast-shadow>
    <TresBoxGeometry :args="[1, 1, 1]" />
    <TresMeshStandardMaterial color="teal" />
  </TresMesh>
</template>
```
