# Ostrzeżenia 😱

Naszym celem jest dostarczenie prostego sposobu korzystania z ThreeJS w VueJS z najlepszym możliwym doświadczeniem programistycznym. Niemniej jednak istnieją pewne ostrzeżenia, o których powinieneś być świadomy.

## ~~HMR y ThreeJS~~

:::info

To zostało rozwiązane w **TresJS** v1.7.0 🎉. Teraz możesz używać HMR bez konieczności przeładowywania strony 🥹.

:::

Hot Module Replacement (HMR) to funkcja, która pozwala na aktualizowanie kodu bez ponownego ładowania strony. To świetna cecha, która znacznie przyspiesza proces developmentu. **TresJS** korzysta z [Vite](https://vitejs.dev/). Jednakże, jest to naprawdę skomplikowane, aby zadziałało poprawnie z ThreeJS.

Dlaczego? Ponieważ Tres buduje scenę deklaratywnie. Oznacza to, że tworzy instancję i dodaje ją do sceny podczas montowania komponentu. Złożoność polega na tym, kiedy usunąć instancję ze sceny i kiedy ponownie ją dodać.

Chociaż został zaimplementowany minimalny proces usuwania, nie jest on idealny. Oznacza to, że czasami będziesz musiał przeładować stronę, aby zobaczyć zmiany poprawnie, zwłaszcza gdy odwołujesz się do instancji za pomocą [Template Refs](https://v3.vuejs.org/guide/component-template-refs.html)

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

Jeśli dokonasz zmiany w `color` materiału `TresMeshStandardMaterial`, zauważysz, że zmiana ta zostanie zastosowana, ale rotacja już nie będzie działać. Dzieje się tak, ponieważ instancja jest usuwana i tworzona od nowa.

:::tip
Więc, jako **regla general**, powinieneś przeładować stronę, gdy nie widzisz dokonanych zmian.
:::

Mówiąc to, pracujemy nad lepszym rozwiązaniem na to 😁. Jeśli masz jakieś pomysły, jak to rozwiązać, daj nam znać.

Możesz śledzić dyskusję na [HMR Disposal Discussion](https://github.com/Tresjs/tres/issues/23)

## Reaktywność

Wszyscy kochamy reaktywność 💚. Jest to jedna z najpotężniejszych cech VueJS. Jednak musimy być ostrożni podczas korzystania z ThreeJS.

Reaktywność Vue opiera się na [Proxy](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Proxy). Pozwala to Vue 3 śledzić automatycznie zmiany w obiektach danych i aktualizować odpowiednie elementy DOM za każdym razem, gdy dane się zmienią.

Ponieważ renderujemy scenę i aktualizujemy ją w każdej klatce (60FPS), oznacza to, że aktualizujemy scenę 60 razy na sekundę. Jeśli obiekt do aktualizacji jest reaktywny, Vue spróbuje zaktualizować ten obiekt tyle razy. To nie jest dobry pomysł 😅 i będzie miało negatywny wpływ na wydajność.

Oto test wydajności różnicy między użyciem obiektu Proxy a obiektem płaskim.

<figure>
  <img src="/proxy-benchmark.png" alt="Proxy vs Plain" style="width:100%">
  <figcaption>Fig.1 - Ejecuciones por segundo Objeto Plano vs Proxy. </figcaption>
</figure>

Źródło: [Proxy vs Plain Object](https://www.measurethat.net/Benchmarks/Show/12503/0/object-vs-proxy-vs-proxy-setter)

Jeśli jesteś zmuszony do użycia reaktywności, użyj [shallowRef](https://vuejs.org/api/reactivity-advanced.html#shallowref)

W przeciwieństwie do `ref()`, wewnętrzna wartość shallow ref jest przechowywana i ujawniana dokładnie tak, jak jest, i nie zachodzi reaktywność w głąb. Tylko dostęp do `.value` jest reaktywny. Źródło: [VueJS Docs](https://vuejs.org/api/reactivity-advanced.html#shallowref)

### Przykład

❌ Niepoprawne

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

✅ Poprawne

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
