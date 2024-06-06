# v-light-helper 🔆

**TresJS**が提供する新しいディレクティブv-light-helperを使用すると、たった1行のコードでヘルパーをライトにすばやく追加できます。😍

次のライトの種類を使うことができます。

- DirectionalLight
- PointLight
- SpotLight
- HemisphereLight

## 使い方

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
