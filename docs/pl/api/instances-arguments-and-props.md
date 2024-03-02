# Instancje

Główną ideą **Tres** jest _samogenerujący się katalog_ wszystkich elementów ThreeJS. Katalog ten jest generowany na podstawie kodu źródłowego ThreeJS, dzięki czemu zawsze jest aktualny.

Kiedy korzystasz z ThreeJS, musisz importować elementy, które chcesz używać. Na przykład, jeśli chcesz użyć `PerspectiveCamera`, musisz go zaimportować z pakietu `three`:

```js
import { PerspectiveCamera } from "three";

const camera = new PerspectiveCamera(45, width / height, 1, 1000);
```

W przypadku **Tres** nie musisz nic importować, ponieważ **Tres** automatycznie generuje **Komponent Vue oparty na obiekcie Three, który chcesz użyć w CamelCase z prefiksem Tres**. Na przykład, jeśli chcesz użyć `PerspectiveCamera`, możesz skorzystać z komponentu `<TresPerspectiveCamera />`.

```vue
<template>
  <TresCanvas>
    <TresPerspectiveCamera />
    <!-- Tu escena vive aqui -->
  </TresCanvas>
</template>
```

Oznacza to, że możesz korzystać z tej samej [dokumentacji](https://threejs.org/docs/), której używałbyś przy korzystaniu z podstawowego ThreeJS, ale z siłą Vue.

## Deklarowanie obiektów

Jeśli pójdziemy tym tokiem, powinieneś być w stanie zdefiniować instancję w ten sposób: ❌

```vue
<template>
  <TresCanvas>
    <TresPerspectiveCamera visible :position="new THREE.Vector3(1, 2, 3)" />
    <!-- Tu escena vive aqui -->
  </TresCanvas>
</template>
```

Jednak dzięki **Tres** to nie jest konieczne, możesz zdefiniować właściwości deklaratywnie w następujący sposób: ✅

```vue
<template>
  <TresCanvas>
    <TresPerspectiveCamera visible :position="[1, 2, 3]" />
    <!-- Tu escena vive aqui -->
  </TresCanvas>
</template>
```

## Argumenty

Niektóre obiekty w ThreeJS posiadają argumenty, na przykład konstruktor `PerspectiveCamera` ma następujące argumenty:

- `fov` - Pionowy kąt widzenia kamery.
- `aspect` - Współczynnik proporcji frustum kamery.
- `near` - Bliski plan frustum kamery.
- `far` - Daleki plan frustum kamery.

Aby przekazać te argumenty do komponentu `TresPerspectiveCamera`, możesz użyć właściwości `args`:

```vue
<template>
  <TresCanvas>
    <TresPerspectiveCamera :args="[45, 1, 0.1, 1000]" />
    <!-- Tu escena vive aqui -->
  </TresCanvas>
</template>
```

To samo co zrobienie tego:

```ts
const camera = new PerspectiveCamera(45, 1, 0.1, 1000);
```

## Właściwości

Możesz także przekazywać właściwości do komponentu, na przykład `TresAmbientLight` ma właściwość `intensity`, więc możesz ją przekazać do komponentu w następujący sposób:

```html
<TresAmbientLight :intensity="0.5" />
```

### Ustawianie

Wszystkie właściwości, których zasadniczy obiekt ma metodę `.set()`, mają skrót do przyjęcia wartości jako tablicy. Na przykład `TresPerspectiveCamera` ma właściwość `position`, która jest obiektem `Vector3`, więc możesz ją przekazać do komponentu w ten sposób:

```html
<TresPerspectiveCamera :position="[1, 2, 3]" />
```

Aby określić właściwości transformacji, takie jak pozycja, rotacja i skala, dostępna jest skrócona forma, która umożliwia bezpośrednie określenie osi, którą chcesz ustawić w ramach właściwości. Podobna forma skrócona jest także dostępna dla właściwości koloru.

<!-- Zmieniłem składnię koloru z Vue na HTML, ponieważ Vue wydaje się być zepsute i nie koloruje zagnieżdżonych komponentów -->

```html
<TresMesh :position-x="1" :scale-y="2" :rotation-x="Math.PI * 2">
  <TresMeshBasicMaterial :color-r="0.7" :color-b="0.3" />
</TresMesh>
```

::: warning
Przy ustawianiu właściwości rotacji w [three.js](https://threejs.org/docs/index.html#api/en/math/Euler), używane jest domyślnie ustalone kolejność 'XYZ'.
Ważne jest, aby pamiętać, że przy ustawianiu właściwości rotacji za pomocą formy skróconej, kolejność, w której ustawiasz kąty, ma znaczenie. Aby uzyskać więcej informacji na ten temat, sprawdź [Kąty Eulera](https://es.wikipedia.org/wiki/%C3%81ngulos_de_Euler)
:::

```vue
<TresMesh :rotation-x="1" :rotation-y="2" :rotation-z="Math.PI * 2" />

<TresMesh :rotation-z="Math.PI * 2" :rotation-x="1" :rotation-y="2" />

<!-- Należy pamiętać, że kolejność właściwości rotacji ma znaczenie i zmiana kolejności może prowadzić do różnych rezultatów. -->
```

### Skalowanie

Innym skrótem, który można użyć, jest przekazanie wartości skali do właściwości oczekującej obiektu `Vector3`, używając tej samej wartości dla reszty wektora:

```html
<TresPerspectiveCamera :position="5" /> ✅
```

```html
<TresPerspectiveCamera :position="[5, 5, 5]" /> ✅
```

### Kolory

Możesz przekazywać kolory do komponentów, używając właściwości color, która akceptuje ciąg znaków z nazwą koloru lub wartość heksadecymalną:

```html
<TresAmbientLight color="teal" /> ✅
```

```html
<TresAmbientLight color="#008080" /> ✅
```

### Metody

Niektóre właściwości bazowe są w rzeczywistości metodami, `TresPerspectiveCamera` posiada metodę `lookAt` dziedziczoną z [Object3d](https://threejs.org/docs/#api/en/core/Object3D.lookAt), więc możesz przekazać do komponentu współrzędne w ten sposób:

```html
<TresPerspectiveCamera :look-at="[1, 2, 3]" />
```
