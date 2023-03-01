# 变换控制器

[变换控制器](https://threejs.org/docs/#examples/en/controls/TransformControls) 是一组三个小工具，可以用来在场景中平移、旋转和缩放对象。它采用了类似于 Blender 等 DCC 工具的交互模型

<StackBlitzEmbed projectId="tresjs-transform-controls" />

## 用法

要使用变换控制器，只需将 `TransformControls` 添加到场景中。您还可以将想要控制的实例对象的 `templateRef` 作为 prop 传递给它。

```vue{2,6,8}
<script setup>
const boxRef = shallowRef()
</script>
<template>
  <TresCanvas>
    <OrbitControls make-default />
    <TresScene>
        <TransformControls :object="boxRef" />
        <TresMesh ref="boxRef" :position="[0, 4, 0]" cast-shadow>
            <TresBoxGeometry :args="[1.5, 1.5, 1.5]" />
            <TresMeshToonMaterial color="#4F4F4F" />
        </TresMesh>
    </TresScene>
  </TresCanvas>
</template>
```

::: warning
如果您使用其他控制器 ([OrbitControls](/cientos/controls/orbit-controls))，在拖动时它们会相互干扰。为了避免这种情况，您可以将 **OrbitControls** 的 `makeDefault` 属性设置为 `true`。
:::

## 模式

变换控制器可以在三种不同的模式下使用:

### 平移

![Translate](/cientos/transform-controls-translate.png)

默认模式可以在场景中移动物体。

```html
<TransformControls mode="translate" :object="sphereRef" />
```

### 旋转

![Rotate](/cientos/transform-controls-rotate.png)

旋转模式可以在场景中旋转物体。

```html
<TransformControls mode="rotate" :object="boxRef" />
```

### 缩放

![Scale](/cientos/transform-controls-scale.png)

缩放模式可以在场景中缩放物体。

```html
<TransformControls mode="scale" :object="sphereRef" />
```

## Props

| Prop                | Description                                                                                   | Default     |
| :------------------ | :-------------------------------------------------------------------------------------------- | ----------- |
|  **object**         | The instance [Object3D](https://threejs.org/docs/index.html#api/en/core/Object3D) to control. | `null`      |
| **mode**            | The mode of the controls. Can be `translate`, `rotate` or `scale`.                            | `translate` |
| **enabled**         | If `true`, the controls will be enabled.                                                      | `true`      |
| **axis**            | The axis to use for the controls. Can be `X`, `Y`, `Z`, `XY`, `YZ`, `XZ`, `XYZ`.              | `XYZ`       |
| **space**           | The space to use for the controls. Can be `local` or `world`.                                 | `local`     |
| **size**            | The size of the controls.                                                                     | `1`         |
| **translationSnap** | The distance to snap to when translating. (World units)                                       | `null`      |
| **rotationSnap**    | The angle to snap to when rotating. (Radians)                                                 | `null`      |
| **scaleSnap**       | The scale to snap to when scaling.                                                            | `null`      |
| **showX**           | If `true`, the X-axis helper will be shown.                                                   | `true`      |
| **showY**           | If `true`, the Y-axis helper will be shown.                                                   | `true`      |
| **showZ**           | If `true`, the Z-axis helper will be shown.                                                   | `true`      |

## Events

| Event            | Description                                                    |
| :--------------- | :------------------------------------------------------------- |
| **dragging**     | Fired when the user starts or stops dragging the controls.     |
| **change**       | Fired when the user changes the controls.                      |
| **mouseDown**    | Fired when the user clicks on the controls.                    |
| **mouseUp**      | Fired when the user releases the mouse button on the controls. |
| **objectChange** | Fired when the user changes the object.                        |

<style scoped>
img {
    aspect-ratio: 16/9;
    object-fit: cover;
    object-position: top;
    border-radius: 8px;
}
</style>
