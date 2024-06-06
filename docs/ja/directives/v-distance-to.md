# v-distance-to

2つのObject3D間の距離を計算しようとしたことがありますか?

新しいディレクティブ`v-distance-to`を使用すると、これまでよりも簡単になり、測定を実行するターゲット オブジェクトを指定するだけで、結果がコンソールに表示されます。

さらに、測定しているオブジェクトを示す矢印が作成されます。

```vue{2,8,13}
<script setup lang="ts">
import { OrbitControls, Sphere, vLog } from '@tresjs/cientos'
</script>
<template>
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[0, 2, 5]" />
    <Sphere
      ref="sphere1Ref"
      :position="[-2, slider, 0]"
      :scale="0.5"
    />
    <Sphere
      v-distance-to="sphere1Ref"
      :position="[2, 0, 0]"
      :scale="0.5"
    />
    <TresGridHelper :args="[10, 10]" />
    <OrbitControls />
  </TresCanvas>
</template>
```

`v-distance-to`の使用はリアクティブなので、`@tres/leches`と完全に連携します。 🍰

::: warning
`v-distance-to`は、renderLoop内で移動するオブジェクトを測定しません。
:::
