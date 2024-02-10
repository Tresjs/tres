# TresCanvas

Komponent `TresCanvas` to główny komponent w Tres. To on tworzy `WebGLRenderer` w ThreeJS.

```vue{2,5}
<template>
  <TresCanvas shadows :output-encoding="SRGBColorSpace">
    <TresPerspectiveCamera />
      <!-- Tu escena vive aqui -->
  </TresCanvas>
</template>
```

## Rozmiar płótna

Komponent `TresCanvas` będzie używał rozmiaru elementu nadrzędnego jako rozmiaru płótna. Jeśli chcesz użyć rozmiaru okna jako rozmiaru płótna, możesz ustawić właściwość `window-size` na `true`.

```vue
<template>
  <TresCanvas window-size>
    <!-- Tu escena vive aqui -->
  </TresCanvas>
</template>
```

Możesz także użyć CSS, aby ustawić rozmiar swojej kanwy.

```css
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}
#canvas {
  height: 100%;
  width: 100%;
}
```

## Presets

Tres zawiera kilka presetów dla komponentu `TresCanvas`. Możesz ich użyć, ustawiając właściwość `preset`.

### Realistyczny

Preset `realista` ułatwia konfigurację renderera do renderowania bardziej realistycznych scen 3D.

```vue
<template>
  <TresCanvas preset="realistic">
    <!-- Tu escena vive aqui -->
  </TresCanvas>
</template>
```

Jest równoważne:

```ts
renderer.shadows = true;
renderer.physicallyCorrectLights = true;
renderer.outputColorSpace = SRGBColorSpace;
renderer.toneMapping = ACESFilmicToneMapping;
renderer.toneMappingExposure = 3;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = PCFSoftShadowMap;
```

## Props

| Prop                             | Opis                                                                                                                                                                                                                                                                                                                                                                      | Domyślna wartość                      |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------- |
| **alpha**                        | Kontroluje domyślną wartość alfa. Gdy ustawione na true, wartość wynosi 0. W przeciwnym razie 1.                                                                                                                                                                                                                                                                          | false                                 |
| **antialias**                    | Wskazuje, czy ma być używane wygładzanie krawędzi.                                                                                                                                                                                                                                                                                                                        | `true`                                |
| **camera**                       | Ręczna kamera, która będzie używana przez render.                                                                                                                                                                                                                                                                                                                         |                                       |
| **clearColor**                   | Kolor, który render użyje do wyczyszczenia płótna.                                                                                                                                                                                                                                                                                                                        | `#000000`                             |
| **context**                      | Można to użyć do dołączenia renderera do istniejącego [RenderingContext](https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext).                                                                                                                                                                                                                         |                                       |
| **depth**                        | Wskazuje, czy bufor rysunku ma bufor [głębokości](https://en.wikipedia.org/wiki/Z-buffering) co najmniej 16 bitów.                                                                                                                                                                                                                                                        | `true`                                |
| **disableRender**                | Wyłącza renderowanie w requestAnimationFrame, przydatne dla PostProcessing.                                                                                                                                                                                                                                                                                               | `false`                               |
| **failIfMajorPerformanceCaveat** | Wskazuje, czy utworzenie renderera zakończy się niepowodzeniem, jeśli zostanie wykryta niska wydajność. Zobacz [specyfikację WebGL](https://registry.khronos.org/webgl/specs/latest/1.0/#5.2) dla więcej szczegółów.                                                                                                                                                      | `false`                               |
| **logarithmicDepthBuffer**       | Wskazuje, czy powinien być używany bufor głębokości logarytmiczny. Może być konieczne użycie tego, jeśli obsługiwane są ogromne różnice skali w jednej scenie. Pamiętaj, że ta konfiguracja używa gl_FragDepth, jeśli jest dostępna, co wyłącza optymalizację [Early Fragment Test](https://www.khronos.org/opengl/wiki/Early_Fragment_Test) i może wpłynąć na wydajność. | `false`                               |
| **outputColorSpace**             | Definiuje kodowanie kolorów wyjściowych.                                                                                                                                                                                                                                                                                                                                  | `LinearEncoding`                      |
| **powerPreference**              | Zapewnia sugestię dla agenta użytkownika, wskazującą, która konfiguracja GPU jest odpowiednia dla tego kontekstu WebGL. Może to być "high-performance", "low-power" lub "default".                                                                                                                                                                                        | `default`                             |
| **precision**                    | Precyzja shadera. Może to być "highp", "mediump" lub "lowp".                                                                                                                                                                                                                                                                                                              | "highp" jeśli urządzenie to obsługuje |
| **premultipliedAlpha**           | Wskazuje, czy renderer zakłada, że kolory mają [alfa wymnożoną](https://en.wikipedia.org/wiki/Glossary_of_computer_graphics#premultiplied_alpha).                                                                                                                                                                                                                         | `true`                                |
| **preserveDrawingBuffer**        | Wskazuje, czy bufory powinny być zachowane do momentu ręcznego wyczyszczenia lub nadpisania.                                                                                                                                                                                                                                                                              | `false`                               |
| **shadows**                      | Włącza cienie w renderze.                                                                                                                                                                                                                                                                                                                                                 | `false`                               |
| **shadowMapType**                | Ustawia typ mapy cieni.                                                                                                                                                                                                                                                                                                                                                   | `PCFSoftShadowMap`                    |
| **stencil**                      | Wskazuje, czy bufor rysunku ma bufor [stencil](https://en.wikipedia.org/wiki/Stencil_buffer) co najmniej 8 bitów.                                                                                                                                                                                                                                                         | `true`                                |
| **toneMapping**                  | Definiuje ekspozycję mapowania tonów używaną przez render.                                                                                                                                                                                                                                                                                                                | `NoToneMapping`                       |
| **toneMappingExposure**          | Ekspozycja mapowania tonów.                                                                                                                                                                                                                                                                                                                                               | `1`                                   |
| **useLegacyLights**              | Wskazuje, czy należy używać trybu światła dziedziczonego.                                                                                                                                                                                                                                                                                                                 | `true`                                |
| **windowSize**                   | Wskazuje, czy należy używać rozmiaru okna jako rozmiaru płótna, czy też rodzica elementu.                                                                                                                                                                                                                                                                                 | `false`                               |

### Domyślne wartości

Tres stara się być możliwie mało dogmatyczne. Dlatego nie ustawia prawie żadnych domyślnych wartości dla komponentu `TresCanvas`. Używa
