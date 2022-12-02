<script setup lang="ts">
import { TransformControls } from '@tresjs/cientos'
/* import { TransformControls, useTweakPane } from '../../../../../cientos/src' */
import { reactive, ref } from 'vue'

const boxRef = ref()
</script>
<template>
  <Story title="cientos/controls/TransformControls">
    <Variant title="playground">
      <TresCanvas clear-color="#82DBC5" shadows alpha>
        <TresPerspectiveCamera
          :position="[5, 5, 5]"
          :look-at="[0, 0, 0]"
          :fov="45"
          :aspect="1"
          :near="0.1"
          :far="1000"
        />
        <TresScene>
          <TransformControls :object="boxRef" />
          <TresMesh ref="boxRef" cast-shadow>
            <TresBoxGeometry :args="[1.5, 1.5, 1.5]" />
            <TresMeshToonMaterial color="#4F4F4F" />
          </TresMesh>
          <TresDirectionalLight :position="[0, 8, 4]" :intensity="0.7" cast-shadow />
        </TresScene>
      </TresCanvas>
    </Variant>
  </Story>
</template>
