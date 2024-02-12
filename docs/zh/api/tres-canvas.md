# TresCanvas

`TresCanvas` 组件是Tres的主要组件。它负责创建ThreeJS `WebGLRenderer`。

```vue{2,5}
<template>
  <TresCanvas shadows :output-encoding="SRGBColorSpace">
    <TresPerspectiveCamera />
      <!-- 这里是您的场景 -->
  </TresCanvas>
</template>
```

## 画布尺寸

`TresCanvas` 组件将使用父元素的尺寸作为画布的大小。 如果您想使用窗口大小作为画布的大小，可以将 `window-size` 属性设置为 `true`.

```vue
<template>
  <TresCanvas window-size>
    <!-- 这里是您的场景 -->
  </TresCanvas>
</template>
```

或者您可以使用CSS来设置画布的尺寸。

```css
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}
#canvas {
  height: 100%;
  width: 100%;
}
```

## 预设配置

Tres 为 `TresCanvas` 组件提供了一些预设配置。您可以通过设置 `preset` 属性来使用它们。

### Realistic

`realistic` 预设可以更容易更逼真的为3D场景设置渲染器。

```vue
<template>
  <TresCanvas preset="realistic">
    <!-- 这里是您的场景 -->
  </TresCanvas>
</template>
```

这相当于：

```ts
renderer.shadows = true
renderer.physicallyCorrectLights = true
renderer.outputColorSpace = SRGBColorSpace
renderer.toneMapping = ACESFilmicToneMapping
renderer.toneMappingExposure = 3
renderer.shadowMap.enabled = true
renderer.shadowMap.type = PCFSoftShadowMap
```

## 配置项

| 配置 | 描述 | 默认值 |
| ---- | ---- | --- |
| **alpha** | 控制默认清除 alpha 值。设置为 true 时，该值为 0，否则为 1。 | `false` |
| **antialias** | 是否进行抗锯齿处理。 | `true` |
| **camera** | 由渲染器指定相机。 | |
| **clearColor** | 清除画布后渲染器显示颜色。 | `#000000` |
| **context** | 将渲染器附加到现有的 [RenderingContext](https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext) | |
| **depth** | 绘图缓冲区是否至少具有16位的[深度缓冲区](https://en.wikipedia.org/wiki/Z-buffering) 。 | `true` |
| **disableRender** | 禁用 `requestAnimationFrame` 上的渲染，这对于后期处理非常有用。 | `false` |
| **failIfMajorPerformanceCaveat** | 在性能较低时，是否检测渲染器创建失败。详细信息请参阅[WebGL](https://registry.khronos.org/webgl/specs/latest/1.0/#5.2)规范。 | `false` |
| **logarithmicDepthBuffer** | 是否使用深度缓冲区。如果在单个场景中处理巨大的比例差异，可能需要使用此选项。请注意，如果使用，此设置将使用gl_FragDepth，这将禁用[Early Fragment Test](https://www.khronos.org/opengl/wiki/Early_Fragment_Test)优化，可能会导致性能下降。 | `false` |
| **outputColorSpace** | 定义输出编码 | `LinearEncoding` |
| **powerPreference** | 用户代理适合此WebGL上下文的GPU配置。可选"high-performance"（高性能）, "low-power"（低功耗）或 "default"（默认）。 | `default` |
| **precision** | 着色器精度。可选"highp"（高精度）, "mediump"（中精度）或 "lowp"（低精度）。 | "highp" 需要设备支持 |
| **premultipliedAlpha** | 渲染器是否假定颜色具有 [premultiplied alpha](https://en.wikipedia.org/wiki/Glossary_of_computer_graphics#premultiplied_alpha). | `true` |
| **preserveDrawingBuffer** | 是否保留缓冲区直到手动清除或覆盖。 | `false` |
| **shadows** | 渲染器是否启用阴影。 | `false` |
| **shadowMapType** | 设置阴影映射类型 | `PCFSoftShadowMap` |
| **stencil** | 绘图缓冲区是否至少具有8位的 [模板缓冲区](https://en.wikipedia.org/wiki/Stencil_buffer) 。 | `true` |
| **toneMapping** | 定义渲染器使用的色调映射曝光。 | `NoToneMapping` |
| **toneMappingExposure** | 色调映射的曝光级别。 | `1` |
| **useLegacyLights** | 是否使用传统照明模式 | `true` |
| **windowSize** | 是否使用窗口大小作为画布大小，否则使用父元素大小。 | `false` |

### 默认值
Tres尽量少做主观判断。这就是为什么它几乎不设置 `TresCanvas` 组件的任何默认值的原因。它使用[three.js](https://threejs.org/)的默认值。唯一的例外是 `antialias` 属性，默认设置为 `true`。


## 公共属性

| 属性 | 描述 |
| ---- | ---- |
| context | 详情查看 [useTresContext](composables#usetrescontext) |
