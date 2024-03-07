# Instanzen

Die Hauptidee von **Tres** ist ein _automatisch generierter Katalog_ aller Three.js-Elemente. Dieser Katalog wird aus dem Quellcode von Three.js generiert, sodass er immer auf dem neuesten Stand ist.

Wenn du reines Three.js schreibst, musst du die Elemente, die du nutzen möchtest, explizit importieren. Zum Beispiel, wenn du eine `PerspectiveCamera` verwenden möchtest, musst du sie aus dem `three` Paket importieren:

```js
import { PerspectiveCamera } from 'three'

const camera = new PerspectiveCamera(45, width / height, 1, 1000)
```

Mit **Tres** musst du nichts importieren, da **Tres** automatisch eine **Vue-Komponente basierend auf dem Three-Objekt, das du verwenden möchtest, im PascalCase mit einem Tres-Prefix** generiert. Zum Beispiel, wenn du eine `PerspectiveCamera` verwenden möchtest, kannst du die Komponente `<TresPerspectiveCamera />` nutzen.

```vue{3}
<template>
  <TresCanvas>
    <TresPerspectiveCamera />
    <!-- Deine Szene -->
  </TresCanvas>
</template>
```

Das bedeutet, dass du dieselbe [Dokumentation](https://threejs.org/docs/) nutzen kannst, die du beim Verwenden von Three.js verwenden würdest.

## Objekte deklarieren

Wenn wir diesem Argument folgen, solltest du in der Lage sein, eine Instanz auf diese Weise zu definieren: ❌

```vue
<template>
  <TresCanvas>
    <TresPerspectiveCamera
      visible
      :position="new THREE.Vector3(1, 2, 3)"
    />
    <!-- Deine Szene -->
  </TresCanvas>
</template>
```

Aber mit **Tres** ist das nicht notwendig, du kannst die Properties auf deklarative Weise wie folgt definieren: ✅

```vue
<template>
  <TresCanvas>
    <TresPerspectiveCamera
      visible
      :position="[1, 2, 3]"
    />
    <!-- Deine Szene -->
  </TresCanvas>
</template>
```

## Argumente

Einige Three.js-Objekte haben Argumente. Zum Beispiel hat der Konstruktor `PerspectiveCamera` folgende Argumente:

- `fov` - Vertikales Sichtfeld der Kamera.
- `aspect` - Seitenverhältnis des Frustums der Kamera.
- `near` - Vordere Clippingebene des Sichtbereichs.
- `far` - Hintere Clippingebene des Sichtbereichs.

Um diese Argumente an die Komponente `TresPerspectiveCamera` zu übergeben, kannst du die Property `args` verwenden:

```vue
<template>
  <TresCanvas>
    <TresPerspectiveCamera :args="[45, 1, 0.1, 1000]" />
    <!-- Deine Szene -->
  </TresCanvas>
</template>
```

Dasselbe kann wie folgt geschrieben werden:

```ts
const camera = new PerspectiveCamera(45, 1, 0.1, 1000)
```

# Props

Du kannst auch Props an die Komponente übergeben. Zum Beispiel hat das `TresAmbientLight` eine Property `intensity`, die folgendermaßen übergeben werden können:

```html
<TresAmbientLight :intensity="0.5" />
```

### Werte Setzen

Alle Properties, die in der zugrundeliegenden Klasse eine `.set()`-Methode haben, können via Prop als Array übergeben werden. Zum Beispiel hat die `TresPerspectiveCamera` eine Property `position`, die ein `Vector3`-Objekt ist. Du kannst ihren Wert so setzen:

```html
<TresPerspectiveCamera :position="[1, 2, 3]" />
```

Um Transformations-Properties wie Position, Rotation und Skalierung anzugeben, gibt es eine Kurzform, die es dir erlaubt, direkt die Achse anzugeben, die du innerhalb der Eigenschaften setzen möchtest. Eine ähnliche Kurzform ist auch für die Farb-Property verfügbar.


<!-- Wir haben die Farbsyntax von Vue zu HTML geändert, da Vue verschachtelte Komponenten nicht einfärbt -->
```html
<TresMesh :position-x="1" :scale-y="2" :rotation-x="Math.PI * 2">
  <TresMeshBasicMaterial :color-r="0.7" :color-b="0.3" />
</TresMesh>
```

::: warning
Wenn du die Rotations-Property in [three.js](https://threejs.org/docs/index.html#api/en/math/Euler) setzt, wird standardmäßig die Reihenfolge 'XYZ' verwendet.
Falls die Kurzform verwendet wird, ist die Reihenfolge, in der die Winkel gesetzt werden wichtig. Für mehr Informationen zu diesem Thema, siehe [Eulerwinkel](https://de.wikipedia.org/wiki/Eulersche_Winkel).
:::

```vue
<TresMesh :rotation-x="1" :rotation-y="2" :rotation-z="Math.PI * 2" />

<TresMesh :rotation-z="Math.PI * 2" :rotation-x="1" :rotation-y="2" />

<!-- Beachte, dass die Reihenfolge der Rotationseigenschaften wichtig ist
 und das Ändern der Reihenfolge zu unterschiedlichen Ergebnissen führen kann. -->
```

### Skalieren

Ein weiteres Kürzel, das du verwenden kannst, ist das Übergeben eines Skalarwertes an eine Property, die ein `Vector3`-Objekt erwartet, indem du denselben Wert für den Rest des Vektors verwendest:

```html
<TresPerspectiveCamera :position="5" /> ✅
```

```html
<TresPerspectiveCamera :position="[5, 5, 5]" /> ✅
```

### Farben

Du kannst Farben an die Komponenten übergeben, indem du die Property `color` verwendest, die einen String mit dem Namen der Farbe oder einen Hex-Wert akzeptiert:

```html
<TresAmbientLight color="teal" /> ✅
```

```html
<TresAmbientLight color="#008080" /> ✅
```

### Methoden

Einige Properties sind eigentlich Methoden. Zum Beispiel die `TresPerspectiveCamera` hat eine Methode `lookAt`, die von [Object3d](https://threejs.org/docs/#api/en/core/Object3D.lookAt) geerbt ist. Das bedeutet dass du der Komponente die Koordination auf folgende Weise übergeben kannst:

```html
<TresPerspectiveCamera :look-at="[1, 2, 3]" />
```
