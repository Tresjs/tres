# Einführung

<ClientOnly>
    <div style="aspect-ratio: 16/9; height: auto; margin: 2rem 0; border-radius: 8px; overflow:hidden;">
      <FirstScene />
    </div>
</ClientOnly>

<GuideInstall />

## Typescript

TresJS ist in Typescript geschrieben und vollständig typisiert. Installiere die Typdeklarationen für Three um alle Vorteile von Typescript zu genießen.

<GuideInstallTypescript />

## Vite

Wenn du Vite verwendest, solltest du Folgendes zu deiner `vite.config.ts` hinzufügen:

<GuideVite />

Das ist notwendig, damit der Templatecompiler mit dem benutzerdefinierten Renderer funktioniert und keine Warnungen in der Konsole ausgibt. Für weitere Informationen siehe [hier](/de/guide/troubleshooting.html).


## Probiere es online aus

### Sandbox

Du kannst TresJS online mit der offiziellen [Sandbox](https://play.tresjs.org/) ausprobieren:

<iframe src="https://play.tresjs.org/" class="w-full rounded shadow-lg outline-none border-none aspect-4/3"></iframe>

### StackBlitz

Wir haben einen neuen [StackBlitz](https://stackblitz.com/) Startpunkt, um TresJS online zu testen:

![](/stackblitz-starter.png)

<StackBlitzEmbed projectId="tresjs-basic" />

## Playground

Wir haben auch einen Playground, wo du TresJS online testen kannst. Probiere es [hier](https://playground.tresjs.org/) aus.

![](/playground.png)

## Motivation

[Three.js](https://threejs.org/) ist eine wunderbare Bibliothek für die Erstellung von erstaunlichen 3D-Webseiten mit WebGL. Sie wird konstant weiterentwickelt, was es für die Maintainer von Wrappern wie [TroisJS](https://troisjs.github.io/) schwierig macht, mit allen Verbesserungen Schritt zu halten.

Das React-Ökosystem hat eine beeindruckendes **custom Rendering** Projekt namens [react-three-fiber](https://docs.pmnd.rs/react-three-fiber), das es dir ermöglicht, deine Szenen deklarativ mit wiederverwendbaren, reaktiven Komponenten zu bauen.

Auf der Suche nach etwas Ähnlichem im VueJS-Ökosystem fand ich eine erstaunliche Bibliothek namens [Lunchbox](https://github.com/breakfast-studio/lunchboxjs), die mit demselben Konzept wie R3F arbeitet und einen [custom Vue3-Renderer](https://vuejs.org/api/custom-renderer.html) bereitstellt. Ich habe seinerzeit auch dazu beigetragen, diese Bibliothek zu verbessern, damit sie so ausgereift und funktionsreich wie R3F wird.

Das einzige Problem ist, dass die Kombination von Compilern und Renderern in Vue3-Templates etwas ist, an dem die Vue-Community noch arbeitet. Mehr Informationen dazu findest du [hier](https://github.com/vuejs/vue-loader/pull/1645).

<GuideLunchbox />

Von diesen beiden Bibliotheken inspiriert, entschied ich mich dazu einen eigenen Vue-Renderer für Three.js zu erstellen. Das ist **TresJS v2**.
