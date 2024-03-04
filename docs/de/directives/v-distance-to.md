# v-distance-to

Hast du schon einmal versucht, die Distanz zwischen zwei Object3Ds zu berechnen?

Mit der neuen Direktive `v-distance-to` ist es einfacher als je zuvor. Du musst nur das Zielobjekt für die Messung angeben und das Ergebnis wird in deiner Konsole erscheinen.

Zusätzlich wird ein Pfeil zwischen den beiden Objekten erstellt.

<DirectiveVDistanceToCode />

Die Verwendung von `v-distance-to` ist reaktiv, sodass sie perfekt mit `@tres/leches` 🍰 funktioniert.

::: warning
`v-distance-to` wird kein bewegtes Objekt innerhalb des RenderLoops messen.
:::
