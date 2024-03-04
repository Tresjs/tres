# v-always-look-at 👀

Mit der neuen Direktive `v-always-look-at`, die von **TresJS** bereitgestellt wird, kannst du ein [Object3D](https://threejs.org/docs/index.html?q=object#api/en/core/Object3D) anweisen, immer eine spezifische Position anzuschauen. Diese kann als Vector3 oder Array übergeben werden.

## Benutzung

<DirectiveVAlwaysLookAtUsageCode />

Egal, wohin sich die Box bewegt, sie wird immer auf die Position [0,0,0] ausgerichtet sein.

### Warum nicht die eingebaute Methode look-at verwenden?

Eine berechtigte Frage wäre, warum man nicht die `:look-at`-Methode direkt in der Komponente verwenden sollte.
Die Antwort ist, dass mit der Methode `:look-at` angegeben wird, dass die Position nur einmal beim Mounten der Instanz angeschaut wird. Wenn sich das Objekt ändert, wird dies nicht aktualisiert.

### Du kannst auch andere Instanzen anschauen!

Ein weiterer Vorteil ist, dass du mit der Kamera auch nicht-stationäre Objekte beobachten kannst:

Zum Beispiel:

<DirectiveVAlwaysLookAtExampleCode />
