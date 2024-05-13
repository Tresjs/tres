---
title: 3D 文本
description: 轻松添加3D文本
author: alvarosabu
thumbnail: /recipes/text-3d.png
difficulty: 1
---

# 3D 文本

[TextGeometry](https://threejs.org/docs/index.html?q=text#examples/en/geometries/TextGeometry) 是我们在场景中添加 3D 文本的一种方式。

<SandboxDemo url="https://play.tresjs.org/#eNqdVlFv2zYQ/iuEgsEbZkuOnXSd5gxe7G5YsbRF7LcqD7RES0wokiApO0Hg/74jKduUkWbp8hCYdx+/O3684+k5Wiqi/5Ay3jQkSqOJzhWVBmliGokY5uVVFhmdRb9nnNZSKIOe0TXWNF9UuBDbGyz7aHH71/VMMKEWEuekjz6JpeAEXJLyEu3QWoka9UylCOn9FvDY0DPMN1gfQFMDtnud5EJ1sZ/VipqZ4EYJ9gKcEm6EDnYsyaNpQXFiF/aAvYxnPBdcG1QydIWeM45QzghWLv0U9c7ej+bXs8te33q0O6JOkVENcRbMZIVTtMZMe4OHwFGXT5Kkp8pYhGiMbCDzvTzpqVwWZI56pV35wL2DU00SfzFwDbAwpJYMGwIrhCaBjJvBivICrqxk7soQ/Dn/F6K0JLmhGzLDNVEYpVJoaqjggP466o/6v95lEUr2m7p6H8yLBmi49pE9uxX64E9OAC74nCobWnDM/qFlZbqxh3006qMLGz2l3MBmap7AcR6PwJRjbQZe5TbKJDkeGAyTJFADlto8MfuzMjUD8VaiePL3XGNVUp6iIciJkMRF4dT2y4rYxFJ0Phz+4AxbWpjqsN5l/AzuwxP9BxahFc4fSiUaXgxyX1dnw6GNAzRwkS7BqB/5Sh3UWMb3WnDoPkeftQ5outQHtLawMawjiypjpE6TJC847C8IoxsVc2ISLuskhE/H8WU8TAqqTWLNgM4iV3YdYt9C38PtdwD9u5C+NXejmC3BDxLzt+R+wE4v4mF83jLvjXFN7Z6Q2z4sb+G1uCkwXr6HfH8mug5lgOeh0eTN+gbw6fnQCQydRx7juqtui4MKVqT4DmK/4TVqAA4KUtM3kO6h9vAX8buE0VVIaRmhNHdQk0bD87im5UlF5qKWlBH1Wdqu7VYmZkxsPzrb4Z10eyqSP7xgv9ePPuUvUCxEbUDu41VCjxLj3R8Wn+BpCZy1KBrWXs43nLdEC9bYHD3sGnoQ0g5wLtu/XYNB+y/1h0f34rSH6iRq4El31q/7x+5Qa95w54RzeHcds1dUOp5sHI8Dwfej6XT2hvMW6sHCGkVenpPhSAXceP7N+biffjU2OcyslvQK4S2mJojzoztyb19UCm/jkpqqWQFEAQVoZmIoCvcUAz/WkLROakw5PMeOwq5sEJ38Ekte2ol699Prk6ydJuP5Xm/UnRSD8z6CaTGEUXFEKLK2nyiw75asQ8ca0gTP/zqD3auTP6nCM1FAVZUNw8r1RBjhMASR+5T5uDiu3dy7Ibq6cSLAf6IoZij1okBenSsIJ6/7WhnPu6Mt2v0LMkc7LA=="/>

然而，它不是 ThreeJS 内核的一部分。因此，要使用它，你需要从 `three/addons/controls/TextGeometry` 模块中导入它。

这会产生一个问题，因为 **TresJS** 会自动创建 Three 内核的目录，以便你可以将它们用作组件。

幸运的是，**TresJS** 提供了一种扩展组件目录的方法。你可以使用核心库中的 `extend` 方法来做到这一点。

有关扩展 TresJS 目录的更多信息，请参阅 [extending](/advanced/extending.md) 部分。

## 使用 TextGeometry

要使用 `TextGeometry`，你需要从 `three/addons/geometries/TextGeometry` 模块中导入它。

```js
import { TextGeometry } from 'three/addons/geometries/TextGeometry'
```

然后，你需要使用 `extend` 方法扩展组件目录。

```js
import { extend } from '@tresjs/core'
import { TextGeometry } from 'three/addons/geometries/TextGeometry'

extend({ TextGeometry })
```

[TextGeometry](https://threejs.org/docs/index.html?q=text#examples/en/geometries/TextGeometry) 只需要一个必填参数，即字体，你可以在下面看到一个示例。

```js
const fontPath = 'https://raw.githubusercontent.com/Tresjs/assets/main/fonts/FiraCodeRegular.json'

const loader = new FontLoader()

const font = await new Promise((resolve, reject) => {
  try {
    loader.load(fontPath, (font) => {
      resolve(font)
    })
  }
  catch (error) {
    reject(console.error('cientos', error))
  }
})
```

现在，你可以在场景中的 TresMesh 内使用 `TresTextGeometry` 组件

```vue
<template>
  <TresCanvas
    shadows
    alpha
  >
    <TresMesh>
      <TresTextGeometry
        :args="['TresJS', { font, ...fontOptions }]"
        center
      />
    </TresMesh>
  </TresCanvas>
</template>
```

然后，正如示例中所示，你可以传递一个包含所需配置的对象。

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
}
```

我们还可以传递一个 matcapTexture 来添加最终细节，在 TresMesh 内使用 TresMeshNormalMaterial

```ts
const matcapTexture = await useTexture(['https://raw.githubusercontent.com/Tresjs/assets/main/textures/matcaps/7.png'])
```

```html
<TresMesh>
  <TresTextGeometry :args="['TresJS', { font, ...fontOptions }]" center />
  <TresMeshNormalMaterial :matcap="matcapTexture" />
</TresMesh>
```

因此，最终代码如下所示：

```vue
<script setup lang="ts">
import { extend } from '@tresjs/core'
import { TextGeometry } from 'three/addons/geometries/TextGeometry'
import { FontLoader } from 'three/addons/loaders/FontLoader'
import { useTexture } from '/@/composables'

extend({ TextGeometry })

const fontPath = 'https://raw.githubusercontent.com/Tresjs/assets/main/fonts/FiraCodeRegular.json'

const fontOptions = {
  size: 0.5,
  height: 0.2,
  curveSegments: 5,
  bevelEnabled: true,
  bevelThickness: 0.05,
  bevelSize: 0.02,
  bevelOffset: 0,
  bevelSegments: 4,
}

const loader = new FontLoader()

const font = await new Promise((resolve, reject) => {
  try {
    loader.load(fontPath, (font) => {
      resolve(font)
    })
  }
  catch (error) {
    reject(console.error('cientos', error))
  }
})

const matcapTexture = await useTexture(['https://raw.githubusercontent.com/Tresjs/assets/main/textures/matcaps/7.png'])
</script>

<template>
  <TresCanvas
    shadows
    alpha
  >
    <TresMesh>
      <TresTextGeometry
        :args="['TresJS', { font, ...fontOptions }]"
        center
      />
      <TresMeshNormalMaterial :matcap="matcapTexture" />
    </TresMesh>
  </TresCanvas>
</template>
```

我知道这看起来工作量很大，但好消息是，还有一种更简单的方法

## 来自 `cientos` 的 TextGeometry

`cientos` 包提供了一个名为 `<Text3D />` 的组件，它是 [`three-stdlib`](https://github.com/pmndrs/three-stdlib) 模块中的 `TextGeometry` 的包装器。

最棒的部分？你无需扩展目录，只需传递字体参数即可。
它就能正常工作。💯（如果没有提供文本，则文本将为 TresJS）

```vue
<template>
  <TresCanvas
    shadows
    alpha
  >
    <Text3D :font="fontPath" />
  </TresCanvas>
</template>
```

我们可以将选项作为 props 传递

```html
<Text3D :font="fontPath" text="my 3d text" :size="0.8" />
```

如果未提供选项，则默认值为：

```
size: 0.5,
height: 0.2,
curveSegments: 5,
bevelEnabled: true,
bevelThickness: 0.05,
bevelSize: 0.02,
bevelOffset: 0,
bevelSegments: 4,
```

默认情况下，ThreeJS 中的文本从网格初始位置开始，因此为 [0,0,0]，文本将从那里开始，但我们只需传递标志“center”即可将其居中

```vue
<Text3D :font="fontPath" text="my 3d text" center />
```
