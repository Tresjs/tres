# Instanzen

Die Hauptidee von **Tres** ist ein _selbstgenerierter Katalog_ aller ThreeJS-Elemente. Dieser Katalog wird aus dem Quellcode von ThreeJS generiert, sodass er immer auf dem neuesten Stand ist.

Wenn du ThreeJS verwendest, musst du die Elemente, die du nutzen möchtest, importieren. Zum Beispiel, wenn du eine `PerspectiveCamera` verwenden möchtest, musst du sie aus dem `three` Paket importieren:

```js
import { PerspectiveCamera } from 'three'

const camera = new PerspectiveCamera(45, width / height, 1, 1000)
```

Mit **Tres** musst du nichts importieren, da **Tres** automatisch eine **Vue-Komponente basierend auf dem Three-Objekt, das du verwenden möchtest, im CamelCase mit einem Tres-Prefix** generiert. Zum Beispiel, wenn du eine `PerspectiveCamera` verwenden möchtest, kannst du die Komponente `<TresPerspectiveCamera />` nutzen.

```vue
<template>
  <TresCanvas>
    <TresPerspectiveCamera />
    <!-- Tu escena vive aqui -->
  </TresCanvas>
</template>
```

Das bedeutet, dass du dieselbe [Dokumentation](https://threejs.org/docs/) nutzen kannst, die du beim Verwenden von basic ThreeJS verwenden würdest, aber mit der Kraft von Vue.

## Objekte deklarieren

Wenn wir diesem Argument folgen, solltest du in der Lage sein, eine Instanz auf diese Weise zu definieren: ❌

```vue
<template>
  <TresCanvas>
    <TresPerspectiveCamera
      visible
      :position="new THREE.Vector3(1, 2, 3)"
    />
    <!-- Tu escena vive aqui -->
  </TresCanvas>
</template>
```

Aber mit **Tres** ist das nicht notwendig, du kannst die Eigenschaften auf deklarative Weise wie folgt definieren: ✅

```vue
<template>
  <TresCanvas>
    <TresPerspectiveCamera
      visible
      :position="[1, 2, 3]"
    />
    <!-- Tu escena vive aqui -->
  </TresCanvas>
</template>
```

## Argumente

Einige ThreeJS-Objekte haben Argumente, zum Beispiel hat der Konstruktor `PerspectiveCamera` folgende Argumente:

- `fov` - Vertikales Sichtfeld der Kamera.
- `aspect` - Seitenverhältnis des Kamera-Frustums.
- `near` - Naher Plan des Kamera-Frustums.
- `far` - Ferner Plan des Kamera-Frustums.

Um diese Argumente an die Komponente `TresPerspectiveCamera` zu übergeben, kannst du die Eigenschaft `args` verwenden:

```vue
<template>
  <TresCanvas>
    <TresPerspectiveCamera :args="[45, 1, 0.1, 1000]" />
    <!-- Tu escena vive aqui -->
  </TresCanvas>
</template>
```

Das ist dasselbe wie dies zu tun:

```ts
const camera = new PerspectiveCamera(45, 1, 0.1, 1000)
```

# Eigenschaften

Du kannst auch Eigenschaften an die Komponente übergeben, zum Beispiel hat das `TresAmbientLight` eine Eigenschaft `intensity`, so dass du sie der Komponente folgendermaßen übergeben kannst:

```html
<TresAmbientLight :intensity="0.5" />
```

### Werte Setzen

Alle Eigenschaften, deren zugrunde liegendes Objekt eine `.set()`-Methode hat, haben eine Abkürzung, um den Wert als Array zu erhalten. Zum Beispiel hat die `TresPerspectiveCamera` eine Eigenschaft `position`, die ein `Vector3` Objekt ist, so dass du es der Komponente auf diese Weise übergeben kannst:

```html
<TresPerspectiveCamera :position="[1, 2, 3]" />
```

Um Transformationseigenschaften wie Position, Rotation und Skalierung anzugeben, gibt es eine Abkürzung, die es dir erlaubt, direkt die Achse anzugeben, die du innerhalb der Eigenschaften setzen möchtest. Eine ähnliche Abkürzung ist auch für die Farbeigenschaft verfügbar.


<!-- Wir haben die Farbsyntax von Vue zu HTML geändert, da Vue scheinbar kaputt ist und verschachtelte Komponenten nicht einfärbt -->
```html
<TresMesh :position-x="1" :scale-y="2" :rotation-x="Math.PI * 2">
  <TresMeshBasicMaterial :color-r="0.7" :color-b="0.3" />
</TresMesh>
```

::: warning
Wenn du die Rotations-Eigenschaft in [three.js](https://threejs.org/docs/index.html#api/en/math/Euler) setzt, wird standardmäßig die Reihenfolge 'XYZ' verwendet.
Es ist wichtig zu beachten, dass die Reihenfolge, in der du die Winkel setzt, wenn du die Kurzform verwendest, wichtig ist. Für mehr Informationen zu diesem Thema, siehe [Eulerwinkel](https://de.wikipedia.org/wiki/Eulersche_Winkel).
:::

```vue
<TresMesh :rotation-x="1" :rotation-y="2" :rotation-z="Math.PI * 2" />

<TresMesh :rotation-z="Math.PI * 2" :rotation-x="1" :rotation-y="2" />

<!-- Beachte, dass die Reihenfolge der Rotationseigenschaften wichtig ist und das Ändern der Reihenfolge zu unterschiedlichen Ergebnissen führen kann. -->
```

### Skalieren

Ein weiteres Kürzel, das du verwenden kannst, ist das Übergeben eines Skalarwertes an eine Eigenschaft, die ein `Vector3`-Objekt erwartet, indem du denselben Wert für den Rest des Vektors verwendest:

```html
<TresPerspectiveCamera :position="5" /> ✅
```

```html
<TresPerspectiveCamera :position="[5, 5, 5]" /> ✅
```

### Farben

Du kannst Farben an die Komponenten übergeben, indem du die Eigenschaft `color` verwendest, die einen String mit dem Namen der Farbe oder einen Hexadezimalwert akzeptiert:

```html
<TresAmbientLight color="teal" /> ✅
```

```html
<TresAmbientLight color="#008080" /> ✅
```

### Methoden

Einige zugrundeliegende Eigenschaften sind tatsächlich Methoden, die `TresPerspectiveCamera` hat eine Methode `lookAt`, die von [Object3d](https://threejs.org/docs/#api/en/core/Object3D.lookAt) geerbt ist, so dass du dem Komponenten auf diese Weise die Koordinaten übergeben kannst:

```html
<TresPerspectiveCamera :look-at="[1, 2, 3]" />
```
