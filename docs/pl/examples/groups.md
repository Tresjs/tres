# Grupa

`<TresGroup>` to instancja klasy [THREE.Group](https://threejs.org/docs/#api/en/objects/Group), która jest prawie taka sama jak [THREE.Object3D](https://threejs.org/docs/#api/en/objects/Object3D), ale pozwala na **grupowanie wielu obiektów w scenie**, aby mogły być manipulowane jako jednostka (przesuwanie, obracanie itp.).

## Użycie

```vue{13,22}
<script setup lang="ts">
const groupRef = ref()
const { onLoop } = useRenderLoop()

onLoop(() => {
  if (groupRef.value) {
    groupRef.value.rotation.y += 0.01
  }
})
</script>
<template>
  <TresCanvas>
    <TresGroup ref="groupRef" :position="[2,0,0]">
      <TresMesh>
        <TresBoxGeometry />
        <TresMeshBasicMaterial color="red" />
      </TresMesh>
      <TresMesh>
        <TresSphereGeometry />
        <TresMeshBasicMaterial color="blue" />
      </TresMesh>
    </TresGroup>
  </TresCanvas>
</template>
```
