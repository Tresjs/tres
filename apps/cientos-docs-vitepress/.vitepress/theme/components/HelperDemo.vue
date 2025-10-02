<script setup lang="ts">
import { BoxHelper, PointLightHelper } from 'three'
import { VertexNormalsHelper } from 'three-stdlib'
import { Helper, OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
</script>

<template>
  <TresCanvas clear-color="#222">
    <TresPerspectiveCamera :position="[10, 10, 10]" />
    <OrbitControls />

    <TresPointLight :position="[5, 5, -5]">
      <Helper :type="PointLightHelper" :args="[0.5]" />
    </TresPointLight>

    <TresGroup>
      <Helper :type="BoxHelper" :args="['royalblue']" />

      <TresMesh :position="[-2, 2, -1]">
        <TresSphereGeometry />
        <TresMeshBasicMaterial />
        <Helper :type="BoxHelper" :args="['red']" />
      </TresMesh>

      <TresMesh :position="[2, -2, 1]">
        <TresBoxGeometry />
        <TresMeshBasicMaterial />
        <Helper :type="VertexNormalsHelper" :args="[1, 'red']" />
      </TresMesh>
    </TresGroup>
  </TresCanvas>
</template>
