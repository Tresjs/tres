# Przewodnik Migracyjny

Ten przewodnik ma na celu pomoc w migracji z wersji 1 do najnowszych wersji TresJS 🤩✨.

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

## Nowości

### Vue Custom Renderer

**TresJS** to teraz [Vue Custom Renderer](https://vuejs.org/api/custom-renderer.html#createrenderer) 🎉 znajdujący się wewnątrz otaczającego go komponentu `TresCanvas`, który zajmuje się tworzeniem `WebGLRenderer` i `Scene` za ciebie oraz tworzy **nową instancję aplikacji Vue** do renderowania sceny.

### Obsługa TypeScript i Intellisense 🦾

![TresJS Intellisense](/v2-intellisense.gif)

To była prawdopodobnie najczęściej **żądana funkcja w TresJS**. Teraz komponenty Tres współpracują z Volar i zapewniają intellisense typów.

**TresJS** generuje teraz deklaracje typów w czasie kompilacji dla wszystkich komponentów opartych na katalogu ThreeJS. Oznacza to, że możesz używać wszystkich komponentów ThreeJS i otrzymać intellisense typów dla nich.

### Plugin Tres jest opcjonalny 👍

Plugin `TresPlugin` jest teraz opcjonalny. Możesz używać TresJS bez niego, importując komponenty bezpośrednio z `tresjs/core`:

```vue
<script setup lang="ts">
import { TresCanvas } from "@tresjs/core";
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
    <TresMesh :geometry="geometry" :material="material" />
  </TresCanvas>
</template>
```

::: info
To jest zalecane ze względów wydajności i rozmiaru paczki; tree-shaking będzie działał lepiej, a importujesz tylko te komponenty, których używasz.
:::

### TresScene już nie jest potrzebny

Komponent `<TresScene />` jest teraz przestarzały, ponieważ scena jest teraz tworzona przez `<TresCanvas />`.

Na początku myślałem, że będzie to dobry pomysł, aby mieć osobny komponent dla sceny z uwagi na zwięzłość i zachowanie podobieństwa do czystego ThreeJS, ale okazało się, że to nie było naprawdę przydatne.

Teraz możesz utworzyć scenę tak jak poniżej:

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
    <TresMesh :geometry="geometry" :material="material" />
  </TresCanvas>
</template>
```

Aby zaktualizować swój kod, po prostu usuń komponent `<TresScene />` i przenieś dzieci do komponentu `<TresCanvas />`.

### `useCatalog` jest teraz przestarzałe

Funkcja `useCatalog` jest teraz przestarzała. Teraz możesz importować katalog bezpośrednio z `@tresjs/core`.

Możesz przeczytać więcej na ten temat tutaj: [Rozszerzanie](/advanced/extending.md)

Zmień to:

```ts {2,5,7}
import { useCatalog } from "@tresjs/core";
import { TextGeometry } from "three/addons/geometries/TextGeometry";

const { extend } = useCatalog();

extend({ TextGeometry });
```

Na to:

```ts {2,6}
// Correcto ✅
import { extend } from "@tresjs/core";
import { TextGeometry } from "three/addons/geometries/TextGeometry";

extend({ TextGeometry });
```

### Wartość odniesienia modelu `getModel` jest teraz przestarzała

Funkcja `getModel` jest teraz przestarzała. Teraz możesz używać bezpośrednio właściwości `model`.

Zmień to:

```vue {7,9-12}
// Incorrecto ❌
<script setup lang="ts">
import { useGLTF } from "@tresjs/cientos";

const { scene, nodes, animations, materials } = await useGLTF(
  "/models/AkuAku.gltf",
  { draco: true }
);

const modelRef = ref();

watch(modelRef, ({ getModel }) => {
  const model = getModel();
  model.position.set(0, 0, 0);
});
</script>

<template>
  <primitive :object="nodes.MyModel" />
</template>
```

Na to:

```vue {7,9-12}
// Poprawne ✅
<script setup lang="ts">
import { useGLTF } from "@tresjs/cientos";

const { scene, nodes, animations, materials } = await useGLTF(
  "/models/AkuAku.gltf",
  { draco: true }
);

const modelRef = ref();

watch(modelRef, (model) => {
  // Zrób coś z modelem
  model.position.set(0, 0, 0);
});
</script>

<template>
  <primitive :object="nodes.MyModel" />
</template>
```

### Kamery powinny być umieszczone przed jakimkolwiek kontrolerem 🎥

Komponent `TresOrbitControls` powinien znajdować się po kamery w drzewie komponentów. Wynika to z tego, że kontrolery muszą znać kamerę, aby działać.

Zmień to:

```vue {3,5}
// Niepoprawne ❌
<template>
  <TresCanvas>
    <TresOrbitControls />
    <TresPerspectiveCamera />
  </TresCanvas>
</template>
```

Na to:

```vue {3,5}
// Poprawne ✅
<template>
  <TresCanvas>
    <TresPerspectiveCamera />
    <TresOrbitControls />
  </TresCanvas>
</template>
```

## UseTres teraz to useTresContext <Badge type="warning" text="^3.0.0" />

Dla wersji 3, przeorganizowaliśmy całą logikę stanu, aby była bardziej elastyczna i przyjazna dla autorów dodatków i pakietów ekosystemu. Zamiast korzystać ze sklepu, jak w wersji 2, teraz używamy dostawcy kontekstu opartego na `provide/inject`.

Funkcja `useTres` teraz jest aliasem funkcji `useTresContext`, aby uniknąć psucia istniejących demo i eksperymentów, ale rozważ korzystanie z `useTresContext` od teraz.

Zamiast uzyskiwać duży obiekt reaktywny, teraz bezpośrednio uzyskasz odniesienia do `scene` i `renderer`, między innymi właściwości.

Zmień to:

```ts {2}
// Incorrecto ❌
import { useTres } from "@tresjs/core";

const { state, setState } = useTres();

console.log(state.scene);
```

Na to:

```ts {2}
// Correcto ✅
import { useTresContext } from "@tresjs/core";

const { scene, renderer } = useTresContext();

console.log(scene.value);
```

Aby uzyskać bardziej szczegółowe informacje na temat nowego systemu dostawcy kontekstu, możesz przeczytać sekcję [API DOCS](/api/composables.md).
