<script setup lang="ts">
import { SRGBColorSpace, BasicShadowMap, NoToneMapping } from 'three'
import { TresCanvas } from '@tresjs/core'
import { OrbitControls } from '@tresjs/cientos'

// import { useRenderLoop } from '..'
/* import { OrbitControls, GLTFModel } from '@tresjs/cientos' */

const state = reactive({
  clearColor: '#201919',
  shadows: true,
  alpha: false,
  physicallyCorrectLights: true,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
})

const context = ref(null)

watchEffect(() => {
  if (context.value) {
    console.log(context.value?.state?.scene)
  }
})
</script>

<template>
  <TresCanvas
    v-bind="state"
    ref="context"
  >
    <TresPerspectiveCamera
      :position-x="5"
      :position-y="5"
      :position-z="5"
      :fov="45"
      :near="0.1"
      :far="1000"
      :look-at="[-8, 3, -3]"
    />
    <OrbitControls make-default />
    <TresAmbientLight :intensity="0.5" />

    <TresMesh
      :scale-x="1.1"
      :scale-y="2"
      :scale-z="3"
      :rotation-x="Math.PI * 1.5"
      :rotation-y="Math.PI * 0.6"
      :rotation-z="Math.PI * 0.2"
      :position-y="5"
      :position-z="-2"
      cast-shadow
    >
      <TresBoxGeometry />
      <TresMeshToonMaterial color="#FBB03B" />
    </TresMesh>
    <TresMesh
      :scale-x="1.1"
      :scale-y="2"
      :scale-z="3"
      :rotation-y="Math.PI * 0.6"
      :rotation-x="Math.PI * 1.5"
      :rotation-z="Math.PI * 0.2"
      :position-y="1"
      :position-z="2"
      cast-shadow
    >
      <TresBoxGeometry />
      <TresMeshToonMaterial
        :color-r="0xff / 255"
        :color-g="0x0 / 255"
        :color-b="0xff / 255"
      />
    </TresMesh>
    <TresDirectionalLight
      :position-y="8"
      :position-z="4"
      :intensity="0.7"
      cast-shadow
    />
    <TresMesh
      :rotation="[-Math.PI / 2, 0, 0]"
      receive-shadow
    >
      <TresPlaneGeometry :args="[10, 10, 10, 10]" />
      <TresMeshToonMaterial />
    </TresMesh>
    <TresDirectionalLight
      :position-y="2"
      :position-z="4"
      :intensity="1"
      cast-shadow
    />
  </TresCanvas>
</template>
