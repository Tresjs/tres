# Einfache Animationen

Diese Anleitung wird dir helfen, mit grundlegenden Animationen in TresJS zu beginnen.

Wir werden eine einfache Szene mit einem Würfel erstellen. Anschließend animieren wir den Würfel, sodass er sich um die Y- und Z-Achse dreht.

<SandboxDemo url="https://play.tresjs.org/#eNqVVF1P2zAU/StW9kAZbVI+hTqKOjo0bRofYrwRHkxy2xoc27KdtlD1v+8mTloHBipSH5rjc889vh9eBLcazHelwmkOQS84MYlmyhIDNleEUzHux4E1cXAaC5YpqS1ZEDOhnMvZDYzIkoy0zMgWRm998yiF6pCKKTVtkhu4AZGC/iOlWkUMLFIeTZRI3Qy90g/MDqWwWnLzls5AWGmKiFgkUhhLHuS8sNL3fLVEzvm2x1kQKar0/aahlqO541ZrQVLglrYJcKoMpGS5TfqnZBELQtiItFyycEp5DtsOJpUDB4ZaWmqZFOEz2ek7NczwPu0FHdXJvpJuuFeyl7FYFs5OItcRrD9+WMgUpxbwi5CTdZFJwoHqTiK51NiwL8d7P86Gh3FQlCSVM0MoVxNKZkzgV8ewF6eAGs1qRxVciV+DNgoSy6YwpBloWp8S0lPSsMI/prvbbZO9Njm8jwOPMJJTPDtAFx5ISz3EdxuwQPcIdsMmPCrR3W63u4ZfWbwAMyEaRshz5cVL90xCObgkJKHGdlwZVpFV7Jmc/wSZgdXP6EyPTXWX4od38VJ5yS6lzii/wCZoRrlvJ6oprjvlp2sPAieR17ugHbhx72RUhY9GCly9cpbi6gA3rldPVxz4u1IcxMHEWmV6UZSkAuNxyNhUhwJsJFQW+fTBfngYdqOUGRsVMLLjoP1G2G3VZ7RdBMof+fIV3MxiZ0CfFBWbeF9xBwchjkOlXINhxooYX3uiYSPdgjdAxcNj9LsDJvPLgM8XPgob19ejD3a7ZYFxs2AeZs3qVjycPg3pJ4RdwEfSSOykkLENRGtqcfmD8Cji7MGXrB8bnElr8LEcsfGriUxkphgHfaWKfW9OZvng/i4xq3NY+UsmkDz9B380c2f5GocF9BTLvW4lriBYd3z+9xLm+H91mMk051Vz3jm8ASN5Xnh0tLNcpGjb45Vuf5ULxsT41pzPLQhTX6ph1D4rKNG7er9Xs+aA+7JwJb9sx/CDKq1vth/urwq+/AdyGHHw" />

## useRenderLoop

Das Composable `useRenderLoop` ist das Herzstück der Animationen in TresJS. Es ermöglicht dir, eine Funktion zu registrieren, die jedes Mal ausgeführt wird, wenn der Renderer die Szene aktualisiert.

Weitere Informationen zur Funktionsweise gibt es in der Dokumentation von [useRenderLoop](/api/composables#userenderloop).

```ts
const { onLoop } = useRenderLoop()

onLoop(({ delta, elapsed }) => {
  // wird bei jeder Bildaktualisierung ausgeführt (60FPS, abhängig vom Monitor
})
```

## Eine Referenz zum Würfel bekommen

Um den Würfel zu animieren, benötigen wir eine Referenz via eines [Template-Ref](https://vuejs.org/guide/essentials/template-refs.html). Dazu verwenden wir die `ref`-Eigenschaft an der `TresMesh`-Komponente damit wir Zugriff auf die THREE-Instanz bekommen.

Um die Performance zu verbessern, verwenden wir ein [Shallow Ref](https://v3.vuejs.org/guide/reactivity-fundamentals.html#shallow-reactivity), zum Speichern der Referenz. Warum wir keine reguläre Referenz benutzen, kannst du [hier](../advanced/caveats.md#reactivity) nachlesen.

```vue
<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'

const boxRef: ShallowRef<TresInstance | null> = shallowRef(null)
</script>

<template>
  <TresCanvas>
    <TresMesh
      ref="boxRef"
      :scale="1"
    >
      <TresBoxGeometry :args="[1, 1, 1]" />
      <TresMeshNormalMaterial />
    </TresMesh>
  </TresCanvas>
</template>
```

## Den Würfel animieren

Jetzt, wo wir eine Referenz zum Würfel haben, können wir ihn animieren. Wir werden den `onLoop`-Callback verwenden, um die Rotation des Würfels zu aktualisieren.


```ts
onLoop(({ delta, elapsed }) => {
  if (boxRef.value) {
    boxRef.value.rotation.y += delta
    boxRef.value.rotation.z = elapsed * 0.2
  }
})
```

Du kannst auch das `delta` der [internen Uhr von THREE](https://threejs.org/docs/?q=clock#api/en/core/Clock) oder `elapsed` nutzen, um den Würfel zu animieren.

## Aber warum nicht die Reaktivität nutzen?

Du fragst dich vielleicht, warum wir keine Reaktivität nutzen, um den Würfel zu animieren. Die Antwort ist einfach: Performance.

```vue
// Das ist keine gute Idee ❌
<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'

const boxRotation = reactive([0, 0, 0])

onLoop(({ delta, elapsed }) => {
  boxRotation[1] += delta
  boxRotation[2] = elapsed * 0.2
})
</script>
```

Als Vue Entwickler mag es intiuitiv scheinen, Reaktivität zu nutzen, um den Würfel zu animieren, aber das wäre eine schlechte Idee.
Der Grund ist, dass [die Reaktivität von Vue auf Proxies basiert](https://vuejs.org/guide/extras/reactivity-in-depth.html#how-reactivity-works-in-vue) und nicht dafür ausgelegt ist, in einem Render-Loop verwendet zu werden, der 60 oder mehr Mal pro Sekunde ausgeführt wird.

Die unten eingebettete Seite zeigt den [Performancestest eines Proxy im Vergleich zu einem regulären Objekt](https://measurethat.net/Benchmarks/Show/12503/0/object-vs-proxy-vs-proxy-setter). Wie du sehen kannst, ist der Proxy 5 Mal langsamer als das reguläre Objekt.

<EmbedExperiment src="https://measurethat.net/Embed?id=399142" />

Mehr darüber kannst du im Abschnitt [Caveats](../advanced/caveats.md#reactivity) lesen.
