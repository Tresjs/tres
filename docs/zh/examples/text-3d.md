# Text3D

[TextGeometry](https://threejs.org/docs/index.html?q=text#examples/en/geometries/TextGeometry) 是给场景中添加 3D 文本的一种方式。

<StackBlitzEmbed projectId="tresjs-text3d-cientos" />

然而，它不在 ThreeJS 的核心包中。需要从 `three/examples/jsm/controls/TextGeometry` 导入。

由于 **TresJS** 只会自动将 Three 核心包中的内容自动注册为 Vue 组件供您使用，因此，上面的对象就会带来使用上的问题。

幸运的是，**TresJS** 提供了一种扩展组件的方法。您可以使用 [useCatalogue](/api/composables#usecatalog) 暴露出来的 `extend` 方法来扩展。

更多细节信息请查看 [extending](/advanced/extending.md)。

## 使用 TextGeometry

首先从 `three/examples/jsm/geometries/TextGeometry` 导入这个模块。

```js
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
```

接着使用 [useCatalogue](/api/composables#usecatalog) 暴露出来的 `extend` 方法扩展并注册组件。

```js
import { useCatalogue } from "@tresjs/core";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";

const { extend } = useCatalogue();

extend({ TextGeometry: TextGeometry });
```

[TextGeometry](https://threejs.org/docs/index.html?q=text#examples/en/geometries/TextGeometry) 只需要一个必填参数：字体，请看下面的示例:

```js
const fontPath =
  "https://raw.githubusercontent.com/Tresjs/assets/main/fonts/FiraCodeRegular.json";

const loader = new FontLoader();

const font = await new Promise((resolve, reject) => {
  try {
    loader.load(fontPath, (font) => {
      resolve(font);
    });
  } catch (error) {
    reject(console.error("cientos", error));
  }
});
```

最后在 `TresMesh` 中使用 `TresTextGeometry` 组件。

```vue
<template>
  <TresCanvas shadows alpha>
    <TresScene>
      <TresMesh>
        <TresTextGeometry :args="['TresJS', { font, ...fontOptions }]" center />
      </TresMesh>
    </TresScene>
  </TresCanvas>
</template>
```

像示例中一样，您可以传递一个包含所需配置的对象。

```ts
const fontOptions = {
  size: 0.5,
  height: 0.2,
  curveSegments: 5,
  bevelEnabled: true,
  bevelThickness: 0.05,
  bevelSize: 0.02,
  bevelOffset: 0,
  bevelSegments: 4,
};
```

我们还可以通过在 `TresMesh` 中使用 `TresMeshNormalMaterial` 传递 `matcapTexture` 来丰富细节。

```ts
const matcapTexture = await useTexture(['https://raw.githubusercontent.com/Tresjs/assets/main/textures/matcaps/7.png'])

  <TresMesh>
    <TresTextGeometry :args="['TresJS', { font, ...fontOptions }]" center />
    <TresMeshNormalMaterial :matcap="matcapTexture" />
  </TresMesh>
```

完整的代码:

```vue
<script setup lang="ts">
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { useCatalogue, useTexture } from "/@/core";
const { extend } = useCatalogue();

extend({ TextGeometry: TextGeometry });

const fontPath =
  "https://raw.githubusercontent.com/Tresjs/assets/main/fonts/FiraCodeRegular.json";

const fontOptions = {
  size: 0.5,
  height: 0.2,
  curveSegments: 5,
  bevelEnabled: true,
  bevelThickness: 0.05,
  bevelSize: 0.02,
  bevelOffset: 0,
  bevelSegments: 4,
};

const loader = new FontLoader();

const font = await new Promise((resolve, reject) => {
  try {
    loader.load(fontPath, (font) => {
      resolve(font);
    });
  } catch (error) {
    reject(console.error("cientos", error));
  }
});

const matcapTexture = await useTexture([
  "https://raw.githubusercontent.com/Tresjs/assets/main/textures/matcaps/7.png",
]);
</script>
<template>
  <TresMesh>
    <TresTextGeometry :args="['TresJS', { font, ...fontOptions }]" center />
    <TresMeshNormalMaterial :matcap="matcapTexture" />
  </TresMesh>
</template>
```

上面的方式的确很麻烦，好消息是有一种更简单的方法。

## `cientos` 中的 TextGeometry

`cientos` 包提供了一个名为 `<Text3D />` 的组件，它包装了 [`three-stdlib`](https://github.com/pmndrs/three-stdlib) 模块中的 `TextGeometry`。

你不需要自己去扩展组件只需要传入字体参数（若不传，文本内容默认为 TresJS）。挺酷的吧？💯

```vue
<template>
  <TresCanvas shadows alpha>
    <TresScene>
      <Text3D :font="fontPath" />
    </TresScene>
  </TresCanvas>
</template>
```

其他选项作为 props 传入

```html
<Text3D :font="fontPath" :text="my 3d text" :size="0.8" />
```

字体选项的缺省值为:

```js
size: 0.5,
height: 0.2,
curveSegments: 5,
bevelEnabled: true,
bevelThickness: 0.05,
bevelSize: 0.02,
bevelOffset: 0,
bevelSegments: 4,
```

默认情况下，ThreeJS 中的文本从网格的初始位置开始，因此它的位置为[0,0,0]，可以使用 "center" 将其居中。

```js
<Text3D :font="fontPath" :text="my 3d text" center  />
```
