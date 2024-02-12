# 光影

本指南将帮助你开始在 TresJS 中使用简单的光照和阴影。

我们将构建一个包含三个网格和一个平面的简单场景，但只有两个网格会有阴影。

<SandboxDemo url="https://play.tresjs.org/#eNqVVt1y2jwQfRUN30WSKdimhLbjL3Qo9GfaadpM4K7uhbAXUGpLGkn8pJm8e1eSDXZCMmRCGGv37NHZ1XrFXWuqQH+QMlivoBW3LnSqmDREg1lJklO+GCQto5PW+4SzQgplyB3RS5rnYnMNc3JP5koU5ASjT/6vQSzrmPI11W2y0nANPAP1XQhZBQwNIm50mArVjPypZsyMBTdK5HrHv4Mz4EboRsSIapZOljQTm0sq22Ry/WU0FrlQE0lTaJMfYio4oEsyvtgxmqUCOEl4wlPBtSGLnAzIXcIJSXOgyhHE5OS/d68/jsb9k7b1YOK4iY6JUStwFprLJY3JnObaGzwEN5veSogfarMIsTJyhRlWAuOHgi3I7BXHzQTQfb9XPRNbewyD2pmcnu3dd0RwW3XMetA8B4/y3tPTMzJ475Nn81PPGaxpvoIzZ6xbAiUMNUzw4Ja8GpAoiLoWgpruHWXCL0LfRNgyuDBQyJwawBUhF/u+IOvOjPEM22uRJy2ywWex6Wj21yMR2+yEsDJbiitQWkJq2BrGtABFSSyFZlYWEv7qt8nbwH/9Ru54LtZoPu/bZ+oCcdm1K45Hjc9R4FZzt+hGUYSrxoaXoJfNPTqv2wQ/kdugqol1RG1ySc0yuPrqvSVNlTye5BcQBRh1i2LUQtuYbpt0reCeZas2rm09FYIjKShGc5LaVsGosjXrUsMq4JF2BXMM8QeJESnVpuN7tZkWqrefR7pHYntAttVcfb1I+vln+3ec9LrWplisvz2Gx2oncglqX+ejZX0ejaLe6NiKpoD991QVO71DzdEpW4OErnkOab/CqXuoRRC8/3+i2BNDeUZV9jiz+Vv791Rmtdw+FDM7Y7+zxdKQmHEDHPO6LV+YxkvxkWENbGY09/Dnumr3rhym9HL8aEDDRVibG612yw/7TkFlcKMFx5vKDaakdOAFFfv5ZW31u8U6ktbSGKnjMEwzjvEZ5GytAg4m5LII6/BhL+gHUZgxbUJrRnTSchO5QexvoZdw+wikf1OnL83NXcwG6B+JTXAE/w47PA9wiJXMlTEomI2pc9tb7xheixsiY/8d6n0FuqiXAW97vEyOrm8NPuxGrsA47WEbFM3qljhsIAXZC4h9wHPUCOxkULAjSCuoTf48eBPmbFanrO467Emj8ZKds8WDjkxFIVkO6qe03d/sTHdHf3O23U8IF7OE9M8B+43eeslX2Cyg1lju/VHiZADj3Z8mP2CLzztnIbJVXh7OE85r0CJfWY0eNlrxDGXXcE7tV/eC4Q+Pqf60dW9umVRDqMFfO876q5pJu17zht+ucA7vjmP8TJX2mfWC3q7g9/8AWlN6bg==" />

## 设置场景（可选）

我们导入所有需要的模块，为了方便，我们可以使用 cientos 中的轨道控制器，[点击此处了解如何使用](/examples/orbit-controls)。

让我们在场景中放置四个对象，一个将是接收阴影的平面，其中两个将投射阴影，最后一个根本不会投射任何阴影。

