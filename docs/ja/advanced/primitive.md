# プリミティブ

`<primitive />`コンポーネントは、TresJSの汎用性の高い低レベルコンポーネントであり、これを使用すると、任意のThree.jsオブジェクトを抽象化せずにVueアプリケーションで直接使用できます。Vueの反応性システムとThree.jsのシーングラフの間のブリッジとして機能します。

## 使い方

```html
<script setup lang="ts">
  // three.jsから必要なクラスをインポートする
  import { Mesh, BoxGeometry, MeshBasicMaterial } from "three";
  // ジオメトリとマテリアルを作成する
  const geometry = new BoxGeometry(1, 1, 1);
  const material = new MeshBasicMaterial({ color: 0x00ff00 });
  // ジオメトリとマテリアルを使用してメッシュを作成する
  const meshWithMaterial = new Mesh(geometry, material);
</script>

<template>
  <TresCanvas>
    <primitive :object="meshWithMaterial" />
  </TresCanvas>
</template>
```

## プロパティーズ

`object`: プロパティは、three.jsまたはその派生クラスの1つからの`Object3D`オブジェクトを期待します。 `<primitive />`コンポーネントがレンダリングするメインオブジェクトです。`マテリアル`とともにプロパティに渡されます。

## モデルとの使用

`<primitive />`コンポーネントは、外部ソースからロードされたモデルなどの複雑なオブジェクトをレンダリングする場合に特に便利です。次の例は、GLTFファイルからモデルをロードし、`<primitive />`コンポーネントを使用してレンダリングする方法を示しています。

```html
<script lang="ts" setup>
  import { useGLTF } from "@tresjs/cientos";
  const { nodes } = await useGLTF("/models/AkuAku.gltf");
</script>

<TresCanvas>
  <Suspense>
    <primitive :object="nodes.AkuAku" />
  </Suspense>
</TresCanvas>
```
