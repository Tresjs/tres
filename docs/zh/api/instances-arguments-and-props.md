# 实例 {#Instances}

**Tres** 的核心功能是自动生成所有 ThreeJS 元素的目录。这个目录是从 ThreeJS 的源代码中生成的，因此它始终是最新的。

当使用 ThreeJS 的时候，常常需要先引入您想要使用的元素。例如，要使用 `PerspectiveCamera` ，需要先从 `three` 包中引入：

```js
import { PerspectiveCamera } from "three";

const camera = new PerspectiveCamera(45, width / height, 1, 1000);
```

使用 **Tres** 时，您不需要导入任何东西，因为 **Tres** 会自动基于您想使用的 ThreeJS 对象生成一个前缀为 **Tres** 且满足驼峰式命名的 Vue 组件。举个例子，`<TresPerspectiveCamera />` 组件对应的就是 `PerspectiveCamera` 对象。

```vue
<template>
  <TresCanvas>
    <TresPerspectiveCamera />
    <!-- Your scene goes here -->
  </TresCanvas>
</template>
```

这样您可以只专注 ThreeJS 的[文档](https://threejs.org/docs/)，同时享受 Vue 带来的强大功能。

## 声明对象 {#Declaring objects}

如果您需要传参，您可能会写成下面这样：❌

```vue
<template>
  <TresCanvas>
    <TresPerspectiveCamera visible :position="new THREE.Vector3(1, 2, 3)" />
    <!-- Your scene goes here -->
  </TresCanvas>
</template>
```

在 **Tres** 中不需要写成那样，可以采用下面的方式声明：✅

```vue
<template>
  <TresCanvas>
    <TresPerspectiveCamera visible :position="[1, 2, 3]" />
    <!-- Your scene goes here -->
  </TresCanvas>
</template>
```

## 参数 {#Arguments}

ThreeJS 中的对象初始化时都能传特定的参数，比如，`PerspectiveCamera` 的构造函数有如下参数：

- `fov` - 相机视锥体的垂直视角
- `aspect` - 相机视锥体的宽高比
- `near` - 相机视锥体的近平面
- `far` - 相机视锥体的远平面

您可以通过 `args` 属性将上面的参数传递给 `TresPerspectiveCamera` 组件:

```vue
<template>
  <TresCanvas>
    <TresPerspectiveCamera :args="[45, 1, 0.1, 1000]" />
    <!-- Your scene goes here -->
  </TresCanvas>
</template>
```

等价于：

```ts
const camera = new PerspectiveCamera(45, 1, 0.1, 1000);
```

## Props {#Props}

每个组件还能够传入对应的 Props。例如， `TresAmbientLight` 带有 `intensity` 属性，像这样传入具体值：

```html
<TresAmbientLight :intensity="0.5" />
```

### Set {#Set}

所有具有 `.set()` 方法的基础对象的属性都有一个将值写为数组形式的简写。例如：`TresPerspectiveCamera` 的属性 `position`，它是一个 `Vector3` 对象，可以采用下面的方式传值：

```html
<TresPerspectiveCamera :position="[1, 2, 3]" />
```

### 标量 {#Scalar}

还有一种简写方式，对于属性值是 `Vector3` 类型的属性，可以传一个标量来表示使用该标量填充 Vector 的其余部分。

```html
<TresPerspectiveCamera :position="5" /> ✅
```

```html
<TresPerspectiveCamera :position="[5, 5, 5]" /> ✅
```

### 颜色值 {#Colors}

对于 `color` 属性，可以使用字符串形式的颜色值或者 16 进制的颜色值:

```html
<TresAmbientLight color="teal" /> ✅
```

```html
<TresAmbientLight color="#008080" /> ✅
```

### 方法 {#Methods}

一些底层属性实际上是方法，`TresPerspectiveCamera` 从 [Object3d](https://threejs.org/docs/#api/en/core/Object3D.lookAt) 继承了一个 `lookAt` 方法，因此您可以像这样将坐标传递给组件：

```html
<TresPerspectiveCamera :look-at="[1, 2, 3]" />
```
