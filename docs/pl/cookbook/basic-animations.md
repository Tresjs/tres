---
title: Podstawowe animacje
description: Jak używać kompozycji useRenderLoop do animowania swoich obiektów.
author: alvarosabu
thumbnail: /recipes/animations.png
difficulty: 0
---

# Podstawowe animacje

Ten przewodnik pomoże ci rozpocząć pracę z podstawowymi animacjami w TresJS.

Zbudujemy prostą scenę z sześcianem. Następnie animujemy sześcian, aby obracał się wokół osi Y i Z.

<SandboxDemo url="https://play.tresjs.org/#eNqVVF1P2zAU/StW9kAZbVI+hTqKOjo0bRofYrwRHkxy2xoc27KdtlD1v+8mTloHBipSH5rjc889vh9eBLcazHelwmkOQS84MYlmyhIDNleEUzHux4E1cXAaC5YpqS1ZEDOhnMvZDYzIkoy0zMgWRm998yiF6pCKKTVtkhu4AZGC/iOlWkUMLFIeTZRI3Qy90g/MDqWwWnLzls5AWGmKiFgkUhhLHuS8sNL3fLVEzvm2x1kQKar0/aahlqO541ZrQVLglrYJcKoMpGS5TfqnZBELQtiItFyycEp5DtsOJpUDB4ZaWmqZFOEz2ek7NczwPu0FHdXJvpJuuFeyl7FYFs5OItcRrD9+WMgUpxbwi5CTdZFJwoHqTiK51NiwL8d7P86Gh3FQlCSVM0MoVxNKZkzgV8ewF6eAGs1qRxVciV+DNgoSy6YwpBloWp8S0lPSsMI/prvbbZO9Njm8jwOPMJJTPDtAFx5ISz3EdxuwQPcIdsMmPCrR3W63u4ZfWbwAMyEaRshz5cVL90xCObgkJKHGdlwZVpFV7Jmc/wSZgdXP6EyPTXWX4od38VJ5yS6lzii/wCZoRrlvJ6oprjvlp2sPAieR17ugHbhx72RUhY9GCly9cpbi6gA3rldPVxz4u1IcxMHEWmV6UZSkAuNxyNhUhwJsJFQW+fTBfngYdqOUGRsVMLLjoP1G2G3VZ7RdBMof+fIV3MxiZ0CfFBWbeF9xBwchjkOlXINhxooYX3uiYSPdgjdAxcNj9LsDJvPLgM8XPgob19ejD3a7ZYFxs2AeZs3qVjycPg3pJ4RdwEfSSOykkLENRGtqcfmD8Cji7MGXrB8bnElr8LEcsfGriUxkphgHfaWKfW9OZvng/i4xq3NY+UsmkDz9B380c2f5GocF9BTLvW4lriBYd3z+9xLm+H91mMk051Vz3jm8ASN5Xnh0tLNcpGjb45Vuf5ULxsT41pzPLQhTX6ph1D4rKNG7er9Xs+aA+7JwJb9sx/CDKq1vth/urwq+/AdyGHHw" />

## useRenderLoop

Kompozycja `useRenderLoop` to rdzeń animacji w TresJS. Pozwala ona zarejestrować funkcję zwrotną, która zostanie wywołana za każdym razem, gdy renderer zaktualizuje scenę z częstotliwością odświeżania przeglądarki.

Aby uzyskać szczegółowe wyjaśnienie, jak to działa, zapoznaj się z dokumentacją [useRenderLoop](/api/composables#userenderloop).

```ts
const { onLoop } = useRenderLoop();

onLoop(({ delta, elapsed }) => {
  // Se ejecutará en cada fotograma ~ 60FPS (dependiendo de tu monitor)
});
```

## Pobieranie odniesienia do sześcianu

Aby animować sześcian, musimy uzyskać do niego odniesienie. Możemy to zrobić, przekazując [Template Ref](https://vuejs.org/guide/essentials/template-refs.html), używając atrybutu `ref` do komponentu `TresMesh`. Spowoduje to zwrócenie instancji THREE.

Dla poprawy wydajności będziemy używać [Shallow Ref](https://v3.vuejs.org/guide/reactivity-fundamentals.html#shallow-reactivity) aby przechowywać odniesienie zamiast standardowego Ref. Zobacz dlaczego [tutaj](../advanced/caveats.md#reactivity)

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

## Animowanie sześcianu

Teraz, gdy mamy odniesienie do sześcianu, możemy go animować. Skorzystamy z funkcji zwrotnej `onLoop`, aby aktualizować rotację sześcianu.

```ts
onLoop(({ delta, elapsed }) => {
  if (boxRef.value) {
    boxRef.value.rotation.y += delta;
    boxRef.value.rotation.z = elapsed * 0.2;
  }
});
```

Także możesz użyć `delta` z [wewnętrznego zegara THREE](https://threejs.org/docs/?q=clock#api/en/core/Clock) lub `elapsed`, aby animować sześcian.

## Ale dlaczego nie używać reaktywności?

Być może zastanawiasz się, dlaczego nie korzystamy z reaktywności do animowania sześcianu. Odpowiedź jest prosta: wydajność.

```vue
// To jest złys pomysł ❌
<script setup lang="ts">
import { TresCanvas } from "@tresjs/core";

const boxRotation = reactive([0, 0, 0]);

onLoop(({ delta, elapsed }) => {
  boxRotation[1] += delta;
  boxRotation[2] = elapsed * 0.2;
});
</script>
```

Możemy być kuszeni do używania reaktywności do animowania sześcianu. Ale to byłby zły pomysł. Powodem jest to, że [reaktywność Vue opiera się na Proxy](https://vuejs.org/guide/extras/reactivity-in-depth.html#how-reactivity-works-in-vue) i nie jest przeznaczona do użycia w pętli renderującej, która aktualizuje się 60 razy lub częściej na sekundę.

Zagnieżdżona strona poniżej przedstawia [prueba de rendimiento de un proxy frente a un objeto regular](https://measurethat.net/Benchmarks/Show/12503/0/object-vs-proxy-vs-proxy-setter). Jak widać, proxy jest 5 razy wolniejsze niż zwykły obiekt.

<EmbedExperiment src="https://measurethat.net/Embed?id=399142" />

Możesz przeczytać więcej na ten temat w sekcji [Ostrożność](../advanced/caveats.md#reactivity).
