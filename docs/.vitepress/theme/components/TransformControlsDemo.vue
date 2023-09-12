<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { BasicShadowMap, SRGBColorSpace, NoToneMapping } from 'three'

import { OrbitControls, TransformControls } from '@tresjs/cientos'
import { ref, shallowReactive } from 'vue'
import { useControls, TresLeches } from '@tresjs/leches'
import '@tresjs/leches/styles'

const gl = {
  clearColor: '#201919',
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}

const boxRef = ref()
const transformState = shallowReactive({
  showX: true,
  showY: true,
  showZ: true,
})

const { value: mode } = useControls({
  mode: {
    value: 'translate',
    options: [{
      text: 'Translate',
      value: 'translate',
    }, {
      text: 'Rotate',
      value: 'rotate',
    }, {
      text: 'Scale',
      value: 'scale',
    }],
  },
})
</script>

<template>
  <TresLeches class="top-0 important-left-4" />
  <TresCanvas
    v-bind="gl"
  >
    <TresPerspectiveCamera
      :position="[11, 11, 11]"
      :fov="45"
      :near="0.1"
      :far="1000"
      :look-at="[-8, 3, -3]"
    />
    <OrbitControls make-default />
    <TransformControls
      :object="boxRef"
      v-bind="transformState"
      :mode="mode"
    />
    <TresMesh
      ref="boxRef"
      :position="[0, 4, 0]"
      cast-shadow
    >
      <TresBoxGeometry :args="[1.5, 1.5, 1.5]" />
      <TresMeshToonMaterial color="#FBB03B" />
    </TresMesh>
    <TresMesh
      :rotation="[-Math.PI / 2, 0, 0]"
      receive-shadow
    >
      <TresPlaneGeometry :args="[10, 10, 10, 10]" />
      <TresMeshToonMaterial />
    </TresMesh>
    <TresAmbientLight :intensity="0.5" />
    <TresDirectionalLight
      :position="[0, 8, 4]"
      :intensity="1.5"
      cast-shadow
    />
  </TresCanvas>
</template>