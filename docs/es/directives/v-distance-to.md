# v-distance-to

¿Has intentado calcular la distancia entre dos Object3D?

Con la nueva directiva `v-distance-to` es más fácil que nunca, solo debes indicar el objeto objetivo para realizar la medida y el resultado aparecerá en tu consola.

Además, se creará una flecha para indicar qué objetos estás midiendo.

<DirectiveVDistanceToCode />

El uso de `v-distance-to` es reactivo, por lo que funciona perfectamente con @tres/leches 🍰.

::: warning
`v-distance-to` no medirá un objeto en movimiento dentro del renderLoop.
:::
