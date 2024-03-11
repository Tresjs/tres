<script setup lang="ts">
import { shallowRef, watch } from 'vue'
import { TresCanvas } from '@tresjs/core'
import { OrbitControls, Ocean, Sky } from '@tresjs/cientos'
import { SRGBColorSpace, ACESFilmicToneMapping, Vector3 } from 'three'

const gl = {
  clearColor: '#333',
  outputColorSpace: SRGBColorSpace,
  toneMapping: ACESFilmicToneMapping,
  toneMappingExposure: 1,
}

const newSunDirection = new Vector3(10, 0, 0)

// const skyRef = shallowRef()
// watch(skyRef, (value) => {
//   console.log(value)
// })
</script>

<template>
  <TresCanvas
    v-bind="gl"
  >
    <TresPerspectiveCamera :position="[0, 0, 15]" />
    <TresDirectionalLight :position="[0, 0, 1]" />
    <Sky :azimuth="0" />
    <Suspense>
      <Ocean>
        <TresCircleGeometry :args="[50, 16]" />
      </Ocean>
    </Suspense>
    <TresMesh :position-y="1">
      <TresBoxGeometry :args="[1, 1, 1]" />
    </TresMesh>
    <OrbitControls 
      :enable-pan="false"
      :enable-zoom="false"
      :max-polar-angle="Math.PI * 0.495"
      :min-distance="40.0"
      :max-distance="200.0"
    />
  </TresCanvas>
</template>