我将使用 [MeshToonMaterial](https://threejs.org/docs/index.html?q=toon#api/en/materials/MeshToonMaterial)。仅仅是因为我们可以轻松地看到“柔和的阴影”。

```vue
<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { OrbitControls } from '@tresjs/cientos'
</script>

<template>
  <TresCanvas
    clear-color="#111"
    window-size
  >
    <OrbitControls />
    <TresPerspectiveCamera :position="[5, 7.5, 7.5]" />

    <TresMesh
      :position="[-2, 2, 0]"
      :rotation="[0, Math.PI, 0]"
    >
      <TresConeGeometry :args="[1, 1.5, 3]" />
      <TresMeshToonMaterial color="#82DBC5" />
    </TresMesh>
    <TresMesh
      :position="[0, 0, 0]"
    >
      <TresBoxGeometry :args="[1.5, 1.5, 1.5]" />
      <TresMeshToonMaterial color="#4F4F4F" />
    </TresMesh>
    <TresMesh
      :position="[2, -2, 0]"
    >
      <TresSphereGeometry />
      <TresMeshToonMaterial color="#FBB03B" />
    </TresMesh>
    <TresMesh
      :position="[0, -3, 0]"
      :rotation="[-Math.PI / 2, 0, 0]"
    >
      <TresPlaneGeometry :args="[10, 10, 10, 10]" />
      <TresMeshStandardMaterial color="#f7f7f7" />
    </TresMesh>
  </TresCanvas>
</template>
```

## 光照（说明）

如你所知，[ThreeJs](https://threejs.org/) 中的每个实例在 **TresJs** 中都是可用的，所有类型的灯光也是如此，我们只需要添加 `Tres` 前缀即可使用它们。

但并非所有灯光都能投射阴影，这个设定直接来自 ThreeJs 并且合乎情理，例如，[ambientLight](https://threejs.org/docs/index.html?q=ambient#api/en/lights/AmbientLight) 的目的是照亮场景的每一面，因此让它投射阴影毫无意义，相反，模仿太阳的 [DirectionalLight](https://threejs.org/docs/index.html?q=light#api/en/helpers/DirectionalLightHelper) 可以且应该投射阴影。

## 阴影（说明）

阴影也有很多类型，例如，“柔和阴影”会在物体从一侧接收到更多光线时自动生成，但总的来说，需要投射到另一个表面的“ThreeJS 默认阴影”需要由一个网格投射，另一个网格需要接收它。正如我们在示例中看到的，`Plane` 正在接收阴影，但不会投射阴影。请注意，并非所有材质都能投射或接收阴影。

在内部，ThreeJS 会自动生成一个带有 [ShadowMaterial](https://threejs.org/docs/index.html?q=shado#api/en/materials/ShadowMaterial) 的新网格，该网格会在每一帧中更新，这就是为什么如果你应用动画，阴影也会被动画化，但也正是为什么你必须谨慎使用阴影，因为它们可能会降低你的性能。

::: warning
过度使用阴影可能会降低你的性能。但是，有一些方法可以提高你的性能，有关更多信息，请查看 [此视频](https://youtu.be/WGNvVGrS0kY?si=q7XyL5eABKUh3gbS&t=1256)。
:::

## 启用阴影

我们可以将此分为三个步骤：

### 在渲染器上激活阴影

```vue
//...

<template>
  <TresCanvas
    clear-color="#111"
    shadows
    window-size
  />
  //...
</template>
```

### 设置光线以投射阴影

我们可以简单地放置布尔值 `cast-shadow`，Vue 将其理解为具有 `true` 值的 `prop`

_AmbientLight 在这里不会生成任何类型的阴影_

```vue
//...

<template>
  <TresAmbientLight :intensity="1" />
  <TresDirectionalLight
    cast-shadow
    :position="[0, 2, 0]"
    :intensity="1"
  />
  
  //...
</template>
```

### 设置对象以投射或接收阴影

与上一步类似，我们使用 `cast-shadow` prop 设置我们要投射阴影的网格（我们的球体），并使用 `receive-shadow` prop 设置要接收阴影的对象（我们的平面）。

```vue
//...

<template>
  <TresMesh
    cast-shadow
    :position="[2, -2, 0]"
  >
    <TresSphereGeometry />
    <TresMeshToonMaterial color="#FBB03B" />
  </TresMesh>
  <TresMesh
    receive-shadow
    :position="[0, -3, 0]"
    :rotation="[-Math.PI / 2, 0, 0]"
  >
    <TresPlaneGeometry :args="[10, 10, 10, 10]" />
    <TresMeshStandardMaterial color="#f7f7f7" />
  </TresMesh>
  //...
</template>
```

现在，我们已经完成了向场景添加阴影所需的所有必要步骤，如果我们应用我们在 [基本动画](/examples/basic-animations) 中学到的知识，并为我们的立方体添加运动，你将看到阴影也会随之动画化 🤩

```vue
<script setup>
import { shallowRef } from 'vue'
import { TresCanvas, useRenderLoop } from '@tresjs/core'

const boxRef = shallowRef()

const { onLoop } = useRenderLoop()

onLoop(() => {
  if (boxRef.value) {
    boxRef.value.rotation.y += 0.01
  }
})
</script>

<template>
  //...
  <TresMesh
    ref="boxRef"
    cast-shadow
    :position="[0, 0, 0]"
  >
    <TresBoxGeometry :args="[1.5, 1.5, 1.5]" />
    <TresMeshToonMaterial color="#4F4F4F" />
  </TresMesh>
  //...
</template>
```

_请注意，我特意没有对 `Cone` 应用 `cast-shadow`，因此它不会投射任何阴影_
