<template>
  <TresCanvas :clear-color="'#0c1a30'">
    <TresPerspectiveCamera :position="[13, 0, 0]" />
    <OrbitControls />
    <Suspense>
      <MusicBlob />
    </Suspense>
    <TresDirectionalLight :position="[1, 1, 1]" />
    <TresAmbientLight :intensity="1" />
  </TresCanvas>
</template>

<script lang="ts" setup></script>
<style></style>
