# 渲染器 {#Renderer}

渲染器 `Renderer` 组件是 Tres 的主要组件。它创建了 ThreeJS 的 `WebGLRenderer` 并定义了 Tres 场景。

```vue{2,7}
<template>
  <TresCanvas shadows :output-encoding="sRGBEncoding">
    <TresPerspectiveCamera />
    <TresScene>
      <!-- Your scene goes here -->
    </TresScene>
  </TresCanvas>
</template>
```

## 预设 <Badge warning text="v1.7.0+" /> {#Presets}

Tres 自带一些渲染器 `Renderer` 组件的预设。您可以通过设置 `preset` 属性来使用它们。

### Realistic

预设值 `realistic` 使得设置用于渲染真实 3D 场景的渲染器变得更加容易。

```vue
<template>
  <TresCanvas preset="realistic">
    <!-- Your scene goes here -->
  </TresCanvas>
</template>
```

上面等价于：

```ts
renderer.shadows: true,
renderer.physicallyCorrectLights: true,
renderer.outputEncoding: sRGBEncoding,
renderer.toneMapping: ACESFilmicToneMapping,
renderer.toneMappingExposure: 3,
renderer.shadowMap.enabled: true,
renderer.shadowMap.type: PCFSoftShadowMap
```

## Props {#Props}

| Prop                        | Description                                                                                                                                                     | Default            |
| :-------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| **shadows**                 | Enable shadows in the Renderer                                                                                                                                  | `false`            |
| **shadowMapType**           | Set the shadow map type                                                                                                                                         | `PCFSoftShadowMap` |
| **physicallyCorrectLights** | Whether to use physically correct lighting mode. See the [lights / physical example](https://threejs.org/examples/#webgl_lights_physical).                      | `false`            |
| **outputEncoding**          | Defines the output encoding                                                                                                                                     | `LinearEncoding`   |
| **toneMapping**             | Defines the tone mapping exposure used by the renderer.                                                                                                         | `NoToneMapping`    |
| **context**                 | This can be used to attach the renderer to an existing [RenderingContext](https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext)               |                    |
| **powerPreference**         | Provides a hint to the user agent indicating what configuration of GPU is suitable for this WebGL context. Can be "high-performance", "low-power" or "default". | `default`          |
| **preserveDrawingBuffer**   | Whether to preserve the buffers until manually cleared or overwritten..                                                                                         | `false`            |
| **clearColor**              | The color the renderer will use to clear the canvas.                                                                                                            | `#000000`          |
| **windowSize**              | Whether to use the window size as the canvas size or the parent element.                                                                                        | `false`            |

## 默认值 {#Defaults}

Tres 希望留给用户更大的自由度，这也是为什么 Tres 几乎不为渲染器 `Renderer` 组件设置任何默认值。您需要设置要使用的 props。不过有个例外是 `antialias` 属性被默认设置为 true。
