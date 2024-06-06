# 注目 😱

Tres.jsの目標は、Vue.jsでThree.jsを使用する簡単な方法を提供し、最高のDXを提供することです。 ただし、注意すべき点がいくつかあります。

## ~~HMRとThree.js~~

:::info

**TresJS** v1.7.0 🎉で修正されました。これで、ページをリロードしなくてもHMRを使用できるようになります。🥹

:::

ホットモジュールリプレイスメント(HMR)は、ページをリロードせずにコードを更新できる機能です。 これは開発を大幅に高速化する優れた機能です。 そのため、**TresJS** は[Vite](https://vitejs.dev/)を使用します。 ただし、Three.jsでこれを正しく行うのは非常に複雑です。

なぜなら、Tresは宣言的にシーンを設定するからです。 これは、コンポーネントがマウントされるときにインスタンスを作成し、それをシーンに追加することを意味します。複雑なのは、シーンからインスタンスをいつ削除し、いつ追加し直すかを判断することにあります。

最小限のクリーンアップ メカニズムが実装されていますが、完全ではありません。 これは、特に[TemplateRefs](https://v3.vuejs.org/guide/component-template-refs.html)経由でインスタンスを参照する場合、変更を正しく確認するためにページをリロードする必要場合があります。

```vue
<script setup lang="ts">
const boxRef: Ref<TresInstance | null> = ref(null);

onLoop(({ _delta, elapsed }) => {
  if (boxRef.value) {
    boxRef.value.rotation.y += 0.01;
    boxRef.value.rotation.z = elapsed * 0.2;
  }
});
</script>

<template>
  <TresMesh ref="boxRef" :scale="1" cast-shadow>
    <TresBoxGeometry :args="[1, 1, 1]" />
    <TresMeshStandardMaterial color="teal" />
  </TresMesh>
</template>
```

`TresMeshStandardMaterial`コンポーネントのインスタンスの`color` プロパティを変更すると、変更は適用されますが、回転は機能しなくなります。 これは、インスタンスが削除されて再作成されるためです。

:::tip
**経験則**として、加えた変更が表示されない場合はとりあえず一回ページをリロードする必要があります。
:::

現在これに対するより良い解決策の開発に取り組んでいます 😁。 これをより最適に解決する方法を見つかった場合は、ぜひ連絡ください。

[HMR 廃棄ディスカッション](https://github.com/Tresjs/tres/issues/23) でディスカッションをフォローできます。

## リアクティビティー

リアクティビティーが好きです 💚。Vue.jsの最も強力な機能の1つです。ただし、Three.jsを使用する場合は注意が必要です。

Vueの反応性は[プロキシ](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Proxy)に基づいています。 これにより、Vue 3はデータオブジェクトへの変更を自動的に追跡し、データが変更されるたびに対応するDOM要素を更新できるようになります。

シーンをレンダリングしてフレーム(60FPS)ごとに更新しているため、1秒あたり60回シーンを更新していることになります。更新されるオブジェクトがリアクティブである場合、Vueはこのオブジェクトを何度でも更新しようとします。それはパフォーマンスに悪影響がありますので、おすすめはしません😅。

以下は、プロキシオブジェクトと単純なオブジェクトの使用の違いを示すベンチマークです。

<figure>
  <img src="/proxy-benchmark.png" alt="プロキシ対単純オブジェクト" style="width:100%">
  <figcaption>図1 - 1秒あたりの実行数: オブジェクトとプロキシ。</figcaption>
</figure>

出典: [プロキシ対プレーンオブジェクト](https://www.measurethat.net/Benchmarks/Show/12503/0/object-vs-proxy-vs-proxy-setter)

どうしてもリアクティビティーを使用する必要がある場合は、[shallowRef](https://vuejs.org/api/reactivity-advanced.html#shallowref)を使用してください。

`ref()`とは異なり、浅い参照の固有値はそのまま保存され、公開されます。`.value`へのアクセスのみがリアクティブです。出典: [Vue.js ドキュメント](https://vuejs.org/api/reactivity-advanced.html#shallowref)

### 例

❌ 誤

```vue
<script setup lang="ts">
const position = reactive({ x: 0, y: 0, z: 0 });

onLoop(({ _delta, elapsed }) => {
  position.x = Math.sin(elapsed * 0.1) * 3;
});
</script>

<template>
  <TresMesh :position="position" cast-shadow>
    <TresBoxGeometry :args="[1, 1, 1]" />
    <TresMeshStandardMaterial color="teal" />
  </TresMesh>
</template>
```

✅ 正

```vue
<script setup lang="ts">
const position = { x: 0, y: 0, z: 0 };
const boxRef: ShallowRef<TresInstance | null> = shallowRef(null);

onLoop(({ _delta, elapsed }) => {
  boxRef.value.position.x = Math.sin(elapsed * 0.1) * 3;
});
</script>

<template>
  <TresMesh ref="boxRef" :position="position" cast-shadow>
    <TresBoxGeometry :args="[1, 1, 1]" />
    <TresMeshStandardMaterial color="teal" />
  </TresMesh>
</template>
```
