# v-always-look-at 👀

**TresJS**が提供する新しいディレクティブv-always-look-atを使用すると、[Object3D](https://threejs.org/docs/index.html?q=object#api/en/core/Object3D)コマンドを簡単に追加できます。常に特定の位置を確認するには、Vector3またはArrayとして渡すことができます。

## 使い方

```vue{3,9}
<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { Box, vAlwaysLookAt } from '@tresjs/cientos'
</script>
<template>
    <TresCanvas >
      <TresPerspectiveCamera :position="[0, 2, 5]" />
      <Box
        v-always-look-at="new Vector3(0, 0, 0)"
      />
  </TresCanvas>
</template>
```

`Box`がどこに移動しても、常に位置[0,0,0]を参照します。

### 組み込みメソッドのlook-atを使用してみてはいかがでしょうか?

メソッド`:look-at`を使用すると、インスタンスがマウントされるときにその位置を1回だけ見るように指示するため、オブジェクトが変更されても更新されないということです。

### 他のインスタンスも見ることができます

もう1つの利点は、次のように、たとえばカメラを使用して、動いているインスタンスを見ることができることです。

```vue{4,6,20,23}
<script setup lang="ts">
import { shallowRef } from 'vue'
import { TresCanvas, useRenderLoop } from '@tresjs/core'
import { Box, vAlwaysLookAt } from '@tresjs/cientos'

const sphereRef = shallowRef()

const { onLoop } = useRenderLoop()

// ここで球の位置を更新すると、カメラは常にオブジェクトを追跡します。
onLoop(({ elapsed }) => {
  if (sphereRef.value) {
    sphereRef.value.value.position.y = Math.sin(elapsed) * 1.5
  }
})
</script>
<template>
    <TresCanvas >
      <TresPerspectiveCamera :position="[0, 2, 5]"
        v-always-look-at="sphereRef"
      />
      <Sphere
        ref="sphereRef"
        :scale="0.5"
      />
  </TresCanvas>
</template>
```
