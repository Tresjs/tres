<template>
  <TresPerspectiveCamera :position="[3, 3, 3]" :look-at="[0, 0, 0]" />
  <TresAmbientLight :intensity="1" />
  <TresDirectionalLight :position="[0, 8, 4]" :intensity="0.7" />
  <TresMesh>
    <TresBoxGeometry />
    <TresMeshStandardMaterial color="hotpink" />
  </TresMesh>
</template>
