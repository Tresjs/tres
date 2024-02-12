# 实例

**Tres** 的核心理念是一个自动生成的ThreeJS元素目录。这个目录是从ThreeJS 源代码生成的，因此始终保持最新。

在使用 ThreeJS 时，您需要导入要使用的元素。例如，如果您想使用`PerspectiveCamera` ，您需要从 `three` 包中导入它：

```js
import { PerspectiveCamera } from 'three'

const camera = new PerspectiveCamera(45, width / height, 1, 1000)
```
使用 **Tres** 时，您无需导入任何内容，这是因为 **Tres** 会自动生成一个 **基于您想要使用的Three对象的Vue组件，使用驼峰命名法并加上Tres前缀** 。例如，如果您想要使用 `PerspectiveCamera` ，您将使用 `<TresPerspectiveCamera />` 组件。

```vue
<template>
  <TresCanvas>
    <TresPerspectiveCamera />
    <!-- 这里是场景 -->
  </TresCanvas>
</template>
```
这意味着您可以使用与使用普通的ThreeJS相同的[文档](https://threejs.org/docs/)，但同时又能利用Vue的强大功能。


## 声明对象

如果我们遵循这个观念，你应该能够布置一个像这样实例： ❌

```vue
<template>
  <TresCanvas>
    <TresPerspectiveCamera
      visible
      :position="new THREE.Vector3(1, 2, 3)"
    />
    <!-- 这里是场景 -->
  </TresCanvas>
</template>
```
但是使用 **Tres**，这是不需要的，您可以像这样声明性地定义属性： ✅

```vue
<template>
  <TresCanvas>
    <TresPerspectiveCamera
      visible
      :position="[1, 2, 3]"
    />
    <!-- 这里是场景 -->
  </TresCanvas>
</template>
```

## 参数

ThreeJS对象的一些参数，例如，`PerspectiveCamera` 构造函数有以下参数：

- `fov` - 相机截锥体的垂直视场角。
- `aspect` - 相机截锥体的宽高比。
- `near` - 相机截锥体的近裁剪面。
- `far` - 相机截锥体的远裁剪面。

要将这些参数传递给 `TresPerspectiveCamera` 组件，您可以使用 `args` prop：

```vue
<template>
  <TresCanvas>
    <TresPerspectiveCamera :args="[45, 1, 0.1, 1000]" />
    <!-- 这里是场景 -->
  </TresCanvas>
</template>
```

与执行以下操作是等效的：

```ts
const camera = new PerspectiveCamera(45, 1, 0.1, 1000)
```

## props

您还可以通过 props 的方式传递给组件，例如，`TresAmbientLight` 有一个 `intensity` 属性，您可以通过以下方式将其传递给组件：

```html
<TresAmbientLight :intensity="0.5" />
```

### 设置

所有底层对象具有 `.set()` 方法的属性都有一个快捷方式，可以将值作为数组接收。例如，`TresPerspectiveCamera` 有一个 `position` 属性，是一个 `Vector3` 对象，因此可以通过以下方式将其传递给组件：

```html
<TresPerspectiveCamera :position="[1, 2, 3]" />
```

要指定位置、旋转和缩放等转换属性，可以使用一种简写方法，允许您在props中直接指定要设置的轴。颜色属性也有类似的简写。

<!-- 尝试将颜色的语法从Vue更改为HTML，但Vue似乎有问题，无法对嵌套组件进行着色。 -->
```html
<TresMesh :position-x="1" :scale-y="2" :rotation-x="Math.PI * 2">
  <TresMeshBasicMaterial :color-r="0.7" :color-b="0.3" />
</TresMesh>
```

::: warning

在 [three.js](https://threejs.org/docs/index.html#api/en/math/Euler) 中设置旋转属性时，默认会使用'XYZ'顺序。
值得注意的是，使用简写设置旋转属性时，设置角度的顺序是重要的。关于该主题的更多信息，请参阅 [Euler angles](https://en.wikipedia.org/wiki/Euler_angles)。

:::

```vue
<TresMesh :rotation-x="1" :rotation-y="2" :rotation-z="Math.PI * 2" />

<TresMesh :rotation-z="Math.PI * 2" :rotation-x="1" :rotation-y="2" />

<!-- 请注意！旋转属性的顺序是重要的，交换顺序可能导致不同的结果。 -->
```

### 标量

您还可以使用另一种快捷方式，将标量值传递给 `Vector3` 对象的属性，对于该矢量的其余部分使用相同的值：

```html
<TresPerspectiveCamera :position="5" /> ✅
```

```html
<TresPerspectiveCamera :position="[5, 5, 5]" /> ✅
```

### 颜色

您可以通过使用 `color` 属性将颜色传给组件，该属性接受包含颜色名称或十六进制值：

```html
<TresAmbientLight color="teal" /> ✅
```

```html
<TresAmbientLight color="#008080" /> ✅
```

### 方法

底层的一些属性实际上是方法，例如，`TresPerspectiveCamera` 具有从[Object3d](https://threejs.org/docs/#api/en/core/Object3D.lookAt)继承的 `lookAt` 方法，因此您可以将坐标传递给组件，如下所示：

```html
<TresPerspectiveCamera :look-at="[1, 2, 3]" />
```
