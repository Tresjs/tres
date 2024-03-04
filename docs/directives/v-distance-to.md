# v-distance-to

Have you tried to calculate the distance between two Object3Ds?

With the new directive `v-distance-to` it's easier than ever, you should only indicate the target object to perform the measure and the result will appear in your console.

In addition, an arrow will be created to indicate which objects you're measuring.

<DirectiveVDistanceToCode />

The use of `v-distance-to` is reactive, so it works perfectly with @tres/leches 🍰.

::: warning
`v-distance-to` will not measure an object in movement within the renderLoop.
:::
