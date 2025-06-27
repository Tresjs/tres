# v-light-helper 🔆

使用 **TresJS** 提供的新指令 v-light-helper，您只需一行代码即可快速为灯光添加相应的辅助工具😍。

支持以下灯光类型：
- DirectionalLight 方向光
- PointLight 点光源
- SpotLight 聚光灯
- HemisphereLight 半球光

## 推荐使用

```vue{2,8,11,14,17}
<script setup lang="ts">
import { OrbitControls, Sphere, vLightHelper } from '@tresjs/cientos'
</script>
<template>
  <TresCanvas >
    <TresPerspectiveCamera :position="[0, 2, 5]" />
    <TresDirectionalLight
      v-light-helper
    />
    <TresPointLight
      v-light-helper
    />
    <TresSpotLight
      v-light-helper
    />
    <TresHemisphereLight
      v-light-helper
    />
  </TresCanvas>
</template>
```
