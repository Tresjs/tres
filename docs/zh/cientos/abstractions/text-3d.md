# Text3D <Badge type="warning" text="^1.1.0" />

`<Text3D />` 组件用于渲染 3D 文本。它是 [TextGeometry](https://threejs.org/docs/#api/en/geometries/TextGeometry) 的包装器。

<StackBlitzEmbed projectId="tresjs-text3d-cientos" />

## 用法

`<Text3D />` 组件 需要传入 `font` 属性，该属性值是字体 JSON 文件的 URL。TextGeometry 使用 `typeface`.json 生成字体，您可以在 [此处](http://gero3.github.io/facetype.js/) 生成您自己的字体。

```vue
<template>
  <TresCanvas>
    <TresScene>
      <Text3D text="TresJS" font="/fonts/FiraCodeRegular.json">
        <TresMeshNormalMaterial />
      </Text3D>
    </TresScene>
  </TresCanvas>
</template>
```

请注意：由于 `<Text3D />` 本质上是一个 `Mesh` 组件，需要材质数据，因此它的子组件中需要一个 `<TresMeshNormalMaterial />` 组件。几何数据默认会自动创建。你也可以像这样通过插槽或 prop 传递文本:

```vue
<template>
  <TresCanvas>
    <TresScene>
      <Text3D font="/fonts/FiraCodeRegular.json">
        TresJS
        <TresMeshNormalMaterial />
      </Text3D>
    </TresScene>
  </TresCanvas>
</template>
```

## Props [[1]](#1)

| Prop               | Description                                                            | Default |
| :----------------- | :--------------------------------------------------------------------- | ------- |
| **font**           | The font data or font name to use for the text.                        |         |
| **text**           | The text to display.                                                   |         |
| **size**           | The size of the text.                                                  | 0.5     |
| **height**         | The height of the text.                                                | 0.2     |
| **curveSegments**  | The number of curve segments to use when generating the text geometry. | 5       |
| **bevelEnabled**   | A flag indicating whether beveling should be enabled for the text.     | true    |
| **bevelThickness** | The thickness of the beveled edge on the text.                         | 0.05    |
| **bevelSize**      | The size of the beveled edge on the text.                              | 0.02    |
| **bevelOffset**    | The offset of the beveled edge on the text.                            | 0       |
| **bevelSegments**  | The number of bevel segments to use when generating the text geometry. | 4       |

## 参考

<a id="1">[1]</a>
这张表格是由 [ChatGPT](https://chat.openai.com/chat) 根据 Vue 组件 props 生成的。
