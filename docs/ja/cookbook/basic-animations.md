---
title: 基本アニメーション
description: useRenderLoopというコンポーザブルを使用してオブジェクトをアニメーション化する方法。
author: alvarosabu
thumbnail: /recipes/animations.png
difficulty: 0
---

# 基本アニメーション

このガイドは、TresJSでの基本的なアニメーションの開始に役立ちます。

キューブを使った簡単なシーンを構築します。次に、キューブをY軸とZ軸を中心に回転するようにアニメーション化します。

<SandboxDemo url="https://play.tresjs.org/#eNqVVF1P2zAU/StW9kAZbVI+hTqKOjo0bRofYrwRHkxy2xoc27KdtlD1v+8mTloHBipSH5rjc889vh9eBLcazHelwmkOQS84MYlmyhIDNleEUzHux4E1cXAaC5YpqS1ZEDOhnMvZDYzIkoy0zMgWRm998yiF6pCKKTVtkhu4AZGC/iOlWkUMLFIeTZRI3Qy90g/MDqWwWnLzls5AWGmKiFgkUhhLHuS8sNL3fLVEzvm2x1kQKar0/aahlqO541ZrQVLglrYJcKoMpGS5TfqnZBELQtiItFyycEp5DtsOJpUDB4ZaWmqZFOEz2ek7NczwPu0FHdXJvpJuuFeyl7FYFs5OItcRrD9+WMgUpxbwi5CTdZFJwoHqTiK51NiwL8d7P86Gh3FQlCSVM0MoVxNKZkzgV8ewF6eAGs1qRxVciV+DNgoSy6YwpBloWp8S0lPSsMI/prvbbZO9Njm8jwOPMJJTPDtAFx5ISz3EdxuwQPcIdsMmPCrR3W63u4ZfWbwAMyEaRshz5cVL90xCObgkJKHGdlwZVpFV7Jmc/wSZgdXP6EyPTXWX4od38VJ5yS6lzii/wCZoRrlvJ6oprjvlp2sPAieR17ugHbhx72RUhY9GCly9cpbi6gA3rldPVxz4u1IcxMHEWmV6UZSkAuNxyNhUhwJsJFQW+fTBfngYdqOUGRsVMLLjoP1G2G3VZ7RdBMof+fIV3MxiZ0CfFBWbeF9xBwchjkOlXINhxooYX3uiYSPdgjdAxcNj9LsDJvPLgM8XPgob19ejD3a7ZYFxs2AeZs3qVjycPg3pJ4RdwEfSSOykkLENRGtqcfmD8Cji7MGXrB8bnElr8LEcsfGriUxkphgHfaWKfW9OZvng/i4xq3NY+UsmkDz9B380c2f5GocF9BTLvW4lriBYd3z+9xLm+H91mMk051Vz3jm8ASN5Xnh0tLNcpGjb45Vuf5ULxsT41pzPLQhTX6ph1D4rKNG7er9Xs+aA+7JwJb9sx/CDKq1vth/urwq+/AdyGHHw" />

## useRenderLoop

`useRenderLoop`コンポーザブルはTresJSアニメーションの中核です。これにより、レンダラーがブラウザのリフレッシュレートでシーンを更新するたびに呼び出されるコールバックを登録できます。

詳細な説明については、[useRenderLoop](/api/composables#userenderloop)のドキュメントを参照してください。

```ts
const { onLoop } = useRenderLoop();

onLoop(({ delta, elapsed }) => {
  // 毎フレーム60FPSで実行します（モニターによって異なります）
});
```

## キューブへの参照を取得する

キューブをアニメーション化するには、その参照を取得する必要があります。これは、`ref`プロパティを使用して[テンプレート参照](https://vuejs.org/guide/essentials/template-refs.html)を`TresMesh`コンポーネントに渡すことで実行できます。これにより、THREEインスタンスが返されます。

パフォーマンスを向上させるために、通常のRefの代わりに[Shallow Ref](https://v3.vuejs.org/guide/reactivity-fundamentals.html#shallow-reactivity)を使用して参照を保存します。理由については[こちら](../advanced/caveats.md#reactivity)を参照してください。

```vue
<script setup lang="ts">
import { TresCanvas } from "@tresjs/core";

const boxRef: ShallowRef<TresInstance | null> = shallowRef(null);
</script>

<template>
  <TresCanvas>
    <TresMesh ref="boxRef" :scale="1">
      <TresBoxGeometry :args="[1, 1, 1]" />
      <TresMeshNormalMaterial />
    </TresMesh>
  </TresCanvas>
</template>
```

## キューブのアニメーション化

キューブへの参照ができたので、アニメーション化できます。`onLoop`コールバックを使用して、キューブの回転を更新します。

```ts
onLoop(({ delta, elapsed }) => {
  if (boxRef.value) {
    boxRef.value.rotation.y += delta;
    boxRef.value.rotation.z = elapsed * 0.2;
  }
});
```

内部の[THREEクロック](https://threejs.org/docs/?q=clock#api/en/core/Clock)の`delta`または`elapsed`を使用してキューブをアニメーション化することもできます。

## なぜreactivityを使用しないのか?

キューブをアニメーション化するのにリアクティブ性を使用しないのはなぜかと疑問に思うかもしれません。答えは簡単にパフォーマンスです。

```vue
// これはダメです ❌
<script setup lang="ts">
import { TresCanvas } from "@tresjs/core";

const boxRotation = reactive([0, 0, 0]);

onLoop(({ delta, elapsed }) => {
  boxRotation[1] += delta;
  boxRotation[2] = elapsed * 0.2;
});
</script>
```

キューブをアニメーション化するためにリアクティブを使用する誘惑に駆られるかもしれませんが、それは良い考えではありません。その理由は、[Vueのリアクティブはプロキシに基づいている](https://vuejs.org/guide/extras/reactivity-in-depth.html#how-reactivity-works-in-vue)ため、1秒あたり60回以上更新されるレンダリング ループで使用するように設計されていないためです。

下記のページでは、[プロキシと通常のオブジェクトのベンチマーク](https://measurethat.net/Benchmarks/Show/12503/0/object-vs-proxy-vs-proxy-setter)が表示されています。ご覧のとおり、プロキシは通常のオブジェクトよりも5倍遅いです。

<EmbedExperiment src="https://measurethat.net/Embed?id=399142" />

詳細については、[注意事項](../advanced/caveats.md#reactivity)セクションをご覧ください。
