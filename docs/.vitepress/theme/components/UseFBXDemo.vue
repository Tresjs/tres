<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { useFBX, OrbitControls } from '@tresjs/cientos'

const path = 'https://raw.githubusercontent.com/'
  + 'Tresjs/assets/main/models/fbx/low-poly-truck/Jeep_done.fbx'
const model = await useFBX(path)
</script>

<template>
  <TresCanvas clear-color="#1F90FF">
    <TresPerspectiveCamera :position="[11, 11, 11]" />
    <OrbitControls />
    <Suspense>
      <primitive
        :object="model"
        :scale="0.025"
      />
    </Suspense>
    <TresDirectionalLight
      :intensity="2"
      :position="[3, 3, 3]"
    />
    <TresAmbientLight :intensity="1" />
  </TresCanvas>
</template>