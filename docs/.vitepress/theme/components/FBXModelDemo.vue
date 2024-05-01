<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { FBXModel, OrbitControls } from '@tresjs/cientos'
</script>

<template>
  <TresCanvas clear-color="#1F90FF">
    <TresPerspectiveCamera :position="[11, 11, 11]" />
    <OrbitControls />
    <Suspense>
      <FBXModel
        path="https://raw.githubusercontent.com/Tresjs/assets/main/models/fbx/low-poly-truck/Jeep_done.fbx"
        :scale="0.025"
      />
    </Suspense>
    <TresDirectionalLight
      :intensity="2"
      :position="[3, 3, 3]"
    />
    <TresAmbientLight />
  </TresCanvas>
</template>
