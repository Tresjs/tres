# v-log

### 問題

インスタンスをログに記録する必要がある場合は、テンプレート参照を使用してログを記録する必要があります。

```vue
<script setup lang="ts">
import { shallowRef, watch } from "vue";

const sphereRef = shallowRef();

watch(sphereRef, (value) => {
  console.log(value); // 本当にログ記録のため？ 😫
});
</script>

<template>
  <TresCanvas>
    <TresPerspectiveCamera :position="[0, 2, 5]" />
    <Sphere ref="sphereRef" :scale="0.5" />
    <OrbitControls />
  </TresCanvas>
</template>
```

単純なログのためだけに、これは膨大なコードだと思いませんか?

## 使い方

**TresJS**が提供する新しいディレクティブv-logを使用すると、インスタンスに`v-log`を追加するだけで行うことができます。

```vue{2,10,12}
<script setup lang="ts">
import { OrbitControls, Sphere, vLog } from '@tresjs/cientos'
</script>
<template>
    <TresCanvas >
    <TresPerspectiveCamera :position="[0, 2, 5]" />
    <Sphere
      ref="sphereRef"
      :scale="0.5"
      v-log:material  <!-- materialだけをログします 🎉 -->
    />
    <OrbitControls v-log />
  </TresCanvas>
</template>
```

`v-log:material`などのプロパティの名前を持つ修飾子を渡すことができ、これにより`material`プロパティが直接ログに記録されること可能です。 😍
