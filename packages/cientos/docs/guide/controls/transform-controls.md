# Transform Controls

The [Transform Controls](https://threejs.org/docs/#examples/en/controls/TransformControls) are a set of three gizmos that can be used to translate, rotate and scale objects in the scene. It adapts a similar interaction model of DCC tools like Blender

<DocsDemo>
  <TransformControlsDemo />
</DocsDemo>

## Usage

To use the Transform Controls, simply add the `TransformControls` component to your scene. You can pass the `templateRef`of the instance you want to control as a prop.

```vue{2,6,8}
<script setup>
const boxRef = shallowRef()
</script>
<template>
  <TresCanvas>
    <TresPerspectiveCamera :args="[45, 1, 0.1, 1000]" />
    <OrbitControls make-default />
    <TransformControls :object="boxRef" />
    <TresMesh ref="boxRef" :position="[0, 4, 0]" cast-shadow>
      <TresBoxGeometry :args="[1.5, 1.5, 1.5]" />
      <TresMeshToonMaterial color="#4F4F4F" />
    </TresMesh>
  </TresCanvas>
</template>
```

::: warning
If you are using other controls ([OrbitControls](/guide/controls/orbit-controls)) they will interfere with each other when dragging. To avoid this, you can set the `makeDefault` prop to `true` on the **OrbitControls**.
:::

## Modes

The Transform Controls can be used in three different modes:

### Translate

![Translate](/cientos/transform-controls-translate.png)

The default mode allows you to move the object around the scene.

```vue
<TransformControls mode="translate" :object="sphereRef" />
```

### Rotate

![Rotate](/cientos/transform-controls-rotate.png)

The rotate mode allows you to rotate the object around the scene.

```vue
<TransformControls mode="rotate" :object="boxRef" />
```

### Scale

![Scale](/cientos/transform-controls-scale.png)

The scale mode allows you to scale the object around the scene.

```vue
<TransformControls mode="scale" :object="sphereRef" />
```

## Props

| Prop                | Description                                                                                   | Default     |
| :------------------ | :-------------------------------------------------------------------------------------------- | ----------- |
| **object**         | The instance [Object3D](https://threejs.org/docs/index.html#api/en/core/Object3D) to control. | `null`      |
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
