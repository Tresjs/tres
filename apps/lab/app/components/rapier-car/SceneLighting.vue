<script setup lang="ts">
import { Environment, Sky } from '@tresjs/cientos'
</script>

<template>
  <Sky
    :elevation="2"
    :azimuth="30"
    :mie-coefficient="0.005"
    :mie-directional-g="0.8"
    :rayleigh="1.5"
    :turbidity="4"
  />

  <Suspense>
    <Environment preset="city" :environment-intensity="0.45" />
  </Suspense>

  <TresHemisphereLight :intensity="0.65" color="#dbeafe" ground-color="#4d7c3a" />
  <TresAmbientLight :intensity="0.3" />

  <TresDirectionalLight
    :position="[6, 14, 10]"
    :intensity="3.5"
    cast-shadow
    :shadow-camera-far="120"
    :shadow-camera-top="50"
    :shadow-camera-bottom="-50"
    :shadow-camera-left="-50"
    :shadow-camera-right="50"
    :shadow-radius="1.5"
  />

  <TresDirectionalLight
    :position="[-6, 8, -8]"
    :intensity="1.5"
    color="#e8f0ff"
  />
</template>
