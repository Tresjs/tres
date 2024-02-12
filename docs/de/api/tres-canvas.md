# TresCanvas

Die `TresCanvas` Komponente ist die Hauptkomponente von Tres, welche den `WebGLRenderer` erstellt.

```vue{2,5}
<template>
  <TresCanvas shadows :output-encoding="SRGBColorSpace">
    <TresPerspectiveCamera />
      <!-- Deine Szene -->
  </TresCanvas>
</template>
```

## Größe des Canvas

Die `TresCanvas`-Komponente verwendet die Größe des Elternelements als Leinwandgröße. Wenn du die Fenstergröße als Leinwandgröße verwenden möchtest, kannst du die Eigenschaft `window-size` auf `true` setzen.

```vue
<template>
  <TresCanvas window-size>
    <!-- Deine Szene -->
  </TresCanvas>
</template>
```

Oder du setzt die canvas-size per CSS:

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

Tres bietet einige Voreinstellungen für die `TresCanvas`-Komponente. Du kannst sie nutzen, indem du die Eigenschaft `preset` verwendest.

### Realistic

Das Voreinstellung `realistic` erleichtert die Konfiguration des Renderers für realistischere 3D-Szenen.

```vue
<template>
  <TresCanvas preset="realistic">
    <!-- Deine Szene -->
  </TresCanvas>
</template>
```

Ist equivalent zu:

```ts
renderer.shadows = true
renderer.physicallyCorrectLights = true
renderer.outputColorSpace = SRGBColorSpace
renderer.toneMapping = ACESFilmicToneMapping
renderer.toneMappingExposure = 3
renderer.shadowMap.enabled = true
renderer.shadowMap.type = PCFSoftShadowMap
```

## Props

| Eigenschaft | Beschreibung | Standardwert |
| ---- | ---- | --- |
| **alpha** | Steuert den Standard-Alphawert. Wenn auf true gesetzt, ist der Wert 0. Andernfalls ist er 1. | `false` |
| **antialias** | Gibt an, ob Antialiasing durchgeführt werden soll. | `true` |
| **camera** | Eine manuelle Kamera, die vom Renderer verwendet wird. | |
| **clearColor** | Die Farbe, die der Renderer verwendet, um die Leinwand zu löschen. | `#000000` |
| **context** | Kann verwendet werden, um den Renderer an einen vorhandenen [RenderingContext](https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext) anzuhängen. | |
| **depth** | Gibt an, ob der Zeichenpuffer einen [Tiefenpuffer](https://en.wikipedia.org/wiki/Z-buffering) von mindestens 16 Bit hat. | `true` |
| **disableRender** | Deaktiviert das Rendering in requestAnimationFrame, nützlich für PostProcessing. | `false` |
| **failIfMajorPerformanceCaveat** | Gibt an, ob die Erstellung des Renderers fehlschlagen soll, wenn eine geringe Leistung festgestellt wird. Siehe die [WebGL-Spezifikation](https://registry.khronos.org/webgl/specs/latest/1.0/#5.2) für weitere Details. | `false` |
| **logarithmicDepthBuffer** | Gibt an, ob ein logarithmischer Tiefenpuffer verwendet werden soll. Dies kann notwendig sein, wenn in einer einzigen Szene enorme Skalendifferenzen gehandhabt werden müssen. Beachte, dass diese Einstellung gl_FragDepth verwendet, wenn verfügbar, was die Optimierung [Early Fragment Test](https://www.khronos.org/opengl/wiki/Early_Fragment_Test) deaktiviert und zu einer Leistungsverminderung führen kann. | `false` |
| **outputColorSpace** | Definiert die Ausgabekodierung. | `LinearEncoding` |
| **powerPreference** | Gibt einen Hinweis an den Benutzeragenten, welche GPU-Konfiguration für diesen WebGL-Kontext geeignet ist. Kann "high-performance", "low-power" oder "default" sein. | `default` |
| **precision** | Shader-Präzision. Kann "highp", "mediump" oder "lowp" sein. | "highp" wenn vom Gerät unterstützt |
| **premultipliedAlpha** | Gibt an, ob der Renderer annimmt, dass die Farben [vormultipliziertes Alpha](https://en.wikipedia.org/wiki/Glossary_of_computer_graphics#premultiplied_alpha) haben. | `true` |
| **preserveDrawingBuffer** | Gibt an, ob die Puffer erhalten bleiben sollen, bis sie manuell gelöscht oder überschrieben werden. | `false` |
| **shadows** | Aktiviert Schatten im Renderer. | `false` |
| **shadowMapType** | Legt den Typ der `shadowMap` fest. | `PCFSoftShadowMap` |
| **stencil** | Gibt an, ob der Zeichenpuffer einen [Stencil-Puffer](https://en.wikipedia.org/wiki/Stencil_buffer) von mindestens 8 Bit hat. | `true` |
| **toneMapping** | Definiert das Tone-Mapping-Verfahren, das vom Renderer verwendet wird. | `NoToneMapping` |
| **toneMappingExposure** | Belichtungslevel des Tone-Mappings. | `1` |
| **useLegacyLights** | Gibt an, ob der Legacy-Beleuchtungsmodus verwendet werden soll oder nicht. | `true` |
| **windowSize** | Gibt an, ob die Fenstergröße als Leinwandgröße oder die des Elternelements verwendet werden soll. | `false` |

### Standardwerte

Tres versucht so unvoreingenommen wie möglich zu sein. Deshalb setzt es fast keine Standardwerte für die `TresCanvas`-Komponente. Es verwendet die Standardwerte von [three.js](https://threejs.org/). Die einzige Ausnahme ist die Eigenschaft `antialias`, die standardmäßig auf `true` gesetzt ist.

## Öffentlich exportierte Eigenschaften

| Eigenschaft | Beschreibung |
| ---- | ---- |
| context | siehe [useTresContext](composables#usetrescontext) |
