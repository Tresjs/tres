# Zabawny przewodnik po często spotykanych problemach i jak je rozwiązywać

![Rozwiązywanie problemów](https://media.giphy.com/media/LHZyixOnHwDDy/giphy.gif)

Witaj w przewodniku po rozwiązywaniu problemów z **TresJS v2**. Gdzie 3D oznacza _"Dumne, Rozkoszne Trudności"_! Wiemy, że 3D może być równie skomplikowane jak spleciona kłębówka wełny 🧶 albo nieprzewidywalne jak kot na klawiaturze 🐈 ⌨️, ale nie bój się!

Ten przewodnik ma na celu pomóc ci rozwiązać najczęstsze problemy, z jakimi możesz się spotkać podczas korzystania z TresJS v2.

## Nie widzę mojej sceny 3D 😭!

Postępowałeś zgodnie z [przewodnikiem rozpoczęcia](/guide/getting-started.md), ale nadal nie widzisz renderowanej sceny.

Oto najczęstsze powody, dla których możesz nie widzieć swojej sceny:

### Sprawdź wysokość twojego płótna 📏

Innym częstym problemem jest to, że komponent `TresCanvas` domyślnie tworzy element `canvas`, który przyjmuje `width` i `height` od elementu nadrzędnego. Jeśli element nadrzędny nie ma wysokości, to kanwa również jej nie będzie miała.

![Brak wysokości](/canvas-height.png)

Zobaczysz także ten błąd w konsoli:

![Ostrzeżenie o wysokości płótna](/canvas-height-warning.png)

Łatwym sposobem na rozwiązanie tego problemu jest ustawienie wysokości elementu nadrzędnego na `100%`:

```css
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}
#app {
  height: 100%;
  width: 100%;
  background-color: #000;
}
```

O także możesz ustawić właściwość `window-size` komponentu `TresCanvas`:

```vue
<TresCanvas window-size>
  <TresPerspectiveCamera />
  <TresOrbitControls />
</TresCanvas>
```

## Błąd rozwiązania komponentu: TresComponent...

![](/failed-to-resolve-component.png)

Ponieważ **TresJS v2** używa niestandardowego renderera Vue w głównej instancji aplikacji Vue, główny renderer Vue, który działa jako rodzic, nie rozpozna komponentów wewnątrz komponentu `TresCanvas`. Chociaż nie wpływa to na renderowanie, spowoduje wyświetlenie ostrzeżenia w konsoli.

![](/failed-to-resolve-component.png)

Obecnie Vue nie obsługuje natywnie definiowania renderera używanego w znaczniku `<template />`, ale istnieje szybkie rozwiązanie pozwalające usunąć ostrzeżenia.

Przejdź do swojego pliku `vite.config.ts` i dodaj poniższą konfigurację do `@vitejs/plugin-vue`:

```ts
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { templateCompilerOptions } from "@tresjs/core";

export default defineConfig({
  plugins: [
    vue({
      // Other config
      ...templateCompilerOptions,
    }),
  ],
});
```

To usunie ostrzeżenie z konsoli.

# Pomóż nam uczynić TresJS Purr-fecto! 😼

Wiemy, że nawet najlepsze koty śpiące czasami popełniają błędy, i potrzebujemy twojej pomocy, aby uczynić TresJS jeszcze lepszym! Jeśli znajdziesz błąd, proszę otwórz zgłoszenie na [repozytorium](https://github.com/Tresjs/playground) i **proszę dostarcz link do reprodukcji**.

::: warning
Zgłoszenia bez linku do reprodukcji zostaną zamknięte.
:::

Nasz zespół programistów-kochających-koty wyruszy do działania, aby pozbyć się tych dokuczliwych błędów i ulepszyć TresJS dla wszystkich. Razem sprawmy, aby TresJS było miauczeniem w renderowaniu 3D w Vue!
