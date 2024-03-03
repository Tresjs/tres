# Migrationsleitfaden

Dieser Leitfaden soll dir helfen, von Version 1 zur neusten Version von TresJS 🤩✨ zu migrieren.

::: code-group

```bash [pnpm]
pnpm update @tresjs/core
```

```bash [npm]
npm update @tresjs/core
```

```bash [yarn]
yarn upgrade @tresjs/core
```

:::

## Neues

### Vue Custom Renderer

**TresJS** ist jetzt ein [Vue Custom Renderer](https://vuejs.org/api/custom-renderer.html#createrenderer) 🎉, der innerhalb einer umhüllenden Komponente `TresCanvas` liegt, die den `WebGLRenderer` und die `Scene` für dich erstellt und eine **neue Instanz der Vue-App** zur Darstellung der Szene erzeugt.

### Unterstützung für TypeScript und Intellisense 🦾

![TresJS Intellisense](/v2-intellisense.gif)

Dies war wahrscheinlich das am **meisten gefragte Feature für TresJS**. Jetzt funktionieren die Tres-Komponenten mit Volar und bieten Type-Intellisense.

**TresJS** generiert nun zur Kompilierungszeit Typdeklarationen für alle Komponenten basierend auf dem Three.js-Katalog. Das bedeutet, dass du alle Three.js-Komponenten verwenden kannst und Type-Intellisense dafür erhälst.

### Das Tres-Plugin ist optional 👍

Das `TresPlugin` ist nun optional. Du kannst TresJS ohne das Plugin verwenden, indem du die Komponenten direkt aus `tresjs/core` importierst:

```vue
<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
</script>

<template>
  <TresCanvas>
    <TresPerspectiveCamera
      :position="cameraPosition"
      :fov="cameraFov"
      :aspect="cameraAspect"
      :near="cameraNear"
      :far="cameraFar"
    />
    <TresMesh
      :geometry="geometry"
      :material="material"
    />
  </TresCanvas>
</template>
```

::: tip
Aufgrund von Performance und Bundlegröße ist dieser Ansatz zu empfehlen, da durch das Tree-Shaking nur die tatsächlich verwendeten Komponenten importiert werden.
:::

### TresScene ist nicht mehr notwendig

Die Komponente `<TresScene />` ist nun veraltet, da die Szene jetzt durch `<TresCanvas />` erstellt wird.

Am Anfang dachte ich, dass es eine gute Idee wäre, eine separate Komponente für die Szene zu haben, um den Aufbau so ähnlich wie möglich an plain Three.js zu halten. Es stellte sich aber heraus, dass es nicht wirklich nützlich war.

Du kannst jetzt eine Szene so erstellen:

```vue
<template>
  <TresCanvas>
    <TresPerspectiveCamera
      :position="cameraPosition"
      :fov="cameraFov"
      :aspect="cameraAspect"
      :near="cameraNear"
      :far="cameraFar"
    />
    <TresMesh
      :geometry="geometry"
      :material="material"
    />
  </TresCanvas>
</template>
```
Um deinen Code zu migrieren, kannst du einfach die Komponente `<TresScene />` entfernen und die Kinder in die Komponente `<TresCanvas />` verschieben.

### `useCatalog` ist jetzt veraltet

Die Funktion `useCatalog` ist veraltet. Du kannst den Katalog jetzt direkt von `@tresjs/core` importieren.

Du kannst mehr darüber hier lesen: [Erweiterung](/de/advanced/extending.md)

Ändere dies:

```ts {2,5,7}
import { useCatalog } from '@tresjs/core'
import { TextGeometry } from 'three/addons/geometries/TextGeometry'

const { extend } = useCatalog()

extend({ TextGeometry })
```

Zu diesem:

```ts {2,6}
// Korrekt ✅
import { extend } from '@tresjs/core'
import { TextGeometry } from 'three/addons/geometries/TextGeometry'

extend({ TextGeometry })
```
### Der Modellreferenzwert `getModel` ist jetzt veraltet

Die Funktion `getModel` ist veraltet. Du kannst jetzt direkt die Eigenschaft `model` verwenden.

Ändere dies:

```vue {7,9-12}
// Falsch ❌
<script setup lang="ts">
import { useGLTF } from '@tresjs/cientos'

const { scene, nodes, animations, materials } = await useGLTF('/models/AkuAku.gltf', { draco: true })

const modelRef = ref()

watch(modelRef, ({ getModel }) => {
  const model = getModel()
  model.position.set(0, 0, 0)
})
</script>

<template>
  <primitive :object="nodes.MyModel" />
</template>
```

Zu diesem:

```vue {7,9-12}
// Korrekt ✅
<script setup lang="ts">
import { useGLTF } from '@tresjs/cientos'

const { scene, nodes, animations, materials } = await useGLTF('/models/AkuAku.gltf', { draco: true })

const modelRef = ref()

watch(modelRef, (model) => {
  // Do something with the model
  model.position.set(0, 0, 0)
})
</script>

<template>
  <primitive :object="nodes.MyModel" />
</template>
```
### Kameras müssen vor jeglichen Controls sein 🎥

Die Komponente `TresOrbitControls` muss nach der Kamera im Baum stehen. Dies liegt daran, dass die Controls die Kamera kennen müssen, um zu funktionieren.

Ändere dies:

```vue {3,5}
// Falsch ❌
<template>
  <TresCanvas>
    <TresOrbitControls />
    <TresPerspectiveCamera />
  </TresCanvas>
</template>
```

Zu diesem:

```vue {3,5}
// Korrekt ✅
<template>
  <TresCanvas>
    <TresPerspectiveCamera />
    <TresOrbitControls />
  </TresCanvas>
</template>
```

## UseTres ist jetzt useTresContext <Badge type="warning" text="^3.0.0" />

Für Version 3 haben wir die gesamte State-Logik umstrukturiert, um sie flexibler und einfacher für Entwickler von Plugins und Paketen des Ökosystems zu machen. Anstatt wie in Version 2 einen Store zu verwenden, nutzen wir jetzt einen Kontextanbieter basierend auf `provide/inject`.

Die Funktion `useTres` ist jetzt ein Alias für die Funktion `useTresContext`, um bestehende Demos und Experimente nicht zu brechen, aber erwäge künftig `useTres` zu verwenden.

Anstelle eines großen reaktiven Objekts erhältst du jetzt direkt die Referenzen `scene` und `renderer`, unter anderem.

Ändere dies:

```ts {2}
// Falsch ❌
import { useTres } from '@tresjs/core'

const { state, setState } = useTres()

console.log(state.scene)
```

Zu diesem:

```ts {2}
// Korrekt ✅
import { useTresContext } from '@tresjs/core'

const { scene, renderer } = useTresContext()

console.log(scene.value)
```

Für detailliertere Informationen über das neue Context-Provider-System kannst du den Abschnitt [API DOCS](/de/api/composables.md) lesen.
